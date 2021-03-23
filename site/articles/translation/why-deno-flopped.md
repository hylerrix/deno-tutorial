# 为什么 Deno 没有众望所归？超越 Node.js 还要做些什么？

> - 原文地址：[Here’s Why Deno Didn’t Take Off: And what Deno needs to do to overtake Node.js.](https://medium.com/swlh/heres-actually-why-deno-flopped-ec115caa2b6d)
> - 原文作者：Spencer, Founder of [Skiwise](https://skiwise-app.com/) and [NotionIntegrations](https://notionintegrations.com/)
> - 译者：[@hylerrix](https://github.com/hylerrix)
> - 原文发布时间/翻译时间：20200928/20210429
> - 本文属于《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》系列，原文翻译已获得作者翻译授权。

## 译者序

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619618596082-54ed430d-164c-4fca-b587-0ae95408ecfe.png#height=618&id=y17xf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=2048&originWidth=2732&originalType=binary&size=1043288&status=done&style=none&width=825)

## 正文开始

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610623575420-26942dca-dd3d-4092-a45e-8061be1b01a5.png#height=350&id=O4CWT&margin=%5Bobject%20Object%5D&name=image.png&originHeight=350&originWidth=700&originalType=binary&size=353843&status=done&style=none&width=700)

Deno 是一个旨在改进甚至替代 Node 的 JavaScript / TypeScript 运行时。它拥有众多的功能和广泛的关注度，截止目前在 Github 上已经有 68k 个 Star（译者注：2021-04 月底已 75k star）：

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610623589078-e188c9f5-dade-4190-be69-88057ab18268.png#height=128&id=fEGOW&margin=%5Bobject%20Object%5D&name=image.png&originHeight=128&originWidth=338&originalType=binary&size=7081&status=done&style=none&width=338)

[https://github.com/denoland/deno](https://github.com/denoland/deno)

在如此多强大功能的加持下，有个很重要的问题值得反思：

> 为什么 Deno 在 1.0 正式版本发布之后没有众望所归，得到广泛使用？

本文将尝试探讨该问题...

## 所以，Deno 是什么？

Deno 是一个安全的 JavaScript 和 TypeScript 运行时，作者是 Ryan Dahl（也是 Node.js 的原作者）。Deno 的诞生之初是为了[解决 2009 年首次设计 Node.js 时的一些疏忽](https://www.youtube.com/watch?v=M3BM9TB-8yA)。我认为这种改造动机很有道理，因为**我相信每个程序员都希望有机会能重写他们已有 10 年历史的代码。**

基于此，Deno 在 Node.js 已经发展至今的情况下，引入了很多新功能：

- Deno 有默认安全的机制。访问文件系统，网络或运行环境需要被授权；
- Deno 对 TypeScript 的支持度是开箱即用的；
- 外部文件由 URL 明确引用。没有 package.json。
- import 语句需要包括文件后缀（.ts，.tsx，.js，.json）
- 内置依赖检查器和文件格式化工具库
- [以及更多...](https://deno.land/)

凭借这些功能以及大量开发者的积极推进，Deno 于 2020 年 5 月正式发布了 1.0 版本。

然后...

蹦...

## 为什么 Deno 没有众望所归？

Deno 看起来拥有成功的所有要素：大量的关注者、诸多的功能、经验丰富的创始人和开发者等等，但并没有真正实现所有人期望的增长。这是为什么？

我认为最好从业务的角度来分析。我们大多数人可能都忘记了，**构建开源软件与为用户构建软件确实没有什么不同。供需关系的标准经济原则仍然发挥着重要的作用。**

当创建一个新的开源项目时，他们通常会与已经存在的东西“竞争”。考虑到这一点的话，你不仅需要考虑你的新项目是否足够出色，还需要考虑与现有项目相比有什么真正的优势。

定律来到 Deno 下时，需要关注到的就是已经存在的 Node.js。尽管 Node.js 可能有其缺陷，但它仍然有能力完成好自己的本分工作。**如果 Deno 真的推出了 Node.js 无法复制的强大功能，就可能会改变游戏规则——但事实并未发生。**

**从用户的角度来看，Deno 仅真正具有一些“次要功能”：一个更简洁的代码库、一个更新的最佳实践方案、一个更好的安全性支持，但是这些东西实际上对用户来说仅仅是“功能特性”而非一个成熟的产品。**你可以开发一个像 Gmail 一样的电子邮件客户端，拥有更好的安全性和 50% 的速度改进，即使收藏你的客户端到一个新书签只需要很少的时间，但也不会有太多用户愿意切换过来的。

因此，这是 Deno 需要招架的第一招：Deno 具有许多不错的功能，但是没有什么能激发用户从 Node.js 切换过来的杰出之处。

Deno 需要招架的第二大地方在于其不支持 NPM 软件包。如果 Deno 能够支持 NPM 包，那么也能改变游戏规则。Deno 支持 NPM 包的话，将会让其更像一个针对已有的邮件客户端的更好的容器，而不是一个“独立的邮件客户端”。

支持 NPM 软件包将大大减少进入门槛。这会成为用户将其项目和库迁移到 Deno 时的一个很好的垫脚石。

可以将 Deno 对 NPM 支持的重要意义同比于 TypeScript 的“严格模式”。对于拥有大量 JavaScript 代码库的用户，直接进行纯 TypeScript 改造，将使你在解决各种错误消息时的工作效率降低数周。但由于 TypeScript 具有禁用严格模式的支持，可以让其成为用户缓慢迁移到纯 TypeScript 的垫脚石。这为用户提供了更低的进入门槛，并且反过来又[帮助 TypeScript 近年来夺走很多 JavaScript 的市场份额](http://pypl.github.io/PYPL.html)。

## 那么，代价是什么呢？

我认为这是一个能印证业务方法的有趣案例。重点在于，**如果你需要像市场发布一个新产品，你必须确保它的优势很大，以至于能克服人们从现状转变到新方式的阻力。**

对于 Deno 来说，最初有很多独特的魅力，但回首总结 Deno 时，会发现 Deno 实际上是以失去 Node.js 下的整个 NPM 生态系统为代价的情况下的一些小“修复”。

## Deno 将会去往何方？

Deno 团队有一个决定需要做。他们可以努力添加对 Node.js 的向后兼容性，或者增加更多能诱使用户迁移过来的更多吸引力。我个人认为对 Node.js 的向后兼容是接下来要走的路，如果增加了更多的兼容性，也会极大地改变项目的未来。

无论如何，以最好的祝福送给 Deno 团队，我也希望更好的技术能最终更有市场。希望你喜欢这篇文章，感谢阅读。

> © [https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 2020~2021
