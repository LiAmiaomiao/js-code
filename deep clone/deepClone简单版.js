function deepClone(obj){
    if(typeof obj !=='object'){
        new Object(obj)
    }
    let newObj = Array.isArray(obj)?[]:{},
    toStr=Object.prototype.toString;
    for(let prop in obj){
        //排除原型
        if(obj.hasOwnProperty(prop)){
            //判断是否是对象还是原始值
            if(typeof(obj[prop])=='object'){
                //判断是对象还是数组
                toStr.call(Array.isArray(obj[prop]))?[]:{};
                //递归拷贝
                deepClone(obj[prop])
            }else{
                newObj[prop]=obj[prop]
            }
        }
    }
    return newObj
}