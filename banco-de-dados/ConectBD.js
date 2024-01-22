const pg = require('pg')
require('dotenv').config()

var conString = process.env.URL_DB //conexão com o bd
const client = new pg.Client(conString)
client.connect((err) => {
    if (err) return console.error(err, 'erro no backend')
})


module.exports = client