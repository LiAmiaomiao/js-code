Function.prototype.myCall=function(ctx){
    //转基本类型为object，若不存在则挂到window上
    ctx=ctx?Object(ctx):window;
    //获取调用函数并挂到第一个参数（被call者）
    ctx.fn=this;
    //获取调用参数
    let args=[...arguments].slice(1);
    //调用fn，保存结果
    let res=ctx.fn(...args);
    //删除delete
    delete ctx.fn;

    return res;
};

//测试
let you = {
    age: 17,
    name: 'stupid'
};

function person(age, name) {
    console.log(age);
    console.log(name);
    console.log(this.age, this.name);
}

person.myCall(you, 16, 'smart');
