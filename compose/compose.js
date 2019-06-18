//compose属于redux的内容
//compose参数：函数（多个）
//返回值：函数
// from right to left. For example, compose(f, g, h) is identical to doing
//  * (...args) => f(g(h(...args))).
//柯里化函数
//举个栗子
//function a(x){
//    return (y,z)=>{
//        return b(x,y,z)
//    }
// }
//相当于
//function a(x,y,z){
//    return b(x,y,z)
// }
function compose(...funcs){
    if(funcs.length===0){
        return arg => arg
    }
    if(funcs.length===1){
        return funcs[0]
    }
    return funcs.reduce((a,b)=>(...args)=>{a(b(args))})
}
