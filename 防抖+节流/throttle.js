//节流
//指定时间间隔内执行一次任务
//在任务频繁触发的时候，在时间间隔内只触发一次
const throttle = (fn, delay=500) => {
    let flag = true;
    return (...args)=>{
        if(!flag) return;
        flag=false;
        setTimeout((...args)=>{
            fn.apply(this,args);
            flag=true;
        },delay)
    }
}