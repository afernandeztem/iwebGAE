const express = require('express');
const router = express.Router();
const entregaDriver = require('../lib/datastore/entrega-driver');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

/* GET users listing. */
router.get('/misEntregas', async(req, res, next) => {

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

router.get('/eliminar', async (req, res, next) => {
	//id de la serie
	const id = req.query.id;
	// Obtengo el email del usuario que ha creado la serie
	const emailEntrega = await entregaDriver.getUsuarioEntrega(id);

	const data = req.session.passport;
	console.log(data);
	const email = data.profile.emails[0].value;
	if (emailEntrega === email) {
		console.log('PERMISO PARA ELIMINAR ENTREGA');
		await entregaDriver.deleteEntrega(id);
	}


	res.redirect('/entregas');
});

module.exports = router;
