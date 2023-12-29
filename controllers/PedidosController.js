require('dotenv').config();

let bcrypt = require('bcrypt');
const Pedido = require('../models/Pedido');

class PedidosController
{
    async index(req,res){
        try {
            let resultado = await Pedido.findAll();
            if(resultado != false){
                res.status(200).json({success: resultado});
            }else{
                res.status(400).json({err: "Aconteu um erro inesperado"});
            }
        } catch (error) {
            res.status(400).json({err: "Aconteceu um erro inesperado"});
        }
        res.json({success: true});
    }

    async create(req,res){
        let user = req.userData;
        let {pizza_id} = req.body;
        try {
            let resultado = await Pedido.create(user.id, pizza_id);
            if(resultado != false){
                res.status(200).json({success: resultado});
            }else{
                res.status(400).json({err: "Aconteu um erro inesperado"});
            }
        } catch (error) {
            res.status(400).json({err: "Aconteu um erro inesperado"});
        }
        res.json({success: true});
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