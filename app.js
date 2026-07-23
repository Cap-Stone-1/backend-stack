const express = require('express');
const cors = require("cors");
const app = express();
//load env variable
require("dotenv").config();
const db = require("./db")
const {Poll, Option, Vote} = require("./models")
const port = process.env.PORT || 4000;
const pollRouter = require("./routes/polls")


app.use(cors())
app.use(express.json())
app.use("/api/polls", pollRouter);


app.get('/', (req, res) => {
  res.send("Polling App Main");
});

db.sync() 
  .then(() => {
    console.log('DB is synced with our app')
    
    app.listen(port, () => { 
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((er) => {
    console.log('Failed to sync to the DB')
    console.log('Error', er)
  })
