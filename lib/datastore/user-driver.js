const Datastore = require('@google-cloud/datastore');
const KEY = 'Usuario';

class UsuarioDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getUsuario() {
		let query = this.datastore.createQuery(KEY).filter('email','rodrigorepresa@gmail.com');


		// try {
		const data = await this.datastore.runQuery(query);

		// } catch(e) {
		//   throw e;
		// }
		//console.log(data);

		return data[0];
	}
}

module.exports = new UsuarioDriver();
