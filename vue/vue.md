##### vue

- vue

  - 生命周期
  - 指令：

- VueX

  - ![image-20191127145520845](C:\Users\Li_Ruli\AppData\Roaming\Typora\typora-user-images\image-20191127145520845.png)

  - State

    - 

  - Getter

  - Mutation

    - 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation ， 每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。 

      ```
      //创建Mutation和提交Mutation
      new Vuex.Store({
        state,
        getters,
        actions,
        mutations,
        }),
      const mutations = {
        increment (state, payload) {
          state.count += payload.amount
        }
      }
      //提交
      store.commit('increment'，10)//第一个参数是type，第二个是参数
      //以对象的形式提交
      store.commit({
        type: 'increment',
        amount: 10
      })
      ```

      

  - Action

  - Moudle

  - 提交（commit）mutation===》store改变，状态更新

  - 注意

    - 获取状态对象：store.state

    - store.commit：用此方法触发状态更新

    - 在vue组件中的computed计算属性中读取store状态

      - 在根组件中注册组件，在子组件中通过this.$store.state访问store中的状态

      - 或者使用mapState辅助函数

        ```
        computed: {
            ...mapState({
              formData: state => state.user.formData,//user是个store，formData是个store里的参数
            }),
          },
          或者
          //当要取很多的时候用第二种
          computed: {
            ...mapState(“user”,{
              formData: state => state.formData,
              id:state => state.id
            }),
          },
        ```

        

- Vue CLI

  - vue-cli是一个基于vue.js进行**快速开发**的完整系统
  - CLI (`@vue/cli`) 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。它可以通过 `vue create` 快速创建一个新项目的脚手架，或者直接通过 `vue serve` 构建新想法的原型。 
  - CLI服务：
    - CLI 服务 (`@vue/cli-service`) 是一个开发环境依赖。它是一个 npm 包，局部安装在每个 `@vue/cli` 创建的项目中。 
    - CLI 服务是构建于 [webpack](http://webpack.js.org/) 和 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 之上的 
  - CLI插件：
    -  CLI 插件是向你的 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等。Vue CLI 插件的名字以 `@vue/cli-plugin-` (内建插件) 或 `vue-cli-plugin-` (社区插件) 开头 