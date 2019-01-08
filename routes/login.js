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
		/*console.log(user);
		if (user === undefined) {
			console.log('WEEEEEEEEEEEEEEEEEEEEEEEEEEE');
		}*/
		req.session.passport = req.user;
		let data = req.session.passport;
		let email = data.profile.emails[0].value;
		console.log(data.profile.emails[0]);
		console.log(email);

		res.redirect('/series');
	}
);

router.get('/logout', (req, res) => {
	req.session = null;
	res.redirect('/?logout=true');
});

module.exports = router;
