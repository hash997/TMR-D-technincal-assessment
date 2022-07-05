const { Rate } = require("../models");
const {
  to,
  responseError,
  responseSuccess,
} = require("../services/util.service");

module.exports = {
  async getCachedRates(req, res, next) {
    const rateId = JSON.stringify(req.body);

    const [error, rates] = await to(Rate.findOne({ where: { id: rateId } }));

    if (error) return next();

    if (!rates) return next();

    if (rates)
      return responseSuccess(res, {
        data: JSON.parse(rates.rates),
        fromCache: true,
        dataCached: true,
      });
  },
};
