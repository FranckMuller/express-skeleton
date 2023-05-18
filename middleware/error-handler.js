const { logEvents } = require("./log-events");

const errorHandler = (err, req, res, next) => {
  // console.error(err.stack);
  logEvents(`${err.name}\t${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHandler;
