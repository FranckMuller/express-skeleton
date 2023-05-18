const express = require("express");
const refreshTokenController = require("../controllers/refresh-token-controller");
const refreshTokenRouter = express.Router();

refreshTokenRouter.get("/", refreshTokenController.refreshToken);

module.exports = refreshTokenRouter;
