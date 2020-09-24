# Deno 入门手册：附大量 TypeScript 代码实例

> - 原文地址：[在 freeCodeCamp 中文社区阅读原文 The Deno Handbook](https://chinese.freecodecamp.org/news/the-deno-handbook-with-examples/)
> - 原文作者：Flavio Copes
> - 原文发布时间：2020-05-12
> - 译者：[hylerrix](https://github.com/hylerrix)（韩亦乐）, [Yunkou](https://github.com/yunkou)（寇云）
> - 校对者：[hylerrix](https://github.com/hylerrix)（韩亦乐）
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。
> - 备注：非营利组织 freeCodeCamp.org 自 2014 年成立以来，以“帮助人们免费学习编程”为使命，创建了大量免费的编程教程，包括交互式课程、视频课程、文章等。线下开发者社区遍布 160 多个国家、2000 多个城市。我们正在帮助全球数百万人学习编程，希望让世界上每个人都有机会获得免费的优质的编程教育资源，成为开发者或者运用编程去解决问题。搜索关注微信公众号 “freeCodeCamp”，可了解更多信息。

![](http://qiniu.ningo.cloud/articles/1a9-01.jpg)

我每周都在探索新的项目，很少会有一个像 [Deno](https://deno.land/) 这样的项目让我如此着迷。

在本手册中我想要让你快速入手 Deno。我会将其与 Node.js 进行对比，然后助力你在 Deno 上搭建第一个 REST API Demo。

## 目录

1. 什么是 Deno？
1. 为什么是 Deno？为什么是现在？
1. 你应该学习 Deno 吗？
1. Deno 将取代 Node.js 吗？
1. 一流的 TypeScript 支持
1. 与 Node.js 的异同
1. 不再有包管理器
1. 安装 Deno
1. Deno 命令
1. 你的第一个 Deno 应用
1. Deno 代码实例
1. 你的第一个 Deno 应用（深入版）
1. Deno 安全沙箱（Sandbox）
1. 格式化代码
1. 标准库
1. 另一个 Deno 示例
1. Deno 是否有 Express/Hapi/Koa/*？
1. 示例：使用 Oak 构建 REST API
1. 更多内容
1. 花絮
1. 结语

此外，[你可以在此处获取此 Deno 手册的 PDF / ePub / Mobi 版本。](https://flaviocopes.com/page/deno-handbook/)

## 什么是 Deno？

如果你熟悉流行的服务器端 JavaScript 运行时 Node.js，那么 Deno 就像 Node.js 一样，但却在很多方面都得到了深刻改善的全新 JavaScript / TypeScript 运行时。

让我们从 Deno 的功能列表快速了解：

- Deno 基于最新的 JavaScript 语言；
- Deno 具有覆盖面广泛的标准库；
- Deno 以 TypeScript 为核心，配以更多独特的方式从而带来了巨大的优势，其中包括一流的 TypeScript 支持（Deno 自动编译 TypeScript 而无需你单独编译）；
- Deno 大力拥抱 ES 模块标准；
- Deno 没有包管理器；
- Deno 具有一流的 `await` 语法支持；
- Deno 内置测试工具；
- Deno 旨在尽可能地与浏览器兼容，例如通过提供内置对象 `fetch` 和全局 `window` 对象。

我们将在本手册中展开探索所有上述功能。

在你实战完 Deno 并了解它独特的功能魅力后，Node.js 或许会看起来有些过时。

特别是因为 Node.js 的 API 是基于回调机制的，因为 Node.js 是在 Promise 和 Async / Await 定义在标准之前编写的。Node.js 中无法对此机制进行全新的更改，因为此类更改将产生“毁灭性”的影响。因此，在 Node.js 中我们陷入了回调大量 API 的困境。

Node.js 的确很棒，并在可见的未来将继续成为 JavaScript 世界中事实上的标准。但我认为我们将逐渐看到 Deno 会因其一流的 TypeScript 支持和其内置的、覆盖面广泛的现代标准库而越来越被重视和采用。

由于没有向后兼容性的历史原因，Deno 将可以承担起所有使用现代 Web 技术编写的工程建设。但目前的现实是，我们也无法保证十年之内 Deno 不会发生像 Node.js 同样的事情，并且不会出现一项新技术代替 Deno。

## 为什么是 Deno？为什么是现在？

大约 2 年前，Node.js 的创建者 Ryan Dahl 在 JSConf EU 上首次介绍了 Deno。观看[当时的演讲视频](https://www.youtube.com/watch?v=M3BM9TB-8yA)会非常有趣。如果你平时在大量接触 Node.js 和 JavaScript，这个视频请不要错过。

每个项目经理都必须下发决定。Ryan 回看 Node.js 中的一些早期设计依然感觉十分遗憾。此外，在 ES6/2016/2017 等持续发展中的标准加持下，如今的 JavaScript 与 2009 年 Node.js 创立时的 JavaScript 已经大不相同。

因此，他开启了一个全新项目，从而创建出服务器端的第二代 JavaScript 运行时。

新生的技术需要大量时间才能成熟，这正是我现在撰写本手册而不是两年前就开始撰写的原因。如今，第一个正式稳定的 Deno v1.0 版本终于指日可待（不出意外的话，v1.0 会在 2020 年 5 月 13 日发布）。

> 译者注：翻译本手册时 Deno 1.0 已经发布。

1.0 看起来仅仅是个数字，但在社区约定下，意味着直到 Deno 2.0 前 Deno 都不会有太多重大的破坏性改变——这很重要，因为你终于可以安心学习 Deno 当前的稳定版本了。

## 你应该学习 Deno 吗？

这并不那么容易回答。

学习像 Deno 这样全新的知识需要不少的前期技术沉淀。我的建议是：如果你现在才开始在服务器端使用 JavaScript 编程，并且你还不了解 Node.js，更没有任何 TypeScript 应用开发经验——那么请从 Node.js 学起。

毕竟用通俗观点来说，没有人会在如今因为选择学习 Node.js 而被解雇。

但如果你喜欢 TypeScript、也不想让项目中依赖无比庞大的 NPM 软件包、还想要随时随地使用 `await` 等语法，那么你可能真的需要 Deno。

## Deno 将取代 Node.js 吗？

不能。Node.js 的生态已经十分庞大和完善，获得了数以万计的优秀技术支持，将能再战数十年。

## 一流的 TypeScript 支持

Deno 基于 Rust 和 TypeScript 这两种今天正在迅速发展的语言编写。

这意味着，即使我们可能选择编写纯 JavaScript 代码来运行在基于 TypeScript 语言编写的 Deno 上，我们也可以获得 TypeScript 的很多好处。

使用 Deno 运行 TypeScript 代码无需任何手动编译——Deno 会自动为你执行此步骤。

你不必非得在 Deno 上编写 TypeScript 代码，但是 Deno 因其核心由 TypeScript 语言编写的如下相关背景是不容忽视的：

首先，越来越多的 JavaScript 程序员开始喜欢上了 TypeScript 语言。

其次，你使用的工具可以方便地推断出许多有关用 TypeScript 语言编写的软件的信息，例如 Deno。

因此，当我们在 VS Code（紧密集成 TypeScript 的编辑器）上的编码环节就能及时地体会到类型检查和高级[智能感知（IntelliSense）](https://code.visualstudio.com/docs/editor/intellisense)功能带来的好处。换句话说，编辑器可以以非常有用的方式来帮助我们了解 TypeScript 项目。

## 与 Node.js 的异同

由于 Deno 从某种角度来讲是 Node.js 的替代品，因此直接比较两者的异同对我们的理解会很有帮助。

相似之处：

- 两者都是基于 [V8 引擎](https://flaviocopes.com/v8/)开发的；
- 两者都非常适合在服务器端上编写 JavaScript 应用。

差异之处：

- Node.js 用 C++ 和 JavaScript 语言编写。Deno 用 Rust 和 TypeScript 语言编写。
- Node.js 有一个官方的软件包管理器，称为 NPM。Deno 不会有，而会允许你从 URL 导入任何 ES 模块。
- Node.js 使用 CommonJS 模块语法导入软件包。Deno 使用 ES 标准模块导入。
- Deno 在其所有 API 和标准库中都使用现代 ECMAScript 功能，而 Node.js 使用基于回调的标准库，并且没有计划对其进行升级。
- Deno 通过权限控制提供了一个安全的沙箱环境，程序只能访问由用户设置为可执行标志的文件。Node.js 程序可以直接访问用户足以访问的任何内容。
- Deno 长期以来一直在探索将程序编译成单个可执行文件的可能性，从而使得该可执行文件可以在没有外部依赖项（例如 Go）的情况下运行，但这并[不是一件容易的事](https://github.com/denoland/deno/issues/986)，如果做得到，将会成为更有话语权的游戏规则改变者。

## 没有包依赖管理器

没有像 NPM 一样的程序包管理器并且大量依靠 URL 来承载和导入程序包是有利有弊的。但我真的很喜欢这个特性：它将会非常灵活，我们可以直接创建软件包而无需在 NPM 这样的存储库中发布它们。

虽然还没有官方的消息，但我认为 Deno 下的某种软件包管理器将会出现。

与此同时，Deno 网站为第三方软件包提供代码托管服务（并帮助其通过 URL 分发）：详见 [https://deno.land/x/](https://deno.land/x/)。

## 安装 Deno

就闲聊到这里吧！让我们开始着手安装 Deno。

最简单的方法是使用 [Homebrew](https://flaviocopes.com/homebrew/)：

```bash
brew install deno
```

![](http://qiniu.ningo.cloud/articles/1a9-02.jpg)

输出如上命令后，你将可以访问 `deno` 命令。帮助是`deno --help`：

> 译者注：如果 HomeBrew 安装太慢可以尝试输入如下命令手动关闭 HomeBrew 的自动更新检测： `export HOMEBREW_NO_AUTO_UPDATE=true`

```bash
flavio@mbp~> deno --help
deno 0.42.0
A secure JavaScript and TypeScript runtime

Docs: https://deno.land/std/manual.md
Modules: https://deno.land/std/ https://deno.land/x/
Bugs: https://github.com/denoland/deno/issues

To start the REPL, supply no arguments:
  deno

To execute a script:
  deno run https://deno.land/std/examples/welcome.ts
  deno https://deno.land/std/examples/welcome.ts

To evaluate code in the shell:
  deno eval "console.log(30933 + 404)"

Run 'deno help run' for 'run'-specific flags.

USAGE:
    deno [OPTIONS] [SUBCOMMAND]

OPTIONS:
    -h, --help
            Prints help information

    -L, --log-level <log-level>
            Set log level [possible values: debug, info]

    -q, --quiet
            Suppress diagnostic output
            By default, subcommands print human-readable diagnostic messages to stderr.
            If the flag is set, restrict these messages to errors.
    -V, --version
            Prints version information


SUBCOMMANDS:
    bundle         Bundle module and dependencies into single file
    cache          Cache the dependencies
    completions    Generate shell completions
    doc            Show documentation for a module
    eval           Eval script
    fmt            Format source files
    help           Prints this message or the help of the given subcommand(s)
    info           Show info about cache or info related to source file
    install        Install script as an executable
    repl           Read Eval Print Loop
    run            Run a program given a filename or url to the module
    test           Run tests
    types          Print runtime TypeScript declarations
    upgrade        Upgrade deno executable to newest version

ENVIRONMENT VARIABLES:
    DENO_DIR             Set deno's base directory (defaults to $HOME/.deno)
    DENO_INSTALL_ROOT    Set deno install's output directory
                         (defaults to $HOME/.deno/bin)
    NO_COLOR             Set to disable color
    HTTP_PROXY           Proxy address for HTTP requests
                         (module downloads, fetch)
    HTTPS_PROXY          Same but for HTTPS
```

## Deno 命令

请注意上节中 `deno --help` 后 `SUBCOMMANDS` 中的部分，其中列出了我们在当前版本（0.42.0）中可以运行的所有命令，如下：

- `bundle` ：将项目的模块和依赖项捆绑到单个文件中；
- `cache` ：缓存依赖项；
- `completions` ：generate shell completions；
- `doc` ：显示某模块的文档；
- `eval` ：运行一段代码，例如 `deno eval "console.log(1 + 2)` ；
- `fmt` ：内置的代码格式化程序（类似于 Go 语言中的 `gofmt`）；
- `help` ：打印某消息或某给定子命令的帮助信息；
- `info` ：显示有关缓存的信息或与源文件有关的信息；
- `install` ：将脚本安装为可执行文件；
- `repl` ：开启 REPL 环境（默认子命令）；
- `run` ：运行给定文件名或 URL 的程序；
- `test` ：运行测试；
- `types` ：打印运行时的 TypeScript 声明；
- `upgrade` ：升级 Deno 到最新版本。

你可以运行 `deno <subcommand> help` 以获取该子命令的特定文档，例如 `deno run --help`。

如下所示，我们可以直接输入 `deno` 命令命令来默认启动 REPL（Read-Execute-Print-Loop）环境直接调试功能，这与运行 `deno repl` 效果是相同的。

![](http://qiniu.ningo.cloud/articles/1a9-03.jpg)

一个更常见的直接使用 `deno` 命令的场景是执行在 TypeScript 文件中写的 Deno 应用程序。

> 译者注：现在需要使用 `deno run` 命令而非 `deno` 命令来执行 TypeScript 文件。

你可以同时运行 TypeScript（.ts）文件或 JavaScript（.js）文件。

如果你不熟悉 TypeScript，请不要担心——Deno 是用 TypeScript 编写的，并且你可以使用纯 JavaScript 编写“客户端”应用程序。

如果你想快速上手的 TypeScript 话，可以阅读我的 [TypeScript 教程](https://flaviocopes.com/typescript/)。

## 你的第一个 Deno 应用

让我们来运行第一个 Deno 应用程序。

Deno 让我感到非常惊奇的特性是：你甚至不必写一行代码，便可以直接运行任何 URL 上的 Deno 应用程序。

此时 Deno 会将 URL 上的程序下载到本地并进行编译，然后运行：

![](http://qiniu.ningo.cloud/articles/1a9-04.jpg)

**当然，我一般不建议从 Internet 运行无法保障安全性的代码。在这种情况下，我们先运行 Deno 官方网站上提供的 Demo；另外 Deno 还有一个沙箱，可以阻止程序执行你不希望做的事情。稍后再详细介绍。**

这个程序很简单，只需要一个`console.log()`调用：

```typescript
console.log("Welcome to Deno 🦕");
```

如果使用浏览器打开直接打开 [https://deno.land/std/examples/welcome.ts](https://deno.land/std/examples/welcome.ts) 这个 URL，则会看到以下页面：

![](http://qiniu.ningo.cloud/articles/1a9-05.jpg)

奇怪吧？你可能期待着打开 URL 后出现一个纯 TypeScript 文件以供下载，但是我们却看到了一个网页。原因是 Deno 网站的 Web 服务器知道你正在使用浏览器，并为你提供了对用户更加友好的页面。

为了验证这个功能，我们可以使用 `wget` 命令来测试这个 URL， `wget` 使用 `text/plain` 下载文本而不是  `text/html`：

![](http://qiniu.ningo.cloud/articles/1a9-06.jpg)

如果你想再运行这个程序，现在已经被 Deno 缓存了，不需要再下载和编译了。

![](http://qiniu.ningo.cloud/articles/1a9-07.jpg)

你可以用 `--reload` 参数强制重新下载和编译原始源码。

![](http://qiniu.ningo.cloud/articles/1a9-08.jpg)

在当前版本（0.42.0）中，`deno --run` 有许多未在 `deno --help` 清单中列出的功能。你需要运行 `deno run --help` 以显示更多。

```bash
flavio@mbp~> deno run --help
deno-run
Run a program given a filename or url to the module.

By default all programs are run in sandbox without access to disk, network or
ability to spawn subprocesses.
  deno run https://deno.land/std/examples/welcome.ts

Grant all permissions:
  deno run -A https://deno.land/std/http/file_server.ts

Grant permission to read from disk and listen to network:
  deno run --allow-read --allow-net https://deno.land/std/http/file_server.ts

Grant permission to read whitelisted files from disk:
  deno run --allow-read=/etc https://deno.land/std/http/file_server.ts

USAGE:
    deno run [OPTIONS] <SCRIPT_ARG>...

OPTIONS:
    -A, --allow-all
            Allow all permissions

        --allow-env
            Allow environment access

        --allow-hrtime
            Allow high resolution time measurement

        --allow-net=<allow-net>
            Allow network access

        --allow-plugin
            Allow loading plugins

        --allow-read=<allow-read>
            Allow file system read access

        --allow-run
            Allow running subprocesses

        --allow-write=<allow-write>
            Allow file system write access

        --cached-only
            Require that remote dependencies are already cached

        --cert <FILE>
            Load certificate authority from PEM encoded file

    -c, --config <FILE>
            Load tsconfig.json configuration file

    -h, --help
            Prints help information

        --importmap <FILE>
            UNSTABLE:
            Load import map file
            Docs: https://deno.land/std/manual.md#import-maps
            Specification: https://wicg.github.io/import-maps/
            Examples: https://github.com/WICG/import-maps#the-import-map
        --inspect=<HOST:PORT>
            activate inspector on host:port (default: 127.0.0.1:9229)

        --inspect-brk=<HOST:PORT>
            activate inspector on host:port and break at start of user script

        --lock <FILE>
            Check the specified lock file

        --lock-write
            Write lock file. Use with --lock.

    -L, --log-level <log-level>
            Set log level [possible values: debug, info]

        --no-remote
            Do not resolve remote modules

    -q, --quiet
            Suppress diagnostic output
            By default, subcommands print human-readable diagnostic messages to stderr.
            If the flag is set, restrict these messages to errors.
    -r, --reload=<CACHE_BLACKLIST>
            Reload source code cache (recompile TypeScript)
            --reload
              Reload everything
            --reload=https://deno.land/std
              Reload only standard modules
            --reload=https://deno.land/std/fs/utils.ts,https://deno.land/std/fmt/colors.ts
              Reloads specific modules
        --seed <NUMBER>
            Seed Math.random()

        --unstable
            Enable unstable APIs

        --v8-flags=<v8-flags>
            Set V8 command line options. For help: --v8-flags=--help


ARGS:
    <SCRIPT_ARG>...
            script args
```

## Deno 代码实例

除了前文我们运行的 Demo 外，Deno 官网还提供了一些其他的例子，可以在这里查看：[https://deno.land/std/examples/](https://deno.land/std/examples/)。

> 译者注：你可能需要配置代理来更好地访问 DenoLand。

在撰写本手册时，我们可以找到：

- `cat.ts` ：打印的内容是作为参数提供的文件列表；
- `catj.ts` ：打印的内容是作为参数提供的文件列表；
- `chat/` ：聊天的一种实现；
- `colors.ts` ：打印一个彩色版本的 Hello world!；
- `curl.ts` ：一个简单的实现，curl 它打印指定为参数的 URL 的内容；
- `echo_server.ts` ：TCP 回显服务器；
- `gist.ts` ：一个将文件发布到 gist.github.com 的程序；
- `test.ts` ：样本测试套件；
- `welcome.ts` ：一个简单的 console.log 语句（我们在上面运行的第一个程序）；
- `xeval.ts` ：允许你为收到的任何标准输入行运行任何 TypeScript 代码。曾经被设计为 `deno xeval` 子命令但现在从官方命令中删除。

## 你的第一个 Deno 应用（深入版）

我们来写一些代码吧。

前文执行的 `deno run [https://deno.land/std/examples/welcome.ts](https://deno.land/std/examples/welcome.ts)` 命令执行的是官网提供的一个 Deno 应用，所以我们没有看到任何关于 Deno 代码具体的样子。

接下来让我们从 Deno 官方网站上列出的默认示例应用开始。

```typescript
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

这段代码从 `http/server` 模块中导入服务函数。可见我们不需要先安装这些模块，而且也不会像 Node.js 那样将这些模块大量存储在本地机器上。这也是 Deno 安装速度快的原因之一。

从 `[https://deno.land/std/http/server.ts](https://deno.land/std/http/server.ts)` 中导入会导入最新版本的模块。你可以使用`@VERSION`导入特定的版本，如下所示。

```typescript
import { serve } from "https://deno.land/std@v0.42.0/http/server.ts";
```

该 serve 函数在此文件中的定义如下：

```typescript
/**
 * Create a HTTP server
 *
 *     import { serve } from "https://deno.land/std/http/server.ts";
 *     const body = "Hello World\n";
 *     const s = serve({ port: 8000 });
 *     for await (const req of s) {
 *       req.respond({ body });
 *     }
 */
export function serve(addr: string | HTTPOptions): Server {
  if (typeof addr === "string") {
    const [hostname, port] = addr.split(":");
    addr = { hostname, port: Number(port) };
  }

  const listener = listen(addr);
  return new Server(listener);
}
```

我们接下来实例化一个服务器，调用 `server()` 函数传递一个带有端口属性的对象。

然后我们运行如下循环来响应来自服务器的每一个请求。

```typescript
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

请注意，我们在这里使用 `await` 关键字而不需要将其封装到异步函数中，因为 Deno 在其内部实现了顶层的 `await` 支持。

让我们在本地运行这个程序。假设你使用的是 VS Code（你可以使用任何你喜欢的编辑器），我建议从 `justjavac` 开发的 Deno VS Code 扩展入手（当我尝试的时候还有一个同名的扩展，但是已经被淘汰了，可能将来会消失）。

> 译者注：justjavac 的 Deno VS Code 拓展将被官方收录，以后可以直接使用官方的拓展。

![](http://qiniu.ningo.cloud/articles/1a9-09.jpg)

该扩展将为 `VS Code` 提供几个实用工具和不错的东西来帮助你编写应用程序。

现在在一个文件夹中创建一个 `app.ts` 文件，然后粘贴上面的代码。

![](http://qiniu.ningo.cloud/articles/1a9-10.jpg)

现在用 `deno run app.ts` 命令运行它。

![](http://qiniu.ningo.cloud/articles/1a9-11.jpg)

Deno 会先下载、编译我们导入的那个依赖及其所有需要的依赖项。

这是由于我们导入的 `[https://deno.land/std/http/server.ts](https://deno.land/std/http/server.ts)` 文件本身就有数个其它依赖：

```typescript
import { encode } from "../encoding/utf8.ts";
import { BufReader, BufWriter } from "../io/bufio.ts";
import { assert } from "../testing/asserts.ts";
import { deferred, Deferred, MuxAsyncIterator } from "../async/mod.ts";
import {
  bodyReader,
  chunkedBodyReader,
  emptyReader,
  writeResponse,
  readRequest,
} from "./_io.ts";
import Listener = Deno.Listener;
import Conn = Deno.Conn;
import Reader = Deno.Reader;
```

但 Deno 都会帮我们自动导入。

在最后，我们还有一个问题。

![](http://qiniu.ningo.cloud/articles/1a9-12.jpg)

这是怎么回事？我们为什么会收到执行权限被拒绝的提示？

这就涉及到了 Deno 的 Sandbox 问题，我们一起来看看。

## Deno 安全沙箱（Sandbox）

我之前提到过，Deno 有一个安全沙箱，可以防止程序做一些你不允许的事情。

这意味着什么呢？

Ryan 曾在 Deno 的介绍讲座中提到的一件事是：有时候你想在 Web 浏览器之外运行一个 JavaScript 程序，却不想让它肆意在你的系统中访问任何它想要的东西，比如使用网络与外部世界对话。

为什么我们通常只安装来自可信来源的 Node.js 包？这是因为没有什么可以阻止 Node.js 程序获取你系统上的 SSH 密钥或其他任何东西，并将其发送到服务器上。但是，我们该怎么知道自己或其他人使用的一个项目是否被黑客入侵了？

Deno 的解决方案是试图大量借鉴浏览器实现相同的权限模型——除非你明确允许，否则在浏览器中运行的任何 JavaScript 都不能在你的系统上做不正当的事情。

回到 Deno，如果一个程序想要像前面的例子一样访问网络，那么我们需要给它权限。

我们可以通过在运行命令时传递一个标志来实现，本例中是 `--allow-net`。

```bash
deno run --allow-net app.ts
```

![](http://qiniu.ningo.cloud/articles/1a9-13.jpg)

该应用程序现在监听在 8000 端口上运行着 HTTP 服务器：

![](http://qiniu.ningo.cloud/articles/1a9-14.jpg)

其他标志允许 Deno 解锁其他功能，如下所示：

- `--allow-env` ：允许访问环境变量；
- `--allow-hrtime` ：允许高分辨率时间测量；
- `--allow-net=<allow-net>` ：允许网络访问；
- `--allow-plugin` ：允许加载插件；
- `--allow-read=<allow-read>` ：允许文件系统读取权限；
- `--allow-run` ：允许运行子进程；
- `--allow-write=<allow-write>` ：允许文件系统写入访问；
- `--allow-all` ：允许所有权限(与`-A`相同)。

其中，`net`、`read` 和 `write` 的权限可以是细化的。例如，你可以使用 `--allow-read=/dev`，允许从特定文件夹中读取。

## 格式化代码

Go 语言编译器自带的 `gofmt` 命令是我非常喜欢 Go 语言特性之一。所有的 Go 代码的格式看起来都是一样的。每位 Go 程序员都在使用 `gofmt`。

JavaScript 程序员都习惯于运行 [Prettier](https://flaviocopes.com/prettier/) 工具，而 `deno fmt` 实际上直接内置相关库到底层上运行。

假设你有一个格式化问题严重的文件如下图所示。

![](http://qiniu.ningo.cloud/articles/1a9-15.jpg)

你运行 `deno fmt app.ts`，它就会执行正确的代码格式化，包括自动加上缺失的分号。

## 标准库

尽管 Deno 还很年轻，但它的标准库仍然很庞大。这包括：

- `archive` ：tar 文件归档的实用程序
- `async` ：异步工具
- `bytes` ：帮助器来操作字节切片
- `datetime` ：日期 / 时间解析
- `encoding` ：各种格式的编码/解码
- `flags` ：解析命令行标志
- `fmt` ：格式化和打印
- `fs` ：文件系统 API
- `hash` ：加密库
- `http` ：HTTP 服务器
- `io` ：I/O 库
- `log` ：日志实用程序
- `mime` ：支持多类型数据
- `node` ：Node.js 兼容层
- `path` ：路径操纵
- `ws` ：WebSockets

## 另一个 Deno 示例

我们再来看看另一个 Deno APP 的例子，以如下 `cat.ts` 为例。

```typescript
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

这里把 `Deno.args` 的值分配给了 filenames 变量，`Deno.args` 是一个包含所有发送到命令中的参数的变量。

我们对这些参数进行迭代：对每一个参数，我们使用 `Deno.open()` 打开文件，并使用 `Deno.copy()` 将文件的内容打印到 `Deno.stdout` 中，最后我们关闭该文件。

如果你使用如下命令：

```bash
deno run https://deno.land/std/examples/cat.ts
```

程序被下载编译后，由于我们没有指定任何参数，所以没有发生任何事情。

现在试试这个：

```bash
deno run https://deno.land/std/examples/cat.ts app.ts
```

假设你在同一个文件夹里有之前项目中的 `app.ts`。

你会得到如下权限错误。

![](http://qiniu.ningo.cloud/articles/1a9-16.jpg)

这是因为 Deno 默认情况下不允许访问文件系统。需要使用 `--allow-read=./` 命令授予对当前文件夹的访问权限：

```bash
deno run --allow-read=./ https://deno.land/std/examples/cat.ts app.ts
```

![](http://qiniu.ningo.cloud/articles/1a9-17.jpg)

## Deno 是否有 Express/Hapi/Koa/*

当然有。可以看看下方这些库。

- [deno-drash](https://github.com/drashland/deno-drash)
- [deno-express](https://github.com/NMathar/deno-express)
- [oak](https://github.com/oakserver/oak)
- [pogo](https://github.com/sholladay/pogo)
- [servest](https://github.com/keroxp/servest)

## 示例：使用 Oak 构建 REST-API

我想在这里做一个简单的 Demo 实战，介绍一下如何使用 Oak 框架构建`REST API`。Oak 很有意思，因为它的灵感来自于 Koa，一个流行的 Node.js 中间件。正因为如此，如果你以前用过 Koa 的话，会很快熟悉 Oak。

我们要构建的 API 示例也非常简单。

我们的服务器将在内存中存储一个带有名字和年龄的旺柴的列表。

我们的需求是：

- 添加旺柴；
- 列出旺柴；
- 获取有关特定旺柴的详细信息；
- 从名单上删除一只旺柴；
- 更新旺柴的年龄。

我们将使用 TypeScript 进行此操作，但是没有什么可以阻止你使用 JavaScript 编写 API——你只需要删除下方 TypeScript 文件中所有有关类型描述的代码并将文件名后缀改为 `.js`。

创建一个 `app.ts` 文件。

让我们开始从 Oak 导入 `Application` 和 `Router` 对象：

```typescript
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
```

然后我们得到环境变量 `PORT` 和 `HOST`:

```typescript
const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";
```

默认情况下，我们的应用程序将在 `localhost：4000` 上运行。

现在，我们创建 `Oak` 应用程序并启动它：

```typescript
const router = new Router();

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
```

现在，应用程序应该可以正常编译了。

```bash
deno run --allow-env --allow-net app.ts
```

然后 Deno 将下载依赖项：

![](http://qiniu.ningo.cloud/articles/1a9-18.jpg)

这时程序监听在 `4000` 端口上。

下次运行该命令时，Deno 会跳过安装部分，因为这些包已经被缓存了。

![](http://qiniu.ningo.cloud/articles/1a9-19.jpg)

在文件的顶部，让我们定义一个旺柴的接口，然后我们声明一个初始的 `Dogs` 数组 `Dog` 对象。

```typescript
interface Dog {
  name: string;
  age: number;
}

let dogs: Array<Dog> = [
  {
    name: "Roger",
    age: 8,
  },
  {
    name: "Syd",
    age: 7,
  },
];
```

现在，让我们来实现具体 API。

我们已经准备好了一切。在你创建了路由器之后，让我们添加一些函数，这些函数将在任何时候触发这些路由中的一个端点时被调用。

```typescript
const router = new Router();

router
  .get("/dogs", getDogs)
  .get("/dogs/:name", getDog)
  .post("/dogs", addDog)
  .put("/dogs/:name", updateDog)
  .delete("/dogs/:name", removeDog);
```

看到了吗？我们的 API 定义是：

- `GET /dogs`
- `GET /dogs/:name`
- `POST /dogs`
- `PUT /dogs/:name`
- `DELETE /dogs/:name`

让我们开始一一实现。

从开始 `GET /dogs`，它将返回所有旺柴的列表：

```typescript
export const getDogs = ({ response }: { response: any }) => {
  response.body = dogs;
};
```

![](http://qiniu.ningo.cloud/articles/1a9-20.jpg)

接下来，我们就来看看如何通过名字来检索旺柴。

```typescript
export const getDog = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const dog = dogs.filter((dog) => dog.name === params.name);
  if (dog.length) {
    response.status = 200;
    response.body = dog[0];
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find dog ${params.name}` };
};
```

![](http://qiniu.ningo.cloud/articles/1a9-21.jpg)

这是我们添加一个新的旺柴的方法：

```typescript
export const addDog = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const dog: Dog = body.value;
  dogs.push(dog);

  response.body = { msg: "OK" };
  response.status = 200;
};
```

![](http://qiniu.ningo.cloud/articles/1a9-22.jpg)

注意，我现在使用 `const body = await request.body()` 来获取正文的内容，因为 `name` 和 `age` 值是以 JSON 的形式传递的。

这是我们更新旺柴的年龄的方法：

```typescript
export const updateDog = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const temp = dogs.filter((existingDog) => existingDog.name === params.name);
  const body = await request.body();
  const { age }: { age: number } = body.value;

  if (temp.length) {
    temp[0].age = age;
    response.status = 200;
    response.body = { msg: "OK" };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find dog ${params.name}` };
};
```

![](http://qiniu.ningo.cloud/articles/1a9-23.jpg)

这是我们如何从列表中删除旺柴的方法：


```typescript
export const removeDog = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const lengthBefore = dogs.length;
  dogs = dogs.filter((dog) => dog.name !== params.name);

  if (dogs.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find dog ${params.name}` };
    return;
  }

  response.body = { msg: "OK" };
  response.status = 200;
};
```

![](http://qiniu.ningo.cloud/articles/1a9-24.jpg)

这是完整的示例代码：

```typescript
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

interface Dog {
  name: string;
  age: number;
}

let dogs: Array<Dog> = [
  {
    name: "Roger",
    age: 8,
  },
  {
    name: "Syd",
    age: 7,
  },
];

export const getDogs = ({ response }: { response: any }) => {
  response.body = dogs;
};

export const getDog = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const dog = dogs.filter((dog) => dog.name === params.name);
  if (dog.length) {
    response.status = 200;
    response.body = dog[0];
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find dog ${params.name}` };
};

export const addDog = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const { name, age }: { name: string; age: number } = body.value;
  dogs.push({
    name: name,
    age: age,
  });

  response.body = { msg: "OK" };
  response.status = 200;
};

export const updateDog = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const temp = dogs.filter((existingDog) => existingDog.name === params.name);
  const body = await request.body();
  const { age }: { age: number } = body.value;

  if (temp.length) {
    temp[0].age = age;
    response.status = 200;
    response.body = { msg: "OK" };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find dog ${params.name}` };
};

export const removeDog = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const lengthBefore = dogs.length;
  dogs = dogs.filter((dog) => dog.name !== params.name);

  if (dogs.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find dog ${params.name}` };
    return;
  }

  response.body = { msg: "OK" };
  response.status = 200;
};

const router = new Router();
router
  .get("/dogs", getDogs)
  .get("/dogs/:name", getDog)
  .post("/dogs", addDog)
  .put("/dogs/:name", updateDog)
  .delete("/dogs/:name", removeDog);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
```

## 更多内容

Deno 官方网站为 [https://deno.land](https://deno.land)。

API 文档位于 [https://doc.deno.land](https://doc.deno.land) 和 [https://deno.land/typedoc/index.html](https://deno.land/typedoc/index.html) 中。

一份 Awesome Deno 资源清单 [https://github.com/denolib/awesome-deno](https://github.com/denolib/awesome-deno)。

> 译者注：中文的 Awesome Deno 清单由译者持续维护中，可以访问这里：[Awesome Deno 资源全图谱](https://github.com/hylerrix/awesome-deno-cn)

## 花絮

- Deno 提供了一个内置的 `fetch` 实现，该实现与浏览器中可用的匹配。
- Deno 正在进行与 Node.js stdlib 的兼容层

## 结语
 
我希望你喜欢这个 Deno 入门手册！

别忘了，[你可以在此处获取此 Deno 手册的 PDF / ePub / Mobi 版本。](https://flaviocopes.com/page/deno-handbook/)
