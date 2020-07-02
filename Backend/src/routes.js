const express = require('express');

const Indicators = require('./controllers/IndicatorsController');
const Leitos = require('./controllers/LeitosController');

const routes = express.Router();

routes.get('/indicators', Indicators.graphics);
routes.get('/leitos',Leitos.graphics);


module.exports = routes;