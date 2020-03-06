//假姐之前的版本
const PENDING = 'pending';
const FULFILL = 'fulfill';
const REJECT = 'reject';
function Promise(fn){
    console.log('begin');
    let state = PENDING;//初始化状态
    let value = undefined;//保存resolve值
    let deferred = null;//保存异步回调函数
    let res;
    function resolve(newValue){
        console.log('resolve'+ newValue);
        value = newValue;
        state = FULFILL; //PENDING ---> FULFILL
        if(deferred){
            handle(deferred);//调用回调函数
        }
    }
    function handle(handler){
        console.log('handle');
        console.log(handler);
        if(state===PENDING){
            console.log('def');
            deferred = handler;
            return;
        }
        if(!handler.callback){
            console.log('!callback');
            handler.resolve(value);
            return;
        }
        res = handler.callback(value);
        handler.resolve(res);
    }
    this.then = function(callback){
        console.log('then');
        return new Promise(function(resolve){
            handle({
                callback:callback,
                resolve:resolve
            });
        });
    };
    console.log('go');
    fn(resolve);
}
//测试
function test(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            resolve('promise finish')
        },500);
    });
}
let func=test();
func.then(res=>{
    console.log(res+'first');
    return res + 'first'
})
.then(res=> console.log(res + 'second'));

//掘金大佬的版本
class MyPromise {
    constructor(executor) { //executor执行器
      this.status = 'pending'; //默认等待状态
      this.value = undefined; //成功的值
      this.reason = undefined //失败的原用
      //存放then成功，失败的回调的数组
      this.onResovleCallbacks = [];
      this.onRejectedCallbacks = [];
      
      let resolve = (value) => {
        if (this.status === 'pending') {
          this.status = 'resolved'; //成功
          this.value = value;
          this.onResovleCallbacks.forEach(fn => fn());
        }
      }
      let reject = (reason) => {
        if (this.status === 'pending') {
          this.status = 'rejected'; //失败
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fn => fn());
        }
      }
      executor(resolve, reject); //默认上执行器执行
    }
    then(onFufilled, onRejected) {
      if (this.status === 'resolved') { //成功态
        onFufilled(this.value);
      }
      if (this.status === 'rejected') { //失败态
        onRejected(this.reason);
      }
      if (this.status === 'pending') {
        this.onResovleCallbacks.push(() => {
          onFufilled(this.value)
        });
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }
    }
  }
  
  module.exports = MyPromise
  