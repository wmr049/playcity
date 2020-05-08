
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.post('/login', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;