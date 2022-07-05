// const { Rate } = require("../models");
const CONSTANTS = require("../constants");
const { to } = require("./util.service");
const axios = require("axios");

const formCityLinkRequestBody = (inputData) => {
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

const formJntRequestBody = (inputData) => {
  // to do...
};

module.exports = {
  async getCityLinkRates(dataInputs) {
    const requestBody = formCityLinkRequestBody(dataInputs);
    return to(axios.post(CONSTANTS.CITYLINK_URL, requestBody));
  },
  async getCachedRates(rateId) {
    return to(Rate.findOne({ where: { id: rateId } }));
  },
};
