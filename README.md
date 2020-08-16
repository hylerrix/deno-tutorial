# Deno 钻研之术
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> :sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。

![](http://qiniu.ningo.cloud/deno-background.png)

> 《Deno 钻研之术》的配套仓库：[独家 Awesome Deno 资源清单](https://github.com/hylerrix/awesome-deno-cn)，构造 Deno 资源全图谱。

Deno 钻研之术官方网站：[https://deno-tutorial.js.org](https://deno-tutorial.js.org)。基于 [Pagic](https://github.com/xcatliu/pagic) 构建。

**公告 1**：由于 Pagic 即将发布 v1，发布之前 API 不稳定，暂时不维护官网的更新了，Github Action 会构建失败。因此在 Pagic v1 发布之前，官网内容会停留在 2020-07-06 时间。

**公告 2**：由于之前写作顺序是先在语雀写完，导出 markdown 粘贴到本仓库中；从而导致图床崩溃，等 Pagic v1 发布之时，统一解决~，因此官网可能会阅读不便，可以先在这里阅读：[https://zhuanlan.zhihu.com/deno-tutorial](https://zhuanlan.zhihu.com/deno-tutorial)。

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
├── articles # 分为多种章节
├── demos # 收录各大优良 Demo，来源不止于官方
│   ├── community # 社区 Demo
│   ├── ningowood # 自研 Demo
│   └── scattered # 零散 Demo
└── translations # 收录自己或和小伙伴们一起翻译的优质文章
```

本仓库工作流大致如下。

* `main` 分支：作为核心提供稳定版本，我直接工作在这里；
* `Github Flow`：有兴趣的开发者 fork 后一起来 PR；
* `Git Flow`：开放权限给和我一起翻译、一起写作的小伙伴（其实没怎么用）；
  * `develop` 分支：用来对整个子分支进行统一管理；
  * `trans/${name}-${user}` 分支：某 user 用来翻译某篇授权 name文章；
  * `write/${name}-${user}` 分支：某 user 用来某篇 name 文章的写作。

本仓库的[开发日志](./.ningowood/timeline.md)。

## 文章

《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！

|序号|文章名|发布时间|所属章节|备注|
|-|-|-|-|-|
|001|[Hello, 从多样化安装到简单实战](https://deno-tutorial.js.org/articles/basic/install-and-hello-world.html)|2020-05-13|基础篇|Deno v1.0 正式发布之日|
|002|[Awesome Deno 中文资源全图谱](https://deno-tutorial.js.org/articles/ecology/awesome-deno-cn.html)|2020-05-22|生态篇||
|003|:heart: [从 CLI 指令通读 Deno v1.x 全特性](https://juejin.im/post/6857058738046861320)|2020-08-04|CLI 篇|掘金征文|
|...|...|...|...|...|

这里将 Node 篇抽离出来单独排序，记录在纯 Node 社区里的游玩过程（Deno 和 Node 同时提到的文章不会在这里）。

|序号|文章名|发布时间|备注|
|-|-|-|-|
|001|[深入浅出 Create React App](https://deno-tutorial.js.org/articles/node/create-react-app-intro.html)|2020-01-10||
|002|[欲取代绝大多 JavaScript 工具链？Rome 尝鲜](https://deno-tutorial.js.org/articles/node/javascript-toolchain-rome.html)|2020-04-10||
|...|...|...|...|

这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！

|序号|文章名|原文发布时间|翻译发布时间|备注|
|-|-|-|-|-|
|001|[Deno 入门手册：附大量 TypeScript 代码实例](https://deno-tutorial.js.org/translations/the-deno-handbook.html)|2020-05-12|2020-05-18|其它译者：[@YunKou](http://github.com/yunkou)|
|002|[Deno + WebSockets 打造聊天室应用](https://deno-tutorial.js.org/translations/deno-chat-app.html)|2020-05-10|2020-05-25||
|003|[从 Node 到 Deno：探索各大主流库替代方案](https://deno-tutorial.js.org/translations/from-node-to-deno.html)|2020-05-17|2020-06-04|其它译者：[@YunKou](http://github.com/yunkou)|
|004|[Deno + Oak 构建酷炫的 Todo API](https://deno-tutorial.js.org/translations/deno-oak-todo-api.html)|2020-05-29|2020-06-15||
|005|[Deno + Oak 连接 MySQL 实战教程](https://deno-tutorial.js.org/translations/deno-oak-mysql.html)|2020-06-07|2020-07-06||
|...|...|...|...|...|

同时更新在如下第三方平台：

* [微信](https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ)：公众号 @ningowood。
* [知乎](https://zhuanlan.zhihu.com/deno-tutorial)。
* [掘金](https://juejin.im/user/57e9fc052e958a0054509825/posts)。
* [语雀](https://www.yuque.com/ningowood/beginning/record)。

## 构建

使用 [Pagic](https://github.com/xcatliu/pagic) 构建：

> 请查看顶部公告，可能会编译失败。等 v1.0 发布。

```bash
deno run --unstable --allow-read --allow-write --allow-net --allow-env https://deno.land/x/pagic@0.7.28/mod.ts build --serve --watch
```

## 贡献者

按第一次贡献顺序排名：

* [@hylerrix](https://github.com/hylerrix)
* [@imcoddy](https://github.com/imcoddy)
* [@xcatliu](https://github.com/xcatliu)
* [@justjavac](https://github.com/justjavac)

## 订阅

本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。

> 打赏支持一下吧！[传送门](http://qiniu.ningo.cloud/reward-alipay.png)

![](http://qiniu.ningo.cloud/official-qrcode.png)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AlvinMi"><img src="https://avatars3.githubusercontent.com/u/21032217?v=4" width="100px;" alt=""/><br /><sub><b>YuHui</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=AlvinMi" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!