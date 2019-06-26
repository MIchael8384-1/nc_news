process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");

//chai.use(chaiSorted);

describe.only("/api", () => {
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
  describe("/users", () => {
    describe("/:username", () => {
      it("GET 200; responds with a single item object when passed a param", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.user[0]).to.eql({
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            });
            expect(res.body.user[0]).to.contain.keys(
              "username",
              "name",
              "avatar_url"
            );
            expect(res.body.user[0].username).to.equal("butter_bridge");
          });
      });
    });
  });
  describe("/article", () => {
    it("GET 200, Responds with all articles", () => {
      return request(app).get;
    });
  });
});
