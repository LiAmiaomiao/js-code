Function.prototype.myBind=function(ctx){
  //保存this
  let self=this;
  //截取数组
    let args=[...arguments].slice(1);

    let fn=function(){
        return self.apply(
            this instanceof fn ? this : ctx,
            args.concat([...arguments])
        )
    };
    fn.prototype=Object.create(this.prototype);
    return fn;
};

