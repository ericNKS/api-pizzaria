require('dotenv').config();
const Sabor = require('../models/Sabor');
let bcrypt = require('bcrypt');

class SaborController
{
    async index(req,res){
        try {
            let resposta = await Sabor.findAll();
            if (resposta != false) {
                res.status(200).json(resposta);
            } else {
                res.status(400).json({err: "Aconteceu algum erro!"});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({err: "Aconteceu algum erro!"});
        }

    }

    async create(req,res){
        let {name, descricao} = req.body;

        try {
            let resultado = await Sabor.create(name, descricao);
            if (resultado != false) {
                res.status(200).json({success: "Sabor Criado com Sucesso!"});
            } else {
                res.status(400).json({err: "Aconteceu algum erro!"});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({err: "Aconteceu algum erro!"});
        }

    }

    async update(req,res){
        let {id, name, descricao} = req.body;
        let saborToUpdate = {
            id,
            name,
            descricao
        };

        try {
            let resultado = await Sabor.update(saborToUpdate);
            if (resultado != false) {
                res.status(200).json({success: "Sabor atualizado com sucesso!"});
            } else {
                res.status(400).json({err: "Aconteceu algum erro!"});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({err: "Aconteceu algum erro!"});
        }

    }
}

module.exports = new SaborController();