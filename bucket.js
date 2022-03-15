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
        }
        else if(this.overFlow == undefined){
            this.overFlow = new Bucket(this.tamanhoMax)
            this.overFlow.addIndice(chave,page);
            
        }else{
            this.overFlow.addIndice(chave,page);
        }
    }

    returnBucketIndice(chave){
        for(i = 0; i < this.listaDeIndices.length; i++){
            if(this.listaDeIndices[i].getKey().localeCompare(chave) == 0){
                return this.listaDeIndices[i]
            }
        }
        return this.overFlow.returnPage(chave)
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
}

module.exports = Bucket