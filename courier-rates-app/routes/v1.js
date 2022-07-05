const express = require("express");

const router = express.Router();

const customMiddleware = require("../middleware/custom");

const RateController = require("../controllers/rate.controller");

router.post(
  "/",
  customMiddleware.getCachedRates,
  RateController.getRatesFromCouriers
);

module.exports = router;
