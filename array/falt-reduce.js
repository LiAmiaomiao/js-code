//flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
//参数：depth（可选）指定要提取嵌套数组的结构深度，默认值为 1。
//返回值：一个包含将数组与子数组中所有元素的新数组。
//一看这个函数，可以用到数组降维里（废话）
Array.prototype.myFlat=function(depth=1){
    let arr=[].slice.call(this);
    if(depth===0) return arr;
    return arr.reduce((pre,cur)=>{
        if(Array.isArray(cur)){
            return [...pre,...Array.prototype.myFlat.call(cur,depth-1)];
        }else{
            return [...pre,cur]
        }
    },[])
};
