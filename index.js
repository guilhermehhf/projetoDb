const express = require('express')
const app = express()
const port = 8081
const cors = require('cors')
const Banco = require('./banco.js')

let banco = new Banco()

app.use(cors())

app.get("/banco/tupla/:key", (req,  res) => {
  res.send(banco.findTuple(req.params.key))
})

app.get("/info-banco", (req,  res) => {
  res.send({overflows:banco.qtdOverflows(), colisoes: banco.qtdColisoes(), tuplas: banco.qtdTuplas(), paginas: banco.qtdPaginas(), buckets: banco.qtdBuckets()})
})

app.get("/banco/:tamanhoPaginas/:tamanhoBuckets", (req,  res) => {
  try {
    banco.criaBanco(req.params.tamanhoPaginas,req.params.tamanhoBuckets)
    res.send({result:"Ok"})
  } catch (error) {
    res.send({result:"Error"})
  }
  
})


app.listen(port, () => {
})