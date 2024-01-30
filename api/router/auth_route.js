const express = require('express');
const {signup, signin} = require('../controller/auth_controller');
const routes = express.Router();

routes.post('/signup', signup );
routes.post('/signin', signin );

module.exports = routes;