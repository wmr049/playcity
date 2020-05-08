'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repositorie')
const md5 = require('md5');
const authService = require('../services/auth-service');

const emailService = require('../services/email-service');

exports.put = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {                
        var data = await repository.put(req.params.id, req.body);
        this.authenticate(req, res, next);
        
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }

}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            cpf: req.body.cpf,
            roles: ["user"]
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao PlayCity',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        this.authenticate(req, res, next);

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            roles: user.roles
        });

        res.status(201).send({
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    cpf: user.cpf,
                    roles: user.roles
                },
                token: token
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            roles: user.roles
        });

        res.status(201).send({
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    cpf: user.cpf,
                    roles: user.roles
                },
                token: token
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};