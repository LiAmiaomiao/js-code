Array.prototype.map=function(fn,context){
    //[].slice.call将类数组转化为真正的数组
    //slice()默认返回所有下标的元素并返回新数组
    let arr=[].slice.call(this);
    let res=[];
    for(let i=0;i<arr.length;i++){
        //判断稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
        res.push(fn.call(context,arr[i],i,this));
    }
    return res;
};
