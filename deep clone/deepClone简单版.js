function deepClone(obj){
    let newObj = {},
    toStr=Object.prototype.toString,
    arrStr = '[object Array]';
    for(let prop in obj){
        //排除原型
        if(obj.hasOwnProperty(prop)){
            //判断是否是对象还是原始值
            if(typeof(obj[prop])=='object'){
                //判断是对象还是数组
                toStr.call(obj[prop])==arrStr?[]:{};
                //递归拷贝
                deepClone(obj[prop])
            }else{
                newObj[prop]=obj[prop]
            }
        }
    }
    return newObj
}