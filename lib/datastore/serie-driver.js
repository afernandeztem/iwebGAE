const Datastore = require('@google-cloud/datastore');

const KEY_SERIE = 'Serie';

class SerieDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getSeries() {
		let query = this.datastore.createQuery(KEY_SERIE);
		const data = await this.datastore.runQuery(query);

		return data[0];
	}

	async getidComentarios(idSerie) {
		//Parseo el entero porque si no no tira
		const id = parseInt(idSerie, 2);
		//Preparo la query para obtener la serie que hemos seleccionado
		let query = this.datastore.createQuery(KEY_SERIE).filter('idSerie', '=', id);
		//Obtengo la serie entera
		const data = await this.datastore.runQuery(query);
		//Obtengo los id comentarios de esa Serie
		const idComentarios = data[0][0].idComentarios;

		return idComentarios;
	}

}

module.exports = new SerieDriver();
