const Datastore = require('@google-cloud/datastore');

const KEY_SERIE = 'Serie';

class SerieDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getSeries() {
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_SERIE);
		const data = await this.datastore.runQuery(query);

		return data[0];
	}

	async addSerie(serie) {
		if (!serie.titulo || !serie.categoria || !serie.descripcion) {
			throw new Error('All fields are required');
		}

		if (!serie.id) {
			serie.id = Math.random().toString(8).slice(2);
		}

		const key = this.datastore.key([KEY_SERIE, serie.id]);
		const entity = {
			key: key,
			data: serie
		};

		await this.datastore.save(entity);
	}

}

module.exports = new SerieDriver();
