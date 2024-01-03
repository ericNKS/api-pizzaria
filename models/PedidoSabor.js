let knex = require("../database/Connection");

class PedidoSabor{
    
    async create(pedido_id, sabor_id)
    {
        try {

            let resultado = await knex.insert({pedido_id, sabor_id}).table('pedido_sabor');
            return resultado;
            
        } catch (error) {
            console.log(error);
            return [];
        }
        
    }

}
module.exports = new PedidoSabor();