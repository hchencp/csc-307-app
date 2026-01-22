import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: ["Janitor"],
    },
    {
      id: "abc123",
      name: "Mac",
      job: ["Bouncer"],
    },
    {
      id: "ppp222",
      name: "Mac",
      job: ["Professor"],
    },
    {
      id: "yat999",
      name: "Dee",
      job: ["Aspring actress"],
    },
    {
      id: "zap555",
      name: "Dennis",
      job: ["Bartender"],
    },
  ],
};

// --- HELPER FUNCTIONS ---

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"].includes(job),
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  if (!Array.isArray(user.job)) {
    user.job = [user.job];
  }
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};

const addJobToUser = (id, newJob) => {
  const user = findUserById(id);
  if (user) {
    if (!user.job.includes(newJob)) {
      user.job.push(newJob);
    }
    return user;
  }
  return false;
};

// --- ROUTES ---

app.use(express.json());

app.get("/", (req, res) => {
  res.send("was gud!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.post("/users/:id/job", (req, res) => {
  const id = req.params["id"];
  const newJob = req.body.job;

  if (newJob && addJobToUser(id, newJob)) {
    res.status(200).send(findUserById(id));
  } else {
    res.status(404).send("User not found or job missing.");
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  if (deleteUser(id)) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
