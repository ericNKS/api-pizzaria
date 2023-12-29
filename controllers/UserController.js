require('dotenv').config();
const jwt = require('jsonwebtoken');
let User = require('../models/User');

let bcrypt = require('bcrypt');

class UserController
{
    async index(req,res){}
    
    async create(req,res)
    {
        let {name, email, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: 'O email é inválido'});
            return;
        }
        if(password == undefined){
            res.status(400);
            res.json({err: 'A senha é inválida'});
            return;
        }
        if(name == undefined){
            res.status(400);
            res.json({err: 'O nome é inválida'});
            return;
        }
        
        try {
            let hasEmail = await User.findByEmail(email);
            if(hasEmail){
                res.status(406);
                res.json({err: 'Email existente'});
                return;
            }else{
                let resultado =await User.create(name, email, password);
                
                if (resultado) {
                    res.status(200);
                    res.json({success: 'Usuário criado com sucesso!'});
                    return;
                } else {
                    res.status(400);
                    res.json({err: "Aconteceu um erro ao cadastrar o usuario"});
                }
            }
        } catch (error) {
            res.status(400);
            console.log(error);
            res.json({err: error});
        }
    }

    async login(req, res)
    {
        let {email, password} = req.body;

        try {
            let user = await User.findByEmail(email);

            if(user != undefined){

                let resultado = await bcrypt.compare(password, user.password);
                if (resultado) {
                    let expiresIn = parseInt(process.env.TOKEN_EXPIRATION);
                    let token = jwt.sign({id: user.id, name: user.name, role: user.role}, process.env.SECRET, {expiresIn});
                    res.json({status: token});
                    return
                } else {
                    res.status(406);
                    res.json({err: "Usuário ou senha inválido!"});
                    return;
                }
                return;
            }else{
                res.status(406);
                res.json({err: "Usuário ou senha inválido!"});
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({err: error});
            return;
        }
    }

    async show(req,res)
    {
        let user = req.userData;

        try {
            
            let usuario = await User.findById(user.id);
            if (usuario) {
                res.json(usuario);
                return;
            } else {
                res.status(404);
                res.json({err: "Usuário não existe!"});
                return;
            }
            
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({err: "Aconteceu algum erro no servidor"});
            return;
        }

    }

    async update(req,res)
    {
        let user = req.userData;
        let {name,email,password,newPassword, role} = req.body;

        try {
            
            let usuario = await User.findById(user.id);
            if (usuario) {
                let verificacaoSenha = await bcrypt.compare(password, usuario.password);
                if (verificacaoSenha) {
                    let dados = {
                        id: user.id,
                        name,
                        email,
                        newPassword,
                        role
                    };
    
                    let alteracao = await User.update(dados);
                    if (alteracao) {
                        res.json({success: "Alterações ocorreu com sucesso!"});
                        return;
                    } else {
                        res.status(400);
                        res.json({err: "Aconteceu algum erro no servidor"});
                    }
                
                } else {
                    res.status(406);
                    res.json({err: "Usuário ou senha inválida"});
                    return;
                }
            }else {
                res.status(404);
                res.json({err: "Usuário não existe!"});
                return;
            }
            
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({err: "Aconteceu algum erro no servidor"});
            return;
        }

    }

}

module.exports = new UserController();