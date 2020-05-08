'use strict';
const mongoose = require('mongoose');
const Log = mongoose.model('Log');


exports.criarlog = async(data) => {
    var log = new Log(data);
    await log.save();
}

exports.buscarlog = async(id) => {
    const res = await Log.findById(id);
    return res;
}

exports.logsGroupCity = async() => {

    const res = await Log.aggregate([
        {
            $group: {
                "_id": "$city",
                total: {$sum: 1}
           }
       }
     ]);

    return res;
}

exports.deletarlog = async(id) => {
    await Log
        .findOneAndRemove(id);
}

exports.esconderlog = async(id) => {
    await Log    
        .findByIdAndUpdate(id, {
            $set: {
                active: false
            }
        })
}
