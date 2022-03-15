const Bucket = require("./bucket.js")

class ListaBuckets{
    constructor(){
        this.buckets = []
    }
    
    addBucket(tamanhoBucket){
        this.buckets.push(new Bucket(tamanhoBucket))
    }

    getBucket(index){
        return this.buckets[index]
    }
    
}

module.exports = ListaBuckets