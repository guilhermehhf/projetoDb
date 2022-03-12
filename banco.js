const Table = require("./table.js")
const Page = require("./page.js")
const dados = require("./leitura.js")
const funcoes = require("./funcoes.js")
let table = new Table()
let page = new Page()
var quantTuplas = 20;
var quantBuckets = funcoes.criaBuckets(10)

var cont = 0;
var id = 0;

  dados().forEach(element => {
    if(cont == quantTuplas){
      table.addPage(page);
      page = new Page();
      cont = 0;
    }
    if(cont != quantTuplas){
      page.addTuple(element,element)
      id++;
      cont++;
    }
  });
  table.addPage(page);

  

  module.exports = table;