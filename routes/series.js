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
		imagen: '/drawable/nyan.png'
	}

	const fetch = require('node-fetch');
	const url = 'https://api.unsplash.com/search/photos/?client_id=8aed9fd040bd00f28e43a883034bb7da3a0212a366987997c3fae40a5fef2145&query=';
	const url_ = 'https://source.unsplash.com/';
	const tam = '/290x160';
	const url_get = url + encodeURIComponent(serie.titulo);

	await fetch(url_get)
		.then((ress) => ress.json())
		.then((json) => {
			const imagenes = json;
			const arrayImagenes = imagenes.results;
			let id;

			for (let i = 0; i < arrayImagenes.length; i++) {
				if (arrayImagenes[i].height < arrayImagenes[i].width) {
					id = arrayImagenes[i].id;
					serie.imagen = url_ + id + tam;
					console.log(serie);
					break;
				}
			}
		});

	/*await Request.get(url_get, (error, response, body) => {
		if (error) {
			return console.dir(error);
		}
		const imagenes = JSON.parse(body);
		const arrayImagenes = imagenes.results;
		let id;

		for (let i = 0; i < arrayImagenes.length; i++) {
			if (arrayImagenes[i].height < arrayImagenes[i].width) {
				id = arrayImagenes[i].id;
				serie.imagen = url_ + id + tam;
				console.log(serie);
				break;
			}
		}
	});*/
	//try {
	console.log(serie);
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
	//Obtengo el email para ver si soy el dueño del comentario
	const data = req.session.passport;
	const email = data.profile.emails[0].value;



	// Renderizamos comentarios.jade con los atributos siguientes
	res.render('comentarios', {
		comentarios: comentarios ? comentarios : [],
		idSerie: id,
		emailLogged: email
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

router.get('/eliminar', async (req, res, next) => {
	//id de la serie
	const id = req.query.id;
	// Obtengo el email del usuario que ha creado la serie
	const emailSerie = await serieDriver.getUsuarioSerie(id);

	const data = req.session.passport;
	console.log(data);
	const email = data.profile.emails[0].value;
	if(emailSerie === email){
		console.log('PERMISO PARA ELIMINAR SERIE');
		await serieDriver.deleteSerie(id);
	}


	res.redirect('/');
});

module.exports = router;
