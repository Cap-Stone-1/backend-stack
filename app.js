const express = require ('express');
const app = express();
//load env variable
//shoukd go before, so it runs on db
require("dotenv").config();
const db = require("./db")
const {Poll, Option, Vote} = require("./models")
const port = process.env.PORT || 4000;
const pollRouter = require("./routes/polls")
const voteRouter = require("./routes/votes")

// app.use(cors())


app.use(express.json())
app.use("/routes/polls", pollRouter);
app.use("/routes/votes", voteRouter);



app.get('/', (req, res) => {
  res.send("main");
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