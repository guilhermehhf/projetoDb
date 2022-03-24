class Table{
    constructor(){
        this.pages = [];
    }

    addPage(page){
        this.pages.push(page)
    }

    totalTuplas(){
        var cont = 0;
        this.pages.forEach(element=>{
            cont += element.tuples.length;
        })
        return cont;
    }
    
    getPageIndex(page){
        for (let i = 0; i < this.pages.length; i++) {
            if(page == this.pages[i]){
                return i + 1
            }
        }
        return '?'
    }

}

module.exports = Table