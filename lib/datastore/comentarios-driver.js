const Datastore = require('@google-cloud/datastore');

const KEY_COMENTARIO = 'Comentario';

class SerieDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getComentarios(idSerie) {
		// Obtengo los comentarios asociados a la serie que le paso por parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('idSerie', idSerie);
		let data = await this.datastore.runQuery(query);
		return data[0];
	}

	async deleteComentario(id) {
		// Si el comentario carece de id lanzo un error por consola
		if (!id) {
			throw new Error('No ID provided');
		}
		// Obtengo la key del datastore de ese comentario
		const key = this.datastore.key([KEY_COMENTARIO, id]);
		// Lo elimino
		await this.datastore.delete(key);
	}

	// La función de este método es devolver el email del usuario pasado por parámetro
	async getUsuario(id) {
		// Obtengo el usuario cuya id coincide con el parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		// La consulta me devuelve un array de arrays, por lo que accedo a la primera posición del primer array
		// y a la propiedad usuario (printear para ver mejor)
		return data[0][0].usuario;
	}

	// La función de este método es devolver el email del usuario pasado por parámetro
	async getTitulo(id) {
		// Obtengo el usuario cuya id coincide con el parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		// La consulta me devuelve un array de arrays, por lo que accedo a la primera posición del primer array
		// y a la propiedad usuario (printear para ver mejor)
		return data[0][0].titulo;
	}


	async getContenido(id) {
		// Obtengo el usuario cuya id coincide con el parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		// La consulta me devuelve un array de arrays, por lo que accedo a la primera posición del primer array
		// y a la propiedad usuario (printear para ver mejor)
		return data[0][0].contenido;
	}


	async getImagen(id) {
		// Obtengo el usuario cuya id coincide con el parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		// La consulta me devuelve un array de arrays, por lo que accedo a la primera posición del primer array
		// y a la propiedad usuario (printear para ver mejor)
		return data[0][0].imagen;
	}


	// La función de este método es devolver el email del usuario pasado por parámetro
	async getSerieId(id) {
		// Obtengo la serie que tiene el comentario pasado como parámetro
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);
		// La consulta me devuelve un array de arrays, por lo que accedo a la primera posición del primer array
		// y a la propiedad usuario (printear para ver mejor)
		return data[0][0].idSerie;
	}

	async addComentario(comentario) {
		// Si el comentario carece de info lanzar error

		// Si no tiene id (nunca va a tener), se la asociamos
		if (!comentario.id) {
			comentario.id = Math.random().toString(8).slice(2);
		}
		// Le decimos al datastore que guarde como key el par KEY-id
		const key = this.datastore.key([KEY_COMENTARIO, comentario.id]);
		// Creamos la entidad a insertar
		const entity = {
			key: key,
			data: comentario
		};
		// Introducimos en la bd
		await this.datastore.save(entity);
	}


	async editComentario(comentario) {


		// Le decimos al datastore que guarde como key el par KEY-id
		const key = this.datastore.key([KEY_COMENTARIO, comentario.id]);
		// Creamos la entidad a insertar
		const entity = {
			key: key,
			data: comentario
		};
		// Introducimos en la bd

		console.log("enticoment " + entity.data.comentario);
		await this.datastore.save(entity);
	}


	async getComentariosUsuario(email){
		let query = this.datastore.createQuery(KEY_COMENTARIO).filter('usuario', '=', email);
		let data = await this.datastore.runQuery(query);

		return data[0];
	}


}

module.exports = new SerieDriver();
