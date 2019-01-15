const express = require('express');
const router = express.Router();
const serieParam = require('../params/serie');
const serieDriver = require('../../lib/datastore/serie-driver');
const comentarioDriver = require('../../lib/datastore/comentarios-driver');

router.get('/', async (req, res) => {
	const films = await serieDriver.getSeries();

	res.status(200).json(films);
});

router.delete('/:film', async (req, res) => {
	try {
		await serieDriver.deleteSerie(req.film.id);
		console.log(1);
		res.sendStatus(204);
	} catch (e) {
		res.sendStatus(404);
	}
});

serieParam(router);


module.exports = router;
