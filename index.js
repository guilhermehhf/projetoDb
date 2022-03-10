const express = require('express')
const app = express()
const port = 8081
const dados = require("./leitura.js")
const Table = require("./table.js")


app.get('/', (req,  res) => {
  let table = new Table()

  dados().forEach(element => {
    let hash = parseInt(element.hashCode().toString().slice(0,4))
    console.log(hash)
    table.addTuple(hash%dados().length,element)
  });

  res.send(table)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

String.prototype.hashCode = function(){
  var hash = 0;
  for (var i = 0; i < this.length; i++) {
      var character = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+character;
      hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
