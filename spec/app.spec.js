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
  // describe("/articles", () => {
  //   it("GET 200, Responds with all articles", () => {
  //     return request(app)
  //       .get("/api/articles")
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.articles).to.be.an("array");
  //       });
  //   });
  // });
  describe("/:article_id", () => {
    it("GET 200, responds with the requested article using article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          expect(res.body.article[0]).to.contain.keys(
            "article_id",
            "title",
            "topic",
            "author",
            "body",
            "created_at",
            "votes",
            "comments_count"
          );
          expect(res.body.article[0].article_id).to.equal(1);
        });
    });
    describe("/comments", () => {
      it("GET 200, respond with an array of comments when given an article_id", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(res => {
            console.log(res.body);
            expect(res.body.article[0]).to.be.an("array");
          });
      });
    });
  });
});
