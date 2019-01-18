const express = require('express');
const router = express.Router();
const entregaDriver = require('../lib/datastore/entrega-driver');
const serieDriver = require('../lib/datastore/serie-driver');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

/* GET users listing. */
router.get('/', async (req, res, next) => {

	//obtengo el usuario de la sesion
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	const emailUser = data.profile.emails[0].value;

	const misEntregas = await entregaDriver.getEntregasUsuario(email);

	res.render('entregas', {
		entregas: misEntregas ? misEntregas : [],
		emailUsuario: emailUser
	});
});

/* GET users listing. */
router.post('/buscar', async (req, res, next) => {
	// Obtengo el email del usuario logueado
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	const parametro = req.body.parametro;

	console.log(parametro);

	const entregas = await entregaDriver.getEntregaByParam(parametro.toLowerCase().replace(/\s/g, ""), email);

	console.log(entregas);
	// Las muestro en series.jade
	res.render('entregas', {
		entregas: entregas ? entregas : []
	});
});

router.get('/eliminar', async (req, res, next) => {
	//id de la serie
	const id = req.query.id;
	// Obtengo el email del usuario que ha creado la serie
	const emailEntrega = await entregaDriver.getUsuarioEntrega(id);

	const data = req.session.passport;

	//obtengo el id de la serie con el id de la entrega
	const idSerie = await entregaDriver.getSerieEntrega(id);

	const email = data.profile.emails[0].value;
	if (emailEntrega === email || email === 'pruebaparaingweb@gmail.com') {
		console.log('PERMISO PARA ELIMINAR ENTREGA');
		await entregaDriver.deleteEntrega(id);
	}


	res.redirect('/series/entregas?id=' + idSerie);
});

router.get('/add', async (req, res, next) => {
	const idSerie = req.query.id;
	//obtengo el email del que esta en sesion
	const data = req.session.passport;
	const email = data.profile.emails[0].value;

	let error = false;
	const usuarioSerie = await serieDriver.getUsuarioSerie(idSerie);

	if (email !== usuarioSerie && email !== 'pruebaparaingweb@gmail.com') {
		error = true;
	}

	res.render('addEntrega', {
		title: 'Add entrega',
		id: idSerie,
		entrega: {},
		error: error
	});
});

/* GET users listing. */
router.post('/add', async (req, res, next) => {
	// Obtengo el email del usuario logueado para asociarlo al a la serie
	const data = req.session.passport;
	const email = data.profile.emails[0].value;

	const entrega = {
		anotacion: req.body.anotacion,
		fecha_entrega: req.body.fechaEntrega,
		usuario: email,
		idSerie: req.body.idSerie,
		anotacionLower: req.body.anotacion.toLowerCase().replace(/\s/g, "")
	}


	await entregaDriver.addEntrega(entrega);
	res.redirect('/entregas');
});

router.get('/editEntrega', async (req, res, next) => {
	const idEntrega = req.query.id;
	const entrega = await entregaDriver.getEntregaById(idEntrega);

	//obtengo e usuario de sesion para comparar
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	let error = false;

	if (entrega.usuario !== email && email !== 'pruebaparaingweb@gmail.com') {
		//si no es mi entrega error
		error = true;
	}

	res.render('editEntrega', {
		anotacion: entrega.anotacion,
		fechaEntrega: entrega.fecha_entrega,
		idSerie: entrega.idSerie,
		idEntrega: idEntrega,
		error: error
	});
});

router.post('/editEntrega', async (req, res, next) => {

	// Obtengo el email del usuario logueado para asociarlo al comentario
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	// Creo un comentario predefinido (hay que hacer un formulario) y le asocio el email y la id de la serie

	const entrega = {
		id: req.body.idEntrega,
		anotacion: req.body.anotacion,
		idSerie: req.body.idSerie,
		fecha_entrega: req.body.fechaEntrega,
		usuario: email,
		anotacionLower: req.body.anotacion.toLowerCase().replace(/\s/g, "")
	}

	await entregaDriver.editEntrega(entrega);
	res.redirect('/entregas');

});

module.exports = router;
