const Bucket = require("./bucket.js")

class ListaBuckets{
    constructor(){
        this.buckets = []
    }
    
    addBucket(tamanhoDoBucket){
        this.buckets.push(new Bucket(tamanhoDoBucket))
    }

    getBucket(index){
        return this.buckets[index]
    }
    
}

module.exports = ListaBuckets