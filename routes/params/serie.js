const serieDriver = require('../../lib/datastore/serie-driver');

module.exports = (router) =>
	// Parse serie ID to append the serie object to the request
	router.param('serie', async (req, res, next, serieId) => {
		const serie = await serieDriver.getSerieById(serieId);
		console.log(serie);
		if (serie) {
			req.film = serie;
			next();
		} else {
			res.sendStatus(404);
		}
	});
