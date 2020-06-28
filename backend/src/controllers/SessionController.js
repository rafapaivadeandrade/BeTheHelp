const connection = require('../database/connection');

module.exports = {
    async create(request,response) {
        const {id} = request.body;
        const ong =  await connection('ongs')
        .select('*')
        .where('id',id)
        .first();

        if(!ong){
            return response.status(400).json({error : 'Please insert valid ID'});
        }

        return response.json(ong);

        
    }
}