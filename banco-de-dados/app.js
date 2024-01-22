const client = require('./ConectBD')
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())


app.post(`/addIten`, (req, res) => { //requisição para postar os itens que fica no arquivo Additen.jsx
  const { name } = req.body
  const { description } = req.body
  const { value } = req.body
  const { type } = req.body
  const { quant } = req.body
  const { valueT } = req.body
  let SQL = 'INSERT INTO itensadd (name,description,value,type,quant,valueT) VALUES ($1,$2,$3,$4,$5,$6)'

  client.query(SQL, [name, description, value, type, quant, valueT], (err, res) => {
    if (err) console.log(err)
  })
})

app.get("/getaddIten", (req, res) => { //requisição para pegar os itens adicionados
  let SQL = "SELECT * from itensadd"

  client.query(SQL, (err, result) => { //inicio da requisição com o banco de dados
    if (err) console.log(err, 'deu errado')
    else {
      res.send(result.rows) //enviar o resultado para o frontend
    }
  })
})

app.put("/editItens", (req, res) => { //editar os itens adicionados
  const { name, description, value, type, quant, valueT, id } = req.body;
  let SQL = "UPDATE itensadd SET name = ?, description = ?, value = ?, type = ?, quant = ?, valueT = ? WHERE id = ?";

  client.query(SQL, [name, description, value, type, quant, valueT, id], (err, result) => {
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
  client.query(SQL, [id], (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

app.delete("/deletItens", (req, res) => { // Toda a requisição front está no arquivo cards.jsx na pasta layout

  let { id } = req.body
  let SQL = "DELETE from itensadd WHERE id =($1)"

  client.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao deletar o item.");
    } else {
      console.log(result);
      res.send("Item deletado com sucesso.");
    }
  })
})

app.get("/getsetor", ((err, res) => { //pegar os setores adicionados

  let SQL = "SELECT * FROM setor"

  client.query(SQL, (err, result) => {
    if (err) console.error(err)
    else {
      console.log('deu certo no back')
      res.send(result.rows)
      console.log(result.rows)
    }
  })
})
)

app.post("/AddSetor", (req, res) => { //adiocionar itens na pagina setor- arquivo AddSetor.jsx
  const { setor } = req.body
  const SQL = "INSERT INTO setor (setor) VALUES ($1)"

  client.query(SQL, [setor], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send("Erro ao adicionar setor")
    } else {
      console.log("Setor adicionado com sucesso")
      res.status(200).send("Setor adicionado com sucesso")
    }
  })
})

app.put("/editSetor", (req, res) => { //editar setores adicionados

  let { iten, id } = req.body
  let SQL = "UPDATE setor SET setor = $1 WHERE id = $2"
  console.log(iten, id)
  client.query(SQL, [iten, id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Erro ao atualizar os itens.")
    } else {
      console.log(result)
      res.status(200).send("Itens atualizados com sucesso.")
    }
  })

})

app.delete("/deletSetor", (req, res) => { // Toda a requisição front está no arquivo cards.jsx na pasta layout

  let { id } = req.body
  let SQL = "DELETE from setor WHERE id =($1)"

  client.query(SQL, [id], (err, result) => {
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