//特点：先进先出
function Queue(){
    this.items=[]
}
Queue.prototype={
    constructor:Queue,
    enqueue:function(elements){
        this.items.push(elements)
    },
    dequeue:function(){
        return this.items.shift()
    },
    front:function(){
        return this.items[0]
    },
    clear:function(){
        return this.items=[]
    },
    isEmpty:function(){
        return this.items.length===0
    },
    size:function(){
        return this.items.length
    },
    print:function(){
        console.log(this.items.toString())
    }
}
