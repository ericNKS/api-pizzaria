require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = function(req,res,next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];

        try {
            let decoded = jwt.verify(token, process.env.SECRET);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(403);
                res.json({
                    err: "Erro de autenticação"
                });
            }
        } catch (error) {
            res.status(403);
            res.json({
                err: "Erro de autenticação"
            });
        }
    } else {
        res.status(403);
        res.json({
            err: "Erro de autenticação"
        });
    }
}