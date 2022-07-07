require("dotenv").config();
const { isTest } = require("./services/environment.service");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./services/documentations");

// This will be our application entry. We'll setup our server here.
const http = require("http");

// Set up express app
const app = express();
app.use(logger("dev"));
const v1 = require("./routes/v1");
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jnt = require("./puppeteer/index");

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Require our routes into the application
app.use("/", v1);

app.post("/", jnt.getJntRates);

const host = process.env.NODE_HOST || "0.0.0.0";
const port = parseInt(process.env.NODE_PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);

if (!isTest()) {
  server.listen(port, host);
  console.log(`Running on http://${host}:${port}`);
}

module.exports = app;
