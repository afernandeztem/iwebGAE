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

	async editSerie(serie){

		const key = this.datastore.key([KEY_SERIE, serie.id]);
		const entity = {
			key: key,
			data: serie
		};
		await this.datastore.save(entity);

	}

	async addSerie(serie) {
		// Si la serie carece de info lanzo un error
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
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_SERIE).filter('id',id);
		const data = await this.datastore.runQuery(query);
		// Devuelvo el array de series
		return data[0][0];
	}

	async getSerieByParam(param) {
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_SERIE).filter('titulo',param);
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

	async getSeriesUsuario(email){
		let query = this.datastore.createQuery(KEY_SERIE).filter('usuario', '=', email);
		let data = await this.datastore.runQuery(query);

		return data[0];
	}
}

module.exports = new SerieDriver();
