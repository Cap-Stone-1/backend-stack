const express = require("express")
const router = express.Router()
const { Polls, Options, Votes} = require("../models")

//get all polls
router.get("/", async (req, res) => {
    const polls = await Polls.findAll()
    console.log(polls)
    res.json(polls)
})

//poll by id
router.get("/:id", async (req, res) => {
    const poll = await Polls.findByPk(req.params.id, {
        include: Options
    })
    if(!poll) return res.status(404).json({ error: "Poll not found"})
    res.json(poll)
})

//create one poll
router.post("/", async(req, res) => {
    const poll = await Polls.create(req.body)
    res.status(201).json(poll)
    
})


module.exports = router

