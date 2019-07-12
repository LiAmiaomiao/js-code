function setInterval(func,interval){
    let last = +new Date();
    let timer;

    const loop = ()=>{
        let now = +new Date();
        timer = window.requestAnimationFrame(loop);
        if(now-last >= interval){
            last = now;
            func(timer);
        }
    };
    timer = window.requestAnimationFrame(loop);
    return timer;
}

let count = 0;
setInterval(timer =>{
    console.log(1);
    count++;
    if(count === 5) cancelAnimationFrame(timer);
},1000)

