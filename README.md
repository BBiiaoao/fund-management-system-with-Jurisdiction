# fund-management-system-with-Jurisdiction
这是一个使用vue搭建的一个带权限的基金管理系统
## 技术概览
>
- 后端接口:Node+express+jwt
- 前端:VueCli3.0+ElementUI
- 数据请求和拦截:Axios+Mlab+MongoDB
>
---
## 数据库
数据都存放于mongoDB线上数据库mlab
---
## 后端
>
- 后端开发框架:使用基于Node.js平台的web应用开发框架express
- 后端操作MongoDB:使用mongoose
- 密码加密:用户注册后,使用bcrypt进行加密，传入数据库
- 返回token:用户登陆后使用jsonwebtoken返回一个token，用之于安全验证
- 验证token:使用passport对发起的请求需要验证token
>
---
## 前端
>
- UI界面:基于饿了么的ElementUI
- 解析token:使用jwt_decode解析后端传来的token
- token解析后的信息存储:将token解析后的用户信息存储在vuex中，方便组件间通信
- 存储token:将token存储于localstorage中
- 请求拦截:每次请求的时候加载动画,同时将储存在本地的token添加在请求头中
- 响应拦截:请求结束后结束加载动画,成功则跳转页面,失败的话(token过期)则自动返回登陆页面
- 用户头像:使用全球公认头像gravatar,可以绑定用户邮箱使用，如果邮箱没有头像，则使用其提供的默认头像
>
---
## 截图预览
1. 登陆注册界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/login.png "登陆")
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/register.png "注册")
>
2.加载动画界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/onLoad.png "加载动画")
3. 主页
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/home.png "主页")
>
4. 资金管理界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/fundManager.png "资金管理")
>
5. 个人信息界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/personal.png "个人信息")
>
6. token失效，重新登陆界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/tokenFailed.png "token失效")
7. 输入无效网址，404界面
>
![](https://github.com/BBiiaoao/fund-management-system-with-Jurisdiction/blob/master/projects/screenshot/404.png "404")
>
