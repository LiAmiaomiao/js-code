//冒泡排序依此比较，交换相邻的元素大小（按照由小到大的顺序，如果符合这个顺序就不用交换）
//一次这样的循环可以得到一个最大值，需要n-1次排序完毕
//时间复杂度o(ne2)
//通过
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

function bubbleSort2(target){

}