//IIFE:立即执行函数表达式
for(var i=0;i<3;i++){
    //闭包传参
    ((i)=>{
        setTimeout(()=>{
            console.log(i)
        },1000)
    })(i)
}
//返回undefined，打印1，2，3

for(var i=0;i<3;i++){
    //闭包传参，但是因为setTimeout传入立即执行函数，不会等1s后打印
    setTimeout(((i)=>{
        console.log(i)
    })(i),1000)
}
//返回值有时候是0，有时候是其他数字？？？，打印123

for(var i=0;i<3;i++){
    //对于上者的iffe,这里的iffe中返回一个函数
    setTimeout(((i)=>{
       return function(){
           console.log(i)
       }
    })(i),1000)
}
//有时返回4，有时返回其他值？？？打印1，2，3

for(var i=0;i<3;i++){
    //setTimeout的第三个参数，作用是传参
    setTimeout((i)=>{
        console.log(i)
    },1000,i)
}
//有时返回4，有时返回其他值？？？打印1，2，3

for(let i=0;i<3;i++){
    //setTimeout的第三个参数，作用是传参
    setTimeout((i)=>{
        console.log(i)
    },1000,i)
}
//有时返回4，有时返回其他值？？？打印1，2，3
