//参数：
// proto
// 新创建对象的原型对象。
// propertiesObject
// 可选。是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。没有指定为 undefined。则。
// propertiesObject包含的属性
// 1，configurable
// true 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除。
// 默认为 false
// 2，enumerable
// true 当且仅当在枚举相应对象上的属性时该属性显现。
// 默认为 false
// 3，value
// 与属性关联的值。可以是任何有效的JavaScript值（数字，对象，函数等）。
// 默认为 undefined.
// 4，writable
// true当且仅当与该属性相关联的值可以用assignment operator改变时。
// 默认为 false
// 5，get
// 作为该属性的 getter 函数，如果没有 getter 则为undefined。函数返回值将被用作属性的值。
// 默认为 undefined
// 6，set
// 作为属性的 setter 函数，如果没有 setter 则为undefined。函数将仅接受参数赋值给该属性的新值。
// 默认为 undefined
function inherit(subType,superType){
    subType.prototype=Object.create(superType.prototype,{
        constructor:{
            enumerable:false,
            configurable:true,
            writable:true,
            value:subType.constructor
        }
    });
    //Object.setPrototypeOf（设置一个指定的对象的原型）的参数
    //obj
    // 要设置其原型的对象。
    // prototype
    // 该对象的新原型(一个对象 或 null).
    Object.setPrototypeOf(subType,superType)
}
