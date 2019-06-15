function ajax({url,method}){
    return new Promise((resolve,reject)=>{
        let request=new XMLHttpRequest();
        request.open(method,url);
        request.onreadystatechange=()=>{
            if(request.readyState===4){
                if((request.status>=200&&request.status<300)||request.status===304){
                    resolve.call(undefined,request.responseText)
                }else if(request.status>=400){
                    reject.call(undefined,request);
                }
            }
        };
        request.send();
    })
}

//自己敲
// function ajax1(url,method){
//     return new Promise((resolve,reject)=>{
//         var xhr=new XMLHttpRequest();
//         xhr.open(url,method);
//         xhr.onreadystatechange=(()=>{
//             if(xhr.readyState===4){
//                 if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
//                     resolve.call(undefined,xhr.responseText)
//                 }else if(xhr.status>=400){
//                     reject.call(undefined,xhr.responseText)
//                 }
//             }
//         });
//         xhr.send();
//     })
// }
