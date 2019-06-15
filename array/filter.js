//filter() 方法接收两个参数，返回一个新的通过测试的新数组
  //callback函数：接收三个参数（element，index，array）
  //thisArg：执行callback时，用于this的值
Array.prototype.myFillter=function(fn,context){
    let arr=[].slice.call(this);
    let res=[];
    for(let i=0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue;
        fn.call(context,arr[i],i,this)&&res.push(arr[i]);
    }
    return res;
};
