class SingleObject {
  login() {
    console.log('login..')
  }
}
//因为前端没有private，所以只能使用静态方法来模拟private
SingleObject.getInstance = (function() {
  let getInstance
  return function() {
    if(!instace) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = SingleObject.getInstance()
obj2.login()
console.log('obj1 === obj2', obj1 === obj2) //true

let obj3 = new SingleObject()
console.log('obj1 === obj3', obj1 === obj3) //false


//模拟登录框实例代码
class LoginForm {
  constructor(){
    this.state = 'hide'
  }
  show() {
    if(this.state === 'show') {
      alert('已经显示')
      return
    }
    this.state = 'show'
    console.log('登录框显示成功')
  }
  hide() {
    if(this.state === 'hide') {
      alert('已经隐藏')
      return
    }
    this.state = 'hide'
    console.log('登录框隐藏成功')
  }
}
LoginForm.getInstance = (function() {
  let instance
  if(!instance) {
    instance = new LoginForm()
  }
  return instance
})()

let login1 = LoginForm.getInstance()
login1.show()
let login2 = LoginForm.getInstance()
login2.hide()
console.log('login1 === login2',login1 === login2)