var express = require("express")
var app = express();
var routes = express.Router();
var UserController = require('../controllers/UserController');
var EnderecoController = require('../controllers/EnderecoController');
var PizzaController = require('../controllers/PizzaController');
let Auth = require('../middleware/Auth');
let AuthAdmin = require('../middleware/AuthAdmin');
const SaborController = require("../controllers/SaborController");

routes.get('/', (req,res)=>{
    res.json({
        isWork: true
    })
});
// Usuario
routes.post('/api/login', UserController.login);
routes.post('/api/user', UserController.create);
routes.get('/api/user', Auth, UserController.show);
routes.put('/api/user', Auth, UserController.update);
routes.post('/api/user/endereco', Auth, EnderecoController.adicionar);
// Pizza
routes.post('/api/pizza', AuthAdmin, PizzaController.adicionar);
routes.get('/api/pizza', PizzaController.show);
routes.put('/api/pizza', AuthAdmin, PizzaController.update);
//
//routes.get('/api/pedidos', PedidosController.index);
routes.post('/api/sabores', AuthAdmin, SaborController.create);
routes.get('/api/sabores', SaborController.index);
routes.put('/api/sabores', SaborController.update);


module.exports = routes;