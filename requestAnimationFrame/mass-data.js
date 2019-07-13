//10w个li渲染，点击时alert其内容
//通过requestAnimationFrame分片渲染，事件委托

(function (){
    const parent = document.getElementsByTagName('parent');
    const total = 100000;
    const batchSize = 4;
    const batchCount = total/batchSize;
    let batchDone = 0;

    function append(){
        const fragment = document.createDocumentFragment();
        for(let i=0;i<batchSize;i++){
            const li = document.createElement('li');
            li.innerText = batchDone * batchSize + i;
            fragment.appendChild(li);
        }
        parent.appendChild(fragment);
        batchDone++;
        handleBatch();
    }
    function handleBatch(){
        if(batchDone < batchCount){
            //该回调函数会在浏览器下一次重绘之前执行
            requestAnimationFrame(append);  //append???
        }
    }
    handleBatch();
    parent.addEventListener('click',function(e){
        if(e.target.tagName === 'LI'){
            alert(e.target.innerText)
        }
    })
})();