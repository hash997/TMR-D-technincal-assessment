const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const constants = require("../../constants");
const models = require("../../models");
const rateRequestBodyInput = require("./requestBodyInput");
const { Rate, User } = models;

const users = [
  { name: "testUser1", password: "123", role: "normal" },
  { name: "testUser2", password: "321", role: "normal" },
];

const _buildCityLinkRequestBody = (inputData) => {
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

const _generateUsers = () => {
  return Promise.map(users, async (user) => {
    return User.findOrCreate({
      where: {
        name: user.name,
        password: user.password,
        role: user.role,
      },
    }).get(0);
  });
};

const _getOneRandomUser = async () => {
  await _generateUsers();
  return User.findOne({ order: [Sequelize.fn("RAND")] });
};

module.exports = {
  cleanDatabase: () =>
    Promise.all(
      Object.keys(models).map((key) => {
        if (["sequelize", "Sequelize"].includes(key)) return null;
        return models[key].destroy({ where: {}, force: true });
      })
    ),

  buildCityLinkRequestBody: () =>
    _buildCityLinkRequestBody(rateRequestBodyInput[0]),
  getOneRandomUser: () => _getOneRandomUser(),
  generateUsers: () => _generateUsers(),
  getRates: async () => {
    const cityLinkReqBodyInput = _buildCityLinkRequestBody(
      rateRequestBodyInput[0]
    );
    const user = await _getOneRandomUser();

    const [error, rate] = await to(
      axios.post(constants.CITYLINK_URL, inputData)
    );

    Rate.create({
      id: JSON.stringify(rateRequestBodyInput[0]),
      rates: { courier: "citylink", rate: rate.data.req.data.rate },
    });
  },
  withLogin: async (req, user = { name: "testUser1", password: "123" }) => {
    const newUser = await User.findOrCreate({
      where: { name: user.name, password: user.password },
    });
    const authToken = jwt.sign({ user: newUser }, "your_jwt_sescret");
    return req.set("Authorization", `Bearer ${authToken}`);
  },
};
