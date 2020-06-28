const express = require('express');
const {celebrate, Segments , Joi} = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs',OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        city: Joi.string().required(),
        province:Joi.string().required().max(2)
    })
}),OngController.create);
routes.post('/incidents',IncidentController.create);
routes.get('/incidents',celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index);
routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        aut: Joi.string().required()
    }).unknown(),
}),ProfileController.index);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete);
routes.post('/session',SessionController.create);


module.exports = routes;