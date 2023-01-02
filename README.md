# Operational configuration
# 运行配置（项目运行前请仔细检查）

## 使用的编辑器
HBuilder X(3.6.14) 和 微信开发者工具（1.06.2210310）
***需要注册DCloud账户和微信开发者工具账户***

## json配置文件
### 使用HBuilder X 点击左上角文件、点击导入、点击从本地目录导入 项目文件
打开manifest.json文件，配置好DCloud AppID

打开uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json
填写好passwordSecrect中的value（也许不用），和tokenSecret，本项目只应用账号
密码登录，其它登录方式配置请移步uni-app官网config.json的配置[uni-app](https://uniapp.dcloud.net.cn/uniCloud/uni-id-summary.html#config)

鼠标右键点击**uniCloud** 点击关联云服务空间或项目，选择一个云服务关联
如果没有云服务空间请创建，选择阿里云

## 创建uni-id表
鼠标右键点击**uniCloud** 打开uniCloud Web控制器
点击左边的云数据库进入到云数据库，点击数据表左边的**+**新建
点击表分类里的uni-id 里面的表全选 点击右下角绿色按钮 **创建选中的opendb表**

## 上传云函数
右键点击uniCloud下的cloudfunctions选择**上传所有云函数、公共模块及actions**
如果项目有意外的报错即非语法和逻辑错误的 请把cloudfunctions里的文件多上传几次

## 运行
点击HBuilder X上的运行，选择运行到小程序模拟器，微信开发者工具
（需要在工具->设置->运行配置 里填写微信开发者工具路径）

## 报错
运行过程中如果出现非语法、逻辑类的编程错误，可以点击微信开发者工具上的编译
多编译几次，或者在HBuilder X的运行里停止开发者工具的运行，再重新运行一次

## 如果有令你困惑的语法错误请用VSCode打开排查 HBuilder X编辑器的问题

## 发行打包
点击 HBuilder X 工具栏上的发行 点击**原生APP云打包**
更多的发行过程请异步大佬的视频 [发行打包](https://www.bilibili.com/video/BV1aB4y1577p/?spm_id_from=333.788&vd_source=c19c5381668fd266cc1f471db6012aae)