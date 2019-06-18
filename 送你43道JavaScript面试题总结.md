### 送你43道JavaScript面试题总结

链接：https://juejin.im/post/5d0644976fb9a07ed064b0ca

- 第3题，箭头函数和普通函数的this指向
  
-  对于箭头函数，this关键字指向是它所在上下文（定义时的位置）的环境
  
- 第11题，给构造函数添加属性时，如果要一次向所有对象添加功能，则必须使用原型，构造函数.prototype.属性= function(){}

  - 把方法加到原型中，它放在内存中的一个位置，并且都可以访问它

  - 构造函数.属性=function(){}也可以，不过这样会浪费大量内存空间，因为并不是每个实例都需要这个方法，这占用了每个实例的空间

- 第12题，若构造函数没有使用new，则返回undefined，并且构造函数this指向window

- 第12题，事件传播的三个阶段：捕获 >  目标 > 冒泡

- 第13题，基础对象指原型链终点的对象，基础对象的原型是null

- 第15题，

  - num++ ： 返回原来的num的值，增加1
  - ++num ： 增加1，返回原来的值+1

- 第16题

  ![1](C:\Users\Li_Ruli\AppData\Roaming\Typora\typora-user-images\1560821589188.png)

- 第17题，{age:18}==={age:18}和{age:18}=={age:18}都返回false
  - 在比较相等性，原始类型通过它们的值比较，而对象通过它们的引用性进行比较。JavaScript检查对象是否具有对内存中相同位置的引用。
  - 对象比较的时候，不管是“==”还是“===”，如果值相同，就会比较地址，地址不一样，返回false
- 第21题，eval的用法
  - eval会将传入的字符串当做JavaScript代码进行执行
  - 参数为String，会执行代码；参数不为String时，将会将参数原封不动的返回
  - 返回值为执行指定代码之后的返回值，如果返回值为空，则返回undefined
- 第24题，所有对象健（不包括Symbol）都会被存储为字符串，即使你没有给定字符串类型的键，所以，obj.hasOwnProperty('1')和obj.hasOwnProperty(1)一样；set不会，所以set('1')返回false，set(1)返回true
- 第25题，Javascript全局执行上下文创建了全局对象和this关键字
- 第29题，

![2](C:\Users\Li_Ruli\AppData\Roaming\Typora\typora-user-images\1560825085868.png)

- 第31题，导致事件的最深嵌套元素是事件的目标。

<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>

​       单击按钮时event.target是嵌套最深的元素，即<button>

​        打印button，second div，first div

- 第33题，call和bind的区别
  - call方法接收参数第一个为this指向，后面的都为传入的参数，并且函数立即执行，并返回执行结果（和apply不同之处在于apply接收两个参数，第二参数为参数数组）
  - bind方法和call传入的参数一样，但是bind返回一个原函数的拷贝，

- 第35题，JavaScript中有6个假值：
  - undefined
  - null
  - NaN
  - 0
  - ‘ ‘ （empty string）
  - false

- 第36题

  const numbers = [1, 2, 3];
  numbers[10] = 11;
  console.log(numbers);

打印：[1，2，3，7 * empty，11]

empty实际值为undefined

- 第40题，reduce方法，传入第二个参数是调用函数的初始值