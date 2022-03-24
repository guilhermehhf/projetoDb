const funcoes = require("./funcoes")

class Banco{
  constructor(quantTuplasPerPage, tamanhoBucket){
    this.table = funcoes.criaTable(quantTuplasPerPage);
    this.buckets = funcoes.criaBuckets(this.table, tamanhoBucket); 
    this.totalOverflows;
    this.totalColisoes;
  }
  
  findTuple(chave){
    return funcoes.findTuple(this.buckets,chave)
  }

  qtdOverflows(){
    if(this.totalOverflows == undefined){
      this.totalOverflows = funcoes.qtdOverflows(this.buckets)
    }
    return this.totalOverflows
  }

  qtdColisoes(){
    if(this.totalColisoes == undefined){
      console.log("entrou")
      this.totalColisoes = funcoes.qtdColisoes(this.buckets)
    }
    return this.totalColisoes
  }

}
  module.exports = Banco;