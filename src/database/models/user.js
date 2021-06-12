
const mongoose = require('mongoose');
let { Document, Schema } = require('mongoose')
const UserSchema = new Schema({
    mineNick: {
        type: String,
        unique: true,
        require: true
    },
    discordId: {
        type: String,
        require: false,
        default: ""
    },
    Allseconds: {
        type: Number,
        default: 0
    },
    Weekseconds: {
        type: Number,
        default: 0
    },
    dayseconds: {
        type: Number,
        default: 0
    },
    maxLvl:{
        type: Number,
        default: 0
    },
    lvl:{
        type: Number,
        default: 0
    },
    maxScore:{
        type: Number,
        default: 0
    },
    score:{
        type: Number,
        default: 0
    },
    maxAlive:{
        type: Number,
        default: 0
    },
    alive:{
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('User', UserSchema)