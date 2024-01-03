require('dotenv').config();

let bcrypt = require('bcrypt');
const Pedido = require('../models/Pedido');
const PedidoSabor = require('../models/PedidoSabor');

class PedidosController
{
    async index(req,res){
        try {
            let resultado = await Pedido.findAll();
            if(resultado.length > 0){
                res.status(200).json({success: resultado});
            }else{
                res.status(200).json({success: "Nenhum pedido encontrado"});
            }
        } catch (error) {
            res.status(400).json({err: "Aconteceu um erro inesperado"});
        }
    }

    async create(req,res){
        let user = req.userData;
        let {pizza_id, sabores_id} = req.body;
        try {
            let resultado = await Pedido.create(user.id, pizza_id);
            if(resultado.length > 0){
                let pedidoId = resultado[0];
                sabores_id.forEach(async saborId => {
                    let addSabor = await PedidoSabor.create(pedidoId, saborId);
                });
                res.status(200).json({success: "Pedido Realizado com sucesso"});
            }else{
                res.status(400).json({err: "Aconteu um erro inesperado"});
            }
        } catch (error) {
            res.status(400).json({err: "Aconteu um erro inesperado"});
        }
    }

    async update(req,res){
        let {id, status} = req.body;
        let pedidoToUpdate = {
            id,
            status
        };

        try {
            let resultado = await Pedido.update(pedidoToUpdate);
            if (resultado != false) {
                res.status(200).json({success: "Status do pedido atualizado com sucesso!"});
            } else {
                res.status(400).json({err: "Aconteceu algum erro!"});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({err: "Aconteceu algum erro!"});
        }

    }

}

module.exports = new PedidosController();