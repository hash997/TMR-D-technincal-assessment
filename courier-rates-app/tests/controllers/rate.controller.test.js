const request = require("supertest");
const server = require("../../app");
const testHelpers = require("../helpers/utils");

const rateRequestBodyInput = require("../helpers/requestBodyInput");
const rateRequestBodyInputWithTypo = require("../helpers/reqBodyInputWithTypo");

describe("Rates", () => {
  describe("/POST rates", () => {
    it("should not get and cache rates in db when not authorized", async () => {
      const body = rateRequestBodyInput[0];
      const res = await request(server).post("/rates").send(body);
      expect(402);
    });

    it("should not get and cache rates in db when submitting invalid input values", async () => {
      const body = rateRequestBodyInputWithTypo[0];

      const user = {
        name: "testUser1",
        password: "123",
      };
      const authRes = await testHelpers.withLogin(
        request(server).post("/login").send(user)
      );

      const res = await request(server)
        .post("/rates")
        .set({
          Authorization: `Bearer ${authRes.body.token}`,
          "Content-Type": "application/json",
        })
        .send(body);
      expect(422);
    });

    it("should GET and CACHE rates in db when submitting", async () => {
      const body = rateRequestBodyInput[0];

      const user = {
        name: "testUser1",
        password: "123",
      };
      const authRes = await testHelpers.withLogin(
        request(server).post("/login").send(user)
      );

      const res = await request(server)
        .post("/rates")
        .set({
          Authorization: `Bearer ${authRes.body.token}`,
          "Content-Type": "application/json",
        })
        .send(body);
      expect(200);
    });
  });
});
