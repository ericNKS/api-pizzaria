let knex = require("../database/Connection");

class Pedidos{
    
    async create(user_id, pizza_id)
    {
        try {

            let resultado = await knex.insert({user_id, pizza_id}).table('pedidos');
            return resultado;
            
        } catch (error) {
            console.log(error);
            return [];
        }
        
    }

    async findAll()
    {
        try {

            let resultados = await knex
                .select([
                    'pedidos.id',
                    'pedidos.user_id',
                    'pedidos.pizza_id',
                    'pedidos.status', 
                    'sabores.name'
                ])
                .table('pedidos')
                .where('pedidos.status', true)
                .leftJoin('pedido_sabor', 'pedido_sabor.pedido_id', 'pedidos.id')
                .leftJoin('sabores', 'sabores.id', 'pedido_sabor.sabor_id');

            // Agrupa os sabores por pedido usando reduce
            const pedidosComSabores = resultados.reduce((pedidos, resultado) => {
            const { id, user_id, pizza_id, status, name } = resultado;
            const foundPedido = pedidos.find(pedido => pedido.id === id);

            if (!foundPedido) {
                pedidos.push({
                    id,
                    user_id,
                    pizza_id,
                    status,
                    sabores: name ? [name] : [] // Cria um array de sabores se houver sabor
                });
            } else {
                if (name) {
                    foundPedido.sabores.push(name);
                }
            }

            return pedidos;
        }, []);

        return pedidosComSabores;
            
        } catch (error) {
            console.log(error);
            return [];
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