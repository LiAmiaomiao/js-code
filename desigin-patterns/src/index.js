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
