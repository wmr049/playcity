'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/log-controller');
const authService = require('../services/auth-service');

router.get('/logsGroupCity', authService.authorize, controller.logsGroupCity);

module.exports = router;
