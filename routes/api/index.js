const express = require('express');
const router = express.Router();
const series = require('./series');

// Enable CORS
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Load API routes
router.use('/series', series);

module.exports = router;
