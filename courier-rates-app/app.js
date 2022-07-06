const { isTest } = require("./services/environment.service");
const express = require("express");

const bodyParser = require("body-parser");

// This will be our application entry. We'll setup our server here.
const http = require("http");

// Set up express app
const app = express();
const v1 = require("./routes/v1");

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Require our routes into the application
app.use("/", v1);

const host = process.env.NODE_HOST || "0.0.0.0";
const port = parseInt(process.env.NODE_PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);

if (!isTest()) {
  server.listen(port, host);
  console.log(`Running on http://${host}:${port}`);
}

module.exports = app;