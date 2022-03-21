const express = require('express')
const app = express()
const port = 8081
const Banco = require('./banco.js')
const cors = require('cors')

let banco;

app.use(cors())

app.get("/banco/:pagelength/tupla/:id", (req, res) => {
  banco = new Banco(req.params.pagelength, 20)
  let data = banco.findTuple(req.params.id)
  res.send({ data: data, overflows: banco.qtdOverflows(), })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})