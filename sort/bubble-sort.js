//冒泡排序
function bubbleSort(target){
    var temp;
    var arr = target;
    for(var i=0,len=arr.length;i<len-1;i++){
       for(var j=0;i<len-i-1;j++){
           if(arr[j]>arr[j+1]){
               temp = arr[j];
               arr[j]=arr[j+1];
               arr[j+1]=temp;
           }
       }
    }
    return arr;
}

moudle.exports= bubbleSort;

