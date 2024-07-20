const DbModel = require("../models/otpManagmentModel");
const tableName = DbModel.tableName;
const PrimaryKeyID = DbModel.primaryKeyAttributes[0];
const Messages = require("../utils/messages");
const logService = require("./logService");
const { Op } = require("sequelize");
const commonUtils = require("../utils/commonUtils");

module.exports = {
  // Function to save data
  async saveData(data) {
    try {
      let savedData = await DbModel.create(data);
      return savedData;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ data, stack: error.stack }, error);
      throw error;
    }
  },

  async saveDataWithTransaction(data, transaction) {
    try {
      let savedData = await DbModel.create(data, { transaction });
      return savedData;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ data, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to get all data
  async getAllData(orderBy = "createdAt", order = "ASC") {
    try {
      let data = await DbModel.findAll({
        where: {
          deleteFlag: 0,
        },
        order: [[orderBy, order]],
      });
      return data;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ data, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to fetch items with pagination
  async getAllWithPaginationWithoutSearch(
    filter,
    page,
    pageSize,
    orderBy,
    orderDir
  ) {
    try {
      // Calculate the offset based on page number and page size
      const offset = (page - 1) * pageSize;

      // Fetch items for the current page with pagination
      const data = await DbModel.findAndCountAll({
        where: {
          deleteFlag: 0,
          ...filter,
        },
        offset,
        limit: pageSize,
        order: [[orderBy, orderDir]], // Order the items based on the provided parameters
      });

      // Return the fetched items, total count, current page number, and page size
      return {
        data: data.rows,
        totalCount: data.count,
        currentPage: page,
        pageSize: pageSize,
      };
    } catch (error) {
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
      await logService.Insert({ stack: error.stack }, error);
      throw error;
    }
  },

  // Function to retrieve data by ID
  async getDataById(id) {
    try {
      let data = await DbModel.findOne({
        where: {
          [PrimaryKeyID]: id,
          deleteFlag: 0,
        },
      });

      // Return the retrieved data
      return data;
    } catch (error) {
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
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
          [PrimaryKeyID]: id,
          deleteFlag: 0,
        },
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
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, updatedData, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to update data
  async updateDataWithTransaction(id, updatedData, transaction) {
    try {
      // Find data in DbModel based on ApprovalRequestId
      let data = await DbModel.findOne({
        where: {
          [PrimaryKeyID]: id,
          deleteFlag: 0,
        },
      });

      // If data is not found, throw an error
      if (!data) {
        throw new Error(Messages.UnableToGetEntity);
      }

      // Merge updatedData into the found data
      Object.assign(data, updatedData);

      // Save the updated data
      await data.save({ transaction });

      // Return the updated data
      return data;
    } catch (error) {
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, updatedData, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to update data
  async updateDataFilter(filter, updatedData) {
    try {
      // Find data in DbModel based on ApprovalRequestId
      let data = await DbModel.findOne({
        where: filter,
        deleteFlag: 0,
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
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, updatedData, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to delete data
  async deleteData(id) {
    try {
      let data = await DbModel.findOne({
        where: {
          deleteFlag: 0,
          [PrimaryKeyID]: id,
        },
      });

      if (!data) {
        throw new Error(Messages.UnableToGetEntityById);
      }

      data.deleteFlag = 1;
      await data.save();
      return true;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to check if data exists based on a filter
  async existData(filter) {
    try {
      let count = await DbModel.count({
        where: {
          deleteFlag: 0,
          ...filter,
        },
      });
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },
  // Function to get filtered data by organizationId and order
  async getFilterData(filter, orderBy = "createdAt", order = "ASC") {
    try {
      let data = await DbModel.findAll({
        where: {
          deleteFlag: 0,
          ...filter,
        },
        order: [[orderBy, order]],
      });
      return data;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },

  // Function to get filtered data by organizationId and order
  async getFullFilterSingleOneData(
    filter,
    orderBy = "createdAt",
    order = "ASC"
  ) {
    try {
      let data = await DbModel.findOne({
        where: {
          ...filter,
        },
        order: [[orderBy, order]],
      });
      return data;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ filter, stack: error.stack }, error);
      throw error;
    }
  },

  async getDataByIdWithInclude(id) {
    try {
      // Find data in DbModel based on ApprovalRequestId
      let data = await DbModel.findOne({
        where: {
          [PrimaryKeyID]: id,
        },
        include: [{}],
      });

      // Return the retrieved data
      return data;
    } catch (error) {
      // Log the error and throw an exception
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },

  async deleteDataWithTransaction(id, transaction) {
    try {
      let data = await DbModel.findOne({
        where: {
          deleteFlag: 0,
          [PrimaryKeyID]: id,
        },
      });

      if (!data) {
        throw new Error(Messages.UnableToGetEntityById);
      }

      data.deleteFlag = 1;
      await data.save({ transaction });
      return true;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },

  async getSingleDataWithFilterAndAttributes (
    filter,
    attributes,
    orderBy = "ASC"
  ) {
    try {
      let data = await DbModel.findOne({
        where: filter,
        attributes,
        order: [[PrimaryKeyID, orderBy]],
      });
      return data;
    } catch (error) {
      await commonUtils.log(error, "Error");
      await logService.Insert({ id, stack: error.stack }, error);
      throw error;
    }
  },
};
