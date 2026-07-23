const express = require("express");
const cors = require("cors");
const pollsRouter = require("./routes/polls");

const app = express();

// Without this, a browser blocks every request from the React frontend, since
// it runs on a different port/domain than this server (that's what CORS means).
app.use(cors());

// Lets us read JSON request bodies as req.body (needed for POST /polls, POST /vote).
app.use(express.json());

// Simple route to confirm the server is up, not part of the assignment spec.
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Every route in routes/polls.js is relative to this prefix, e.g. router.get("/:id")
// actually becomes GET /polls/:id once mounted here.
app.use("/polls", pollsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
