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

	const entregas = await entregaDriver.getEntregaByParam(parametro, email);

	console.log(entregas);
	// Las muestro en series.jade
	res.render('entregas', {
		series: entregas ? entregas : []
	});
});

module.exports = router;
