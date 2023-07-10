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

app.listen(5000, () => {
  console.log('servidor rodando')
})