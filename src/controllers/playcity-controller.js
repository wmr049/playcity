'use strict';

const repository = require('../repositories/music-repositorie')
const service = require('../services/playcity-service')

exports.get = async (req, res, next) => {

    try {                
        var data = await service.getMusicsByTemp(req.params.city);
        
        data ? res.status(200).send(data) : res.status(404).send({message: 'Playlist não encontrada'});

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + error
        });
    }
}
