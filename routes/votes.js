const express = require("express")
const router = express.Router()
const {Options, Votes} = require("../models")


router.get("/:optionId", async (req, res) => {
    const votes = await Votes.findAll({
        where: {
            optionId: req.params.optionId
        }
    })
    res.json(votes)

})

module.exports = router