const Datastore = require('@google-cloud/datastore');
const KEY = 'Usuario';

class UsuarioDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getUsuario(email) {
		//console.log(email);
		let query = this.datastore.createQuery(KEY).filter('email', email);


		// try {
		const data = await this.datastore.runQuery(query);

		// } catch(e) {
		//   throw e;
		// }
		//console.log(data[0]);

		return data[0];
	}

	async addUsuario(email, nombre) {
		if (!email || !nombre) {
			throw new Error('All fields are required');
		}

		const usuario = {
			email: email,
			idSeries: [],
			nombre: nombre
		}

		const key = this.datastore.key([KEY]);
		const entity = {
			key: key,
			data: usuario
		};

		await this.datastore.save(entity);
	}
}

module.exports = new UsuarioDriver();
