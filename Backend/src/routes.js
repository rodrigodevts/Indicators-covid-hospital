const express = require('express');

const Indicators = require('./controllers/IndicatorsController');

const routes = express.Router();

routes.get('/indicators', Indicators.graphics);


module.exports = routes;