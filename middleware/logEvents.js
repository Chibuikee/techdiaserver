const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const logEvents = async (message, logName) => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      `${message}\n`
    );
  } catch (error) {
    console.log(error);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};
module.exports = { logEvents, logger };
