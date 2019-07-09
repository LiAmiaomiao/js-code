const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn){
    //为什么要保存this，因为代码可能会异步执行，用于获取正确的this对象
    const that = this;
    that.state = PENDING;
    that.value = null;
    //用于保存then中的回调，因为当执行完promise后状态可能还是等待中，这时候应该把then中的回调保存起来用于状态改变时使用
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];
    function resolve(value){
        if(that.state === PENDING){
            that.state = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }
    function reject(value){
        if(that.state === PENDING){
            that.value = REJECTED;
            that.value = value;
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }
    //如何执行promise中传入的函数
    try {
        fn(resolve,reject)
    }catch(e){
        reject(e)
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected){
    const that = this;
    onFulfilled = typeof onFulfilled==='function' ? onFulfilled : v=>v;
    onRejected = typeof onRejected === 'function'? onRejected : r=>{
        throw r;
    };
    if(that.state === PENDING){
        that.resolvedCallbacks.push(onFulfilled);
        that.rejectedCallbacks.push(onRejected);
    }
    if(that.state === RESOLVED){
        onFulfilled(that.value);
    }
    if(that.state === REJECTED){
        onRejected(that.value)
    }
};
