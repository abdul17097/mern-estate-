const express = require('express');
const test = require('../controller/user_controller');

const routes = express.Router();

routes.get('/test', test)

module.exports = routes;

