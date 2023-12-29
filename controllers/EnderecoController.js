let Endereco = require('../models/Endereco');
let User = require('../models/User');
class EnderecoController
{
    async index(req,res){}
    
    async adicionar(req,res)
    {
        let {cep, logradouro, complemento, bairro, localidade, uf} = req.body;


        const userData = req.userData;
        const user_id = userData.id;

        // Filtros
        if(cep == undefined){
            res.status(400);
            res.json({err: 'O CEP é inválido'});
            return;
        }
        if(logradouro == undefined){
            res.status(400);
            res.json({err: 'O logradouro é inválido'});
            return;
        }
        if(bairro == undefined){
            res.status(400);
            res.json({err: 'O bairro é inválido'});
            return;
        }
        if(localidade == undefined){
            res.status(400);
            res.json({err: 'A localidade é inválido'});
            return;
        }
        if(uf == undefined){
            res.status(400);
            res.json({err: 'O UF é inválido'});
            return;
        }
        
        try {
            let user = await User.findById(user_id);
            if (user) {
                await Endereco.create(user_id, cep, logradouro, complemento, bairro, localidade, uf);
                res.json({success: 'Endereço cadastrado com sucesso!'});
                return;
            } else {
                res.status(400);
                res.json({err: "Usuário não existe!"});
                return;
            }
        } catch (error) {
            res.status(400);
            res.json({error});
        }
    }
}

module.exports = new EnderecoController();