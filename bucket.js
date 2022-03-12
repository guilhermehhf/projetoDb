const IndiceHash = require("./indice_hash.js")

class Bucket{
    constructor(tamanhoMax){
        this.listaDeIndicesHash = [];
        this.tamanhoMax = tamanhoMax;
        this.overFlow;
    }
    
    addIndiceHash(chave,page){
        if(this.listaDeIndicesHash.length < this.tamanhoMax){
            this.listaDeIndicesHash.push(new IndiceHash(chave,page));
        }
        else if(this.overFlow == undefined){
            this.overFlow = new Bucket(this.tamanhoMax)
            this.overFlow.addIndiceHash(chave,page);
            
        }else{
            this.overFlow.addIndiceHash(chave,page);
        }
    }

    findChave(chave){
        for(i = 0; i < this.listaDeIndicesHash.length; i++){
            if(this.listaDeIndicesHash[i].getKey().localeCompare(chave) == 0){
                return this.listaDeIndicesHash[i].getPage()
            }
        }
        return this.overFlow.findChave(chave)
    }

    getAll(){
        console.log(this.listaDeIndicesHash.length)
        if(this.overFlow != undefined){
            return this.listaDeIndicesHash.concat(this.overFlow.getAll())
        }
        
        return this.listaDeIndicesHash
    }
}

module.exports = Bucket