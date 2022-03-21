const funcoes = require("./funcoes")

class Banco{
  constructor(quantTuplasPerPage, tamanhoBucket){
    this.table = funcoes.criaTable(quantTuplasPerPage);
    this.buckets = funcoes.criaBuckets(this.table, tamanhoBucket); 

  }
  findTuple(chave){
    return funcoes.findTuple(this.buckets,chave)
  }
  qtdOverflows(){
    return funcoes.qtdOverflows(this.buckets)
  }
  

}
  module.exports = Banco;