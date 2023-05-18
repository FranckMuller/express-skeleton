const express = require("express");
const loginController = require("../controllers/login-controller");
const loginRouter = express.Router();

loginRouter.post("/", loginController.login);

module.exports = loginRouter;
