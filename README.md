# Deno 钻研之术

> :sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。

![](http://qiniu.ningo.cloud/deno-background.png)

《Deno 钻研之术》的配套仓库：[独家 Awesome Deno 资源清单](https://github.com/hylerrix/awesome-deno-cn)，构造 Deno 资源全图谱。

## 目录

目前规划的章节目录如下。

* 基础篇：循序渐进学 Deno 基础知识；
* 标准库篇：深入标准库的内部世界；
* CLI 篇：探索 CLI 命令行的知识；
* Web 篇：打造 Web 开发基石；
* Node 篇：先易后难补 Node 知识，探索与 Deno 的异与同；
* Rust 篇：探索 Deno 底层有关 Rust 的更多知识；
* 前端篇：探索 Deno Web 前端应用开发的方式；
* 后端篇：探索 Deno Web 后端应用开发的方式；
* 架构篇：深入到 Deno 底层读 V8，学架构；
* 生态篇：介绍 Deno 生态的相关内容；
* 翻译篇：翻译优质的、授权的英文一手博文。

目前本仓库的文件结构如下。

```
.
├── LICENSE
├── README.md
├── articles # 按照发布顺序进行编号
│   └── ... 
│   demos # 收录各大优良 Demo，来源不止于官方
│   ├── deno-chat-app # 收录了《Deno + WebSockets...》文章中的相关代码
│   ├── node-to-deno # 收录了《从 Node 到 Deno 解决方案...》文章中的相关代码
│   ├── official-examples # 从官网长期更新 Demo 至本仓库
│   └── the-deno-handbook # 收录了《Deno 入门手册...》文章中的相关代码
└── translations # 收录自己或和小伙伴们一起翻译的优质文章
    ├── authorization-required # 暂未得到授权，一般不会跟踪在 Git 上
    └── work-in-progress # 翻译进行中
```

本仓库工作流大致如下。

* `master` 分支：作为核心提供稳定版本，我直接工作在这里；
* `Github Flow`：有兴趣的开发者 fork 后一起来 PR；
* `Git Flow`：开放权限给和我一起翻译、一起写作的小伙伴；
  * `develop` 分支：用来对整个子分支进行统一管理；
  * `trans/${name}-${user}` 分支：某 user 用来翻译某篇授权 name文章；
  * `write/${name}-${user}` 分支：某 user 用来某篇 name 文章的写作。

## 文章

《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！

|序号|文章名|发布时间|所属章节|备注|
|-|-|-|-|-|
|001|[Hello, 从多样化安装到简单实战](./articles/001-install-and-hello-world.md)|2020-05-13|基础篇|Deno v1.0 正式发布之日|
|002|:heart: [Awesome Deno 中文资源全图谱](./articles/002-awesome-deno-cn.md)|2020-05-22|生态篇||
|003|...|...|...|...|

这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！

|序号|文章名|原文发布时间|翻译发布时间|备注|
|-|-|-|-|-|
|001|[Deno 入门手册：附大量 TypeScript 代码实例](./translations/001-the-deno-handbook.md)|2020-05-12|2020-05-18|译者：[@hylerrix](https://github.com/hylerrix), [@YunKou](http://github.com/yunkou)|
|002|[Deno + WebSockets 打造聊天室应用](./translations/002-deno-chat-app.md)|2020-05-10|2020-05-25|译者：[@hylerrix](https://github.com/hylerrix)|
|003|[从 Node 到 Deno：探索各大主流库替代方案](./translations/003-from-node-to-deno.md)|2020-05-17|2020-06-04|译者：[@hylerrix](https://github.com/hylerrix), [@YunKou](http://github.com/yunkou)|
|004|...|...|...|...|

同时更新在如下第三方平台：

* [微信](https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ)：公众号 @ningowood。
* [知乎](https://zhuanlan.zhihu.com/ningowood)。
* [语雀](https://www.yuque.com/ningowood/beginning)。
* [掘金](https://juejin.im/user/57e9fc052e958a0054509825/posts)。
* [简书](https://www.jianshu.com/u/ecbf49bf207b)。
* [SegmentFault](https://segmentfault.com/blog/ningowood)。

## 写作路线图

也欢迎你的建议。你想了解什么？一起来学。

**202006 写作关键词**

- [x] 授权翻译、[From Node to Deno](https://aralroca.com/blog/from-node-to-deno)
- [ ] JS 模块化
- [ ] Deno、React
- [ ] 参数列表、1.0 特性
- [ ] Node 篇：再谈、十大缺陷
- [ ] 授权翻译、[Deno Oak Todo API](https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/)
- [ ] 授权翻译、[Deno Oak MySQL](https://www.freecodecamp.org/news/how-to-use-mysql-in-deno-oak/)
- [ ] 授权翻译、[Why ... Deno ... Wrong ...](https://www.freecodecamp.org/news/why-deno-is-a-wrong-step-in-the-future/)
- [ ] ...

**202005 写作关键词**

- [x] 简介、安装、Demo
- [x] 授权翻译、[The Deno Handbook: ...](https://www.freecodecamp.org/news/the-deno-handbook/)
- [x] Awesome Deno！
- [x] 授权翻译、[Learn Deno: Chat app](https://aralroca.com/blog/learn-deno-chat-app)

**未来写作关键词**

- [ ] 深入安装、deno_install
- [ ] OAK、ABC 入门 & 简易对比
- [ ] 源码、安装
- [ ] 深入、IO
- [ ] 深入、beats
- [ ] Node 篇：EventEmmiter
- [ ] 精读、采访 Ry
- [ ] 深入、HTTP
- [ ] JS、运行时

**其他待做**

- [ ] 寻找好看的 UI 生成器搭建 Github Pages 部署网站

## 订阅

本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。

![](http://qiniu.ningo.cloud/official-qrcode.png)

## 构建

使用 [Pagic](https://github.com/xcatliu/pagic) 构建：

```bash
deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@0.7.3/mod.ts build --serve --watch
```
