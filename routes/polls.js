const express = require("express");
const { Poll, Option, Vote } = require("../models");

const router = express.Router();

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
    const { title, description, options } = req.body;

    if (!title || !Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .json({ error: "title and at least 2 options are required" });
    }

    const poll = await Poll.create(
      {
        title,
        description,
        Options: options.map((text) => ({ text })),
      },
      { include: Option }
    );

    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id, {
      include: { model: Option, include: Vote },
    });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const result = poll.toJSON();
    result.Options = result.Options.map(({ Votes, ...option }) => ({
      ...option,
      voteCount: Votes.length,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { optionId } = req.body;

    const option = await Option.findOne({
      where: { id: optionId, pollId: req.params.id },
    });

    if (!option) {
      return res
        .status(404)
        .json({ error: "Option not found for this poll" });
    }

    const vote = await Vote.create({ optionId: option.id });
    res.status(201).json(vote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
