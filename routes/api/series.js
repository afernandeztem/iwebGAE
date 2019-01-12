const express = require('express');
const router = express.Router();
const serieParam = require('../params/serie');
const serieDriver = require('../../lib/datastore/serie-driver');

router.get('/', async (req, res) => {
	const films = await serieDriver.getSeries();

	res.status(200).json(films);
});


module.exports = router;
