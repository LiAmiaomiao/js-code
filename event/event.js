//初始化实现
function initEvent(node){
    let ev={};
    //绑定target
    ev.target=node;
    //初始化
    ev.isPropagationStoped=false;
    ev.isDefaultPrevented=false;

    ev.stopPropagation=function(){
        this.isPropagationStoped=true;
    };

    ev.preventDefaultPrevented=function(){
        this.isDefaultPrevented=true;
    };
    return ev;
}

//计算触发事件的节点到根节点的路劲
function getNodePath(ev){
    let target=ev.target;
    let els=[];
    //从内到外
    while(target){
        els.push(target);
        target=target.parentNode;
    }
    //[target, ... ,html]
    return els;
}

//触发capture
function executeCaptureHandler(els,ev){
    //[html,...,target]
    els.reverse();
    let cur;
    for(let i=0;i<els.length;i++){
        if(ev.isPropagationStoped) break;
        cur=els[i];
        let handles=cur._handles&&cur.handles[ev.type]&&cur._handles[ev.type]['capture']||[];
        ev.currentTarget=el;
        handles.forEach(hander=>{
            handler.call(cur,ev);
        })
    }
}

//触发默认事件
function executeDefaultHandler(ev){
    if(!ev.isDefaultPrevented){
        //a标签默认事件
        if(ev.type==='click'&& ev.tagName.toLowerCase()==='a'){
            window.location=ev.target.href;
        }
    }
}

//事件添加
HTMLNode.prototype.addEventListener = function(eventName,handler,useCapture=false){
    if(!this._handlers) this._handlers={};
    if(!this._handlers[eventName]){
        this._handlers[eventName]={
            capture:[],
            bubble:[]
        }
    }
    this._handlers[eventName][useCapture ? 'capture' : 'bubble'].push(handler)
};


