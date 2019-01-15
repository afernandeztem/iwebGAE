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
		// Devuelvo el array de series
		return data[0];
	}

	async addSerie(serie) {
		// Si la serie carece de info lanzo un error
		if (!serie.titulo || !serie.categoria || !serie.descripcion) {
			throw new Error('All fields are required');
		}
		// Si no tiene id lo creo
		if (!serie.id) {
			serie.id = Math.random().toString(8).slice(2);
		}
		// Creo la key del datastore
		const key = this.datastore.key([KEY_SERIE, serie.id]);
		const entity = {
			key: key,
			data: serie
		};
		// Inserto entidad
		await this.datastore.save(entity);
	}

	async getSerieById(id) {
		const idSerie = parseInt(id,2);
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_SERIE).filter('id',idSerie);
		const data = await this.datastore.runQuery(query);
		// Devuelvo el array de series
		return data[0];
	}

	async deleteSerie(id) {
		// Si el comentario carece de id lanzo un error por consola
		if (!id) {
			throw new Error('No ID provided');
		}
		// Obtengo la key del datastore de ese comentario
		const key = this.datastore.key([KEY_SERIE, id]);
		// Lo elimino
		await this.datastore.delete(key);
	}

	async getUsuarioSerie(id){
		let query = this.datastore.createQuery(KEY_SERIE).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);

		return data[0][0].usuario;
	}
}

module.exports = new SerieDriver();
