const serieDriver = require('../../lib/datastore/serie-driver');

module.exports = (router) =>
	// Parse film ID to append the film object to the request
	router.param('serie', async (req, res, next, serieId) => {
		const serie = await serieDriver.getSerieById(serieId);

		if (serie) {
			req.film = serie;
			next();
		} else {
			res.sendStatus(404);
		}
	});
