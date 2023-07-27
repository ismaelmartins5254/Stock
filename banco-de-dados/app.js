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

app.post("/addSetor", (req, res) => { //pagina de addSetor
  const { setor } = req.body

  let SQL = "INSERT INTO setor (setor) VALUE (?)"
  db.query(SQL, [setor], (err) => {
    console.log(err)
  })
  console.log('sem erros aqui')
})

app.get("/getaddIten", (req, res) => {
  let SQL = "SELECT * from itensadd"

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

app.get("/GetSetor", (res, req) => { //pagina de addSetor
  let SQL = "SELECT * FROM setor"

  db.query(SQL, (err, resp) => { 
    if (err) console.log(err)
    else res.send(resp)
  })
})

app.listen(5000, () => {
  console.log('servidor rodando')
})