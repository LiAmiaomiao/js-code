// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
//callback参数：
// accumulator (acc) (累计器)
// current Value (cur) (当前值)
// current Index (idx) (当前索引)
// source Array (src) (源数组)
//initialValue：作为第一次调用callback函数时的第一个参数的值，若没传入，则将使用数组中的第一个元素
//注意：若传入initialValue，则reduce会从索引1的地方开始执行；
//      若没有传入initialValue，则reduce会从索引0的地方开始执行
Array.prototype.myReducer=function(fn,initVal){
    let arr=[].slice.call(this);
    let res;
    let startIndex=0;
    if(!initVal){
        for(let i=0;i<arr.length;i++){
            if(!arr.hasOwnProperty(i)) continue;
            startIndex=i;
            res=arr[i];
            break;
        }
    }else{
        res=initVal;
    }
    for(let i= ++startIndex;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue;
        res=fn.call(null,res,arr[i],i,this);
    }
    return res;
};
