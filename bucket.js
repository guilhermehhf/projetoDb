const Indice = require("./indice.js")

class Bucket{
    constructor(tamanhoMax){
        this.listaDeIndices = [];
        this.tamanhoMax = tamanhoMax;
        this.overFlow;
    }
    
    addIndice(chave,page){
        if(this.listaDeIndices.length < this.tamanhoMax){
            this.listaDeIndices.push(new Indice(chave,page));
            if(this.listaDeIndices.length == this.tamanhoMax){
                this.overFlow = new Bucket(this.tamanhoMax)
            }
        }
        else {
            this.overFlow.addIndice(chave,page);
        }
    }

    returnBucketIndice(chave){
        for(i = 0; i < this.listaDeIndices.length; i++){
            if(this.listaDeIndices[i].getKey().localeCompare(chave) == 0){
                return this.listaDeIndices[i]
            }
        }
        
        return this.overFlow.returnBucketIndice(chave)
    }

    getAll(){
        if(this.overFlow != undefined){
            return this.listaDeIndices.concat(this.overFlow.getAll())
        }
        
        return this.listaDeIndices
    }

    getOverflows(){
        if(this.overFlow == undefined){
            return 0
        }else{
            return 1 + this.overFlow.getOverflows()
        }
    }

    getColisoes(){
        if(this.overFlow == undefined){
            return 0
        }else{
            if(this.overFlow.listaDeIndices.length != 0){
                return 1 + this.overFlow.getColisoes()
            }
            return 0;
        }
    }
}

module.exports = Bucket