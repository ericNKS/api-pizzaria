const knex = require('knex');
let pizza = require('../models/Pizza');
const { update } = require('../database/Connection');
class PizzaController
{
    async index(req,res){}
    
    async adicionar(req,res)
    {
        let {name, descricao, qtd_fatias, qtd_sabores, preco} = req.body;
        qtd_fatias = parseInt(qtd_fatias);
        qtd_sabores = parseInt(qtd_sabores);
        preco = parseFloat(preco);

        if(name == undefined){
            res.status(406);
            res.json({err: "Nome inválido"});
            return;
        }

        if(qtd_fatias == undefined || typeof(qtd_fatias) != "number"){
            res.status(406);
            res.json({err: "Quantidade de fatias inválido"});
            return;
        }

        if(qtd_sabores == undefined || typeof(qtd_sabores) != "number"){
            res.status(406);
            res.json({err: "Quantidade de sabores inválido"});
            return;
        }

        if(preco == undefined || typeof(preco) != "number"){
            res.status(406);
            res.json({err: "Preço inválido"});
            return;
        }

        try {
            let resultado = await pizza.create(name, descricao, qtd_fatias, qtd_sabores, preco);
            if (resultado) {
                res.json({success: "Modelo de pizza criada com sucesso"});
                return;
            } else {
                res.status(406);
                res.json({err: "Erro ao criar modelo de pizza"});
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(406);
            res.json({err: "Erro ao criar modelo de pizza"});
            return;
        }
    }

    async show(req, res)
    {
        try {
            
            let pizzas = await pizza.findAll();
            if(pizza){
                res.json({pizzas});
                return;
            }else{
                res.status(406);
                res.json({err: "Erro ao recuperar modelo de pizza"});
                return;
            }

        } catch (error) {
            console.log(error);
            res.status(406);
            res.json({err: "Erro ao recuperar modelo de pizza"});
            return;
        }
    }
    async update(req, res)
    {
        let {id, name, descricao, qtd_fatias, qtd_sabores, preco, disponibilidade} = req.body;

        if (id == undefined || typeof(id) != "number") {
            res.status(406);
            res.json({err: "ID inválido"});
            return;
        } 

        try {

            let pizzaToUpdate= await pizza.findById(id);
            let info = {
                id,
                name,
                descricao,
                qtd_fatias,
                qtd_sabores,
                preco,
                disponibilidade
            };
            if (pizzaToUpdate.length > 0) {
                let resultado = await pizza.update(info);
                if(resultado){
                    res.json({success: "Atualização realizada com sucesso!"});
                    return;
                }else {
                    res.status(406);
                    res.json({err: "Não foi possivel fazer a atualização!"});
                    return;
                }
            }else {
                res.status(404);
                res.json({err: "Modelo de pizza não encontrado"});
                return;
            }


        } catch (error) {
            
        }

    }
}

module.exports = new PizzaController();