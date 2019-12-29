var http = require('http');
var fs = require('fs');
var url = require('url');
var querString = require('querystring')

function startServer(route, handle){
    var onRequest = function(request, response){
        var pathname = url.parse(request.url).pathname;
        var data = "";
        //第二种写法
        //var data = [];
        request.on('error',function(err){
            console.log(err);
        }).on('data',function(chunk){
            data += chunk;
            //data.push(chunk)
        }).on('end',function(){
            if(request.method === 'POST'){
                //防止数据撑爆服务器
                if(data.length>1e6){
                    request.connection.destroy();
                }
                //data = Buffer.concat(data).toString();
                route(handle,pathname,response,data);
            }else{
                var params = url.parse(request.url, true).query;
                route(handle,pathname,response,params)
            }
            route(handle,pathname,response,querString.parse(data))
        })

    }
    var server = http.createServer(onRequest);
    server.listen(3000, '127.0.0.1')
}

module.exports.startServer = startServer;