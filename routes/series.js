const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const serieDriver = require('../lib/datastore/serie-driver');
const comentarioDriver = require('../lib/datastore/comentarios-driver');


router.use(authMiddleware);


/* GET users listing. */
router.get('/', async (req, res, next) => {
	const series = await serieDriver.getSeries();

	res.render('series', {
		series: series ? series : []
	});
});


/* GET users listing. */
router.get('/add', (req, res, next) => {
	res.render('addSerie', {});
});

/* GET users listing. */
router.get('/comentarios', async (req, res, next) => {
	// Obtengo la ide de la serie
	const id = req.query.id;
	// Obtengo la id de los comentarios de la serie
	const idComentarios = await serieDriver.getidComentarios(id);
	// Obtengo los comentarios
	const comentarios = await comentarioDriver.getComentarios(idComentarios);

	res.render('comentarios', {
		comentarios: comentarios ? comentarios : []
	});
});


module.exports = router;
