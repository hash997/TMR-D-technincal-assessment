const { Rate } = require("../models");
const {
  to,
  responseError,
  responseSuccess,
} = require("../services/util.service");
const CONSTANTS = require("../constants");
const axios = require("axios");

const buildCityLinkRequestBody = (inputData) => {
  switch (inputData.type) {
    case "parcel":
      return {
        origin_country: inputData.origin_country,
        origin_state: inputData.origin_state,
        origin_postcode: inputData.origin_postcode,
        destination_country: inputData.destination_country,
        destination_state: inputData.destination_state,
        destination_postcode: inputData.destination_postcode,
        length: inputData.length,
        width: inputData.width,
        height: inputData.height,
        selected_type: "1",
        parcel_weight: inputData.parcel_weight,
      };

    case "document":
      return {
        origin_country: inputData.origin_country,
        origin_state: inputData.origin_state,
        origin_postcode: inputData.origin_postcode,
        destination_country: inputData.destination_country,
        destination_state: inputData.destination_state,
        destination_postcode: inputData.destination_postcode,
        length: inputData.length,
        width: inputData.width,
        height: inputData.height,
        selected_type: "2",
        parcel_weight: "",
        document_weight: inputData.parcel_weight,
      };

    default:
      break;
  }
};

const cacheRateInDB = async (id, rates) => {
  const [error, cachedRates] = await to(
    Rate.create({
      id,
      rates,
    })
  );

  return [error, cachedRates];
};

const callCitylinkApi = async (inputData) => {
  const [error, rate] = await to(axios.post(CONSTANTS.CITYLINK_URL, inputData));
  // The message here may contain an error message for a unkown entered value.
  if (rate.data.req.data.message) {
    return [rate.data.req.data.message, null];
  }

  return [error, rate];
};

module.exports = {
  async getRatesFromCouriers(req, res) {
    const rates = [];
    // build request body
    const requestBody = buildCityLinkRequestBody(req.body);

    // call citylink api
    const [citylinkError, cityLinkRate] = await callCitylinkApi(requestBody);
    if (citylinkError) {
      return responseError(res, citylinkError, 422);
    }
    // add rate to rates array
    rates.push({ courier: "citylink", rate: cityLinkRate.data.req.data.rate });

    const [cachedRatesError, createdRatesRes] = await cacheRateInDB(
      JSON.stringify(req.body),
      JSON.stringify(rates)
    );
    if (!cachedRatesError) {
      return responseSuccess(res, {
        data: rates,
        fromCache: false,
        dataCached: true,
      });
    } else
      return responseSuccess(res, {
        data: rates,
        fromCache: false,
        dataCached: false,
      });
  },
};
