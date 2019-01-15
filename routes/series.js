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
	// Creo la serie a introducir (cambiar por formulario)
	const serie = {
		titulo: 'Iron Man',
		categoria: 'pruebaSerie1',
		descripcion: 'pruebaSerie1',
		usuario: email
	}
	// La introduzco
	await serieDriver.addSerie(serie);
	res.redirect('/series');
});

/* GET users listing. */
router.get('/comentarios', async (req, res, next) => {
	// Obtengo la id de la serie
	const id = req.query.id;
	// Obtengo los comentarios que tienen como dueño a esa serie
	const comentarios = await comentarioDriver.getComentarios(id);
	// Renderizamos comentarios.jade con los atributos siguientes
	res.render('comentarios', {
		comentarios: comentarios ? comentarios : [],
		idSerie: id
	});
});

/* GET users listing. */
router.get('/peliculas', async (req, res, next) => {
	// Obtengo la id de la serie
	const id = req.query.id;

	const Request = require('request');
	const url = 'https://api.themoviedb.org/3/search/movie?api_key=c44f3d48c47012b24473934393cf026c&language=es-ES&query=';
	const url_ = '&page=1&include_adult=false';
	const url_get = url + encodeURIComponent(id) + url_;

	Request.get(url_get , (error, response, body) => {
		if (error) {
			return console.dir(error);
		}
		const peliculas = JSON.parse(body);
		const results = peliculas.results;

		res.render('peliculas', {
			peliculas: results ? results : [],
			idSerie: id
		});
	});
});

module.exports = router;
