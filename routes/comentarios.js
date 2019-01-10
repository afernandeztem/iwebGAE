const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const serieDriver = require('../lib/datastore/serie-driver');
const comentarioDriver = require('../lib/datastore/comentarios-driver');


router.use(authMiddleware);


/* GET users listing. */
router.get('/eliminar', async (req, res, next) => {
	const id = req.query.id;
	const emailComentario = await comentarioDriver.getUsuario(id);
	// Obtengo el email del usuario logueado
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	if (emailComentario === email) {
		console.log('PERMISO PARA ELIMINAR COMENTARIO');
		await comentarioDriver.deleteComentario(id);
	}
	res.redirect('/');
});


/* GET users listing. */
router.get('/add', async (req, res, next) => {

	const id = req.query.id;

	// Obtengo el email del usuario para buscarlo en la BD
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	const comentario = {
		titulo: 'pruebaComentario1',
		contenido: 'pruebaComentario1',
		usuario: email,
		idSerie: id
	}

	await comentarioDriver.addComentario(comentario);
	res.redirect('/');
});


module.exports = router;
