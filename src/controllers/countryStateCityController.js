const CountryService = require("../services/countryService")
const StateService = require("../services/stateService")
const CityService = require("../services/cityService")
const CountryStateCity = require('country-state-city');
const responseUtils = require('../utils/responseUtils')
const commonUtils = require("../utils/commonUtils")

module.exports = {
    async TestApiBase(req, res) {
        try {
            let countyList = await CountryStateCity.Country.getAllCountries();
            let stateList = await CountryStateCity.State.getAllStates();
            let cityList = await CountryStateCity.City.getAllCities();
            return responseUtils.sendSuccess(res, {countyList,stateList,cityList}, "Test Api Running successfully For Country State");
        } catch (error) {
            await commonUtils.log(error,'Error')
            return responseUtils.sendServerError(res, 'Internal Server Error');
        }
    },


    async GetAllCountryList(req, res) {
        try {
            let countyList = await CountryService.getAllData('name','ASC')
            return responseUtils.sendSuccess(res, {countyList}, "Get All Country List");
        } catch (error) {
            await commonUtils.log(error,'Error')
            return responseUtils.sendServerError(res, 'Internal Server Error');
        }
    },

    async GetAllStateList(req, res) {
        try {
            const {countryId} =  req.query;
            let stateList = await StateService.getFilterData({countryId},'name','ASC')
            return responseUtils.sendSuccess(res, {stateList}, "Get All State List By country");
        } catch (error) {
            await commonUtils.log(error,'Error')
            return responseUtils.sendServerError(res, 'Internal Server Error');
        }
    },

    async GetAllCityList(req, res) {
            try {
                const {countryId,stateId} =  req.query;
                let cityList = await CityService.getFilterData({countryId,stateId},'name','ASC')
                return responseUtils.sendSuccess(res, {cityList}, "Get All city List By country state");
            } catch (error) {
                await commonUtils.log(error,'Error')
                return responseUtils.sendServerError(res, 'Internal Server Error');
            }
    },
};