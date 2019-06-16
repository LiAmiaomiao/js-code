//some() 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。
//参数：callback，arg
//callback的参数：element(当前执行的元素),index,arr
//arg：执行callback时使用的this值
//返回值：boolean
Array.prototype.mySome=function(fn,arg){
    let arr=[].slice.call(this);
    if(!arr.length) return false;
    let res;
    //让数组每一项都执行fn，并把值传入res，若res不为存在，则return false
    for(let i=0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue;
        res=fn.call(arg,arr[i],i,this);
        if(res) return false;
    }
    return false;
};

