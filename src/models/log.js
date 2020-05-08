'use strict';
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    city: {
        type: String,
        trim: true
    },
    temperature : {
        type: String,
        trim: true        
    },

    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', schema);
