const express = require("express");
const app = express();
const axios = require("axios").default;

app.use(express.json());
app.listen(3000);

const CITY_LINK = "citylink";
const JNT = "jnt";
const CITYLINK_URL =
  "https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate";
const JT_URL = "https://www.jtexpress.my/shipping-rates";

function formCityLinkRequestBody(inputData) {
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
}

function formJntRequestBody(inputData) {
  // to do...
}

async function callCityLinkApiHandler(body, url) {
  const requestBody = formCityLinkRequestBody(body);
  try {
    const res = await axios.post(url, requestBody);

    if (res.data.req.data.message) {
      throw Error(res.data.req.data.message);
    }

    return { courier: "citylink", rate: res.data.req.data.rate };
  } catch (error) {
    // if server error, throw error
    if (error?.response?.data?.error) {
      throw Error(error.response.data.error);
    }
    // if client error, throw error
    throw Error(error);
  }
}

async function callJntApiHandler(body, url) {
  // form request body
  const requestBody = formRequestBodyInputs(body, JNT);
  try {
    const res = await axios.post(url, requestBody);
    return { courier: "jnt", rate: res.data.req.data.rate };
  } catch (error) {
    console.log("error", error);
    throw Error(error);
  }
}

app.post("/", async (req, res) => {
  const reqBody = req.body;

  if (
    !reqBody.origin_country ||
    !reqBody.destination_country ||
    !reqBody.destination_country ||
    !reqBody.destination_postcode ||
    !reqBody.type
  ) {
    res.status(400).json("Error: Missing important fields");
    return;
  }

  try {
    const cityLinkRate = await callCityLinkApiHandler(reqBody, CITYLINK_URL);
    // const jntRate = await callJntApiHandler(reqBody, JT_URL);
    res.status(200).json(cityLinkRate);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
