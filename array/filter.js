//filter() 方法
// 参数：callback，thisArg（可选）
// 返回值：通过测试的新数组
  //callback函数：接收三个参数（element，index，array）
  //thisArg（可选）：执行callback时，用于this的值
Array.prototype.myFillter=function(fn,context){
    //让类数组转成数组
    let arr=[].slice.call(this);
    let res=[];
    //遍历arr数组的每个元素，让它执行传入的callback（也就是fn函数）
    for(let i=0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue;
        //若存在context，则让callback函数的this指向它
        fn.call(context,arr[i],i,this)&&res.push(arr[i]);
    }
    return res;
};
