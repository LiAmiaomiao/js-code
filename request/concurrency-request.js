class MUtitask{
    constructor(maxLimit = 5, callback = null){
        //最大并发
        this.maxLimit = maxLimit;
        //当前并发数
        this.currentRunning = 0;
        //请求队列
        this.requestQueue = [];
        //回调函数
        this.callback = [];
        //保存结果
        this.results = [];
    }
    pushRequest(req){
        this.requestQueue.push(req);
    }
    loop(){
         while(this.currentRunning<this.maxLimit&&this.requestQueue.length){
             let req = this.requestQueue.shift();
             this.currentRunning++;
             req
                 .then(res=>this.results.push(res))
                 .catch(err=>this.results.push(err))
                 .finally(()=>{
                     this.currentRunning++;
                     this.loop();
                 })
         }
         if(this.callback&&this.currentRunning===0){
             callback(this.results);
         }
    }
}
function callback(res){
    console.log(res);
}

const requestQueue = new MUtitask(5,callback);
const urls = Array(10).fill('https://www.baidu.com/');

urls.forEach(url=>{
    let task = ()=>{
        return fetch(url);
    };
    requestQueue.pushRequest(task);
});

requestQueue.loop();



Array.prototype.myDelete = function(){
    var arr=[].slice.call(this);
    var hash = [];
    var newArr = [];
    for(var i=0;i<arr.length;i++){
        if(hash.indexOf(arr[i])=== 1){
            newArr.push(arr[i])
        }
    }
    return newArr;
}
​var arr = [1,2,3,4,5,6,7,2,4,5,6,8]
​arr.myDelete();
