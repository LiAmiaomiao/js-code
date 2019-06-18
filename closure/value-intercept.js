//隐式转换时会调用对象的toString或者valueOf方法
//获取值进行运算就调用valueOf，其他则调用toString
//重写了a上的toString()
const a ={
    i:1,
    toString(){
        return a.i++;
    }
};
a.toString();
// if(a==1 && a==2 && a===3 ) return true;
