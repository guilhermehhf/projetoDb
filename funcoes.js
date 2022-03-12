
const dados = require("./leitura.js")
const ListaBuckets = require("./lista_buckets.js")

let quantBuckets = 0
let lista = new ListaBuckets()
let ref_banco;

function criaBuckets(banco, tamanhoDoBucket){
    ref_banco = banco
    quantBuckets = ~~(dados().length/tamanhoDoBucket);
    for(i = 0; i < quantBuckets; i++){
        lista.addBucket(tamanhoDoBucket)
    }
}

function preecheOsBuckets(){
    ref_banco.pages.forEach(page => {
        page.tuples.forEach(tuple => {
            let chave = tuple.getId()
            let chaveHash = funcHash(chave)
            lista.getBucket(chaveHash).addIndiceHash(chave, page)
        })
    })
}

function procuraChave(chave){
    let chaveHash = funcHash(chave)
    let page = lista.getBucket(chaveHash).findChave(chave)
    result = page.tuples.find(tuple=>{
        return tuple.getId() == chave
    })
    return result
}

function funcHash(chave){
    return parseInt(chave.hashCode().toString().slice(0,4))%quantBuckets
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

module.exports = {criaBuckets, preecheOsBuckets, funcHash, procuraChave}