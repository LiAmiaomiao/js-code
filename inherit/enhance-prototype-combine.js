function inherit(child,parent){
    //创建原型副本
    //Object.create()，第一个参数是新创建的原型对象
    // 第二个参数可选，如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
    let prototype = Object.create(parent.prototype);
    //增强对象，构造函数调整
    prototype.constructor = child;
    //挂载原型
    child.prototype=prototype;
}

function Parent(age){
    this.age=age;
    this.arr=[1,2];
}
Parent.prototype.getArr=function(){
    console.log(this.arr)
};
function Child(age){
    Parent.call(this,age);
}

inherit(Child,Parent);
let instance=new Child();
instance.arr.push(3);
let instance2=new Child();

console.log(instance.arr);
console.log(instance2.arr);

// 只调用一次父构造函数，同时保持原型链，正常使用instanceof等，是较成熟的方法
