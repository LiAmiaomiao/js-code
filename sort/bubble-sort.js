//冒泡排序依此比较，交换相邻的元素大小（按照由小到大的顺序，如果符合这个顺序就不用交换）
//一次这样的循环可以得到一个最大值，需要n-1次排序完毕
//时间复杂度o(ne2)
//
function bubbleSort(target){
    for(var i=0,len=target.length;i<len;i++){
        for(var j=0;j<len-1;j++){
            if(target[j]>target[j+1]){
                var temp = target[j+1];
                target[j+1] = target[j];
                target[j]=temp;
            }
        }
    }
    return target;
}

moudle.exports= bubbleSort;
//改进方法：之前每趟都是得到最小值或者最大值，现在利用在每趟排序中进行正向和方向两边冒泡地方法得到两个最终值（最大值和最小值）
function bubbleSort2(arr){
  var low = 0;
  var high = arr.length-1;
  var tmp,j;
  while(low<high){
      for(j=low;j<high;++j){
          if(arr[j]>arr[j+1]){
              tmp = arr[j+1];
              arr[j+1] = arr[j];
              arr[j] = tmp;
          }
      }
      --high;
      for(j=high;j>low;--j){
          if(arr[j]< arr[j-1]){
              tmp = arr[j];
              arr[j]=arr[j-1];
              arr[j-1]=tmp;
          }
      }
      ++low;
  }
  return arr;
}
