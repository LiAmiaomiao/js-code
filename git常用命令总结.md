  
  ##### git常用命令
  
  - clone master代码
    - `git clone +地址`
  - clone 特定分支代码
    - `git clone -b +分支名+地址`
  - 提交代码
    - `git status`查看状态
    - `git add . `（注意空格，‘.’表示add所有改动过的文件，也可以add文件名）
    - `git commit -m'描述`
    - `git push`
  - 切换分支
    - `git checkout+分支名`
    - `git checkout -b +分支名`表示新建分支并且切换到这个分支
  - 查看分支
    - `git branch`查看本地所有分支
  - 新建分支
    - `git branch +分支名`
  - 删除分支
    - `git branch -d + 分支名`
  - 合并代码
    - `git pull origin master`拉取master分支代码