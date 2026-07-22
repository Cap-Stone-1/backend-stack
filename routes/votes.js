const express = require("express");
const router = express.Router();
const { Vote, Option } = require("../models");


// Create a vote
router.post("/", async (req, res) => {
  try {
    const { optionId } = req.body;

    // Check option exists
    const option = await Option.findByPk(optionId);

    if (!option) {
      return res.status(404).json({
        error: "Option not found"
      });
    }

    // Create vote
    const vote = await Vote.create({
      optionId
    });

    res.status(201).json(vote);

  } catch (err) {
    res.status(400).json({
      error: "Could not create vote"
    });
  }
});


module.exports = router;