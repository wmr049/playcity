'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/log-repositorie')
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');


exports.logsGroupCity = async (req, res, next) => {

    try {
        var data = await repository.logsGroupCity();

        data ? res.status(200).send(data) : res.status(404).send({message: 'Logs não encontrado'});
        
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição  -  ' + error
        });
    }
}