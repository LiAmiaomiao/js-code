//借用构造函数继承
function Parent(){
    this.age=30;
    this.arr=[1,2];
}
Parent.prototype.getName=function(){
    return this.arr.length;
};
function Child(){
    Parent.call(this);
}

let instance=new Child();
instance.arr.push(3);
let instance2=new Child();

console.log(instance.arr);
console.log(instance2.arr);
//不能继承原型上的方法
instance.getArr(); //报错

//不能继承原型，并且每个子类都有父类的实例副本，浪费性能