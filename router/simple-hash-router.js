function Router(){
    this.routers={};
    this.currentUrl='';
}

Router.prototype.route = function(path,callback){
    this.routers[path] = callback || function(){}
};

Router.prototype.refresh = function(){
    // www.baidu.com/#/abc -> /abc
    this.currentUrl = location.hash.slice(1) || '/';
    this.routers[currentUrl] && this.routers[currentUrl]();
};

Router.prototype.init = function(){
    window.addEventListener('load',this.refresh());
    window.addEventListener('hashchang',this.refresh());
};

window.Router = new Router();
window.Router.init();

var content = document.querySelector('body');
function changeByColor(color){
    content.style.backgroundColor = color;
}
Router.route('/',function(){
    changeByColor('white')
});

