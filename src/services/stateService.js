const DbModel = require('../models/stateModel');
const logService = require('./logService');
const tableName = DbModel.tableName;
const PrimaryKeyID = 'stateId';
const Messages = require('../utils/messages')
const { Op } = require('sequelize');
const commonUtils = require("../utils/commonUtils")


module.exports = {
  // Function to save data
  async saveData(data) {
    try {
      let savedData = await DbModel.create(data);
      return savedData;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
     if (error?.parent?.errno === 1062) {
        // Return a custom message for duplicate entry
        return false;
      } else {

        throw error;
      }

    }
  },

  // Function to bulk create data
  async bulkCreateData(data) {
    try {
      let createdData = await DbModel.bulkCreate(data);
      return createdData;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      throw error;
    }
  },

  // Function to get all data
  async getAllData(orderBy = 'createdAt', order = "ASC") {
    try {
      let data = await DbModel.findAll({
        order: [[orderBy, order]]
      });
      return data;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      throw error;
    }
  },

  // Function to fetch items with pagination
  async getAllWithPaginationWithoutSearch(filter, page, PageSize, orderBy, orderDir) {
    try {
      // Calculate the offset based on page number and page size
      const offset = (page - 1) * PageSize;

      // Fetch items for the current page with pagination
      const Items = await DbModel.findAll({
        where: {
          status: 1,
          ...filter
        },
        offset,
        limit: PageSize,
        order: [[orderBy, orderDir]] // Order the items based on the provided parameters
      });

      // Get the total count of items in the DbModel
      const TotalCount = await DbModel.count({
        where: filter
      });

      // Return the fetched items, total count, current page number, and page size
      return {
        Items,
        TotalCount,
        CurrentPage: page,
        PageSize
      };
    } catch (error) {
      // Log the error and throw an exception'
      await commonUtils.log(error,'Error')
      await logService.Insert({ stack: error.stack }, error);
      throw error;
    }
  },

  async getAllWithPagination(filter, page, PageSize, orderBy, orderDir) {
    try {
      let { searchBy, searchFields, searchByColumNameValue, startDate, endDate, ...rest } = filter;
      let modifiedFilter = { ...rest };
      const offset = (page - 1) * PageSize;
      searchFields = searchFields ? JSON.parse(searchFields.replace(/'/g, '"')) : [];

      if (startDate.trim() != '' && endDate.trim() != '') {
        modifiedFilter.PR_Date = {
          [Op.between]: [startDate, endDate], // Replace startDate and endDate with your actual date values
        }
      }

      const whereClause = {
        status: 1,
        ...modifiedFilter
      };

      searchByColumNameValue = searchByColumNameValue ? JSON.parse(searchByColumNameValue.replace(/'/g, '"')) : {};

      if (Object.keys(searchByColumNameValue).length > 0) {
        for (const column in searchByColumNameValue) {
          // Assuming queryParams contains valid column names
          whereClause[column] = { [Op.like]: `%${searchByColumNameValue[column]}%` };
        }
      }

      if (searchBy) {
        if (Array.isArray(searchFields) && searchFields.length > 0) {
          const searchConditions = [];
          searchFields.forEach((column) => {
            const columnsToSearch = Array.isArray(column) ? column : [column];

            columnsToSearch.forEach((col) => {
              const searchCondition = {
                [col]: {
                  [Op.like]: `%${searchBy}%`
                }
              };
              searchConditions.push(searchCondition);
            });
          });
          whereClause[Op.or] = searchConditions;
        } else {
          // If no specific search column is provided, search across all columns
          const columns = await DbModel.describe(); // Get all columns of the model
          const searchConditions = [];

          for (const column in columns) {
            searchConditions.push({
              [column]: {
                [Op.like]: `%${searchBy}%`
              }
            });
          }
          whereClause[Op.or] = searchConditions;

        }
      }

      const Items = await DbModel.findAll({
        where: whereClause,
        offset,
        limit: PageSize,
        order: [[orderBy, orderDir]]
      });

      const TotalCount = await DbModel.count({
        where: whereClause
      });

      const totalPages = Math.ceil(TotalCount / PageSize);

      return {
        Items,
        TotalCount,
        CurrentPage: page,
        TotalPage: totalPages,
        PageSize
      };
    } catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ stack: error.stack }, error);
      throw error;
    }
  },


  // Function to retrieve data by ID
  async getDataById(id) {
    try {
      // Find data in DbModel based on ApprovalRequestId
      let data = await DbModel.findOne({
        where: {
          [PrimaryKeyID]: id
        }
      });

      // Return the retrieved data
      return data;
    } catch (error) {
      // Log the error and throw an exception
      await commonUtils.log(error,'Error')
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },


  // Function to update data
  async updateData(id, updatedData) {
    try {
      // Find data in DbModel based on ApprovalRequestId
      let data = await DbModel.findOne({
        where: {
          [PrimaryKeyID]: id
        }
      });

      // If data is not found, throw an error
      if (!data) {
        throw new Error(Messages.UnableToGetEntity);
      }

      // Merge updatedData into the found data
      Object.assign(data, updatedData);

      // Save the updated data
      await data.save();

      // Return the updated data
      return data;
    } catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ id, updatedData, stack: error.stack }, error);
      throw error;
    }
  },


  // Function to delete data
  async deleteData(id) {
    try {
      let data = await DbModel.findOne({
        where: {
          status: 1,
          [PrimaryKeyID]: id
        }
      });

      if (!data) {
        throw new Error(Messages.UnableToGetEntityById);
      }

      data.status = 0;
      await data.save();
      return true;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to check if data exists based on a filter
  async existData(filter) {
    try {
      let count = await DbModel.count({
        where: {
          status: 1,
          ...filter
        }
      });
      if (count > 0) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },
  // Function to get filtered data by organizationId and order
  async getFilterData(filter, orderBy = 'createdAt', order = "ASC") {
    try {
      let data = await DbModel.findAll({
        where: {
          ...filter
        },
        order: [[orderBy, order]]
      });
      return data;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },
  // Function to get filtered data by organizationId and order
  async getFilterSingleOneData(filter, orderBy = 'createdAt', order = "ASC") {
    try {
      let data = await DbModel.findOne({
        where: {
          status: 1,
          ...filter
        },
        order: [[orderBy, order]]
      });
      return data;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to get filtered data by organizationId and order
  async getFilterSingleOneDataWithJoin(filter, orderBy = 'createdAt', order = "ASC") {
    try {
      let data = await DbModel.findOne({
        where: {
          status: 1,
          ...filter
        },
        order: [[orderBy, order]]
      });
      return data == null ? {} : data;
    }
    catch (error) {
      await commonUtils.log(error,'Error')
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },
};
