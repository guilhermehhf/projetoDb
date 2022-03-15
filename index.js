const express = require('express')
const app = express()
const port = 8081
const Banco = require('./banco.js')

let banco;

app.get("/banco", (req,  res) => {
  // res.send({data:banco.buckets})
})

app.get("/banco/:id", (req,  res) => {
  const inicio = performance.now();
  let data = banco.findTuple(req.params.id)
  const fim = performance.now();
  const tempo = fim - inicio
  res.send({data:data,tempo:tempo.toFixed(2)})
})

app.get("/overflows", (req,  res) => {
  res.send({data:banco.qtdOverflows()})
})

// Implementar quantidade de colisões
// app.get("/colisoes", (req,  res) => {
//   res.send({data:banco.qtdOverflows()})
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  banco = new Banco(50,20)
})