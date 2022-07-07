// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Rates API",
      description:
        "This is a sample server, courier Rates server For this sample, you need to migrate the db first in order to test the server. For the full test, you need to run the server with the --test flag. The test will run against the test db, and will drop the test db when it is done.",
      contact: {
        name: "Elhashmi",
      },
      servers: ["http://localhost:8000"],
    },
    tags: [
      {
        name: "Authentication",
        description: "Authentication api",
      },
      {
        name: "Rates",
        description: "Rates API",
      },
    ],
    schemas: {
      user: {
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
        },
      },
    },
    paths: {
      "/login": {
        post: {
          tags: ["Authentication"],
          summary:
            "Authenticae user by providing user name and password in request body",
          description: "",
          operationId: "login",
          parameters: [
            {
              in: "body",
              name: "body",
              description:
                "user name and password object to be used to authenticate",
              required: true,
              schema: {
                $ref: "#/definitions/login",
              },
            },
          ],
          responses: {
            200: {
              description: "Authenticated user",
            },
          },
        },
      },
      "/rates": {
        post: {
          tags: ["Rates"],
          summary: "Get rates from couriers",
          description: "",
          operationId: "rate",
          parameters: [
            {
              in: "body",
              name: "body",
              description:
                "Input details object that needs to be used to get rates",
              required: true,
              schema: {
                $ref: "#/definitions/ratesReqBodyInput",
              },
            },
          ],
          security: [
            {
              BearerAuth: [
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoidGVzdFVzZXIxIn0sImlhdCI6MTY1NzE1NDk4MX0.CZoBUNBEn9nMrxtup4zmWvVhDaqqCmZpw-2WFOzy3Jw",
              ],
            },
          ],
          responses: {
            200: {
              description: "sucess",
            },
          },
        },
      },
      "/jnt": {
        post: {
          tags: ["Rates"],
          summary: "Get rates from JNT",
          description: "",
          operationId: "jnt",
          parameters: [
            {
              in: "body",
              name: "body",
              description:
                "Input details object that needs to be used to get rates",
              required: true,
              schema: {
                $ref: "#/definitions/ratesReqBodyInput",
              },
            },
          ],
          responses: {
            200: {
              description: "sucess",
            },
          },
        },
      },
    },

    securityDefinitions: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    definitions: {
      login: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      ratesReqBodyInput: {
        type: "object",
        properties: {
          origin_country: {
            type: "string",
            description: "e.x. MY",
          },
          destination_country: {
            type: "string",
            description: "e.x. MY",
          },
          origin_state: {
            type: "string",
            description: "e.x. Selangor",
          },
          destination_state: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },

          origin_postcode: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },
          destination_postcode: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },

          length: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },
          width: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },
          height: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },

          parcel_weight: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },

          type: {
            type: "string",
            description: "e.x. Kuala Lumpur",
          },
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;
