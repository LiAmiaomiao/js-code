//防抖
//在任务频繁触发的时候，若在一段时间内再触发这个函数，则函数重新计时
const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay)
    }
};
