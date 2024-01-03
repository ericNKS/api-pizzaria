let knex = require("../database/Connection");
let bcrypt = require('bcrypt');

class User{
    async create(name, email, password)
    {
        try {
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({name,email,password: hash}).table('users');
            return true;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findByEmail(email)
    {
        try {
            let result = await knex.select(['id','email', 'name', 'password', 'role']).where('email', email).table('users');
            if(result.length > 0){
                return result[0];
            }else{
                return false;
            }
        } catch (error) {
            return false;
            console.log(error);
        }
    }

    async findById(id)
    {
        try {
            let result = await knex.select(['users.id', 'users.email', 'endereco.id as endereco_id', 'endereco.cep', 'endereco.logradouro', 'endereco.complemento', 'endereco.bairro', 'endereco.localidade', 'endereco.uf', 'endereco.user_id'])
                .where('users.id', id)
                .table('users')
                .leftJoin('endereco', 'endereco.user_id', 'users.id');
            if(result.length > 0){
                return result;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(object)
    {
        try {

            if (object.name != undefined) {
                await knex.update({name : object.name}).where('id', object.id).table('users');
            }
            if (object.email != undefined) {
                await knex.update({email : object.email}).where('id', object.id).table('users');
            }
            if (object.newPassword != undefined) {
                await knex.update({password : object.newPassword}).where('id', object.id).table('users');
            }
            if (object.role != undefined) {
                await knex.update({role : object.role}).where('id', object.id).table('users');
            }
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

}
module.exports = new User();