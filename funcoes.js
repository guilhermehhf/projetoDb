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

    dados().forEach(element => {
        if(cont == quantTuplas){
        table.addPage(page);
        page = new Page();
        cont = 0;
        }
        if(cont != quantTuplas){
        page.addTuple(element,element)
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
    let acessoMemoria = 0
    
    try {
        let indice = buckets.getBucket(chaveHash).returnBucketIndice(chave)
        tupla = indice.getPage().tuples.find(tuple=>{
            return tuple.getId() == chave
        })
        acessoMemoria++
        return {tupla,acessoMemoria,chaveHash,page:indice.getPage()}

    } catch (error) {
        return {tupla:{key:"",data:""}, acessoMemoria, chaveHash, page:undefined}
    }
    
}

function qtdOverflows(buckets){
    let cont = 0;
    buckets.buckets.forEach(bucket=>{
        cont += bucket.getOverflows()
    })
    return cont
}

function qtdColisoes(buckets){
    let cont = 0;
    buckets.buckets.forEach(bucket=>{
        cont += bucket.getColisoes()
    })
    return cont
}

function funcHash(chave){
    return parseInt(chave.hashFunction().toString().slice(0,4))%quantBuckets
}

// String.prototype.hashCode = function(){
//     var hash = 0;
//     for (var i = 0; i < this.length; i++) {
//         var character = this.charCodeAt(i);
//         hash = ((hash<<5)-hash)+character;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return Math.abs(hash);
// }

String.prototype.hashFunction = function(){
    var result = 0
    for (var i = 0; i < this.length; i++) {
        var characterAscii = this.charCodeAt(i);
        result += Math.pow(characterAscii, (i + 1))
    }
    return Math.abs(result)
}

// function universalHashFunction(key){
//     var p = 11
//     a = Math.random(1,p)
//     b = Math.random(0,p)

//     calculo = ((a*key+b)%p)%quantBuckets
// }

module.exports = {criaBuckets, preencheOsBuckets, funcHash, findTuple, criaTable, qtdOverflows, qtdColisoes}