const proxy = (func, time) => {
    let last = +new Date();
    let handler = {
        apply(target,context,args){
        let now = +Date();
        if(now - last > time){
            last = now;
            Reflect.apply(func,context,args);
        }
    }
};
    return new Proxy(func,handler)
};