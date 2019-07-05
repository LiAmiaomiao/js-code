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

  区别：

  - 基本数据类型存储在栈（stack）中，引用数据类型存储在堆（heap）中
  - 基本类型存储的是值，引用类型存储的是指针
  - 原始值没有函数调用，比如undefined.tostring会报错，1.tostring虽然可以用，但是其实被转换成String对象了（包装类）

- **typeof，instanceof（判断数据类型）**

  - typeof对于原始值，除了null都能返回正确的类型；对于引用类型，除了函数，返回值都是Object
  - instanceof内部机制是通过原型链来判断的，比如A instanceof B的原理是看A的原型链上有没有B的原型

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
      function deepClone(origin, target){
         let target = target || {};
         toStr = Object.prototype.toString;
         arrStr = "[object Arrray]";
         for(let prop in origin){
            //判断是否是自己的属性（排除原型）
            if(origin.hasOwnproperty(prop)){
              //判断是否是对象还是原始值
              if(typeof(origin[prop])== 'object'){
                 //判断是对象还是数组
                 toStr.call(orgin[prop])==arrStr ? [] : {};
                 //递归进行拷贝
                 deepClone(origin[prop],target[prop]);
              }else{
                 target[prop]=origin[prop];
              }
            }
         }
         return target;
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
  - 作用域链:每一个 javaScript 函数都表示为一个对象，对象里有些属性我们可以访问，但有些不可以，这些属性仅供JavaScript引擎存取，[[scope]]就是其中之一，内部属性 [[Scope]] 包含了一个函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链

- **闭包**

  - 概念：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包

  - 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量

  - 闭包的优点（作用）：

    - 实现公有变量
    - 可以做缓存（存储结构）
    - 可以实现封装，属性私有化
    - 模块化开发，防止污染全局变量

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

    - 多个对象通过 `__proto__` 的方式连接了起来组成了原型链

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

### 浏览器

- 事件机制

  - 事件触发三个阶段

    - IE8及更早的版本：目标阶段->冒泡阶段

      W3C:捕获阶段->目标阶段->冒泡阶段

    - 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件，将obj.addEventListener(type,handle,true)里的false改为true就可以触发捕获

      ![img](file:///C:\Users\Li_Ruli\AppData\Local\Temp\ksohtml2784\wps1.jpg) 

      目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；

      冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点）

  - 事件注册

    - dom元素行间直接绑定 

    - js中绑定   document.getElementById('XX').onclick=function(){};

    - 绑定事件监听函数  IE：obj.attachEvent(“on”+type,handle) 

      ​                             W3C:obj.addEventListener(type,handle,false)

      - 注：addEventListener的第三个值是一个布尔值，指定事件是否在捕获或冒泡阶段执行（true表示在捕获阶段执行，false表示在冒泡阶段）
      - `stopPropagation` 是用来阻止事件冒泡（也可以阻止事件捕获）
      - `stopImmediatePropagation` 也能实现阻止事件，还能阻止该事件目标执行别的注册事件。
      - `preventDefault()`阻止默认事件

  - 事件代理

    - 通过事件冒泡法原理，把里层所需要响应的事件绑定到外层
    - 子节点是动态生成的，那么事件注册就注册到父节点上
    - 事件代理的方式相较于直接给目标注册事件来说，有以下优点：
      - 节省内存
      - 不需要给子节点注销事件

- 跨域

  - 同源策略：同源指协议，域名，端口相同，同源策略是浏览器出于安全考虑而制定的策略，主要是用来防止 CSRF 攻击的
    - 当请求跨域的时候，请求一定发出去了，但是浏览器拦截了响应
    - 跨域是未来阻止用户读取到另一个域名下的内容，Ajax可以获取响应，

  - Jsonp
  - CORS
  - document.domain
  - PostMessage

- Event  Loop

  - 浏览器
  - Node

- 缓存

  - cookie，localstorage，sessionStorage，indexDB
  - service worker

- 渲染原理

  - 
  - repaint，reflow
  - 怎么减少repaint和reflow





