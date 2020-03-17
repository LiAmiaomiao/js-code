//创建类
class People {
  constructor(name, age) {
      this.name = name
      this.age = age
  }
  eat() {
      alert(`${this.name} eat something`)
  }
  speak() {
      alert(`My name is ${this.name},age is ${this.age}`)
  }
}
//创建实例（对象）
// let zhang = new People('zhang', 20)
// zhang.eat()
// zhang.speak()

//继承
class Student extends People {
  constructor(name, age, number) {
    super(name, age)
    this.number = number
  }
  study() {
    alert(`${this.name} study`)
  }
}


//
function loadImg(src) {
  let promise = new Promise(function (resolve, reject) {
    let img = document.createElement('img')
    img.onLoad = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
  })
  return promise
}


let src = 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=8&spn=0&di=149190&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=1312059974%2C1893880587&os=1089612698%2C2972884392&simid=0%2C0&adpicid=0&lpn=0&ln=1720&fr=&fmq=1584359099392_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F31%2F20160731101714_NsALZ.thumb.700_0.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bxtvt_z%26e3BgjpAzdH3FtvijAzdH3F14w-bbnmbl8_z%26e3Bip4s&gsm=9&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
let result = loadImg(src)
result.then(function (img) {
  alert(`width: ${img.width}`)
}).then(function (img) {
  alert(`height: ${img.height}`)
}).catch(function (ex) {
  console.log(ex)
})
