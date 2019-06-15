//apply(newObj,argsArray)：改变this指向，改变执行上下文，this指向第一个参数，第二参数是传递的数组
Function.prototype.myApply=function(ctx,arr){
   ctx = ctx ? Object(ctx) : window;
    //获取调用函数并挂载到第一个参数(被call者)
   ctx.fn = this;//this指向调用方法的对象
   var res;
   if(!arr){
       res=ctx.fn();
   }else{
       var args=[];
       for(var i=0,len=arr.length;i<len;i++){
           args.push('arr['+i+']');
       }
       res=eval('ctx.fn('+args+')');
   }
   delete ctx.fn;
   return res;
};
