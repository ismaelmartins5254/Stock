const pg = require('pg')
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())


var conString = "postgres://kvpnrupp:ehl03OAkYkHFWjiLcUuXro_zR_4mg60S@heffalump.db.elephantsql.com/kvpnrupp" //conexão com o bd
const client = new pg.Client(conString)


app.get("/getsetor", ((err, res) => {
  client.connect((err) => {
    if (err) return console.error(err, 'erro no backend')
    let SQL = "SELECT * FROM setor"

    client.query(SQL, (err, result) => {
      if (err) console.error(err)
      else {
        console.log('deu certo no back')
        res.send(result.rows)
        console.log(result.rows)
      }
      client.end()
    })
  })
}))



/*
app.post(`/addIten`, (req, res) => {
  const { name } = req.body
  const { description } = req.body
  const { value } = req.body
  const { type } = req.body
  const { quant } = req.body
  const { valueT } = req.body
  let SQL = 'INSERT INTO itensadd (name,description,value,type,quant,valueT) VALUE (?,?,?,?,?,?)'

  pool.query(SQL, [name, description, value, type, quant, valueT], (err, res) => {

    if (err) console.log(err)
    else console.log('deu certo', res)
  })
})

app.get("/getaddIten", (req, res) => {
  let SQL = "SELECT * from itensadd"

  pool.query(SQL, (err, result) => {
    if (err) console.log(err, 'deu errado')
    else {
      res.send(result)
      console.log('deu certo')
    }
  })
})

app.put("/editItens", (req, res) => {
  const { name, description, value, type, quant, valueT, id } = req.body;
  let SQL = "UPDATE itensadd SET name = ?, description = ?, value = ?, type = ?, quant = ?, valueT = ? WHERE id = ?";

  db.query(SQL, [name, description, value, type, quant, valueT, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar os itens.");
    } else {
      console.log(result);
      res.send("Itens atualizados com sucesso.");
    }
  });
});


app.get("/getItensforEdit", (req, res) => { // Pegar itens do banco de dados e mostrar na página de edição
  let { id } = req.query
  let SQL = "SELECT * FROM itensadd WHERE id = ?"
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})


app.post("/AddSetor", (req, res) => {
  const { setor } = req.body
  let SQL = "INSERT INTO setor (setor) VALUE (?)"
  db.query(SQL, [setor], (result, err) => {
    if (err) console.log(err)
    else {
      res.send(result)
    }
  })
})
*/


/*
app.put("/editSetor", (req, res) => {
  let SQL = "UPDATE setor SET setor = ? WHERE id = ?"
  let { iten, id } = req.body

  db.query(SQL, [iten, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar os itens.");
    } else {
      console.log(result);
      res.send("Itens atualizados com sucesso.");
    }
  })

})

app.delete("/deletItens", (req, res) => {
  let SQL = "DELETE from itensadd WHERE id = ?"
  let { id } = req.body

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao deletar o item.");
    } else {
      console.log(result);
      res.send("Item deletado com sucesso.");
    }
  })
})
*/

app.listen(5000, () => {
  console.log('servidor rodando')
})