//闭包：函数A内部有一个函数B，函数B可以访问到函数A中的变量，那么函数B就是闭包
//前端面试之道03js基础二
//经典例题
for(var i=1;i<=5;i++){
    setTimeout(function timer(){
        console.log(i);
    },i*1000)
}
//打印一堆6
//解决方法-
for(var i=1;i<=5;i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j);
        },i*1000)
    })(i)
}
//解决方法二
for(var i=1;i<=5;i++){
    setTimeout(function timer(j){
        console.log(j);
    },i*1000,i)
}
//解决方法三
for(let i=1;i<=5;i++){
    setTimeout(function timer(){
        console.log(i);
    },i*1000)
}
