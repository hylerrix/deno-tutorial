# Deno 钻研之术

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> :sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。

![](http://qiniu.ningo.cloud/deno/deno-tutorial-background.png)

Deno 钻研之术官方网站：[https://deno-tutorial.js.org](https://deno-tutorial.js.org)。基于 [Pagic](https://github.com/xcatliu/pagic) 构建。

号外：《Deno 钻研之术》的生态仓库请查收！

* [deno-tutorial](https://github.com/hylerrix/deno-tutorial)：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。 
* [deno-algorithm](https://github.com/hylerrix/deno-algorithm)：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。
* [awesome-deno-cn](https://github.com/hylerrix/awesome-deno-cn)：见名知意，中文社区下的 Deno 资源全图谱，求 PR。

同时，2021 年，开启全新的《Blitz.js + React 全栈开发手册》：

* [fullstack-react-handbook](https://github.com/hylerrix/fullstack-react-handbook)：专注构建 Blitz.js 社区，探索 React 全栈更多的可能性。

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
* 以及更多

目前本仓库的文件结构如下。

```
.
├── LICENSE
├── README.md
├── articles # 分为多种章节
├── demos # 收录各大优良 Demo，来源不止于官方
│   ├── community # 社区 Demo
│   ├── ningowood # 自研 Demo
│   └── scattered # 零散 Demo
└── translations # 收录自己或和小伙伴们一起翻译的优质文章
```

## 文章

《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！

|序号|文章名|发布时间|所属章节|备注|
|-|-|-|-|-|
|001|[Hello, 从多样化安装到简单实战](https://deno-tutorial.js.org/articles/basic/install-and-hello-world.html)|2020-05-13|基础篇|Deno v1.0 正式发布之日|
|002|[Awesome Deno 中文资源全图谱](https://deno-tutorial.js.org/articles/ecology/awesome-deno-cn.html)|2020-05-22|生态篇||
|003|:heart: [从 CLI 指令通读 Deno v1.x 全特性](https://juejin.im/post/6857058738046861320)|2020-08-04|CLI 篇|掘金征文|
|...|...|...|...|...|

这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！

|序号|文章名|原文发布时间|翻译发布时间|备注|
|-|-|-|-|-|
|001|[Deno 入门手册：附大量 TypeScript 代码实例](https://deno-tutorial.js.org/articles/translations/the-deno-handbook.html)|2020-05-12|2020-05-18|其它译者：[@YunKou](http://github.com/yunkou)|
|002|[Deno + WebSockets 打造聊天室应用](https://deno-tutorial.js.org/articles/translations/deno-chat-app.html)|2020-05-10|2020-05-25||
|003|[从 Node 到 Deno：探索各大主流库替代方案](https://deno-tutorial.js.org/articles/translations/from-node-to-deno.html)|2020-05-17|2020-06-04|其它译者：[@YunKou](http://github.com/yunkou)|
|004|[Deno + Oak 构建酷炫的 Todo API](https://deno-tutorial.js.org/articles/translations/deno-oak-todo-api.html)|2020-05-29|2020-06-15||
|005|[Deno + Oak 连接 MySQL 实战教程](https://deno-tutorial.js.org/articles/translations/deno-oak-mysql.html)|2020-06-07|2020-07-06||
|006|[为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？](https://deno-tutorial.js.org/articles/translations/why-deno-wrong.html)|2020-06-07|2020-07-06||
|007|[精读《Deno 2020 官方回顾及 2021 展望》](https://deno-tutorial.js.org/official/thoroughgoing-deno-in-2020.html)|2021-01-15|2021-01-22||
|008|[精读《Deno v1.8 发布说明》](https://deno-tutorial.js.org/official/thoroughgoing-deno-1-8.html)|2021-03-02|2021-03-05||
|...|...|...|...|...|

同时更新在如下第三方平台：

* [微信](https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ)：公众号 @ningowood。
* [知乎](https://zhuanlan.zhihu.com/deno-tutorial)。
* [掘金](https://juejin.im/user/57e9fc052e958a0054509825/posts)。
* [语雀](https://www.yuque.com/ningowood/beginning/record)。
* ...

## 构建

使用 [Pagic](https://github.com/xcatliu/pagic) 构建：

```bash
$ deno install --unstable --allow-read --allow-write --allow-net -f --name=pagic https://deno.land/x/pagic/mod.ts
$ ~/.deno/bin/pagic build --serve --watch
```

## 贡献者 ✨

感谢如下贡献者的贡献（按贡献顺序排名）([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/hylerrix"><img src="https://avatars1.githubusercontent.com/u/19285461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hylerrix</b></sub></a><br /><a href="#ideas-hylerrix" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.twitter.com/imcoddy"><img src="https://avatars0.githubusercontent.com/u/622780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>imcoddy</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=imcoddy" title="Documentation">📖</a></td>
    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#infra-xcatliu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://twitter.com/justjavac"><img src="https://avatars1.githubusercontent.com/u/359395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷渡</b></sub></a><br /><a href="#infra-justjavac" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/AlvinMi"><img src="https://avatars3.githubusercontent.com/u/21032217?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YuHui</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=AlvinMi" title="Documentation">📖</a></td>
    <td align="center"><a href="http://ahabhgk.github.io"><img src="https://avatars.githubusercontent.com/u/42857895?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ahab</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=ahabhgk" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

本项目贡献者列表遵循 [all-contributors](https://github.com/all-contributors/all-contributors) 规范。欢迎你的参与！

## 订阅

本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。

> 打赏支持一下吧！[传送门](http://qiniu.ningo.cloud/hylerrix/reward-alipay.png)

![](http://qiniu.ningo.cloud/ningo/official-qrcode.png)
