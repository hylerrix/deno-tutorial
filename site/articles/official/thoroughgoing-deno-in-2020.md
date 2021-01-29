# 精读《Deno 2020 官方回顾及 2021 展望》

> - 原文地址：[Deno in 2020](https://deno.land/posts/deno-in-2020)
> - 原文作者：Bartek Iwańczuk, Ryan Dahl
> - 译者：[@hylerrix](https://github.com/hylerrix)
> - 原文发布时间/翻译时间：20210115/20210122
> - 本文属于《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》系列，原文翻译内容会同步更新到 [Deno 中文官网](https://deno-cn.vercel.app/posts/deno-in-2020)中。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1611115470568-57835cde-6644-4a07-b264-b398a4e1efa5.png#align=left&display=inline&height=400&margin=%5Bobject%20Object%5D&name=image.png&originHeight=800&originWidth=1714&size=125084&status=done&style=none&width=857)

随着 API 的稳定化改造、若干大型基础架构的重构，以及诸多备受关注功能的开放，Deno 1.0 版本正式发布。2020 年，Deno 迎来了众多的挑战和变化。

请填写[这份 Deno 调查问卷](https://forms.gle/hbhP46LUAfVFMggU6)来向我们反馈以让 Deno 在 2021 年变得更好。

下文是 Deno 的 2020 年度回顾。

## 一月：再见 libdeno，你好 rusty_v8

`libdeno` 是一个 C++ 库，可以方便地桥接 Deno 中的 V8 引擎和 Rust 代码。此库难以理解，也难以在其上开发额外的功能。基于这种情况，最终导致了 `rusty_v8` 于 2019 年秋季诞生。[`rusty_v8`](https://github.com/denoland/rusty_v8) 是一个为 V8 引擎提供相关 API 的 Rust crate。同年 12 月，`rusty_v8` 已具备所有必需的 binding 条件来替换 `libdeno`。这项工作始于 2019 年年底，当时先使用 `rusty_v8` 重写了 `libdeno` 的一部分。由于 Deno 代码库中测试覆盖率的不断提高，我们很有信心地继续推进，并在两周内完成了这项工作。`libdeno` 最终在 0.29.0 版本中被完全替换删除，此后 rusty_v8 也经历了绑定类型安全性相关的重要重构。

**本月发布的版本：**[0.28.0](https://github.com/denoland/deno/releases/tag/v0.28.0)、[0.28.1](https://github.com/denoland/deno/releases/tag/v0.28.1)、[0.29.0](https://github.com/denoland/deno/releases/tag/v0.29.0)、[0.30.0](https://github.com/denoland/deno/releases/tag/v0.30.0)、[0.31.0](https://github.com/denoland/deno/releases/tag/v0.31.0)。

精读笔记：

- **libdeno**：由 C++ 编写，早期是用来连接 TS/JS 和 V8 的通道。
- [**rusty_v8**](https://github.com/denoland/rusty_v8)：libdeno 的替代品，2019 年年底开始开发，为 V8 的 C++ API 提供更高质量的 Rust 绑定。
- [**V8**](https://v8.dev/)：Google 的一个开源 JavaScript 引擎。其一个非常大的项目（超过 600,000 行 C++），通常需要 30 分钟才能编译。此外，V8 依靠 Chromium 的定制构建系统（gn + ninja），在 Chromium 之外不容易使用。
- **Rust**：Rust 语言快且内存效率高，没有运行时和垃圾收集器。Rust 的丰富类型系统和所有权模型保证了内存安全性和线程安全性，能够在编译时消除许多类的错误。

参考资料：

- [replace libdeno with rusty_v8](https://github.com/denoland/deno/issues/3530)
- [The long road to rusty_v8](https://github.com/denoland/deno/pull/3556)
- [Interaction with V8](https://denolib.gitbook.io/guide/advanced/interaction-with-v8)

## 二月：deno fmt 现由 dprint 构建、deno test 子命令

本月我们彻底地重构了 `deno fmt`。与此之前，`deno fmt` 是一个简单的子命令，其在背后只是最终指向 `prettier` 的“deno run”的一个别名。这意味着在首次运行 `deno fmt` 以及每次 `prettier` 升级后，用户都必须下载 `prettier` 的最新版本。这和 Deno 承诺的内置工具开箱即用的原则很不契合。同时，`prettier` 真的很慢，其性能也有很多问题。

我们被推荐了 [David Sherret](https://github.com/dsherret) 的 [dprint](https://dprint.dev/) 库——一个基于 [Kang Dong Yun](https://github.com/kdy1) 的 SWC JavaScript 解析器、并由 Rust 编写的代码格式化工具。`dprint` 可以和 `prettier` 库一样的工作，但速度却要快上好几个数量级。经过了一些初步测算后，我们决定在 `deno fmt` 中使用 `dprint`。

`deno test` 也有在首次运行该命令时从标准库中下载模块的问题。这导致添加了新的 `Deno.test()` API，并且 `deno test` CLI 子命令也让测试成为了 Deno 的一等公民。

**本月发布的版本：**[0.32.0](https://github.com/denoland/deno/releases/tag/v0.32.0)、[0.33.0](https://github.com/denoland/deno/releases/tag/v0.33.0)、[0.34.0](https://github.com/denoland/deno/releases/tag/v0.34.0)、[0.35.0](https://github.com/denoland/deno/releases/tag/v0.35.0)。

精读笔记：

- `deno fmt`：Deno 内置工具之一，用来格式化 TypeScript/JavaScript 代码。早期依赖 `prettier`，现在由基于 Rust 语言的 dprint 提供支持，速度和性能都有所提高。
- `deno test`：deno 内置工具之一，开箱即用提供测试基本功能。
- [**prettier**](https://prettier.io/)：Node 下知名的可配置式代码格式化工具，可以在编辑器、预提交或 CI 等诸多环境中来格式化多种语言（TS/JS/CSS/HTML/GraphQL/YAML/Markdown 等），更多的语言可以通过社区插件支持。
- [**dprint**](https://dprint.dev/)：支持定义插件和配置的代码编辑器，由 Rust 语言构建。速度很快，插件支持 URL 或文件导入（WebAssembly）。支持格式化 TS/JS/JSON/C#/VB/Markdown 等文件，同时也有 Prettier 的插件。目前处于早期积极开发中。
- **[SWC](https://github.com/swc-project/swc)**：是一个基于 Rust 的JavaScript/TypeScript 解析器，性能极好。JavaScript 的解析器包括的实施规范起始于 [ESTree](https://github.com/estree/estree) 项目，常见的基于 JS 开发的 JavaScript 解析器包括 [uglify-js](https://github.com/estree/estree)、[Esprima](http://esprima.org/)、[acorn](https://github.com/acornjs/acorn)、[@babel/parser(babylon)](https://github.com/babel/babel/tree/master/packages/babel-parser)、[espree](https://github.com/eslint/espree)、[TypeScript](https://github.com/microsoft/TypeScript)；常见的基于其他语言开发的 JavaScript 解析器包括 [sucrase](https://github.com/alangpierce/sucrase)、[swc](https://github.com/swc-project/swc)、[esbuild](https://github.com/evanw/esbuild/)；其它 AST 工具包括：[recast](https://github.com/benjamn/recast)、[jscodeshift](https://github.com/facebook/jscodeshift)、[ASTExplorer](https://github.com/fkling/astexplorer) 等。

参考资料：

- [簡單介紹下各種 JavaScript 解析器](https://iter01.com/574746.html)
- [Why you should use SWC (and not Babel)](https://blog.logrocket.com/why-you-should-use-swc/)

## 三月：V8 调试器、deno doc、deno upgrade

阻碍 Deno 1.0 发布正式版的主要原因是缺少 Chrome Devtools 的支持。因此，我们花了很多精力来增加对 V8 调试器的支持以及提高使用 Chrome Devtools 连接到 Deno 进程的能力。

CLI 中也添加了两个新的命令：`deno doc` 和 `deno upgrade`。

我们同时经历了构建过程的巨大改进。与此之前，Deno 中的每一次构建都会导致 V8 从源码级别进行重新构建。V8 是一个庞大的 C++ 项目，常常需要花费 30 多分钟来对其进行构建。尽管有大量的构建缓存和更多技巧，我们也一直难以克服得更好。现在，我们增加了 rusty_v8 在 Github 发行版上生成和下载预构建过的静态库的能力，从而允许 Deno 构建过程完全绕过 V8 的构建。这简化并加快了 CI 的构建，同时更重要的是，这让贡献者变得可以更轻松地构建 Deno。

**本月发布的版本：**[0.36.0](https://github.com/denoland/deno/releases/tag/v0.36.0)、[0.37.0](https://github.com/denoland/deno/releases/tag/v0.37.0)、[0.37.1](https://github.com/denoland/deno/releases/tag/v0.37.1)、[0.38.0](https://github.com/denoland/deno/releases/tag/v0.38.0)

精读笔记：

- `deno doc`：内置工具之一，来从源码中生成相关的 JSDoc 文档。`--json` 标志可以生成 JSON 格式，也可以用来生成模块文档。
- `deno upgrade`：内置命令，可以直接通过此命令开自升级 Deno 版本。
- **Chrome DevTools**：Chrome DevTools 是辅助开发者进行 Web 开发的重要调试工具，DevTools 是 Chromium 的一部分，可以作为独立项目被 Electron 等容器集成。DevTools 主要分为四部分：调试器前端（默认由 Chromium 内核层集成）、调试器后端（Chromium/V8/Node.js）、调试协议、消息通道（Embedder、Web Socket、Chrome Extensions、USB/ADB Chaeeml）。

参考资料：

- [Chrome DevTools 调试技术](https://zhaomenghuan.js.org/blog/chrome-devtools.html)
- [在 Chrome DevTools 中调试 JavaScript 入门](https://developers.google.com/web/tools/chrome-devtools/javascript?hl=zh-cn)
- [Web 调试技术详解](https://juejin.cn/post/6844903828756627463)

## 四月：破坏所有的 API 来构造重要的稳定性

本月为 1.0 的正式发布做准备，重点关注在审阅 `Deno` global 全局中的 API。这导致了诸多破坏性地改动。对此我们很谨慎：我们将不确定的所有 API 都需要被移到 `--unstable` 标志之后。

这也是 1.0 版本的重要承诺；在 2.0 发布之前，标记为稳定的 Deno API 将不会有破坏性的更改。

本月是 Deno 版本以 0.x.y 命名的最后阶段。

**本月发布的版本：**[0.39.0](https://github.com/denoland/deno/releases/tag/v0.39.0)、[0.40.0](https://github.com/denoland/deno/releases/tag/v0.40.0)、[0.41.0](https://github.com/denoland/deno/releases/tag/v0.41.0)、[0.42.0](https://github.com/denoland/deno/releases/tag/v0.42.0)。

精读笔记：

- 内置标准库的 stable API：[https://doc.deno.land/builtin/stable](https://doc.deno.land/builtin/stable)。
- 内置标准库的 unstable API：[https://doc.deno.land/builtin/unstable](https://doc.deno.land/builtin/unstable)。
- Deno 0.x.y 版本的大致历程：从 2018-08-18 的 v0.0.1 版本开始，到 2020-04-30 的 v0.42.0，621 天迭代了 82 个版本。其中从 73 个版本 v0.34.0 开始，每个版本同时会更新标准库的版本。

## 五月：Deno 1.0 正式发布

本月初标记删除了如下功能：

- JSON imports
- WASM imports
- `window.location`  API
- Rust API for deno crate

删除的原因是，我们不想因为 JSON/WASM imports 缺少底层规范支持、或者 deno crate 下有 Rust API 额外维护负担的情况下提供相关 API。

终于在 5 月 13 日——[Ryan 最初发表 Deno 演讲](https://www.youtube.com/watch?v=M3BM9TB-8yA)的整整两年后，我们正式发布了 1.0。

在社交媒体上，这个版本非常受欢迎。我们的[相关博客](https://deno.land/v1)被广为传播。我们也收获了大量的新用户和新贡献者。

发布后我们紧张地回到了有关运行时重要组件的工作中：TypeScript 宿主中的依赖关系分析是使用 [SWC](https://swc.rs/) 重写的。这次的改动标志着我们开始着手用 Rust 来重写 TypeScript 基础架构的一些部分。

**本月发布的版本：**[1.0.0-rc1](https://github.com/denoland/deno/releases/tag/v1.0.0-rc1)、[1.0.0-rc2](https://github.com/denoland/deno/releases/tag/v1.0.0-rc2)、[1.0.0-rc3](https://github.com/denoland/deno/releases/tag/v1.0.0-rc3)、[1.0.0](https://github.com/denoland/deno/releases/tag/v1.0.0)、[1.0.1](https://github.com/denoland/deno/releases/tag/v1.0.1)、[1.0.2](https://github.com/denoland/deno/releases/tag/v1.0.2)、[1.0.3](https://github.com/denoland/deno/releases/tag/v1.0.3)。

精读笔记：

- **Deno JSON imports**：1.0 发布之前因缺乏标准被删除掉，想要导入一个 `.json` 文件可以在有 `--allow-read` 的情况下编写 `Deno.readTextFile` 或 `Deno.readTextFileSync` 来实现。此提议于 2018 年 10 月 21 日提出并讨论 ([#1048](https://github.com/denoland/deno/issues/1048))。
- **WASM imports**：1.0 发布之前因缺乏标准被删除掉。此提议在 ([#2552](https://github.com/denoland/deno/issues/2552)) ([#5609](https://github.com/denoland/deno/issues/5609)) 等中讨论。WebAssembly 的 esm 集成标准[提案进程](https://github.com/WebAssembly/esm-integration/tree/master/proposals/esm-integration)。当时去掉了 `import './foo.wasm'` 的支持，但依然可以通过 WebAssembly API 来使用。

## 六月：增量类型检查以及 deno lint

1.0 发布后，从社区中收到最多的反馈之一就是 TypeScript 的编译和类型检查非常得慢。此后我们着眼于改进 TSC 集成来支持增量类型检查。经过几次反复试验的 PR，我们能够使功能正常工作，并且显著地改进了开发效率。尽管我们通过利用 TSC 的增量 API 设法提高了类型检查的速度，但我们仍然需要依靠它来 emit 已转义的源。TypeScript 的伟大设计原则之一是它只是一个具有附加语法的 JavaScript，因此剥离类型信息（转换为 JavaScript）是相对容易的操作。所以我们设定了能够在 Rust 中使用 SWC 进行转移的同时，继续使用 TSC 进行类型检查的目标。

经过几个月的开发，在一个单独的仓库中，我们添加了新的 `deno lint` 子命令。这是另一个建立在 SWC JavaScript 解析器之上的项目。

**本月发布的版本：**[1.0.4](https://github.com/denoland/deno/releases/tag/v1.0.4)、[1.0.5](https://github.com/denoland/deno/releases/tag/v1.0.5)、[1.1.0](https://github.com/denoland/deno/releases/tag/v1.1.0)、[1.1.0](https://github.com/denoland/deno/releases/tag/v1.1.0)、[1.1.2](https://github.com/denoland/deno/releases/tag/v1.1.2)。

精读笔记：

- **TSC**：代指 TypeScript 编译器模块，同时 TypeScript 提供 tsc 命令来在命令行进行编译。
- **deno_lint**：是全新的仓库，建立在由 Rust 开发的 SWC 解析器上。和 Deno 内置的 TSC 协同工作。

## 七月：将内部运行时代码从 TypeScript 转换为 JavaScript

这个月，我们做出了一个艰难的决定：[将内部运行时代码从 TypeScript 转换为 JavaScript](https://github.com/denoland/deno/pull/6793)。有几个因素导致了我们做出这个决定：Deno 内部运行时代码的每个构建过程中，类型检查、[快照](https://v8.dev/blog/custom-startup-snapshots)前绑定，都是复杂而缓慢的构建步骤。我们有两个独立的 TypeScript 编译器宿主。一个是 `deno_typescript` crate 只用于构建过程，另一个被包含在 `Deno` 二进制文件中。此外，整个过程对构建时间有显著影响：2 分钟的增量重建！通过使用普通的 JavaScript，我们能够极大地简化内部构建依赖关系和总体复杂性。因为实际的 JavaScript 代码是由 TypeScript 编译器作为单个文件包生成的，所以我们几乎无法控制输出代码的类型。ES 模块被转换为使用 bundle 的 SystemJS 加载程序，这为最终 bundle 添加了大量代码。

**本月发布的版本：**[1.1.3](https://github.com/denoland/deno/releases/tag/v1.1.3)、[1.2.0](https://github.com/denoland/deno/releases/tag/v1.2.0)、[1.2.1](https://github.com/denoland/deno/releases/tag/v1.2.1)、[1.2.2](https://github.com/denoland/deno/releases/tag/v1.2.2)。

精读笔记：

> JavaScript 规范包括许多内置功能，从数学函数到全功能正则表达式引擎。每个新创建的 V8 上下文从一开始就有这些可用的函数。要使其工作，必须在创建上下文时设置全局对象（例如，浏览器中的 window 对象）和所有内置功能，并将其初始化到 V8 的堆中。从头开始做这件事需要相当长的时间。
> 
> 幸运的是，V8 使用了一种快捷方式来加快速度：就像解冻速食披萨一样，我们将预先准备好的快照直接反序列化到堆中，以获得初始化的上下文。在普通台式计算机上，这可以将创建上下文的时间从 40 毫秒减少到不到 2 毫秒。在普通移动电话上，这可能意味着 270 毫秒和 10 毫秒之间的差异。

## 八月：新的镜像源网站发布

原始文章： [https://deno.land/posts/registry2](https://deno.land/posts/registry2)

八月三日，我们发布了一个全新的 [deno.land/x](https://deno.land/x) 镜像源，可以用来通过使用 WebHooks 与 Github 集成。每当一个模块被更新，我们的系统会下载并永远保存其源代码，这样我们就可以依赖不可变的源代码链接。

由于在使用 Deno 基础设施时进行了一些非公开工作，我们开始努力将 Deno 系统分解成更小的“op crates”，可以混合和匹配以生成定制的 V8 运行时。8 月份，我们朝着这个目标迈出了第一步，发布了 [deno_web](https://crates.io/crates/deno_web) crate，它提供了一些基本的 Web API，比如 `Event`、`TextUncoder` 和 `TextDecoder`。

这个月，基准系统使用 Rust 重写，这标志着减少 Deno 项目的构建依赖性的单调工作的开始。

**本月发布的版本：**[1.2.3](https://github.com/denoland/deno/releases/tag/v1.2.3)、[1.3.0](https://github.com/denoland/deno/releases/tag/v1.3.0)、[1.3.1](https://github.com/denoland/deno/releases/tag/v1.3.1)、[1.3.2](https://github.com/denoland/deno/releases/tag/v1.3.2)。

精读笔记：

- **Deno 镜像源**：其中注册的项目的每个版本会被永久保存，来提供信任的 URL 资源。国内镜像源加速服务可以使用 [http://x.deno.js.cn](http://x.deno.js.cn/)。
- **Deno 基准系统**：作为 Deno 持续集成和测试管道的一部分，来度量运行时某些关键的性能。运行时指标包括执行时间、线程计数、系统调用计数、最大内存使用量；TypeScript 性能指标包括类型检查、I/O、HTTP 延迟、HTTP 代理吞吐量、吞吐量；大小指标包括文件大小、捆绑包大小、Cargo 依赖数。可视化数据长久访问地址：[https://deno.land/benchmarks](https://deno.land/benchmarks)。

## 九月：WebSocket API、终端下的 CSS 样式、文件监听、测试覆盖

本月，我们发布了自 1.0 以来最大的功能版本。更多细节请参见 [1.4.0 发布说明](https://deno.land/posts/v1.4)文档。

另一个重要变化是关于项目的版本维护部分。发布时间表正式改变：从每月发布一次改为每六周发布一次新的版本，以与 Rust 和 Chrome 项目相匹配。

**本月发布的版本：**[1.3.3](https://github.com/denoland/deno/releases/tag/v1.3.3)、[1.4.0](https://github.com/denoland/deno/releases/tag/v1.4.0)、[1.4.1](https://github.com/denoland/deno/releases/tag/v1.4.1)、[1.4.2](https://github.com/denoland/deno/releases/tag/v1.4.2)。

精读笔记：

- **WebSocket**：是一种计算机通用协议，通过单个 TCP 连接提供全双工通信信道。WebSocket 协议在 2011 年被 IETF 标准化为 rfc6455。WebSocket 不同于 HTTP。
- **终端下的 CSS 样式**：大多数现代浏览器都支持控制台中 `console.log` 的样式化输出，Deno 的目标是尽可能地与 Web 兼容，现在正在努力更好地在终端下支持 CSS 样式化。目前支持的 CSS 属性包括 `color`、`background-color`、`font-weight`、`font-style`、`text-decoration-color` 和 `text-decoration-line` 等，具体需要根据开发者终端的 ANSI 支持度来决定。
- **文件监听**：1.4 版本热更新时自动重启服务，需要使用 `deno run --watch`。
- **测试覆盖**：1.4 版本支持获得测试覆盖报告，需要使用 `deno test --coverage`。

## 十月：REPL 翻新、捆绑改进、默认 isolatedModules

[1.5.0 发布说明](https://deno.land/posts/v1.5)。

本月发生的最大变化是在 TypeScript 编译器宿主中默认启用 `isolatedModules` 选项。此设置更改了 TypeScript 的行为，以确保每个文件都可以由 TSC 以外的工具（如 SWC 和 Babel）隔离编译（而无需知道其类型或其它模块）。这一变化对模块生态系统产生了重大影响，一度使得一些流行的模块无法使用，直到维护人员调整代码以支持 `isolatedModules`。

这个月我们还在 SWC 中采用了新的 bundle 特性，这是对原始 TypeScript 编译器转向使用 Rust 方向的又一步迈进。

**本月发布的版本：**[1.4.3](https://github.com/denoland/deno/releases/tag/v1.4.3)、[1.4.4](https://github.com/denoland/deno/releases/tag/v1.4.4)、[1.4.5](https://github.com/denoland/deno/releases/tag/v1.4.5)、[1.4.6](https://github.com/denoland/deno/releases/tag/v1.4.6)、[1.5.0](https://github.com/denoland/deno/releases/tag/v1.5.0)、[1.5.1](https://github.com/denoland/deno/releases/tag/v1.5.1)。

精读笔记：

- `isolatedModules`：用来执行其他检查以确保单独编译（例如 transpileModule 或 @babel/plugin transform typescript）是安全的。如果设置了 `isolatedModules`，则所有实现文件都必须是模块（这意味着它具有某种形式的导入/导出）。如果任何文件不是模块，则会发生错误：`'index.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module`。

## 十一月：大改 TSC 编译器基础架构

本月我们看到了 [Kitson Kelly](https://github.com/kitsonk) 长达数周重写编译管道（compilation pipeline）的总结。它进一步地提高了 TypeScript 的编译速度，更最重要的是减轻了大量的技术债务。

[deno_crypto op crate](https://crates.io/crates/deno_crypto) 也被添加。

**本月发布的版本：** 1.5.2、1.5.3、1.5.4。

精读笔记：

- [https://crates.io/](https://crates.io/) 是 Rust 下的包管理仓库。

## 十二月：自包含的二进制文件以及 LSP

[1.6.0 发布说明](https://deno.land/posts/v1.6)。

在 12 月，我们发布了 1.6 版本，包含了两个里程碑特性：自包含的二进制文件和语言服务器。`deno compile` 是 deno 的 bug 追踪器中受期待的特色之一。

通过提供的内置语言服务器提高了所有能够使用 LSP 协议的编辑器的良好开发体验。它导致了对 vscode_deno 的第三次翻新，此项工作目前还在进行中。

**本月发布的版本：**[1.6.0](https://github.com/denoland/deno/releases/tag/v1.6.0)、[1.6.1](https://github.com/denoland/deno/releases/tag/v1.6.1)、[1.6.2](https://github.com/denoland/deno/releases/tag/v1.6.2)、[1.6.3](https://github.com/denoland/deno/releases/tag/v1.6.3)。

精读笔记：

- **自包含二进制文件**：自包含的单个二进制文件可以让用户无需关注内核源码，封装即用。
- **LSP 语言服务器协议**：由红帽、微软和 Codenvy 联合推出，是编辑器/IDE 与语言服务器之间的协议，可以让不同的编辑器/IDE 嵌入各种程序语言，允许开发人员来提供相应。
- [**vscode_deno**](https://github.com/denoland/vscode_deno)：经过了三次以上的大翻新。现在支持 TypeScript 类型检查、快速修复、悬停卡、IntelliSense 等等，其和 Deno 内置的 TypeScript 进行沟通；与 deno-lint 集成，带有内联诊断；也为 deno fmt 代码格式化提供支持。

## 2021 展望

到 2020 年，我们在项目和社区中看到了许多的增长。这让我们对 Deno 进入 2021 年背后的支持倍感信心。请继续关注即将推出的激动人心的公告！

如果你有兴趣为 Deno 做贡献，或者只是想了解我们的进展，请查看以下内容：

- 回答这份 [Deno 问卷调查](https://forms.gle/hbhP46LUAfVFMggU6)；
- [查看 Q1 路线图](https://github.com/denoland/deno/issues/8824)；
- 通过添加[新的语言服务器](https://github.com/denoland/deno/issues/8643)的功能来提高对 IDE 的支持；
- 通过使用 [Web 平台测试套件](https://github.com/denoland/deno/issues/9001)来确保对 Web 的兼容性。

精读笔记：

- **Deno 问卷调查重点问题包括**：你使用 Deno 多久/多频繁/用了哪些、阻碍你使用 Deno 的原因有什么、最吸引你的优势/内置工具是什么、你在下个项目使用 Deno 的可能性多大、URL 导入觉得好吗以及你有多愿意推荐 Deno 给你周围的人？
- **Deno 2021 Q1 路线图包括但不止于**：1 月 19 日发布 1.7.0（已如期发布）、3 月 2 日发布 1.8.0、URL 导入支持 `data:`、重构运行时编译器 API、支持远程模块的访问令牌、IIFE budles、支持 React 17 jsx、rusty_v8 的 ICU、使用 WPT 测试内置 Web API、标准化运行时权限 API、结构化 worker 的 clone API、WebGPU 支持、bundles 的类型定义支持、ops 下的 V8 Fast API、URL 导入支持 `blob:` 等。
- **Web 测试套件**：在 [#8990](https://github.com/denoland/deno/pull/8990) 中 添加了 WPT runner，支持运行 Web 平台测试，目前还在提高可测试通过的范围。

## 译者结语

全文译完，并在每个章节做了简单的精读笔记。本次翻译与众不同的地方在于，专业技术难度提高了一个数量级。本文中涉及了很多专业术语甚至要懂 Deno 特性发展历程才能翻译到位的地方，在精读过程中也都一一解决。翻译过程中产生了“Deno 词汇表”的想法，已同步到 deno-tutorial 仓库中。

《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》的精读系列将重点围绕[官方博客](https://deno.land/posts)展开，同时每翻译完一篇文章，也会争取 PR 合并到目前的 [Deno 中文官网](https://deno-cn.vercel.app/)上。欢迎对 [deno-tutorial](https://github.com/hylerrix/deno-tutorial) 仓库进行 star 或关注公众号 (@ningowood) 来及时接收消息，携手助力 Deno 在 2021 变得更好！

