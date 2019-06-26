process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");

//chai.use(chaiSorted);

describe("/api", () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  describe("/topics", () => {
    it("GET status 200; Will respond with an array of all topics with the correct properties ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
  describe.only("/users", () => {
    describe("/:username", () => {
      it("GET status 200; Will respond with an array with the requested users details", () => {
        return request(app)
          .get("/api/users")
          .expect(200);
      });
    });
  });
});
