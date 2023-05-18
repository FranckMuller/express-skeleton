const fs = require("fs");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const path = require("path");

const fsPromises = fs.promises;

const logEvents = async (message, logEvent) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logEvent),
      logItem
    );
  } catch (e) {
    // console.error(e);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "req-log.txt");
  // console.log(`${req.method} ${res.path}`);
  next();
};

module.exports = { logger, logEvents };
