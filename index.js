const express = require('express')
const app = express()
const port = 8081
const Banco = require('./banco.js')

let banco;

app.get("/banco", (req,  res) => {
  // res.send({data:banco.buckets})
})

app.get("/banco/:key", (req,  res) => {
  let result = banco.findTuple(req.params.key)
  res.send({data:result})
})

app.get("/overflows", (req,  res) => {
  res.send({overflows:banco.qtdOverflows(), colisões: banco.qtdColisoes()})
})

// Implementar quantidade de colisões
// app.get("/colisoes", (req,  res) => {
//   res.send({data:banco.qtdOverflows()})
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  banco = new Banco(50,20)
})