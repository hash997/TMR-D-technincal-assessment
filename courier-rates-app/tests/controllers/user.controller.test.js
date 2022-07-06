const request = require("supertest");
const server = require("../../app");
const testHelpers = require("../helpers/utils");
// const app = require("../../app");

const users = [
  { name: "testUser1", password: "123", role: "normal" }, // should pass as it exists in db
  { name: "name", password: "pass", role: "normal" }, // should not exit as it not exit in db
];

describe("/POST login", () => {
  // afterEach(() => app.close());

  it("should login", async () => {
    const body = {
      name: users[0].name,
      password: users[0].password,
    };
    const res = await testHelpers.withLogin(
      request(server).post("/login").send(body)
    );
    expect(200);
  });

  it("should not login because of unexisting user", async () => {
    const body = {
      name: users[1].name,
      password: users[1].password,
    };
    const res = await testHelpers.withLogin(
      request(server).post("/login").send(body)
    );
    expect(401);
    expect(res.body).toEqual({
      success: false,
      error: "Can't authenticate",
    });
  });
});
