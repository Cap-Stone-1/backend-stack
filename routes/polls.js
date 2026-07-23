const express = require("express");
const { Poll, Option, Vote } = require("../models");

// A Router is a mini Express app that only handles /polls routes. It gets
// attached to the real app in app.js via app.use("/polls", router).
const router = express.Router();

// GET /polls — list every poll
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /polls — create a poll along with its options
router.post("/", async (req, res) => {
  try {
    const { title, description, options } = req.body;

    // Enforces the assignment's rule: a poll needs a title and 2+ options.
    if (!title || !Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ error: "title and at least 2 options are required" });
    }

    // Create the parent (Poll) first so we have its id.
    const poll = await Poll.create({ title, description });

    // Then create one Option row per string the frontend sent, each pointing back at this poll via pollId.
    for (const text of options) {
      await Option.create({ text: text, pollId: poll.id });
    }

    // 201 = "something new was created"
    res.status(201).json({
      id: poll.id,
      title: poll.title,
      description: poll.description,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /polls/:id — one poll, with each option's vote count
router.get("/:id", async (req, res) => {
  try {
    // findByPk = find by primary key (the :id from the URL).
    // include tells Sequelize: also fetch this poll's options, and for each
    // option, also fetch its votes — all in one query instead of three.
    const poll = await Poll.findByPk(req.params.id, {
      include: { model: Option, include: Vote },
    });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Build a plain response array: for each option, count how many vote rows
    // point at it. That count IS the vote count — no special math needed.
    const options = poll.Options.map((option) => {
      return {
        id: option.id,
        text: option.text,
        voteCount: option.Votes.length,
      };
    });
    res.json({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: options,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /polls/:id/vote — cast a vote for one option
router.post("/:id/vote", async (req, res) => {
  try {
    const { optionId } = req.body;

    // Scoped lookup: the option must have this id AND belong to the poll in
    // the URL. This stops someone from voting with an optionId that actually
    // belongs to a different poll.
    const option = await Option.findOne({
      where: { id: optionId, pollId: req.params.id },
    });

    if (!option) {
      return res
        .status(404)
        .json({ error: "Option not found for this poll" });
    }

    // Creating this row IS the vote — nothing else has to happen.
    const vote = await Vote.create({ optionId: option.id });
    res.status(201).json(vote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
