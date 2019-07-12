process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

describe("/api", () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  it("GET status 405, method not allowed", () => {
    return request(app)
      .get("/api")
      .expect(405)
      .then(res => {
        expect(res.body.msg).to.equal("Method is not allowed");
      });
  });
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
    it("PUT/DELETE status 405, Will respond with an Invalid method message ", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("Method is not allowed");
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
            expect(res.body.user).to.eql({
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            });
            expect(res.body.user).to.contain.keys(
              "username",
              "name",
              "avatar_url"
            );
            expect(res.body.user.username).to.equal("butter_bridge");
          });
      });
      it("GET 404, when given an username not found", () => {
        return request(app)
          .get("/api/users/notAName")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Not Found");
          });
      });
    });
  });

  describe("/articles", () => {
    it("GET 200, responds with an array of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[1]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("GET 200, will be sorted with a client query with valid column ", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sorted("author");
        });
    });
    it("GET 200 status, will be be sorted with client query ascending ", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles[1].created_at < res.body.articles[2]).to.be
            .true;
        });
    });
    it("GET 200 status, responds with an array of articles in descending and sort_by date as default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(
            res.body.articles[1].created_at >= res.body.articles[2].created_at
          ).to.be.true;
        });
    });
    it("GET 200 status, responds with  all articles from a requested author", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].author).to.equal("icellusedkars");
        });
    });
    it("GET 200 status, responds with all articles from a requested topic ", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].topic).to.equal("mitch");
        });
    });

    it("GET 404 status, responds with not found as topic does not exist", () => {
      return request(app)
        .get("/api/articles?topic=not-a-topic")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Not Found");
        });
    });

    it("GET 404 Status, responds with an invalid message whe author is not found", () => {
      return request(app)
        .get("/api/articles?author=not-an-author")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Not Found");
        });
    });

    it("PUT/DELETE 405, will respond with an invalid method message", () => {
      return request(app)
        .delete("/api/articles")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("Method is not allowed");
        });
    });
    it("GET status 400 bad request, sort_by column name does not exist", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Invalid query");
        });
    });

    describe("/:article_id", () => {
      it("GET 200, responds with the requested article using article_id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.contain.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(res.body.article.article_id).to.equal(1);
          });
      });
      it("POST 201, posts a new comment by article ID", () => {
        const newComment = { username: "butter_bridge", body: "hello world" };
        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(201)
          .then(res => {
            expect(res.body.comment.author).to.equal("butter_bridge");
            expect(res.body.comment.comment_id).to.equal(19);
          });
      });
      it("POST 201, post new comment by article_id with a successful POST message", () => {
        const newComment = {
          username: "butter_bridge",
          body: "This is a successful post"
        };
        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal("Successful Post");
          });
      });

      it("GET for an invalid article_id - status 400 Bad Request with error message", () => {
        return request(app)
          .get("/api/articles/notAnId")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid ID");
          });
      });
      it("GET for no existent article - status 404 item not found", () => {
        return request(app)
          .get("/api/articles/9999")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Not Found");
          });
      });
      it("PATCH 200, add required votes and update", () => {
        const vote = 1;
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: vote })
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it("PATCH 200, decrements the current article vote count ", () => {
        const vote = -100;
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: vote })
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(0);
          });
      });

      describe("/comments", () => {
        it("GET Status 200, respond with an array of comments when given an article_id", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              expect(res.body.comments).to.be.an("array");
              expect(res.body.comments[0].article_id).to.equal(1);
            });
        });

        it("GET 200 status, responds with an array of articles in descending and sort_by date as default", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              expect(
                res.body.comments[1].created_at >=
                  res.body.comments[2].created_at
              ).to.be.true;
            });
        });
        it("GET Status 200, responds with objects sorted by votes ", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes")
            .expect(200)
            .then(res => {
              expect(res.body.comments).to.be.sorted("votes");
            });
        });
        it("GET Status 200, array of comments sorted in ascending order ", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(res => {
              expect(
                res.body.comments[1].created_at >
                  res.body.comments[2].created_at
              ).to.be.true;
            });
        });
        it("POST 400, Bad Request with error message", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send()
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.eql("Bad Request");
            });
        });
        it("POST 422, invalid article ID does not exist ", () => {
          return request(app)
            .post("/api/articles/1000/comments")
            .send({
              username: "butter_bridge",
              body:
                "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
            })
            .expect(422)
            .then(res => {
              expect(res.body.msg).to.eql("Does Not Exist");
            });
        });
      });
    });
  });

  describe("/comments", () => {
    describe("/:comment_id", () => {});
    it("DELETE status 204, when provided a valid id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
    it("DELETE status 404, when provided a valid id number but id does not exist ", () => {
      return request(app)
        .delete("/api/comments/999")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Not Found");
        });
    });
    it("PATCH 200, add required votes and update", () => {
      const vote = 1;
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: vote })
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(17);
        });
    });
    it("PATCH 404, not found when PATCH contains invalid comment_id", () => {
      return request(app)
        .patch("/api/comments/1000")
        .send()
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Not Found");
        });
    });
  });
});
