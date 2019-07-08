//组合继承
function Parent(age){
    this.age=age;
    this.arr=[1,2];
}
Parent.prototype.getAge=function(){
    console.log(this.age);
};
function Child(age){
    //关键句
    Parent.call(this,age);
}

//关键句
//Child.prototype.__proto__=Parent.prototype;
Child.prototype=new Parent();
//这句话的意思也就是让实例的原型等于父类的原型
//相当于instance.__proto__=Parent.prototype;
//作用:继承父类的函数

//调整constructor指向自身构造函数(本来是指向Parent())
Child.prototype.constructor=Child; //???
Child.prototype.getArr=function(){
    console.log(this.arr);
};

let instance = new Child(10);
instance.getAge();//10
instance.getArr();//[1,2]

instance.arr.push(3);
instance.getArr();
let instance2= new Child(20);
instance2.getAge();//20
instance2.getArr(); // [1,2]

//实例上有一份属性，它的原型上还有一份同样的属性