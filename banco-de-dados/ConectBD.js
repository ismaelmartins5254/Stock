const pg = require('pg')

var conString = "postgres://kvpnrupp:ehl03OAkYkHFWjiLcUuXro_zR_4mg60S@heffalump.db.elephantsql.com/kvpnrupp" //conexão com o bd
const client = new pg.Client(conString)
client.connect((err) => {
    if (err) return console.error(err, 'erro no backend')
})


module.exports = client