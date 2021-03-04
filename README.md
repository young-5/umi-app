# umi-app

branch --dev

cli based on umi

 当前分支是开发分支 作为项目系统开发的初始模板。

## 项目初始化

1.  通过axios 进行异步请求
2.  antd ui 框架
3.  oi-ui 组件库
4.  基于redux的全局简易工具，redux-y5
5.  基于redux的权限验证
6.  基于echarts的可视化组件


## 项目结构


    -- config                               项目配置
        |----  config                           项目基础配置
        |----  proxy                            代理配置
        |----  routes                           路由配置
    -- mock                                 mock数据模拟
    -- src                                  项目源代码
        |----  assets                           静态文件
        |----  components                       公共组件
        |----  layouts                          全局布局
        |----  pages                            业务组件
        |----  services                         请求api
        |----  utils                            工具函数
        |----  global.less                      全局样式
    ...

## 项目初始化功能

### 登录页面

    目录 - user
    拥有账号登录和手机验证登录，并加入了图片验证 

### 权限

    登录缓存用户信息和权限，通过@/components/componentsTools/redux-y5进行redux的二次封装

### 可视化功能

    基于echarts的二次组件封装


###  路由 

    基于umi/router