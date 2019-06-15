//面向切片编程
//可以在一个函数的任意位置插入一个东西来执行
Function.prototype.before=function(beforefn){
    let self=this;//this指向fn
    return function(){
        beforefn.apply(this,arguments); //this指向window
        return self.apply(this,arguments)
    }
};
Function.prototype.after=function(afterfn){
    let self=this;//this指向after函数return的函数
    return function(){
        let res=self.apply(this,arguments); //this指向window
        afterfn.apply(this,arguments);
        return res
    }
};
let fn=()=>console.log('fn');
fn=fn.before(()=>{
    console.log('--bofore--')
   }).after(()=> console.log('--after--'));
fn();

