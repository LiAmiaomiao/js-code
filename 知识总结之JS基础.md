### JS基础

### ECMAScript

- **变量提升**（var，let，const的区别）

  - 定义：在预编译的时候，会把函数及变量的声明提升到当前作用域的最顶部
  - Js变量有创建、初始化和赋值过程
  - let 的「创建」过程被提升了，但是初始化没有提升。
  - var 的「创建」和「初始化」都被提升了。
  - function 的「创建」「初始化」和「赋值」都被提升了。
  - const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。
  - let和const在全局下使用变量声明时，变量不会挂载到window上，而是挂在一个叫script全局上了
  - 如果不明白就看看这篇文章：https://www.jianshu.com/p/0f49c88cf169
- **JS有哪些数据类型及其区别**

  基本数据类型：`Number`，`String`，`Boolean`，`null`，`undefined`，`Symbol`，`BigInt`

  引用数据类型：`Object`
  
  BigInt:新出的数据类型，为了解决js的最大安全数字（2e53）之外的范围数字精度丢失问题 

  区别：

  - 基本数据类型存储在栈（stack）中，引用数据类型存储在堆（heap）中（一旦基本类型被闭包引用则成为常驻性能内存，会存储在堆里）
  - 基本类型存储的是值，引用类型存储的是存在堆里的地址
  - 基本类型参数传递的时候是按值传递，引用数据类型是按共享传递（也叫传递引用）
  - 原始值没有函数调用，比如undefined.tostring会报错，1.tostring虽然可以用，但是其实被转换成String对象了（包装类）
  
- **typeof，instanceof（判断数据类型）**

  - typeof对于原始值，除了null都能返回正确的类型；对于引用类型，除了函数，返回值都是Object
  - typeof返回的类型(8种)：number,string,boolean,undefined,symbol,bigint,function,object
  - instanceof内部机制是通过原型链来判断的，比如A instanceof B的原理是看A的原型链上有没有B的原型
  
  ````
  function myInstanceof(left,right){
    let prototype = right.prototype;
    left=left.__proto__;
    while(true){
      if(left===null||left===undefined)
        return false;
      if(prototype===left)
        return true
      left = left.__proto__
    }
  }
- **类型转换**
  
  - 转Boolean：在条件判断时，除了undefined，null，false，NaN，"",0,-0,其他所有值都转成true，包括所有对象
  - 对象转基本类型：可以调用valueOf和toString方法，区别是如果倾向于转换为 Number 类型的，就优先调用 valueOf；如果倾向于转换为 String 类型，就只调用 toString；其实际转换机制是运用toPrimitive算法
  - &和&&，|和||的区别：&和|是位运算，&&和||是逻辑运算；逻辑运算符&& || 中，如果&&的第一个运算数是false，就不再考虑第二个运算数，直接返回false；如果||的第一个运算数是true，也不再考虑第二个运算数，直接返回true。而&和|运算符却不是这样的，它们总是要比较两个运算数才得出结果，因而性能上&&和||会比&和|好
  - ===，==的区别：如果对比双方类型不一样时，==会进行类型转换
      - 顺便记一下类型转换过程：
      -1，首先判断两者类型是否相同，相同就比较大小
       2，类型不相同的话先判断是否存在对比null和undefined，存在就返回true
       3，判断两者类型是否为string和number，是的话将字符串转换为number
       4，判断一方是否存在boolean，是的话把boolean转为number再判断
       5，判断其中一方是否为object且另一方为string，number或者symbol，是的话把object转为原始类型再判断
  - 记几个常记错的
  ````
  typeof null = 'object'
  0 || 1  //1
  5 || 7  //5
  2 && 3  //3
  2 && 1  //1
  0 && 1  //0
  Number( 14 >= 10)  //1
  Number( 22 >= 10)  //1
  Number( 9 >= 10)   //0
  "" + [1,2,3]  //"1,2,3"
  1 + [1,2,3]  //"11,2,3"
  [] + [1,2,3]  //"1,2,3"
  [] + 1  //1

- **深拷贝和浅拷贝**

  - 浅拷贝

    - 解决的问题：对象类型在赋值的过程其实是复制了地址，会导致改变了一方其他也都被改变的情况

    - 使用`Object.assign`实现

      ```
      let a = { age:1 };
      let b = Object.assign( {} , a );
      ```

    - 使用展开运算符`...`  实现

      ```
      let a = {age:1};
      let b = {...a}
      ```
    - Array.prototype.concat()
     ```
      let arr = [1, 3, {
       username: 'kobe'
      }];
      let arr2=arr.concat();    
      console.log(arr2);
      ```
    - Array.prototype.slice()
     ```
      let arr = [1, 3, {
        username: ' kobe'
      }];
      let arr3 = arr.slice();
      console.log(arr3);
      ```
    关于Array的slice和concat方法的补充说明：Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。
    - 原生实现

      ```
      let shallowCopy = function(obj){
         if(typeof obj !== 'object') return;
         //根据obj的类型判断新建数组还是对象
         let newObj = obj instanceof Array ? [] : {};//也可以这么写：let newObj = Array.isArray(obj) ? [] : {}
         //遍历obj，并且判断是obj的属性才拷贝]
         for(let key in obj){25
            if(obj.hasOwnProperty(key)){
              newObj[key] = obj[key]
            }
         }
         return newObj;
      }
      ```
  - 如何在javascript中实现不可变对象？
      - 深拷贝
      - Immutable.js，Immutable.js是自成一体的一套数据结构，性能良好
      - immer，利用proxy特性，性能良好
  - 深拷贝

    - 解决的问题：浅拷贝只解决了第一层的问题，如果接下来的值还有对象的话，那么就需要深拷贝了

    - 使用`JSON.parse(JSON.stringify(object))` 实现

      ```
      let a = {
        age: 1,
        jobs: {
          first: 'FE'
        }
      }
      let b = JSON.parse(JSON.stringify(a))
      a.jobs.first = 'native'
      console.log(b.jobs.first) // FE
      ```

      缺陷：会忽略undefined和symblol，且不能序列化函数和不能解决循环引用的对象

     - 原生实现
            
        ```
        //第一版（简易版）
         function deepClone(obj){
            let newObj = {},
            toStr=Object.prototype.toString,
            arrStr = '[object Array]';
            for(let prop in obj){
                //排除原型
                if(obj.hasOwnProperty(prop)){
                    //判断是否是对象还是原始值
                    if(typeof(obj[prop])=='object'){
                        //判断是对象还是数组
                        toStr.call(obj[prop])==arrStr?[]:{};
                        //递归拷贝
                        deepClone(obj[prop])
                    }else{
                        newObj[prop]=obj[prop]
                    }
                }
            }
            return newObj
        }
       ```
       ```
       function deepClone(obj){
         function isObject(o){
           return (typeof o === 'object' || typeof o === 'function') && o !== null
         }
         if(!isObject(obj)){
           throw new Error('非对象')
         }
         let newObj = Array.isArray(obj) ? [] :{}
         //Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组,在这段代码里也就是要排除原型
         Reflect.ownKeys(obj).forEach(key => {
           newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
         })
         return newObj;
       }
       ```
    - 使用`MessageChannel`，当所需拷贝的对象含有内置类型并且不包含函数时可以使用它

    - 使用lodash（一个js工具库）的深拷贝函数
- **0.1+0.2 !== 0.3**
 - 原因：因为Js采用IEEE754双精度版本，存储的时候会把0.1先转换成二进制，0.1转换成二进制为0.00011（0011循环），再把它用科学计数法表示，最后再转成IEEE754的标准。因为js 是采用浮点数标准会裁剪掉数字，所以最后0.1不是0.1，变成了0.100000000000000002（16个0），0.2变成了0.2000000000002
 - 解决方法：parseFloat((0.1+0.2).toFixed(10))
- **new的原理及实现**

  - 调用new的过程

    1，新生成了一个对象

    2，链接到原型

    3，绑定 this

    4，返回新对象

  - 实现

    ```
    function create() {
      let obj = {} //创建一个空对象
      let Con = [].shift.call(arguments) //获取构造函数
      obj.__proto__ = Con.prototype //设置空对象的原型
      let result = Con.apply(obj, arguments) //绑定this并执行构造函数
      return result instanceof Object ? result : obj //确保返回值为对象
    }
    ```

- **作用域及作用域链**

  - 作用域：就是变量和函数的可访问范围。
  - 作用域共有两种主要的工作模型——词法作用域和动态作用域，JS采用词法作用域；词法作用域：无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定
  - 作用域分类：在ES6之前，只有函数作用域和全局作用域；在let和const出现之后，出现了块级作用域，例如let 关键字可以将变量绑定到所在的任意作用域
  - 作用域链:每个JavaScript函数都是一个对象，对象中有些属性我们可以访问，有些不可以，这些属性仅供JavaScript引擎存取，[[scope]]就是其中一个。当函数执行时，会创建一个称为执行期上下文的内部对象。[[scope]]指我们所说的作用域，其中存储了执行期上下文的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。（之前写的）
  - 作用域其本质是JavaScript在执行过程中会创建可执行上下文，可执行上下文中的词法环境中含有外部词法环境的引用，我们可以通过这个引用获取到外部词法环境的变量、声明等，这些引用串联起来一直指向全局的词法环境，因此形成了作用域链

- **闭包**

  - 概念：MDN的解释：闭包是函数和声明该函数的词法环境组合。我的理解函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包
  - 闭包 = 函数 + 函数体内可访问的变量的总和


  - 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量
  
   - 闭包的例子
      ```
      (function(){
         var a=1;
         function add(){
             var b =2;
             var sum = b+a;
             console.log(sum);
         }
         add()
      })()
    
    - 闭包的优点（作用）：
  
      - 实现私有变量
      ```
      function Person(){
          var name = 'hhh';
          this.getName = function(){
              return name;
          }
          this.setName = function(val){
              name = val;
          }
      }
      var p =new Person();
      p.getName()


  - 经典例题

    ```
    for (var i = 1; i <= 5; i++) {
      setTimeout(function timer() {
      console.log(i)
      }, i * 1000)
    }
    //打印一堆6
    ```

    - 解决方法一：把var换成let
    - 解决方法二：利用闭包

    ```
      for (var i = 1; i <= 5; i++) {
      5(function(j) {
          setTimeout(function timer() {
            console.log(j)
          }, j * 1000)
        })(i)
      }
    ```

    - 解决方式三：利用setTimeout的第三个参数（第三个参数会作为timer的参数传进去）

- **原型及原型链**
  - 原型：绝大部分函数（少数内建函数除外）都有一个prototype属性，这个属性是原型对象用来创建对象实例，而所有被创建出来的实例都会共享原型对象，这些实例可以访问原型对象的属性。

  - 每个对象都有 `__proto__` 属性，但只有函数对象才有 `prototype` 属性

  - 原型的 `constructor` 属性指向构造函数，构造函数又通过 `prototype` 属性指回原型

  - ```
    function Person(){this.name="Lisa"};
    let p1 = new Person();  //true
    p1.constructor == Person;  //true
    p1.__proto__ == Person.prototype;  //true
    p1.__proto__.constructor == Person;  //true
    Person.prototype.constructor == Person;  //true
    p1.__proto__.__proto__ == Object.prototype;  //true
    p1.__proto__.__proto__.__proto__ == null;  //true
    ```

  - ```
    var obj = { name : 'Lisa' };
    obj.constructor == Object;  //true
    obj.__prototo__ == Object.prototype;  //true
    obj.__proto__ == Object.prototype;  //true
    obj.__proto__.constructor == Object;  //true
    Object.prototype.constructor == Object;  //true
    obj.__proto__.__proto__ == null;  //true
    ```

  - ```
    //特殊
    Function.prototype.constructor == Function;  //true
    ```

  - 原型链

    - 每个对象都有__proto__属性，此属性指向该对象的构造函数的原型，多个对象通过 `__proto__` 的方式连接了起来组成了原型链
    - 要理解原型链，要记住那个经典原型链的图
- **this**
  - 普通函数：this指向window
  - 调用对象里的函数：指向调用函数的对象
  - 严格严格模式下，全局作用域里的this指向window，普通函数里的this等于undefined
  - 改变this指向：call，apply，bind指向传入的第一个参数
  - new：指向实例
  - **总结：this指向调用对象**
- **继承**
  附上稍微完整点的继承
  ````
  //方法一：
  function inherit(child,parent){
      let prototype = Object.create(parent.prototype);
      prototype.constructor = child;
      child.prototype=prototype;
  }
  function Parent(age){
      this.age=age;
      this.arr=[1,2];
  }
  Parent.prototype.getArr=function(){
      console.log(this.arr)
  };
  function Child(age){
      Parent.call(this,age);
  }
  inherit(Child,Parent);
  let instance=new Child();
  instance.arr.push(3);
  let instance2=new Child();
  
  //方法二：混合继承
  function Parent(){}
  function GrandParent(){}
  function Child(){
      Parent.call(this);
      GrandParent.call(this);
  }
  //挂载
  Child.prototype=Object.create(Parent.prototype);
  //混合
  //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  Object.assign(Child.prototype,GrandParent.prototype);
  //调整constructor
  Child.prototype.constructor = Child;

  ````

- **数组**

  - 改变原数组的方法：push，pop，shift，unshift，sort，reverse，splice

    不改变原数组方法：cancat，join，splite，toString，slice

  - 各种方法及其实现（看js-code）
  

  - 经典例题

    - 数组乱序：使用sort方法实现

      ```
      arr.sort(function(){
         return Math.random()-0.5
         })
      ```

    - 数组去重

      - 方法一：利用es6的set数据结构实现

        ```
        function unique2(arr){
            var x=new Set(arr);
            return [...x];
        }
        ```

      - 方法二：使用indexOf方法

        ```
        function unique4(arr){
            var hash=[];
            for(var i=0;i<arr.length;i++){
                if(hash.indexOf(arr[i])===-1){
                    hash.push(arr[i])
                }
            }
            return hash;
        }
        ```

      - 方法三：排序后相邻去重

        ```
        function uniqe3(arr){
            arr.sort();
            var hash=[arr[0]];
            for(var i=1;i<arr.length;i++){
                if(arr[i]!==hash[hash.length-1]){
                    hash.push(arr[i]);
                }
            }
            return hash
        }
        ```

    - 数组降维

      - 方法一：使用flat()
      ````
      [[1,2],[3.4],[5,6].falt()
      //[1，2，3，4，5，6]
      //可以在flat方法里放参数，表示要拉平的层级，例如上述例子需要拉平一层，
      //默认拉平一层
      [[1,2],[3,[4,5],6].falt(2)
      //[1，2，3，4，5，6]
      ````

      - 方法二：利用隐式转换，使用+符号链接一个对象，默认调用toString方法转为字符串，再使用字符串分割成字符串数组，最后默认转成数值形数组

        ```
        let arr = [[222, 333, 444], [55, 66, 77],[[123,456],[678,654]]];
        arr += '';
        arr = arr.split(',');
        console.log(arr);//[ "222", "333", "444", "55", "66", "77", "123", "456", "678", "654" ]
        ```

      - 方法三：利用join和split方法

        ```
        var arr = [1,[2,[[3,4],5],6]];
        arr=arr.join().split(',');
        console.log(arr);
        ```

      - 方法四：利用apply和concat转换（适合二维，若多维需使用递归

        ```
        var arr = [[0,0,1],[2,3,3],[4,4,5]];
        arr=[].concat.apply([], arr);//concat没有括号
        console.log(arr); // ==> [0, 0, 1, 2, 3, 3, 4, 4, 5]
        ```

- **函数**

  - 定义函数：普通函数（包括了构造函数），箭头函数
    - 区别：定义方式的不同和this的不同；普通函数的this指向调用它的对象，箭头函数的this指向其所在上下文的this，并且改变不了；箭头函数没有函数原型；箭头函数不绑定arguments,取而代之用rest参数…解决

  - call，apply，bind的区别及实现

    - 这三个方法作用都是改变执行上下文（即改变函数运行时this的指向），区别是，call从第二个参数起接收参数列表，apply的第二个参数是参数数组，bind从第二个参数开始接收的参数列表，但是返回值为函数

      ```
      //bind的使用方法
      var obj = {
          name: 'Dot'
      }
      function printName() {
          console.log(this.name)
      }
      var dot = printName.bind(obj)
      console.log(dot) // function () { … }
      dot()  // Dot
      ```

    - 这三种方法的实现（看js-code）
        ````
        //call的实现
        Function.prototype.myCall=function(ctx){
            //转基本类型为object，若不存在则挂到window上
            ctx=ctx?Object(ctx):window;
            //获取调用函数并挂到第一个参数（被call者）
            ctx.fn=this;
            //获取调用参数
            let args=[...arguments].slice(1);
            //调用fn，保存结果
            let res=ctx.fn(...args);
            //删除delete
            delete ctx.fn;
            return res;
        };
        //apply的实现
        Function.prototype.myApply = function(ctx,arg){
            //转基本类型为object，若不存在则挂载到window上
            ctx = ctx ? Object(ctx ): window;
            //获取调用函数并挂载到第一个参数(被call者)
            ctx.fn = this; //this是person:fn
            let res;
            if(!arg){
                res = ctx.fn();
            }else{
                res = ctx.fn(...arg)
            }
            //删除fn
            delete ctx.fn;
            return res;
        };
        //bind的实现
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
- **new**

  - 原理：

    - 新生成了一个对象
    - 链接到原型
    - 绑定 this
    - 返回新对象

  - 实现

    ```
    function create() {
      let obj = {}  //创建一个空对象
      let Con = [].shift.call(arguments)  //获取构造函数
      obj.__proto__ = Con.prototype  //设置空对象的原型
      let result = Con.apply(obj, arguments)  //绑定 this 并执行构造函数
      return result instanceof Object ? result : obj  //确保返回值为对象
    }
    ```

  - 注：对于创建对象来说，更推荐使用字面量的方式创建对象，因为使用new Object()的方式创建对象需要通过作用域链一层层找到Object

- **ajax**

  - 过程：

    - 创建XMLHttpRequest对象,也就是创建一个异步调用对象.
    - 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
    - 设置响应HTTP请求状态变化的函数.
    - 发送HTTP请求.
    - 获取异步调用返回的数据.
    - 使用JavaScript和DOM实现局部刷新.

  - 代码实现
  ````
    //es6版本
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
    //原生版本
    function ajax(url,method,body,success,fail){
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
  ````
- **Javascript代码执行机制**
  - 准备：在执行一段代码之前需要引擎（我们最常见的就是V8引擎，V8用于chrome浏览器和node中，由内存堆和调用堆栈两部分组成），除此之外，想要代码运行起来，除了引擎之外还需要JavaScript Runtime，因为引擎的作用是执行编译代码，分配内存，垃圾回收，无法进行ajax请求，设置定时器，相应事件等操作，而JavaScript Runtime为Javascript提供了一些对象和机制，使之能与外界交互。
  - 一段代码运行分为编译阶段和执行阶段
    - 编译阶段：词法分析，语法分析，预编译。编译阶段将函数与变量储存V8引擎的在内存堆里
    - 执行阶段：代码执行的时候不是一行一行执行，而是分块执行，块分为三类：全局代码块，函数代码块，eval代码块；
    - 同时执行阶段也是执行上下文的创建阶段，在执行上下文的创建阶段中，主要做三件事：决定this的指向，创建词法环境（词法环境分为全局环境，模块环境，函数环境），创建变量环境（变量环境也是一个词法环境，不同的是，词法环境被用来存储函数声明和变量（let和const）绑定，而变量环境只用来存储var变量绑定）
    - 执行过程借助于调用栈        


### DOM

- **事件绑定**

  - dom元素行间直接绑定   

  - js中绑定   document.getElementById('XX').onclick=function(){};

  - 绑定事件监听函数  IE：obj.attachEvent(“on”+type,handle) 

    ​                                W3C:obj.addEventListener(type,handle,false)

    注：addEventListener的第三个值是一个布尔值，指定事件是否在捕获或冒泡阶段执行（true表示在捕获阶段执行，false表示在冒泡阶段）

  - 解除事件绑定：

    ele.onclick=false

    ele.removeeventListener（type，fn，false）

    Ele.datchevent（‘on’+type，fn）

- **事件触发**

  事件触发有三个阶段：

  - `window` 往事件触发处传播，遇到注册的捕获事件会触发
  - 传播到事件触发处时触发注册的事件
  - 从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

- **事件模型**

  - JavaScript事件模型主要分为3种：原始事件模型（DOM0）、DOM2事件模型、IE事件模型。

    - 原始事件模型（DOM0）

      - 某个元素.onclick=function(){};在html中就是onclick属性加js语句

    - DOM2事件模型：捕捉-》目标-》冒泡

      - w3c是addEventListener(‘click’,function(){},false)

        IE是addEventListener(type,handle,false)

    - IE事件模型：目标-》冒泡

  - 事件委托（事件代理）

    - 利用事件冒泡的机制把里层所需要响应的事件绑定到外层
    - 应用场景：如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上
    - 优点：节省内存，不需要给子节点注销事件
      ```
       window.onload=function(){
        var oUl = document.getElementById('ul1');
        oUl.onclick = function(ev){
        // IE8或IE8以下的浏览器中，事件处理函数中使用的事件对象是window.event。
            // IE8以上浏览器或者其他标准浏览器，通常使用给事件处理阐述传递的事件对象ev。
            var ev = ev || window.event;
            // Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较（习惯问题）
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == 'li'){
              alert(123);
              alert(target.innerHTML);
            }
          }	
       } 
       ```  
- **防抖节流**
    - 防抖
    ```
    //防抖
    //在任务频繁触发的时候，若在一段时间内再触发这个函数，则函数重新计时
    const debounce = (fn, delay) => {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn.apply(this,args);
            },delay)
        }
    };
    ```
    - 节流
    ```
    //节流
    //指定时间间隔内执行一次任务
    //在任务频繁触发的时候，在时间间隔内只触发一次
    const throttle = (fn, delay=500) => {
        let flag = true;
        return (...args)=>{
            if(!flag) return;
            flag=false;
            setTimeout((...args)=>{
                fn.apply(this,args);
                flag=true;
            },delay)
        }
    }
    ```
- 用setTimeout实现setInterval
    ```
    function mySetInterval(fn, millisec){
      function interval(){
        setTimeout(interval, millisec);
        fn();
      }
      setTimeout(interval, millisec)
    }
   ```
##### JavaScript中的可枚举属性与不可枚举属性

- 在JavaScript中，对象的属性分为可枚举和不可枚举，它们是由属性的enumerable值决定的。
  - 如何判断？
    - js中基本包装类型的原型属性是不可枚举的，如Object，Array，Number
    - Object对象的propertyIsEnumerable()方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。（注意如果判断的属性存在于Object的原型内，直接返回false）
  - 枚举性的作用
    - 枚举性会影响以下三个函数的结果
      - for... in
      - Object. keys()
      - JSON. stringify()
- ##### 序列化：是把变量从内存中变成可存储或者传输的过程。

  在程序运行过程中，所有变量都是在内存里，比如定义一个对象：

  `let d = { name:'Bob', age:20, score=88 }`

  可以随时修改变量，比如把`name`改为`Bill`，但是一旦程序结束，变量所占用的内存就呗操作系统全部回收，如果没有把修改后的`Bill`存储到磁盘上，下次重新运行程序，变量又被初始化为`Bob`。

- ##### js对象的序列化与反序列化

  - ES5中提供了内置函数JSON.stringify()和JSON.parse()用来序列化和还原JavaScript对象
  - 序列化：对象===> 字符串
  - 反序列化：字符串===> 对象