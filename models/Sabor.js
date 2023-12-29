let knex = require("../database/Connection");
let bcrypt = require('bcrypt');

class Sabores{
    
    async create(name, descricao)
    {
        try {

            return await knex.insert({name, descricao}).table('sabores');
            
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async update(object)
    {
        try {

            if (object.name != undefined) {
                await knex.update({name : object.name}).where('id', object.id).table('sabores');
            }
            if (object.descricao != undefined) {
                await knex.update({descricao : object.descricao}).where('id', object.id).table('sabores');
            }
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findAll()
    {
        try {

            return await knex.select('*').table('sabores');
            
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

}
module.exports = new Sabores();