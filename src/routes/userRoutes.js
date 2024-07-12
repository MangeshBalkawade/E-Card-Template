// Importing required modules and files
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");
const commonUtils = require("../utils/commonUtils");
const upload = require("../utils/fileUpload");
const jwtUtils = require("../utils/jwtUtils");

router.get(
  "/User-GetData-ById/:id",
  jwtUtils.validateToken,
  UserController.getDataById
);

module.exports = router; // Exporting the router
