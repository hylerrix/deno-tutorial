# 为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？

> - 原文地址：[Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments](https://www.freecodecamp.org/news/why-deno-is-a-wrong-step-in-the-future/)
> - 原文作者：Mehul Mohan
> - 原文发布时间：2020-05-14
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。
> - 备注：非营利组织 freeCodeCamp.org 自 2014 年成立以来，以“帮助人们免费学习编程”为使命，创建了大量免费的编程教程，包括交互式课程、视频课程、文章等。线下开发者社区遍布 160 多个国家、2000 多个城市。FCC 正在帮助全球数百万人学习编程，希望让世界上每个人都有机会获得免费的优质的编程教育资源，成为开发者或者运用编程去解决问题。搜索关注微信公众号 “freeCodeCamp”，可了解更多信息。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610538854285-bc5db817-2188-4013-ae19-a1ffe77923de.png#align=left&display=inline&height=497&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1333&originWidth=2000&size=4783066&status=done&style=none&width=746)

## 译者序

在为《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》引入第一篇翻译文章的时候，就看到了这篇文章，那时还觉得驾驭不了，就重点先写了若干篇入门级别的 Deno 文章。

转眼到 2021 年，从《[Deno 双周刊](https://github.com/hylerrix/deno-feedly)》第一期继续开启新的一年的 Deno 之旅，于是就回想起了本文，觉得可以通过好好阅读本文及相关后，从另一个角度了解 Deno，翻译就开始了。

相比前面对文章的直接翻译外，本文有很多想要记笔记的地方（甚至“大开眼界”的地方），因此独特地开辟本文的“译者序”篇章，来梳理一下原文及其相关视频到底针对 Deno 的另一面，都讲了什么。

也正如原文所说，这注定是一篇有争议的文章，从文章中引入的两个视频中的点踩数都微微大于点赞数、其评论区都充满着“火热”的讨论就能看出多个观点的冲撞。原文也存在些过度批评的地方，但是不妨碍下方译文开始后一比一地还原原作者想要表达的观点！

所以，原作者 Mehul 在原文以及两个视频中到底想要说 Deno 为什么没那么好？其观点大致梳理如下：

> 注意：如果想先看原文的话可以跳过阅读并在之后来看这份简单的总结。

- Deno 和 Node 确实有**竞争关系**，因为你必须在你的下个项目中作出选择。
- Deno 现在所做的**成果并不是很多**，大多特性都可以在 Node 生态中较好地解决掉。
- **URL import** 还是一场灾难。NPM 中已经有很多明星项目“竟然只有一行代码”、“暗中偷窃用户数据”、“注入挖矿代码”、“兼容性出现问题导致很多上游库受影响”等问题，URL import 本身并不能解决这些问题，更没有一个像 Node 一样强壮的社区来保证受人信任的依赖库，也就不会有更多的开发者愿意加入到 Deno 生态中。
- 由于 **TypeScript** 是 JavaScript 的超集，完全可以选择跳过类型验证，此时推荐新手在 Deno 上直接使用 TypeScript 编程坑会很大，很可能会出现一堆 any 类型。在经常性的调试报错下，TypeScript 的学习成本也较高，很容易写出低质量代码。
- **TypeScript** 并不是直接在 Deno 上跑的，其实还是变成了 JavaScript 来跑，何必一定要集成到 Deno 中呢？
- **安全**是一个很难的事情，Deno 宣传自己的“安全沙箱”注定要承担很大的责任。Deno 安全沙箱也没有必要，完全可以用 Docker 等容器或虚拟化技术来支持。同时，真正想搞破坏的脚本也会找到自己的方式来规避安全问题。
- 以当时版本下的 `deno --allow-run` 运行主进程从而开启的子进程能轻松突破安全沙箱的验证来获得更多权限为例，发现 Deno 的“**安全沙箱**”并没有所说的那么安全。
- Deno 没有必要**集成太多工具链**（代码格式化、测试工具、TypeScript 等等）于一体，让各种第三方工具链来一起共建生态的同时，保证 Deno 本身的专注性并提供更友好的插件支持会很好。
- Node 的异步模型**并没有被淘汰**，promise 和事件侦听器模型也没有套题，因此不确定 Deno 将如何解决这些没有被淘汰的问题。
- 未来并不确定会有多少开发者愿意将 npm 中的成熟库逐渐**迁移到 Deno 中**。

可以看出，无论你是 Node 开发者还是 Deno 爱好者，这些观点都有很多值得思考的地方。但也有有失偏颇的地方，比如文中将 Deno 说明为编程语言，也将 Deno 只发展了两年多的生态直接和建设了十年的 Node 生态作横向对比——Deno 注定会有自己独特的发展轨迹。

最后，原文作者 Mehul 总结了他眼中的 Deno v1.0 的真实面貌：

> Deno = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + <各种各样的小工具> - NPM]

## 译文开始

目前，我还没有在 Youtube 上找到任何一个像 [codedamn](https://www.youtube.com/codedamn) 一样的频道（超过 10 万名开发者订阅），其对 Deno v1 版本的发布并不感到兴奋。

上周，我在我的频道上发布了一个视频，介绍了一些“为什么我认为我们不需要 Deno——另一个基于 V8 和 Node 的 JavaScript 运行时”的原因，这些原因对我来说都很简明扼要。

同时通过本文，我可以在视频外拓展阐述更多的原因。但如果你想先看视频，可以看看这个：

> [为什么 Deno 将会失败 —— Node.js v/s Deno 之我的观点](https://www.youtube.com/watch?v=Uf1md0k6ATs)

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610540346864-84d3dec6-0d44-4915-9909-3d16bcc1b75d.png#align=left&display=inline&height=469&margin=%5Bobject%20Object%5D&name=image.png&originHeight=469&originWidth=836&size=439776&status=done&style=none&width=836)

为了证明我总体上并不是反对 Deno 甚至 JavaScript 本身，我想声明一下：我喜欢 JavaScript 胜过于很多其它的编程技术。我的主要技术栈也只围绕着 JavaScript 展开——Node/React/MongoDB/React Native/NativeScript/Ionic/甚至你能想到的更多相关库。

我也是主要用 JavaScript 这一门语言，就让我的 [Youtube 频道](https://www.youtube.com/codedamn)及一个[开发者平台](https://codedamn.com/)的订阅人数达到了 10 万多人。

但重要的事情在于，保持公平客观的角度来看到一个事务的两面性很重要。Deno 当然有好的一面，但也有大多数人尚未看到/写文探讨的另一面。一起来看看吧！
_
**_注意：_**_本文注定会是一个有争议性的文章。请先让我们保持礼貌的态度并控制好自己的情绪。如果你能仔细阅读全文直到结尾，然后再说说你的更多想法，那我会备受感激。_
_
_本文底部我会列出我的社交账号，也希望我们能在哪里针对此主题进行更多的良好探讨。_

## Deno vs Node：名副其实的竞争关系

有很多业内人士都在说：“Deno 和 Node 之间没有任何竞争关系，彼此之间可以学到很多东西”。

在某种程度上，我同意这个看法，Node 和 Deno 确实可以互相学习。但是两者间真的没有竞争关系了吗？我完全不同意这关观点。

让我们重新看一下 Deno 和 Node 的共同特征：

1. 它们都是 JavaScript 的运行时环境；
1. 它们都可以在可以运行 V8 的任何计算机上运行；
1. 它们都有 ECMAScript 标准支持；
1. 它们都在被积极的维护中。

如果你这两年都是 Deno 的粉丝，这两年里不选择 Node 而直接用 Deno 作为新项目的技术选型是不可能的。

同理，如果你以前从未使用过 TypeScript，并且认为自己想要尝试 Deno，此时你会很难同时用上 NPM 生态中的各种模块。

所以：Deno 和 Node 的开发人员目前确实存在分歧——你必须做选择，我想说这是两者为竞争关系的一个很重要的例子。

## Deno 到底好在哪里？

首先，我需要列举一下 Deno 对自己的宣传中的那些优势，Deno 为什么说自己是更好的运行时：

1. 它克服了 Node 的一些缺点；
1. 它在默认情况下是一个安全的运行时环境；
1. 它内置 TypeScript 支持；
1. 它将 Promise 的支持下放到底层；
1. 它基于 Rust 语言构建（对比与 C++ 之于 Node）。

在接下来的章节中，我将一个一个针对上面的每一个属于 Deno 的优点，来看看 Node 可以从中学到什么。我也将会在必要之时探讨，为什么 Deno 还没有那么有意义。

## Deno 画蛇添足在了哪些地方？

让我们开始拿起 Deno 的独特宣传点（USP，Unique Selling Proposition） 并将它们一一解析：

### 默认安全的运行时环境

这是 Deno 里很受欢迎的特性，我很惊喜。Deno 直接默认支持一个安全的沙箱环境，除非你明确的选择开启访问文件系统或访问网络等功能权限。

Deno 这样做是因为它想更加地贴近浏览器。Deno 遵守 ECMAScript 标准这点很不错，但为什么如此热衷于率先贴近浏览器？

或许答案是，Deno 想要保持在客户端和服务端上编写的代码之间有良好的兼容性。但 Deno 如此强烈的想要支持浏览器以至于我觉得方向有些偏失、甚至有些过头了。

Node 虽不支持“安全的运行时”——但经过深思熟虑后，我觉得也有理由支持 Node：

1. 众所周知，你不应该在系统上运行不受信任的代码和可执行文件。这就是我们总是选择像 Express 库之于 Node 的原因（而不是随便找个声称自己速度比 Express 快 100 倍的库）。信任来自于社区的大量使用。
1. 我不知道有任何编程语言像 Deno 这样提供如此的沙箱环境。尽管这个功能可能不错，但似乎应该交由诸如 Docker 这类的容器环境来完成。我相信一个被良好配置的 Docker 环境，相比在沙箱化的 Deno 环境中运行不受信任的 Node 代码来说，能更好的处理不受信任文件的安全性问题。
1. 沙箱化并没那么容易——我虽然不是网络安全专家，但我觉得某些功能越多，攻击面就可能越大。Deno 承诺提供安全的运行时环境，但我想说安全很难实现。Deno 的承诺带来了巨大的安全责任。世界上最大的企业们为支持它们的安全白帽计划，需要每年为独立开发者和安全公司投入将近数亿美金。因此，Deno 到底会将它们的“安全环境”带向何方？时间会证明一切。

所以，Node 可以从 Deno 中学到什么？我想说不会学到太多。Node 或许可以从竞争对手可以引入一些安全环境的标识，但是没有太多意义。如果你想在你的系统上随意运行一些未知代码，则最好克隆一个 C/C++ 仓库并运行 make 命令损害系统。

> 译者注：上段最后一句话是“If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.”，有些难以翻译，也不容易看出为什么从 Node/Deno 突然跑到了 C/C++，欢迎交流。

据我所知，你不能在像 C/C++ 这样的底层语言上来“沙盒化”文件系统或网络访问——这样效率并不高。

注意：最近我发现启用 `--allow-run` 标志的 Deno 几乎可以完成任何操作。该视频详细介绍了相关内容：

> [突破 Deno 的安全沙箱——Deno 并不安全](https://www.youtube.com/watch?v=_lvas914dXI)

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610546817704-834b27ab-b383-4544-98e8-5ef73d751f29.png#align=left&display=inline&height=468&margin=%5Bobject%20Object%5D&name=image.png&originHeight=468&originWidth=832&size=292518&status=done&style=none&width=832)

### 内置支持 TypeScript

为 TypeScript 现阶段的进展欢呼，我很高兴 Deno 开箱即用地支持 TypeScript。

_**注:**  感谢 [@lilasquared ](/lilasquared )指出 Deno 也能开箱即用地运行 `.js` 文件。本文重点强调使用 `.ts` 文件编写代码。Deno 当然可以直接运行 .js 文件。_

但是，让我们退一步来说：你知道为什么 JavaScript 和 Node 在全球拥有数以万计的开发人员吗？因为进入这个领域的壁垒几乎为零。JavaScript 是灵活的，可以容许你的诸多错误。而 TypeScript 总会给你一些奇怪的错误。

对于生产级的应用程序来说就糟糕了：生产环境上可不需要这些时髦的东西。同时对于学习者来说，JavaScript 是宽容的，纵使你可能会遇到一些 Bug，但也可以很轻松的改正，引用一句话，JavaScript 可以被快速编码并将事情搞定。

对于初学者来说，我担心他们如果选择使用 Deno（并被要求使用 TypeScript），因为他们还不了解 TypeScript，想着快速在服务端上跑通代码，我们可能会看到很多这种的代码：

```typescript
const httpResponse: any = await getAPIResponse<any>({ myParams })
// ...
const someOtherVariable = something() as any
// ...
any, any, any
```

TypeScript 是 JavaScript 的超集。你完全可以无意识间写一段质量很差的 TypeScript 代码，仅仅使用 TypeScript 并不会让你的项目无懈可击。

直到你想起来本来就能在 Node 中写 TypeScript 之前，这种体验确实很有趣。我相信现在每个在生产环境中使用 Node 的大型公司都引入了 TypeScript 来编写项目——没有例外。当你处理诸多文件及其依赖关系、处理大量代码时，JavaScript 真的很难拓展。

TypeScript 是 JavaScript 生态系统中革命性的工具包，更好地同时支持了静态和动态语言。

因此 Deno 声明自己会内置 TypeScript 支持。但我想问为什么一定要这样？确实，如果不内置的话，可能需要额外引入 Babel 和 Webpack 来完成这项工作，但这不是一堆第三方工具链围绕身边来共建生态的重要意义吗？我们难道不想增强 DX 吗？

> 译者注：DX，开发人员体验，是 Developer Experience 的简称。当软件或系统的用户是开发人员时，开发人员体验（DX）就相当于用户体验（UX, User experience design）。

JavaScript 依然还会是 JavaScript，保持自身的风格。况且，如果 Deno 真的能直接运行 TypeScript（或类似于 TypeScript 的语言），我觉得没什么问题。但事实上，Deno 其实也只是将 TypeScript 代码转换为 JavaScript 代码，并运行它罢了。

从这些角度能看出，Deno 似乎是一个 Node 下各种工具的的集成版本，Deno 将一个测试工具、一个代码格式化程序和 TypeScript 等一次性的包括进来。我更喜欢一个精简的编程语言并在合适的时候由我自己添加各种插件——当然，我不能代表所有开发人员，这也只是我的观点。

为什么我会在已经有专注于代码格式化的 prettier 库的情况下，依然需要领一个内置的代码格式化工具？为什么要解决这种本身就做的不错的东西？

单体架构确实集中起来提供了很多工具，但它也真的很庞大，一个更精简和专注的核心库才能更好的维护和拓展。

### Promise 的支持下放到底层

和 Node 作为对比，Deno v1 的发布对我来说看不出太多的意义。我非常尊重 Node 和 Deno 的创建者，但是 Node 拥有一些 Deno 所没有的东西——世界各地众多经验丰富的开发人员的支持。

Node 由近 3000 位开发者贡献力量，并且是异步 I/O 事件处理的引领者。Deno 确实建立在 Rust 之上，并公开了类似 Promise 的的抽象。但是 Node 有 C++，有 3000 名开发人员以及 10 年以上的开发和维护。

Node 的异步模型并没有被淘汰，promise 和事件侦听器模型也没有被淘汰，因此我不确定 Deno 将如何解决这些并没被淘汰的问题。

### 再见了，npm

很重要的事情是：Deno 并不支持 NPM。Ryan（Node 和 Deno 的创建者）在为此推广 Go 语言的相关特性。让我想到一些包管理器：

1. npm for JS (obviously)
1. npm 之于 JS（真很明显）
1. apt-get
1. composer 之于 PHP
1. brew 之于 macOS
1. cargo 之于 Rust（Deno 正是基于 Rust 构建)

我认为不使用包管理器来管理是很不好的一步。包管理器能做的太多了：标明版本、编写脚本、管理依赖关系等等。为什么 Deno 不使用 npm 呢？我并不清楚，但这些是我想到的：

1. 首先，因为 Deno 需要 TypeScript 生态，但是后者生态更多的是 JavaScript 的。更正：Deno 也能良好的运行 `.js` 文件。
1. 其次，大量 npm 模块需要要求使用到文件/网络甚至更多的条件，而这些 Deno 都很严格的默认不提供这些权限了。所以你需要在 package.json 里注入大量颇许冗余的“permissions”字段来提供更多权限。然而...Deno 无法和 npm 互相配合，因此也没有 package.json。接下来我们会来看看 Deno 到底如何处理模块系统的。
1. NPM 模块数量及其庞大甚至臃肿，但这也是 Node 生态的强大生命力所在。想要找一个库来将 tar 文件内容提取到 stream 流中？你可以选择 tar-steram。想要一个数据格式验证库？你可以选择 joi。想要配合 JWT 协同使用？你可以选择 jsonwebtoken。我怀疑得有多久才能让开发者们将他们的各种库变得兼容 Deno 系统？

Deno 对模块系统采用了一种完全不同的方法。但无论如何，Deno 在尝试以某种方式“修补”现有的 NPM 模块。那么除了尝试在 Docker 容器中“入侵”（hacking around）一个 TS + Node 项目外，我看不到太多使用 Deno 的意义。

根据我目前所了解的有关 Deno 的一切，这是 Deno 现在的真实面貌：

> **Deno** = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + <各种各样的小工具> - NPM]

搞定！让我们冷静一下，然后听我一下的总结。

## 总结

我和其它人对 Deno 的出现一样感到兴奋。但当 Deno 准备完全重写 JavaScript 运行时时，我的期望便有所变动。

Deno 的自动化 TypeScript 文档等诸多不错的特性我没有提到，是因为我希望这篇文章旨在展示 Deno 的另一面。因为 Deno 的优点几乎可以再任何其他 Deno 的文章中找到，所以我需要再次强调硬币的两面性。

坦白来说，Deno 看起来为了一些很小的益处承担了巨大的责任和代价，包括转移现有的 NPM 模块和代码库的诸多债务。你同意还是不同意我的这些观点呢？我很期待你的想法。推特联系我 [@mehulmpt](https://twitter.com/mehulmpt) 或 [Instagram](https://instagram.com/mehulmpt) 也可以！

祝好！

> 全文译完，欢迎前往 [@hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 仓库点个 star 或 watch。
>
> 《Deno 钻研之术》生态现已支持四大方向的不同仓库，持续共建中...
>
> - [deno-tutorial](https://github.com/hylerrix/deno-tutorial)：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。 
> - [deno-feedly](https://github.com/hylerrix/deno-feedly)：Deno 双周刊，中英双语每两周地汇总 Deno 动态，2021 开年之作。
> - [deno-algorithm](https://github.com/hylerrix/deno-algorithm)：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。
> - [awesome-deno-cn](https://github.com/hylerrix/awesome-deno-cn)：见名知意，中文社区下的 Deno 资源全图谱，求 PR。
>
> 以及更多使用 Deno 生态库构建的电子书如 [es-interview](https://github.com/hylerrix/es-interview) （《ECMAScript+ 面试宝典》）等，尽请 follow 好家伙：[Github@hylerrix](https://github.com/hylerrix)

> ![](https://cdn.nlark.com/yuque/0/2021/png/86548/1610637369018-c78fa688-01c1-416d-809b-34f6d0dfe1fe.png#align=left&display=inline&height=173&margin=%5Bobject%20Object%5D&name=image.png&originHeight=357&originWidth=409&size=238717&status=done&style=none&width=198)
