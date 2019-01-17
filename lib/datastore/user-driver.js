const Datastore = require('@google-cloud/datastore');
const KEY = 'Usuario';

class UsuarioDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getUsuario(email) {
		// Obtengo los usuarios cuyo email coincide con el parametro
		let query = this.datastore.createQuery(KEY).filter('email', email);
		const data = await this.datastore.runQuery(query);
		return data[0];
	}


	async addUsuario(email, nombre, imagen) {
		// Si el usuario carece de info lanzo error
		if (!email || !nombre) {
			throw new Error('All fields are required');
		}
		// Creo el usuario
		const usuario = {
			email: email,
			nombre: nombre,
			imagen: imagen
		}
		// Creo la clave, al dejar KEY solo se crea un id aleatorio, podriamos hacerlo creando un id tmb como en los demás
		const key = this.datastore.key([KEY]);
		const entity = {
			key: key,
			data: usuario
		};
		// Guardo el usuarioSS
		await this.datastore.save(entity);
	}

}

module.exports = new UsuarioDriver();
