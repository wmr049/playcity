'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    music: {
        type: String,
        trim: true     
    },
    artist: {
        type: String,
        trim: true
    },
    genre: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model('Music', schema);