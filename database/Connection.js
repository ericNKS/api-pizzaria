var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '63524!rB',
      database : 'api_pizzaria'
    }
  });

module.exports = knex