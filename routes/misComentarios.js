const express = require('express');
const router = express.Router();
const serieDriver = require('../lib/datastore/serie-driver');
const userDriver = require('../lib/datastore/user-driver');
const comentarioDriver = require('../lib/datastore/comentarios-driver');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/misComentarios', async (req, res, next) => {

    //obtengo el usuario de la sesion
    const data = req.session.passport;
    const email = data.profile.emails[0].value;

	//obtengo las series que corresponden al usuario
    const misComentarios = await comentarioDriver.getComentariosUsuario(email);

	// Las muestro en series.jade
	res.render('misComentarios', {
        Comentarios: misComentarios ? misComentarios : []
    });
});

module.exports = router;
