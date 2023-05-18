const express = require("express");
const logoutController = require("../controllers/logout-controller");
const logoutRouter = express.Router();

logoutRouter.get("/", logoutController.logout);

module.exports = logoutRouter;
