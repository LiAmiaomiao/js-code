function Parent(){

}
function GrandParent(){

}
function Child(){
    Parent.call(this);
    GrandParent.call(this);
}

//挂载
Child.prototype=Object.create(Parent.prototype);
