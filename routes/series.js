const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const serieDriver = require('../lib/datastore/serie-driver');

router.use(authMiddleware);


/* GET users listing. */
router.get('/', async function (req, res, next) {
	const series = await serieDriver.getSeries();
	res.render('series', {
		series: series ? series : []
	});
});


/* GET users listing. */
router.get('/add', (req, res, next) => {
	res.render('addSerie', {});
});


module.exports = router;
