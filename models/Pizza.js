let knex = require("../database/Connection");
let bcrypt = require('bcrypt');

class Pizza{
    
    // Nome
    // qtd fatias
    // qtd sabores
    async create(name, qtd_fatias, qtd_sabores, preco)
    {
        try {

            await knex.insert({name, qtd_fatias, qtd_sabores, preco}).table('pizzas');
            return true;
            
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }
    async findAll()
    {
        try {
            let pizzas = await knex.select('*').table('pizzas').where('disponibilidade', 1);
            return pizzas;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findById(id)
    {
        try {
            let pizza = await knex.select('*').table('pizzas').where('id', id);
            return pizza;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(object)
    {
        try {

            if (object.name != undefined) {
                await knex.update({name : object.name}).where('id', object.id).table('pizzas');
            }
            if (object.qtd_fatias != undefined) {
                await knex.update({qtd_fatias : object.qtd_fatias}).where('id', object.id).table('pizzas');
            }
            if (object.qtd_sabores != undefined) {
                await knex.update({qtd_sabores : object.qtd_sabores}).where('id', object.id).table('pizzas');
            }
            if (object.preco != undefined) {
                await knex.update({preco : object.preco}).where('id', object.id).table('pizzas');
            }
            if (object.disponibilidade != undefined) {
                await knex.update({disponibilidade : object.disponibilidade}).where('id', object.id).table('pizzas');
            }
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

}
module.exports = new Pizza();