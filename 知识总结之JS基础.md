### 备战秋招面试之JS基础

### ECMAScript

- **变量提升**（var，let，const的区别）

  - 定义：在预编译的时候，会把函数及变量的声明提升到函数最顶部
  - let 的「创建」过程被提升了，但是初始化没有提升。
  - var 的「创建」和「初始化」都被提升了。
  - function 的「创建」「初始化」和「赋值」都被提升了。
  - const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。
  - let和const在全局下使用变量声明时，变量不会挂载到window上，而是挂在一个叫script全局上了

- **JS有哪些数据类型及其区别**

  基本数据类型：`Number`，`String`，`Boolean`，`null`，`undefined`，`Symbol`

  引用数据类型：`Object`
  
  BigInt:新出的数据类型，为了解决js的最大安全数字（2e53）之外的范围数字精度丢失问题 

  区别：

  - 基本数据类型存储在栈（stack）中，引用数据类型存储在堆（heap）中
  - 基本类型存储的是值，引用类型存储的是存在堆里的地址
  - 原始值没有函数调用，比如undefined.tostring会报错，1.tostring虽然可以用，但是其实被转换成String对象了（包装类）

- **typeof，instanceof（判断数据类型）**

  - typeof对于原始值，除了null都能返回正确的类型；对于引用类型，除了函数，返回值都是Object
  - instanceof内部机制是通过原型链来判断的，比如A instanceof B的原理是看A的原型链上有没有B的原型
  ````
  function myInstanceof(left,right){
    let prototype = right.prototype;
    left=left.__prototype;
    while(true){
      if(left===null||left===undefined)
        return false;
      if(prototype===left)
        return true
      left = left.__proto__
    }
  }

- **深拷贝和浅拷贝**

  - 浅拷贝

    - 解决的问题：对象类型在赋值的过程其实是复制了地址，会导致改变了一方其他也都被改变的情况

    - 使用`Object.assign`实现

      ```
      let a = { age:1 };
      let b = Object.assign( {} , a );
      ```

    - 使用展开运算符`...`实现

      ```
      let a = {age:1};
      let b = {...a}
      ```

    - 原生实现

      ```
      let shallowCopy = function(obj){
         if(typeof obj !== 'object') return;
         //根据obj的类型判断新建数组还是对象
         let newObj = obj instanceof Array ? [] : {};
         //遍历obj，并且判断是obj的属性才拷贝
         for(let key in obj){
            if(obj.hasOwnProperty(key)){
              newObj[key] = obj[key]
            }
         }
         return newObj;
      }
      ```

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
    - 使用`MessageChannel`，当所需拷贝的对象含有内置类型并且不包含函数时可以使用它

    - 使用lodash（一个js工具库）的深拷贝函数

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
  - 作用域链:每个JavaScript函数都是一个对象，对象中有些属性我们可以访问，有些不可以，这些属性仅供JavaScript引擎存取，[[scope]]就是其中一个。当函数执行时，会创建一个称为执行期上下文的内部对象。[[scope]]指我们所说的作用域，其中存储了执行期上下文的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。

- **闭包**

  - 概念：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包

  - 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量
  
  - ```
    function a(){
      vat b = 'abc';
      function c(){
        console.log(b)
      }
      return b;
    } 
    a(); 
    ```

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
      ;(function(j) {
          setTimeout(function timer() {
            console.log(j)
          }, j * 1000)
        })(i)
      }
    ```

    - 解决方式三：利用setTimeout的第三个参数（第三个参数会作为timer的参数传进去）

- **原型及原型链**

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
- **this**
  - 普通函数：this指向window
  - 调用对象里的函数：指向调用函数的对象
  - 改变this指向：call，apply，bind指向传入的第一个参数
  - new：指向实例
- **继承**

  - 看js-code

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

    

- **this**

  - 判断this指向





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
  - 防抖节流
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

