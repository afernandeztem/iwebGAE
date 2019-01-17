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

module.exports = router;
