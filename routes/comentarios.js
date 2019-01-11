const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const serieDriver = require('../lib/datastore/serie-driver');
const comentarioDriver = require('../lib/datastore/comentarios-driver');


router.use(authMiddleware);


/* GET users listing. */
router.get('/eliminar', async (req, res, next) => {
	// Obtengo la id del comentario a eliminar
	const id = req.query.id;
	// Obtengo el email del usuario que ha creado el comentario
	const emailComentario = await comentarioDriver.getUsuario(id);
	// Obtengo el email del usuario logueado
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	// Si el usuario logueado es propietario del comentario
	if (emailComentario === email) {
		console.log('PERMISO PARA ELIMINAR COMENTARIO');
		// Elimino el comentario
		await comentarioDriver.deleteComentario(id);
	}
	res.redirect('/');
});


/* GET users listing. */
router.get('/add', async (req, res, next) => {
	// Obtengo la id de la serie a la que va a pertenecer mi comentario
	const id = req.query.id;
	// Obtengo el email del usuario logueado para asociarlo al comentario
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	// Creo un comentario predefinido (hay que hacer un formulario) y le asocio el email y la id de la serie
	const comentario = {
		titulo: 'pruebaComentario1',
		contenido: 'pruebaComentario1',
		usuario: email,
		idSerie: id
	}

	// Añado el comentario
	await comentarioDriver.addComentario(comentario);
	res.redirect('/');
});


module.exports = router;
