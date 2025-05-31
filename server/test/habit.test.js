require('dotenv').config();


const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Express app
const mongoose = require("mongoose");
const Habit = require("../models/Habit");

chai.use(chaiHttp);
const { expect } = chai;

describe("Habit API", () => {
  let token = "";
  let createdHabitId = "";

  before(async () => {
    token = process.env.TEST_FIREBASE_TOKEN; 
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await Habit.deleteMany({});
    await mongoose.connection.close();
    // await mongoose.disconnect();
  });

  it("should create a new habit", async () => {
    const res = await chai.request(app)
      .post("/api/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Habit",
        description: "Testing habit creation",
        frequency: "daily",
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("title", "Test Habit");
    createdHabitId = res.body._id;
  });

  it("should get all habits", async () => {
    const res = await chai.request(app)
      .get("/api/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  it("should update a habit", async () => {
    const res = await chai.request(app)
      .put(`/api/habits/${createdHabitId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Habit" });

    expect(res).to.have.status(200);
    expect(res.body.title).to.equal("Updated Habit");
  });

  it("should delete a habit", async () => {
    const res = await chai.request(app)
      .delete(`/api/habits/${createdHabitId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message");
  });
});
