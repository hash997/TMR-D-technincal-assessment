const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  to,
  responseError,
  responseSuccess,
} = require("../services/util.service");
const { User } = require("../models");

module.exports = {
  async authenticate(req, res, next) {
    passport.authenticate(
      "login",
      { session: false },
      async (error, user, info) => {
        if (error || !user)
          return responseError(res, "Can't authenticate", 401);

        const [userError, dbUser] = await to(
          User.findOne({ where: { name: user } })
        );

        req.login(user, { session: false }, (err) => {
          if (err) return responseError(res, err, 400);
          const body = { id: user.id, name: user.name };
          const token = jwt.sign({ user: body }, "your_jwt_sescret");
          return responseSuccess(res, { user: body, token });
        });
        return next();
      }
    )(req, res, next);
  },
};
