//混合继承：既继承模板 也继承原型对象，解决原型继承和类继承中的不足
function Parent(){

}
function GrandParent(){

}
function Child(){
    Parent.call(this);
    GrandParent.call(this);
}

//挂载
Child.prototype=Object.create(Parent.prototype);
//混合
//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
Object.assign(Child.prototype,GrandParent.prototype);

//调整constructor
Child.prototype.constructor = Child;

