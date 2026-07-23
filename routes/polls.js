const express = require("express");
const { Poll, Option, Vote } = require("../models");
const router = express.Router();

// get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/", async (req, res) => {
  try {
    //take these from req body 
    const { title, description, options } = req.body;

    //before sending, check a title, options, and options length was provided
    if (!title || !Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ error: "title and at least 2 options are required" });
    }

    //now, create the poll and send to database
    //  (only title and description bc in poll table only these exist)
    const poll = await Poll.create({ title, description });

    //now, loop through the options provided
    for (const text of options) {
      //for each text provided, create one option and send to Options table(database)
      await Option.create({ text: text, pollId: poll.id });
      // indlude poll id so it knows to which poll it belongs to
    }
    //poll post request, so no need to return info info created for options
    // BUT options will show up when a get request is made
    res.status(201).json({
      id: poll.id,
      title: poll.title,
      description: poll.description,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    //get id, include option and votes
    const poll = await Poll.findByPk(req.params.id, {
      include: { model: Option, include: Vote },
    });
    
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

   //make sure to display properly(not really neccesary?) 
    const options = poll.Options.map((option) => {
      return {
        id: option.id,
        text: option.text,
        voteCount: option.Votes.length,
      };
    });

    //return poll and options
    res.json({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      //options contains votes so no need to add
      options: options,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





//request the votes
router.post("/:id/vote", async (req, res) => {
  try {
    //take id from the option in req.body
    const { optionId } = req.body;

    //insiude option, find id and poll id
    const option = await Option.findOne({
      where: { id: optionId, pollId: req.params.id },
    });

    if (!option) {
      return res
        .status(404)
        .json({ error: "Option not found for this poll" });
    }

    //create the vote based on option id
    const vote = await Vote.create({ optionId: option.id });
    //return
    res.status(201).json(vote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;