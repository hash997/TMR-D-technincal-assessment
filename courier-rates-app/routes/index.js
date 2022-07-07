const express = require("express");
const router = express.Router();
const passport = require("passport");
const jntScraper = require("../jntScraper/index");
require("../passport");

const customMiddleware = require("../middleware/custom");

const AuthController = require("../controllers/auth.controller");
const RateController = require("../controllers/rate.controller");

/**
 * -------------- POST ROUTES ----------------
 */

router.post("/login", AuthController.authenticate);

router.post("/jnt", AuthController.authenticate, jntScraper.getJntRates);

router.post(
  "/rates",
  passport.authenticate("jwt", { session: false }),
  customMiddleware.getCachedRates,
  RateController.getRatesFromCouriers
);

module.exports = router;
