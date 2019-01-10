const Datastore = require('@google-cloud/datastore');

const KEY_COMENTARIO = 'Comentario';

class SerieDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getComentarios(idSerie) {
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('idSerie', idSerie);
		let data = await this.datastore.runQuery(query);
		return data[0];
	}

	async deleteComentario(id) {
		if (!id) {
			throw new Error('No ID provided');
		}

		const key = this.datastore.key([KEY_COMENTARIO, id]);

		await this.datastore.delete(key);
	}

	async getUsuario(id) {
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		return data[0][0].usuario;
	}

	async addComentario(comentario) {
		if (!comentario.titulo || !comentario.contenido || !comentario.idSerie) {
			throw new Error('All fields are required');
		}

		if (!comentario.id) {
			comentario.id = Math.random().toString(8).slice(2);
		}

		const key = this.datastore.key([KEY_COMENTARIO, comentario.id]);
		const entity = {
			key: key,
			data: comentario
		};



		await this.datastore.save(entity);
	}

}

module.exports = new SerieDriver();
