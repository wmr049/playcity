'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/playcity-controller');
const authService = require('../services/auth-service');

router.get('/:city', authService.authorize, controller.get);

module.exports = router;
