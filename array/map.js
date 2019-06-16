Array.prototype.map=function(fn,context){
    //[].slice.call将类数组转化为真正的数组
    //slice()默认返回所有下标的元素并返回新数组
    let arr=[].slice.call(this);
    let res=[];
    //让每个元素执行fn方法，并把值放入res中，作为新数组返回
    for(let i=0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue;
        res.push(fn.call(context,arr[i],i,this));
    }
    return res;
};
