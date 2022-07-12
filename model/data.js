const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('blogs', Schema);