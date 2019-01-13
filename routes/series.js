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
	res.render('addSerie', {
		title: 'Add series',
		id: req.query.id,
        serie: {}
    });
});

/* GET users listing. */
router.post('/add', async (req, res, next) => {
	// Obtengo el email del usuario logueado para asociarlo al a la serie
	const data = req.session.passport;
	const email = data.profile.emails[0].value;

	const serie = {
		titulo: req.body.titulo,
		categoria: req.body.categoria,
		descripcion: req.body.descripcion,
		usuario: email,
		//La imagen no sé de dónde se sacaría
		//imagen: //TODO:

	}
	//try {
		await serieDriver.addSerie(serie);
		res.redirect('/');
	//} catch (e) {
	//	res.redirect('comentarios/add?error=true');
	//}
});


/* GET users listing. */
router.get('/comentarios', async (req, res, next) => {
	// Obtengo la id de la serie
	const id = req.query.id;
	// Obtengo los comentarios que tienen como dueño a esa serie
	const comentarios = await comentarioDriver.getComentarios(id);
	// Renderizamos comentarios.jade con los atributos siguientes
	console.log("SERIES.JS ID: "+ id);
	res.render('comentarios', {
		comentarios: comentarios ? comentarios : [],
		idSerie: id
	});
});


module.exports = router;
