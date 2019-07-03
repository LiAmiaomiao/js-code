### ES6

- **let和const**

  - 暂存死区：
    - 通过 `let` 声明的变量直到它们的定义被执行时才初始化。在变量初始化前访问该变量会导致 `ReferenceError`。该变量处在一个自块顶部到初始化处理的“暂存死区”中。

- **Promise**

  - `Promise` 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值（返回值）。

  - 一个 `Promise`有以下几种状态:

    - *pending*: 初始状态。
    - *fulfilled*: 意味着操作成功完成。
    - *rejected*: 意味着操作失败。

  - **特点**：promise对象状态从pending改到fulfilled或者从pending改到rejected，只要这两种情况发生，就不会再改变，这个时候就称为定型resolved。

  - **参数**是一个带有 `resolve` 和 `reject` 两个参数的函数 。

    - resolve函数：将状态从pending变为fulfilled，并将异步操作的结果作为参数传递出去
    - reject函数：将状态从pending变为rejected，并将异步操作报出的错误作为参数传递出去

  - 语法：`new Promise( (resolve , reject ) => { })`

  - 方法

    - Promise.all(iterable)：用于处理多个promise对象的集合状态
      - 该方法返回一个新的promise对象，该promise对象在iterable参数对象里所有promise对iterable象都成功的时候才会触发成功
      - 当有一个iterable里面的promise对象失败则立即触发该promise对象的失败状态，则会把iterable里第一个触发失败的promise对象的信息错误作为失败错误信息
      - 当该promise对象触发成功状态以后，会把一个包含iterable里所有promise返回值得数组作为成功回调得返回值
    - Promise.race()
      - 当iterable参数列表里任意一个promise被成功或者失败之后，父promise会马上将子promise的成功返回值或者失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象
    - Promise.reject(reason)
      - 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
    - Promise.resolve(value)
      - 返回一个状态由给定value决定的promise对象；若该value是带有then方法的对象，则返回的最终状态由then方法决定，若不是，则状态为fulfilled，并讲value值传递给then方法

  - Promise原型：

    - 属性：Promise.prototype.constructor

    - 方法：

      Promise.prototype.catch(onRejected)

      Promise.prototype.then(onFulfilled，onRejected)

      Promise.prototype.finally(onFinally)

  - 优缺点：`Promise` 也很好地解决了回调地狱的问题，缺点比如无法取消 `Promise`，错误需要通过回调函数捕获。

  - 实现Promise（看js-code）

- **Class**

  - 语法：`class name [extends]{ }`

  - ```
    //构造函数中使用的super()只能在构造函数中使用，并且必须在this关键字前调用
    class A{
       constructor(width){
          this.width = width;
       }
    }
    class B extends A{
       constructor(width){
          super(width);
          this.name = 'B'
       }
    }
    ```

  - 注意：

    - 类声明不可以提升
    - 重复声明一个类会引起类型错误

- **Async  Await**

  - 当方法调用async函数是，会返回一个Promise对象，当这个async函数返回一个值时，Promise的reslve会负责传递这个值；当async函数抛出异常时，Promise的reject方法也会传递这个异常值。

  - await关键字仅在async function中有效，否则会报语法错误

  - ```
    async function async1(){
       await async2();
       ...
    }
    //相当于
    function async1(){
      return Promise.resolve(aysnc2).then(()=>{
         .....
         )}
      }
    }
    ```

- **Proxy**

  - 用于定义基本操作的自定义行为

  - 语法：`let p = new Proxy(target , handler)`

  - 参数：

    - target：用Proxy包装的目标对象（可以时任何类型的对象）

      - 一共有 13 种可代理操作，如果没有定义某种操作，那么这种操作会被转发到目标对象身上。

      - 列举几个

        ```
        hander ： {
        
           set(){},  //设置的时候要做的操作
        
           get(){},  //获取的时候要做操作
        
           deleteProperty(){},  //删除的时候要做的操作
        
           has(){},  //判断有没有某种属性的时候会调用
        
           apply(){}  //调用函数处理
        
           ....
        
        }
        ```

    - handler：一个对象，其属性是当执行一个操作时定义代理的行为的函数

  - 方法：Proxy.revocable()：创建一个可撤销的proxy对象

  - Vue3.0使用了Proxy来代替`Object.definedProperty`实现数据响应，代码看js-code

- **Set**

  - set类似于数组，本身是一个构造函数，用于生成数据结构，成员都是唯一的
  - 参数：具有iterable 接口的其他数据结构（对象不是）
  - set内部判断两个值是否相同时使用的算法叫做“same-value equality"，类似于===（在set内部，两个NaN相等）
  - Set实例的属性
    - Set.prototype.constructor：默认是set函数
    - Set.prototype.size
  - Set实例的方法
    - 操作数组的方法：add(value)，delete(value)，has(value)，clear
    - 遍历操作：keys()返回键名，values()返回键值，entries()返回键值对，forEach()
  - 注:Set结构没有键名，只有键值（或者说键名和键值是同一个值）

- **WeakSet**

  - 和Set的区别：
    - WeakSet的成员只能是对象
    - WeakSet的对象都是弱引用，垃圾回收机制不考虑WeakSet对该对象的引用
    - WeakSet不可遍历，无size属性
  - 方法：add(value)，delete(value)，has(value)
  - 优点：存储dom结构时不用担心节点移除时引发内存泄漏

- **Map**

  - 解决的问题：js的对象（Object）本质上是键值对的集合（Hash结构），但是只能用字符串作键，当键名为一个Dom节点时，会被自动转为字符串[ Object ， HTMLDivElement]
  - Map类似于对象，各种类型的值都可以当作键，是“值---值”的对应
  - 参数：具有iterable 接口且每一个成员都是双数组的数据结构（对象不是）
  - 实例的属性：size
  - 实例的方法：set(key , value)，get( key ) , has( key ) , delete( key ) , calear()
  - 遍历方法：keys()返回键名，values()返回键值，entries()返回键值对，forEach()
  - 与其他数据结构的相互转换
    - Map --> 数组：用（...）运算符
    - 数组 --> Map：传入数组即可
    - Map --> 对象：若Map的所有键都是字符串，则可以转为对象

- **WeakMap**

  - 和Map的异同
    - 同：都是用于生成键值对
    - 异：
      - WeakMap只接受对象作为键名（bull除外）
      - WeakMap所指向的对象不计入垃圾回收机制
      - 在api上无遍历操作，不支持clear方法，无size属性
  - 实例的方法：set(key , value)，get( key ) , has( key ) , delete( key )
  - 只要外部引用消失，WeakMap内部的引用就会自动被垃圾回收清除
  - WeakMap有助于防止内存泄漏，还可以用于部署私有属性

- **模块化**

  - 模块化的好处：

    - 解决命名冲突
    - 提高复用性
    - 提高代码可维护性

  - 立即执行函数（ES5的时候）

  - AMD和CMD

  - CommonJS

    - export和moudle.export用法相似，var exports = module.exports表示export和moudle.export享有相同地址，所以不能对exports赋值，这样会导致exports不再和module.exports指向同一个地址

    ```
    // a.js
    module.exports = {
        a: 1
    }
    // or 
    exports.a = 1
    
    // b.js
    var module = require('./a.js')
    module.a // -> log 1
    ```

  - ES Module：原生实现得模块化方案

    ```
    // 引入模块 API
    import XXX from './a.js'
    import { XXX } from './a.js'
    // 导出模块 API
    export function a() {}
    export default function() {}
    ```

  - CommonJS和ES Moudle的区别

    - CommonJS 支持动态导入，也就是 `require(${path}/xx.js)`，后者目前不支持，但是已有提案
    - CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
    - CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
    - ES Module 会编译成 `require/exports` 来执行的

    

- **Generator**

  - Generator是是ES6标准引入的新的数据类型（可以理解为和function差不多的一种数据类型）

  - 方法

    - Generator.prototype.next()：返回一个由 yield表达式生成的值。
    - Generator.prototype.return()：返回给定的值并结束生成器。
    - Generator.prototype.throw()：向生成器抛出一个错误。

    ```
    function *foo(x) {
      let y = 2 * (yield (x + 1))
      let z = yield (y / 3)
      return (x + y + z)
    }
    let it = foo(5)
    console.log(it.next())   // => {value: 6, done: false}
    console.log(it.next(12)) // => {value: 8, done: false}
    console.log(it.next(13)) // => {value: 42, done: true}
    ```

    

- **js异步**
  - 回调函数
  - Generator
  - Promise
  - async，awiat
  - 定时器函数（setTimeout，setInterval）