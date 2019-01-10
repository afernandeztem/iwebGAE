const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const serieDriver = require('../lib/datastore/serie-driver');
const comentarioDriver = require('../lib/datastore/comentarios-driver');


router.use(authMiddleware);


/* GET users listing. */
router.get('/', async (req, res, next) => {
	// Obtengo todas las series
	const series = await serieDriver.getSeries();

	// Las muestro en series.jade
	res.render('series', {
		series: series ? series : []
	});
});


router.get('/add', async (req, res, next) => {
	// Obtengo el email del usuario para que la serie tenga ese dueño
	const data = req.session.passport;
	const email = data.profile.emails[0].value;
	const serie = {
		titulo: 'pruebaSerie1',
		categoria: 'pruebaSerie1',
		descripcion: 'pruebaSerie1',
		usuario: email
	}

	await serieDriver.addSerie(serie);
	res.redirect('/series');
});

/* GET users listing. */
router.get('/comentarios', async (req, res, next) => {
	// Obtengo la id de la serie
	const id = req.query.id;
	// Obtengo los comentarios que tienen como dueño a esa serie
	const comentarios = await comentarioDriver.getComentarios(id);

	res.render('comentarios', {
		comentarios: comentarios ? comentarios : [],
		idSerie: id
	});
});


module.exports = router;
