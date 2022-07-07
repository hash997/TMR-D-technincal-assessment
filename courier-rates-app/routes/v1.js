const express = require("express");

const router = express.Router();
const passport = require("passport");
require("../passport");

const customMiddleware = require("../middleware/custom");

const AuthController = require("../controllers/auth.controller");
const RateController = require("../controllers/rate.controller");
const jnt = require("../puppeteer/index");

router.post("/login", AuthController.authenticate);

router.post("/jnt", jnt.getJntRates);

router.post(
  "/rates",
  passport.authenticate("jwt", { session: false }),
  customMiddleware.getCachedRates,
  RateController.getRatesFromCouriers
);

module.exports = router;
