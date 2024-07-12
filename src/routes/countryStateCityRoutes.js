// Importing required modules and files
const express = require("express");
const router = express.Router();
const CSCController = require("../controllers/countryStateCityController");
const countrySCValidation = require("../validations/countrySCValidation");

router.get("/Test", CSCController.TestApiBase);

router.get("/Get-All-CountryList", CSCController.GetAllCountryList);

router.get(
  "/Get-All-SateList-By-Country",
  countrySCValidation.GetStateValidationKeys,
  CSCController.GetAllStateList
);

router.get(
  "/Get-All-CityList-By-Country-State",
  countrySCValidation.GetCityValidationKeys,
  CSCController.GetAllCityList
);

module.exports = router; // Exporting the router
