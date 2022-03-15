const dados = require("./leitura.js")
const ListaBuckets = require("./lista_buckets.js")
const Table = require("./table.js")
const Page = require("./page.js")
const Bucket = require("./bucket.js")

let quantBuckets = 0

function criaTable(quantTuplas){
    let table = new Table()
    let page = new Page()
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

    return table
  
}

function criaBuckets(table, tamanhoBucket){
    let buckets = new ListaBuckets();
    quantBuckets = ~~(dados().length/tamanhoBucket);
    for(i = 0; i < quantBuckets; i++){
        buckets.addBucket(tamanhoBucket)
    }
    
    return this.preencheOsBuckets(table,buckets);
}

function preencheOsBuckets(table,buckets){
    table.pages.forEach(page => {
        page.tuples.forEach(tuple => {
            let chave = tuple.getId()
            let chaveHash = funcHash(chave)
            buckets.getBucket(chaveHash).addIndice(chave, page)
        })
    })
    return buckets
}

function findTuple(buckets,chave){
    let chaveHash = funcHash(chave)
    let indice = buckets.getBucket(chaveHash).returnBucketIndice(chave)
    result = indice.getPage().tuples.find(tuple=>{
        return tuple.getId() == chave
    })
    return result
}

function qtdOverflows(buckets){
    let cont = 0;
    buckets.buckets.forEach(bucket=>{
        cont += bucket.getOverflows()
    })
    return cont
}


function funcHash(chave){
    return parseInt(chave.hashCode().toString().slice(0,4))%quantBuckets
}

function funcHashPorId(chave){
    return parseInt(chave)%quantBuckets
}

String.prototype.hashCode = function(){
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

module.exports = {criaBuckets, preencheOsBuckets, funcHash, findTuple, criaTable, qtdOverflows}