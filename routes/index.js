const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	// Si hay sesión iniciada
	if (req.session && req.session.passport) {
		return res.redirect('/series');
	}
	// Si no obtengo el parametro logout
	const logout = req.query.logout;
	// Renderizo index
	res.render('index', {
		title: 'Drawdede',
		logout: logout
	});
});

module.exports = router;
