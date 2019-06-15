Function.prototype.myApply = function(ctx,arg){
    //转基本类型为object，若不存在则挂载到window上
    ctx = ctx ? Object(ctx ): window;
    //获取调用函数并挂载到第一个参数(被call者)
    ctx.fn = this; //this是person:fn
    let res;
    if(!arg){
        res = ctx.fn();
    }else{
        res = ctx.fn(...arg)
    }
    //删除fn
    delete ctx.fn;
    return res;
};
let you={
    age:17,
    name:'stupid'
};
function person(age,name){
    console.log(this);
    console.log(this.age,this.name);
}
person.myApply(you,[16,'smart']);

