let knex = require("../database/Connection");
let bcrypt = require('bcrypt');

class Endereco{
    
    // cep
    // logradouro
    // complemento
    // bairro
    // localidade (cidade)
    // uf
    async create(user_id, cep, logradouro, complemento, bairro, localidade, uf)
    {
        try {

            await knex.insert({cep, logradouro, complemento, bairro, localidade, uf, user_id}).table('endereco');
            
        } catch (error) {
            console.log(error);
        }
        
    }

}
module.exports = new Endereco();