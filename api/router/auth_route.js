const express = require('express');
const {signup, signin, google} = require('../controller/auth_controller');
const routes = express.Router();

routes.post('/signup', signup );
routes.post('/signin', signin );
routes.post ('/google', google);
module.exports = routes;