const express = require("express");
const cors = require("cors");
const pollsRouter = require("./routes/polls");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/polls", pollsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
