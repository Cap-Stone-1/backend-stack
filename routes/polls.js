const express = require("express");
const router = express.Router();
const { Poll, Option } = require("../models");

// get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "No polls"});
  }
});


// Get one poll with its options
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id, {
      include: Option
    });

    if (!poll) {
      return res.status(404).json({
        error: "Poll not found"
      });
    }
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: "No polls" });
  }
})



router.post("/", async (req, res) => {
  try {
    const { title, description, options } = req.body;

    if (!title || !Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ error: "title and at least 2 options are required" });
    }

    const poll = await Poll.create({ title, description });

    for (const text of options) {
      await Option.create({ text: text, pollId: poll.id });
    }

    res.status(201).json({
      id: poll.id,
      title: poll.title,
      description: poll.description,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;