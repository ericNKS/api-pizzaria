let knex = require("../database/Connection");
const Teste = require("./teste");

class Pedidos extends Teste{
    
    async create(user_id, pizza_id)
    {
        try {

            return await knex.insert({user_id, pizza_id}).table('pedidos');
            
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async findAll()
    {
        try {

            return await knex.select('*').table('pedidos');
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(object)
    {
        try {

            if (object.descricao != undefined) {
                await knex.update({status : object.status}).where('id', object.id).table('pedidos');
                return true;
            }else{
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

}
module.exports = new Pedidos();