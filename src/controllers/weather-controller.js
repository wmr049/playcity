'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/log-repositorie')
const client = require('../clients/openweather-client')

exports.get = async (req, res, next) => {

    try {        
        var data = await client.getWeatherByCity(req.params.city);
        data ? res.status(200).send(data) : res.status(404).send({message: 'Cidade não encontrada'});
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}



