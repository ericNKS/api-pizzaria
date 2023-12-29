const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes/routes");
const app = express();
const PORT = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, ()=>{
    console.log("Servidor Rodando");
});