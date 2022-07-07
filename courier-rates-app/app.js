const { isTest } = require("./services/environment.service");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./services/documentations");

/**
 * -------------- GENERAL SETUP ----------------
 */

const http = require("http");

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Create the Express application
const app = express();
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * -------------- SWAGGER SETUP ----------------
 */

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * -------------- ROUTES ----------------
 */
app.use("/", routes);

const host = process.env.NODE_HOST || "0.0.0.0";
const port = parseInt(process.env.NODE_PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);

if (!isTest()) {
  server.listen(port, host);
  console.log(`Running on http://${host}:${port}`);
}

module.exports = app;
