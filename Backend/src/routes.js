const express = require('express');

const Indicators = require('./controllers/IndicatorsController');

const routes = express.Router();

routes.get('/', Indicators.graphics);


module.exports = routes;