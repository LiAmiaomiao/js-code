//快速排序
function quikeSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    var leftArr = [];
    var rightArr = [];
    var q = arr[0];
    for(var i=0,len=arr.length;i<len;i++){
        if(arr[i] > q){
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }
    return [].concat(quikeSort(leftArr),[q], quikeSort(rightArr));
}
moudle.exports = quikeSort;
