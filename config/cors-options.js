const allowedOrigins = require("./allowed-origins");

const corsOptions = {
  origin: (origin, callback) => {
    console.log("corsOptions");
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
