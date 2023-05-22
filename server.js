require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors-options");
const connectDb = require("./config/db-conn");

const { logger } = require("./middleware/log-events");
const errorHandler = require("./middleware/error-handler");
const verifyJwt = require("./middleware/verify-jwt");

connectDb();
const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors(corsOptions));
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh-token", require("./routes/refresh-token"));

app.use(verifyJwt);
app.use("/posts", require("./routes/api/posts"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts(".html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts(".json")) {
    res.json("404 Not found");
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("err");
});
