const Datastore = require('@google-cloud/datastore');

const KEY_ENTREGA = 'Entrega';


class EntregaDriver {
	constructor() {
		this.datastore = new Datastore();
	}

	async getEntregas() {
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_ENTREGA);
		const data = await this.datastore.runQuery(query);
		// Devuelvo el array de Entregas
		return data[0];
	}

	async getEntregaById(id) {
		// Obtengo todas las entregas, consulta básica
		let query = this.datastore.createQuery(KEY_ENTREGA).filter('id',id);
		const data = await this.datastore.runQuery(query);
		// Devuelvo el array de series
		return data[0][0];
	}

	async deleteEntrega(id) {
		// Si carece de id lanzo un error por consola
		if (!id) {
			throw new Error('No ID provided');
		}
		// Obtengo la key del datastore
		const key = this.datastore.key([KEY_ENTREGA, id]);
		// Lo elimino
		await this.datastore.delete(key);
	}

	//obtengo las entregas que corresponden a la serie
	async getEntregasSerie(idSerie) {
		let query = this.datastore.createQuery(KEY_ENTREGA).filter('idSerie', '=', idSerie);
		let data = await this.datastore.runQuery(query);

		return data[0];
	}

	async getEntregasUsuario(email) {

		/*

		 CON ESTA FORMA OBTENGO LAS ENTREGAS QUE TIENE UNA SERIE
		//obtengo las series del usuario y me devuelve una lista
		let query = this.datastore.createQuery('Serie').filter('usuario', '=', email);
		let data = await this.datastore.runQuery(query);

		//data -> lista con series

		let misEntregas = [];

		//itero la lista de series
		data[0].forEach(async (element) => {
			console.log(element);
			let query2 = this.datastore.createQuery(KEY_ENTREGA).filter('idSerie', '=', element.id);
			let data2 = await this.datastore.runQuery(query2);
			console.log(data2[0][0]);
			misEntregas.push(data2[0][0]);
		});

		//misEntregas contiene la lista de entregas del usuario

		*/

		let query = this.datastore.createQuery(KEY_ENTREGA).filter('usuario', '=', email);
		let data = await this.datastore.runQuery(query);

		return data[0];
	}

	async getEntregaByParam(param, email) {
		// Obtengo todas las series, consulta básica
		let query = this.datastore.createQuery(KEY_ENTREGA).filter('anotacion', param).filter('usuario', email);
		const data = await this.datastore.runQuery(query);
		// Devuelvo el array de series
		return data[0];
	}

	async getUsuarioEntrega(id){
		let query = this.datastore.createQuery(KEY_ENTREGA).filter('id', '=', id);
		let data = await this.datastore.runQuery(query);

		return data[0][0].usuario;
	}

	async getSerieEntrega(idEntrega) {
		let query = this.datastore.createQuery(KEY_ENTREGA).filter('id', '=', idEntrega);
		let data = await this.datastore.runQuery(query);

		return data[0][0].idSerie;
	}

	async addEntrega(entrega) {
		// Si la serie carece de info lanzo un error
		// Si no tiene id lo creo
		if (!entrega.id) {
			entrega.id = Math.random().toString(8).slice(2);
		}
		// Creo la key del datastore
		const key = this.datastore.key([KEY_ENTREGA, entrega.id]);
		const entity = {
			key: key,
			data: entrega
		};
		// Inserto entidad
		await this.datastore.save(entity);
	}

	async editEntrega(entrega){

		const key = this.datastore.key([KEY_ENTREGA, entrega.id]);
		const entity = {
			key: key,
			data: entrega
		};
		await this.datastore.save(entity);
	}
}

module.exports = new EntregaDriver();
