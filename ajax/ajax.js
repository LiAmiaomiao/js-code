function ajax(url,method,body,success,fail){
    // var request=null;
    // if(window.XMLHttpRequest){
    //     request=new XMLHttpRequest();
    // }else{
    //     //兼容IE5，IE6
    //     request=new ActiveXObject('Microsoft.XMLHTTP');
    // }
   var request=new XMLHttpRequest();
   request.open(method,url);
   request.onreadystatechange=function(){
       if(request.readyState===4){
           if((request.status>=200 &&request.status<300)||request.status===304){
               //当call或apply的第一个参数为null || undefined时 this指向window ||global(node中)
               success.call(undefined,request.responseText);
           }else if(request.status>=400){
               fail.call(undefined,request);
           }
       }
   };
   request.send(body)
}

//自己敲
// function ajax1(url,method,body,success,fail){
//     var xhr=new XMLHttpRequest();
//     xhr.open(url,method);
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState===4){
//             if((xhr.status>=200||xhr.status<300)||xhr.status===304){
//                 success.call(undefined,xhr.responseText)
//             }else if(xhr.status>=400){
//                 fail.call(undefined,xhr.responseText)
//             }
//         }
//     };
//     xhr.send(body)
// }
