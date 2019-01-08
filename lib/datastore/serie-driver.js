const Datastore = require('@google-cloud/datastore');

const KEY_SERIE= 'Serie';
class SerieDriver{
    constructor(){
        this.datastore = new Datastore();
    }

    async getSeries(){
        let query = this.datastore.createQuery(KEY_SERIE);
        
        
        const   data = await this.datastore.runQuery(query);
       

        return data[0];
    }

}

module.exports = new SerieDriver();


