//堆排序
function heapify(arr,index,len){
    let left = 2 * index + 1;//左节点
    let right = 2 * index +2;//右节点
    let max = index;
    if(left < len && arr [left]>arr[max]){
        max = left;
    }
    if(right<len&&arr[right]>arr[max]){
        max = right;
    }
    let temp;
    if(max !== index){
        temp = arr[index];
        arr[index] = arr[max];
        arr[max]=temp;
        heapify(arr,max,len);
    }
}
//堆排序
function heapSort(arr){
    //建堆
    let heapSize = arr.length;
    for(let i = Math.floor(heapSize/2)-1;i>= 0;i--){
        heapify(arr,i,heapSize);
    }
    //堆排
    let temp;
    for(let j=heapSize-1;j>=1;j--){
        temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;
        heapify(arr,0,--heapSize);
    }
    return arr;
}
