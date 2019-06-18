//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
//参数：target，source
//返回值：目标对象
//
Object.prototype.myAssign=function(target){
    if(target==null){
        throw new TypeError('Cannot convert undefined or null to object');
    }
    //获取剩余参数,也就是源对象，注意，可能有多个，所以这里用arguments
    let args=[...arguments].slice(1);
    //转成对象
    let obj=Object(target);
    args.forEach(arg=>{
        Reflect.ownKeys(arg).forEach(key=>{
            obj[key]=arg[key];
        })
    });
    return obj;
};

//测试
let a = {
    name: "tom",
    age: 18
};
let b = {
    name: "sam",
    other: {
        age: 23
    }
};
let c = Object.myAssign(a, b);
console.log(c);
console.log(a === c);

