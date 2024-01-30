const express = require('express');
const signup = require('../controller/auth_controller');
const routes = express.Router();

routes.post('/signup', signup );

module.exports = routes;