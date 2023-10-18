const request = require("supertest");
const app = require("../app");
const { User, Photo } = require("../models");

const { generateToken } = require("../helpers/jwt")

// test api register
describe("POST /users/register", () => {

  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });
  
  // succsess test
  it("Should be response 201", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.body.username).toEqual("admin");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        done();
      });
  });

  // error response
  it("Should be response 500", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(500)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });

});

// login
describe("POST /users/login", () => {
  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const result = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("Should response 200", (done) => {
    request(app)
      .post("/users/login")
      .set({
        access_token: "sdasdasds"
      })
      .send({
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("access_token");
        done();
      });
  });
});


describe("Get all photos", () => {

  let token
  let id

  beforeAll(async() => {
    try {
      const user = await User.create({
        username: "asdas",
        email: "dasdas",
        password: "dsadasd"
      });
  
      token = generateToken({
        id: user.id,
        email: user.email,
        username: user.username
      })

      const photo = await Photo.create({
        title: "dsdas"
        caption: "dasdas",
        image_url: "dasdasdas",
        UserId: user.id
      })
  
      id = photo.id

    } catch (error) {
      console.log(error);
    }
    }
  )

  it("Should response 200", (done) => {
    request(app)
    .get("/photos")
    .set({
      access_token: token
    })
    .expect(200)
  })

  it("Should response 200", (done) => {
    request(app)
    .get("/photos/" + id)
    .set({
      access_token: token
    })
    .expect(200)
  })


  afterAll(() => {
    // destroy photo
    // destroy user
  })


 
})
