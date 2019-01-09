const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const usuarioDriver = require('../lib/datastore/user-driver');


router.use(passport.initialize());

router.get('/auth/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	})
);

router.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/'
	}),
	async (req, res) => {
		// Guardo el usuario en la cookie de sesión
		req.session.passport = req.user;
		// Obtengo el email del usuario para buscarlo en la BD
		const data = req.session.passport;
		const email = data.profile.emails[0].value;
		const nombre = data.profile.displayName;
		// Espero a que mi usuario sea encontrado en la BD o sea []
		let usuario = await usuarioDriver.getUsuario(email);
		// Si el array que me devuelve la BD está vacío, quiere decir que el usuario no existe, lo creo
		if (usuario.length === 0) {
			await usuarioDriver.addUsuario(email, nombre);
			console.log('Usuario insertado correctamente!!!!!!!!!!!!!!!!!!!!!!!');
			usuario = await usuarioDriver.getUsuario(email);
		}
		//Muestro los datos del usuario por consola porque me apetece
		console.log('USUARIO LOGEADO');
		console.log(usuario);
		res.redirect('/series');
	}
);

router.get('/logout', (req, res) => {
	req.session = null;
	res.redirect('/?logout=true');
});

module.exports = router;
