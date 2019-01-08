const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	console.log(req.session.passport)
	if (req.session && req.session.passport) {
		return res.redirect('/series');
	}

	const logout = req.query.logout;

	res.render('index', {
		title: 'Drawdede',
		logout: logout
	});
});

module.exports = router;
