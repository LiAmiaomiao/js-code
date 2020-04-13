### 备战秋招面试之Html与Css

### HTML
- doctype的作用是什么? 
  - doctype是html5标准网页声明，且必须声明再Html文档的第一行，来告诉浏览器的解析器用什么文档标准解析这个文档
  - 文档解析类型：
   - 怪异模式（BackCompat）
   - 标准模式（CSS1Compat）

- Html语义化
 - 定义：语义化是指使用恰当语义的Html标签，让页面具有良好的结构与含义
 - 优点：
   - 开发者友好：使用语义类标签增强可读性，便于团队的开发和维护
   - 机器友好：有利于搜索引擎的爬虫爬取有效信息（有利于SEO）
   - 语义类还支持读屏软件，根据文章可以自动生成目录

- 有哪些常用的meta标签
 - charset，用于描述html文档的编码形式
 ```
 <meta charset="utf-8">
 ```
 - http-equive，相当于http的文件头作用，可以设置http的缓存过期日期
  ```
  <meta http-equive="expires" content="Wed,20 Jun 2020 22:30:00 GMT">
  ```
 - viewport,web开发人员可以控制视口的大小和比例
  ```
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  ```
 - apple-mobile-web-app-status-bar-style，用于PWA应用自定义评估工具栏的颜色
  ```
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  ```
- src与href的区别
 - src指向外部资源。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载，编译，执行完毕
 - href指向网络资源所在位置。当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理

- img的srcset属性
 - 作用：srcset提供了根据屏幕条件选取图片的能力，可以设计响应式图片，和sizes同时使用，帮助浏览器选择一个正确的一个资源
   ```
    <img src="clock-demo-thumb-200.png"
         alt="clock"
         srcset="clock-demo-thumb-200.png 20w,
                 clock-demo-thumb-400.png 40w "
         sizes="(min-width:600px) 200px,50vw"        
    >
   ```
 - 还有一个标签，picture能实现和srcset的作用
  - 浏览器会选择最匹配子<source>元素，如果没有匹配的，就选择<img>元素的src属性中的URL，然后，所选图像呈现在<img>元素占据的空间中
   ```
    <picture>
      <source srcset="source-24.-200.jpg"
              media="(min-width:800px)">
      <img src="painted-hand-298-322.jpg"/>
    </picture>    
   ```  
- script标签中的defer和async的区别
 - defer：都是js异步加载，defer会等待文档被解析完毕后执行
 - async：脚本加载完毕后立刻执行   

### CSS

