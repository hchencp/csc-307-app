import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// 1. Setup MongoDB Connection
mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING + "users") // Connect to the "users" database
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// 2. Updated Routes to use the Database

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET users (with optional name/job filters)
app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];

  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// POST a new user
app.post("/users", async (req, res) => {
  const user = req.body;
  try {
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await userServices.deleteUser(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.status(204).end(); // 204 means "No Content" (successful deletion)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
