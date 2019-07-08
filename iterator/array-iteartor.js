//如何部署Iterator接口
//Iterator接口部署在对象的Symbol.Iterator属性上, 可以调用这个属性，就得到遍历器对象。
const arr= [1,2,3,4];
//iterator
//Symbol.iterator会返回一个对象，这就是一个遍历器对象
//console.log(arr[Symbol.iterator]()); //[Symbol.iterator]()
let iterator = arr[Symbol.iterator]();
//每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。
for(let res;(res=iterator.next())&& !res.done;){
    console.log(res.value)
}

