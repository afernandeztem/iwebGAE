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


// GET: Add new Comentarios
router.get('/add', (req, res, next) => {
	res.render('addComentario', {
		title: 'Add comentarios',
		id: req.query.id,
		comentario: {}
	});
});


/* GET users listing. */
router.post('/add', async (req, res, next) => {
	// Obtengo la id de la serie a la que va a pertenecer mi comentario
	const id = req.query.id;
	// Obtengo el email del usuario logueado para asociarlo al comentario
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	// Creo un comentario predefinido (hay que hacer un formulario) y le asocio el email y la id de la serie


	const comentario = {
		titulo: req.body.titulo,
		contenido: req.body.contenido,
		idSerie: req.body.idSerie,
		usuario: email
	}


	//try {
	await comentarioDriver.addComentario(comentario);
	res.redirect('/');
	//} catch (e) {
	//	res.redirect('comentarios/add?error=true');
	//}
});



// Editar comentarios
router.get('/edit', async (req, res, next) => {

	const data = req.session.passport;
	const emailUser = data.profile.emails[0].value;
	const idComent = req.query.id;

	if (emailUser !== await comentarioDriver.getUsuario(idComent)) {
		res.render('/', {
			title: 'Edit comentarios',
			intrusion: true
			});
		//throw new Error('ERROR: Estás intentando editar un comentario que no es tuyo >:(');

	} else {



		const tituloComentario = await comentarioDriver.getTitulo(idComent);
		const contenidoComentario = await comentarioDriver.getContenido(idComent);
		const serieIdComentario = await comentarioDriver.getSerieId(idComent);
		res.render('editComentario', {
			title: 'Edit comentarios',
			comentario: {
				id: idComent,
				titulo: tituloComentario,
				contenido: contenidoComentario,
				idSerie: serieIdComentario,
				usuario: emailUser
			}
		});
	}
});

/* Editar comentarios. */
router.post('/edit', async (req, res, next) => {

	// Obtengo el email del usuario logueado para asociarlo al comentario
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	// Creo un comentario predefinido (hay que hacer un formulario) y le asocio el email y la id de la serie



	const comentario = {
		id: req.body.idComent,
		titulo: req.body.titulo,
		contenido: req.body.contenido,
		idSerie: req.body.idSerie,
		usuario: req.body.usuario
	}

	console.log("POST IDCOMENT: " + comentario.id);
	//try {
	await comentarioDriver.editComentario(comentario);
	res.redirect('/');
	//} catch (e) {
	//	res.redirect('comentarios/add?error=true');
	//}
});


module.exports = router;
