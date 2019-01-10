const Datastore = require('@google-cloud/datastore');

const KEY_SERIE = 'Comentario';

class SerieDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getComentarios(idComentarios) {
		// Creo un array vacío para devolver y más tarde imprimirlo en comentarios.jade
		const comentarios = [];
		let i = 0;

		// Itero el array de id para ir seleccionando todos los comentarios que están en la serie (No he conseguido hacer funcionar IN)
		for (i; i < idComentarios.length; i++) {
			// Preparo la query para obtener los comentarios cuya id es igual a la posición del array
			let query = this.datastore.createQuery(KEY_SERIE).filter('idComentario', '=', idComentarios[i]);
			// Obtengo el resultado de la consulta
			let data = await this.datastore.runQuery(query);

			// introduzco en el array a devolver el comentrario obtenido. data[0] contiene el resultado de la query, data[0][0] el objeto comentario
			comentarios.push(data[0][0]);
		}

		return comentarios;
	}

}

module.exports = new SerieDriver();
