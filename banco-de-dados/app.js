
const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")



const db = mysql.createPool({
  host: 'localhost',
  password: '',
  user: 'root',
  database: 'stock'
})

app.use(cors())
app.use(express.json())

app.post("/addIten", (req, res) => {
  const { name } = req.body
  const { description } = req.body
  const { value } = req.body
  const { type } = req.body
  const { quant } = req.body
  const { valueT } = req.body
  let SQL = 'INSERT INTO itensadd (name,description,value,type,quant,valueT) VALUE (?,?,?,?,?,?)'

  db.query(SQL, [name, description, value, type, quant, valueT], (err) => {
    console.log(err)
  })

})

app.get("/getaddIten", (req, res) => {
  let SQL = "SELECT * from itensadd"

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
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

app.get("/getsetor", (req, res) => {
  let SQL = "SELECT * FROM `setor`"
  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

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

app.listen(5000, () => {
  console.log('servidor rodando')
})