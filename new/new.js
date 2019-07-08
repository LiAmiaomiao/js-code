function myNew(){
    //创建空对象
    let obj = new Object();
    //获取构造函数
    //这种用法的意思就是让类数组arguments拥有slice方法
    //因为类数组arguments是类数组，没有slice方法
    let Constructor = [].shift.call(arguments);
    //链接原型
    obj.__proto__=Constructor.prototype;
    //调用父构造函数继承
    let res = Constructor.apply(obj,arguments);
    //只返回对象 优先级：构造函数返回>新创建
    return res instanceof Object ? res : obj;
}

module.exports = myNew;
