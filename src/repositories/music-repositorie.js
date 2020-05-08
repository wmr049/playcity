'use strict';
const mongoose = require('mongoose');
const Music = mongoose.model('Music');

exports.searchMusic = async(genre) => {    

    var rand = Math.floor(Math.random() * 100);

    const res = await Music
    .find({genre : genre}, {_id:0})    
    .skip(rand)
    .limit(10);
    return res;
}
