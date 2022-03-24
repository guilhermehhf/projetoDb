class Tuple{
    constructor(key,data){
        this.key = key;
        this.data = data;
    }

    getId(){
        return this.key
    }
    getData(){
        return this.data
    }
}

module.exports = Tuple