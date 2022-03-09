const express = require('express')
const app = express()
const port = 8081
const dados = require("./leitura.js")

app.get('/', (req,  res) => {
 res.send(dados())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
