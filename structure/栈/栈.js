//对于一个栈，需要实现添加，删除元素，获取栈顶元素，是否为空，栈的长度，清除元素等几个基本操作
//特点：先进后出
//栈顶元素总是最后被插入,最先被删除的元素
function Stack(){
    this.items=[]
}
Stack.prototype = {
    constructor:Stack,
    push:function(element){
        this.items.push(element)
    },
    pop:function(){
        return this.items.pop();
    },
    //获取栈顶元素
    peek:function(){
        return this.items[this.items.length-1]
    },
    isEmpty:function(){
        return this.items.length===0;
    },
    clear:function(){
        this.items=[]
    },
    size:function(){
        return this.items.length;
    },
    print:function(){
        console.log(this.items.toString());
    }
};
