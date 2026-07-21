//associations

const Polls = require('./Polls')
const Options = require('./Options')
const Votes = require('./Votes')

Polls.hasMany(Options)
Options.belongsTo(Polls)

Options.hasMany(Votes)
Votes.belongsTo(Options)

module.exports = {
    Polls,
    Options,
    Votes
}