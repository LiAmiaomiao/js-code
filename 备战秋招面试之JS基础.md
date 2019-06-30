### 备战秋招面试之JS基础

- 变量提升

  - 定义：在预编译的时候，会把函数及变量的声明提升到函数最顶部

  - let 的「创建」过程被提升了，但是初始化没有提升。
  - var 的「创建」和「初始化」都被提升了。
  - function 的「创建」「初始化」和「赋值」都被提升了。
  - const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。
  - let和const在全局下使用变量声明时，变量不会挂载到window上，而是挂在一个叫script全局上了

- JS有哪些数据类型及其区别

  基本数据类型：`Number`，`String`，`Boolean`，`null`，`undefined`，`Symbol`

  引用数据类型：`Object`

  区别：

              -  基本数据类型存储在栈（stack）中，引用数据类型存储在堆（heap）中
              -  基本类型存储的是值，引用类型存储的是指针
              -  原始值没有函数调用，比如undefined.tostring会报错，1.tostring虽然可以用，但是其实被转换成String对象了（包装类）

- typeof，instanceof（判断数据类型）

  - typeof对于原始值，除了null都能返回正确的类型；对于引用类型，除了函数，返回值都是Object
  - instanceof内部机制是通过原型链来判断的，比如A instanceof B的原理是看A的原型链上有没有B的原型

- 深拷贝和浅拷贝

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

- new的原理及实现

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

- 作用域及作用域链

  - 作用域：就是变量和函数的可访问范围。
  - 作用域共有两种主要的工作模型——词法作用域和动态作用域，JS采用词法作用域；词法作用域：无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定
  - 作用域分类：在ES6之前，只有函数作用域和全局作用域；在let和const出现之后，出现了块级作用域，例如let 关键字可以将变量绑定到所在的任意作用域
  - 作用域链:每一个 javaScript 函数都表示为一个对象，对象里有些属性我们可以访问，但有些不可以，这些属性仅供JavaScript引擎存取，[[scope]]就是其中之一，内部属性 [[Scope]] 包含了一个函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链

- IIFE（立即调用函数表达式）

  - 

- 闭包

  - 概念：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包

  - 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量

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

    - 解决方式三：利用setTimeout的第三个参数

      

