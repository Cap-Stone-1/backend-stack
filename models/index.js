//associations

const Poll = require('./Polls')
const Option = require('./Options')
const Vote = require('./Votes')

Poll.hasMany(Option)
Option.belongsTo(Poll)

Option.hasMany(Vote)
Vote.belongsTo(Option)

module.exports = {
    Poll,
    Option,
    Vote
}