// index.js
const express = require("express");
const router = express.Router();
const responseUtils = require("../utils/responseUtils");

const userRoutes = require("./userRoutes");
const cscRoutes = require("./countryStateCityRoutes");

router.use("/Api/V1/Users", userRoutes);
router.use("/Api/countrystatecity", cscRoutes);

const sync = require("../models/tableRelationShipModel");

router.get("/", (req, res) => {
  responseUtils.sendSuccess(res, {}, "welcome to E-Business");
});

module.exports = router;
