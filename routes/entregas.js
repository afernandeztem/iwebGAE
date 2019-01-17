const express = require('express');
const router = express.Router();
const entregaDriver = require('../lib/datastore/entrega-driver');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

/* GET users listing. */
router.get('/', async(req, res, next) => {

	//obtengo el usuario de la sesion
    const data = req.session.passport;
	const email = data.profile.emails[0].value;
	const misEntregas = await entregaDriver.getEntregasUsuario(email);
	
	const emailUser = data.profile.emails[0].value;
	console.log(emailUser);
	

	console.log(misEntregas);

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

	const entregas = await entregaDriver.getEntregaByParam(parametro, email);

	console.log(entregas);
	// Las muestro en series.jade
	res.render('entregas', {
		series: entregas ? entregas : []
	});
});

router.get('/eliminar', async (req, res, next) => {
	//id de la serie
	const id = req.query.id;
	// Obtengo el email del usuario que ha creado la serie
	const emailEntrega = await entregaDriver.getUsuarioEntrega(id);
	
	const data = req.session.passport;
	
	const email = data.profile.emails[0].value;
	if (emailEntrega === email) {
		console.log('PERMISO PARA ELIMINAR ENTREGA');
		await entregaDriver.deleteEntrega(id);
	}

	//obtengo el id de la serie con el id de la entrega
	const idSerie = await entregaDriver.getSerieEntrega(id);
	
	res.redirect('/series/entregas?id='+ idSerie);
});

module.exports = router;
