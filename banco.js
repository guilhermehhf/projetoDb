const funcoes = require("./funcoes")

class Banco{
  constructor(){
    this.table;
    this.buckets;
  }

  criaBanco(quantTuplasPerPage, tamanhoBucket){
    this.table = funcoes.criaTable(quantTuplasPerPage);
    this.buckets = funcoes.criaBuckets(this.table, tamanhoBucket); 
  }
  
  findTuple(chave){
    let resultado = funcoes.findTuple(this.buckets,chave)
    resultado.page = this.table.getPageIndex(resultado.page)
    return resultado
  }

  qtdTuplas(){
    return this.table.totalTuplas()
  }

  qtdPaginas(){
    return this.table.pages.length
  }

  qtdBuckets(){
    return this.buckets.buckets.length
  }

  qtdOverflows(){
    return funcoes.qtdOverflows(this.buckets)
  }

  qtdColisoes(){
    return funcoes.qtdColisoes(this.buckets)
  }

}

  module.exports = Banco;