const express = require('express');
const router = express.Router();
const serieDriver = require('../lib/datastore/serie-driver');

/* GET users listing. */
router.get('/', async function (req, res, next) {
	const series = await serieDriver.getSeries;
	res.render('series', {
		series: series ? series : []
	});
});

module.exports = router;
