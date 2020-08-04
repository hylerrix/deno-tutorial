# 从 CLI 指令通读 Deno v1.x 全特性

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596527495214-be867c27-7594-4771-bd4a-ceb8a74320c0.png#align=left&display=inline&height=587&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1174&originWidth=2148&size=2714972&status=done&style=none&width=1074)

随着掘金开启了第一期技术专题之“[聊聊 Deno 的一些事儿](https://juejin.im/post/6854573219266887694)”的征稿活动，赶在截稿日的最后一天（08/04），一篇新的 Deno 文章呼之欲出。拜读了下其他伙伴的 Deno 征文，有 Deno TCP Echo Server、在 Deno 上进行 TDD 实践、Deno 程序如何调用 Rust、Deno 命令行开发方案、Deno 造一个简单的 Router、Deno 的简单应用以及 Deno 从入门到跑路、Deno 从零到架构开发等等文章，每篇都很生动精彩。那么...如果你是这两天看到的这篇文章，觉得有所帮助，**欢(gan)迎(jin)来我的掘金文章里点点赞**，可以让我获得一个不错的掘金周边礼物~如果是未来某天看到的，[**戳这里**](https://github.com/hylerrix/deno-tutorial)。

- **掘金文章点赞传送门**：[https://juejin.im/user/3702810890732904/posts](https://juejin.im/user/3702810890732904/posts)

本篇的主题是“通读 Deno 架构”，切入的方向是“命令行指令通读”的角度。关于“通读 Deno 架构”主题，感觉可以挖坑出一个系列文章来，比如从 CLI、标准库、内核以及工具库角度来深入到源码之中。

从命令行指令可以看出，Deno 官方内置了很多工具用来测试、打包、格式化、Linter、安装依赖库等；而在 Node 中，我们可能需要寻找并选型大量的第三方库来填补每一个功能。一起来看看都有哪些工具吧！**本文写作时间 14h+**，大量重构后沉淀出的目录结构：

- **通读命令行基本信息**：从 deno --help 来通读通用指令、内置工具包和环境变量；
- **通读 Deno 通用指令**：逐个通读通用指令；
- **通读 Deno 内置工具包**：逐个通读 14 个 Deno 内置工具关键功能；
- **通读 Deno 环境变量**：将环境变量分离出来进行解析；

> 《Deno 钻研之术》系列于 Deno v1 发布之日全新推出，不定期更新在 Github 中（[https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) ✨），官网（[http://deno-tutorial.js.org](http://deno-tutorial.js.org/)）。让我们一起循序渐进学 Deno，先易后难补 Node，面向未来开发属于自己的 Deno Web App。欢迎订阅，欢迎交流。

## 通读命令行基本信息

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596529925246-c8e8c4f1-47a5-43a6-a49d-856f685969b6.png#align=left&display=inline&height=151&margin=%5Bobject%20Object%5D&name=image.png&originHeight=195&originWidth=259&size=81027&status=done&style=none&width=201)

### deno --help, help

了解一个命令的最快速实用的方法就是直接阅读其帮助文档，每行帮助信息都是简短且关键的介绍，不难理解和翻译。终端输入如下命令（help 或 --help 用来打印全局帮助信息或给定子命令的帮助信息）：

```bash
$ deno --help
```

从而获得 Deno 的基本帮助信息：

- deno 1.2.2（2020-08-01 发布）
- 一个安全的 JavaScript 和 TypeScript 运行时
- 文档：[https://deno.land/manual](https://deno.land/manual)
- 模块：[https://deno.land/std/](https://deno.land/std/) [https://deno.land/x/](https://deno.land/x/)
- Bugs：[https://github.com/denoland/deno/issues](https://github.com/denoland/deno/issues)
- 使用方式：deno [OPTIONS] [子命令]

```bash
# 以 REPL 模式启动：
$ deno
# 执行一个脚本：
$ deno run https://deno.land/std/examples/welcome.ts
# 在 Shell 中执行一段代码：
$ deno eval "console.log(30933 + 404)"
```

### 汇总 26 个通用指令

结合 deno --help 中出现的选项以及通常也会在 14 个内置工具包的帮助信息中看到的选项，将通用指令整理在这里做一个通览（只要某指令被使用两次及以上便视为通用指令，几乎涵盖了所有）：

- P.S：在纠结到底称为“参数”还是“选项”还是“指令”的时候，差点选了“参数”，最后选择了“指令”。

> 注：以下表格整理了好几小时，如果能帮到你，别忘记多多点赞哟。挖个坑：以后可以绘制出一个思维导图来。同时，如果哪里有差错，欢迎在评论区 Github 仓库 issues 里留言哈。

| 序号 | 选项 | 哪些工具可以使用？ | 用途 |
| --- | --- | --- | --- |
| 01 | -h, --help | 全部 | 打印帮助信息 |
| 02 | -L, --log-level <log-level> | 全部 | 设置日志级别 [可能的值: debug, info] |
| 03 | -q, --quiet | 全部 | 禁止诊断输出；默认情况下，子命令会将可读性友好的诊断消息打印到 stderr；如果设置了这个标志，则将这些消息限制为 errors |
| 04 | -A, --allow-all | run, install, test | 允许所有权限，这将禁用所有安全限制 |
| 05 | --allow-env | run, install, test | 允许环境访问，例如读取和设置环境变量 |
| 06 | --allow-hrtime | run, install, test | 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用 |
| 07 | --allow-net=<allow-net> | run, install, test | 允许网络访问。可以指定一系列用逗号分隔的域名，来提供域名白名单 |
| 08 | --allow-plugin | run, install, test | 允许加载插件。请注意：这目前是一个不稳定功能 |
| 09 | --allow-read=<allow-read> | run, install, test | 允许读取文件系统。可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。 |
| 10 | --allow-run | run, install, test | 允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用 |
| 11 | --allow-write=<allow-write> | run, install, test | 允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单 |
| 12 | --cert <FILE> | run, install, bundle, chche, eval, info, test, upgrade, repl | 从 PEM 编码的文件中加载证书颁发机构 |
| 13 | -c, --config <FILE> | run, install, budle, cache, test | 读取 tsconfig.json 配置文件 |
| 14 | --unstable | run, install, bundle, cache, doc, eval, fmt, info, lint, test, types, repl | 开启不稳定的 APIs 支持 |
| 15 | --inspect=<HOST:PORT> | run, eval, test, repl | 激活监听器 主机:端口 (默认: 127.0.0.1:9229) |
| 16 | --inspect-brk=<HOST:PORT> | run, eval, test, repl | 在 主机:端口 上激活监听器，并在用户脚本启动时中断 |
| 17 | --v8-flags=<v8-flags> | run, eval, test, repl | 设置 V8 命令行选项。帮助： --v8-flags=--help |
| 18 | --cached-only | run, test | 要求远程依赖项已经被缓存 |
| 19 | -r, --reload=<CACHE_BLOCKLIST> | run, cache, doc, test | 重新加载源代码缓存（重新编译TypeScript）。重新加载全部/仅标准模块/特定模块 |
| 20 | --lock <FILE> | run, bundle, cache, test | 检查指定的锁文件 |
| 21 | --lock-write | run, bundle, cache, test | 写入锁文件，和 --lock 一起使用 |
| 22 | --no-check | run, cache, info, test | 禁用 TypeScript 的类型检查，这会大大减少程序的启动时间 |
| 23 | --no-remote | run, cache, test | 不解析远程模块 |
| 24 | --seed <NUMBER> | run, test | Math.random() 种子 |
| 25 | --importmap <FILE> | run, install, bundle, test | 不稳定：读取 import map 文件 |
| 26 | --json | doc, info | 以 JSON 格式输出文档 |

具体通用指令会在“通读 Deno 通用指令”章节进行深入了解。

### 汇总 14 个内置工具包

帮助信息中初步介绍了这 14 个内置工具（为了强调每个工具的独立性，这些工具暂时都翻译为“xx 器”）：

| 序号 | 名称 | 命令 | 功能 |
| --- | --- | --- | --- |
| 01 | 运行器 | deno run | 运行指定文件名或 URL 程序。 使用“-”作为文件名从标准输入中读取 |
| 02 | 脚本安装器 | deno install | 将脚本安装为可执行文件 |
| 03 | 打包器 | deno bundle | 将模块和依赖项打包到单个文件中 |
| 04 | 缓存器 | deno cache | 缓存依赖 |
| 05 | 文档生成器 | deno doc | 显示某模块的文档 |
| 06 | 执行器 | deno eval | 执行一段脚本 |
| 07 | 格式化器 | deno fmt | 格式化源文件 |
| 08 | 依赖检查器 | deno info | 显示有关缓存的信息或与源文件相关的信息 |
| 09 | 规范器 | deno lint | 规范化源文件 |
| 10 | 测试器 | deno test | 执行测试 |
| 11 | 类型器 | deno types | 打印运行时 TypeScript 声明 |
| 12 | 补全器 | deno completions | 生成 Shell 补全信息 |
| 13 | 升级器 | deno upgrade | 将 Deno 可执行文件升级到给定版本 |
| 14 | REPL 器 | deo repl | 读取/执行/打印/循环 |

具体工具会在“通读 Deno 内置工具包”章节进行深入了解。

### 汇总 6 个基本环境变量

帮助信息里初步介绍了这 6 个环境变量：

| 序号 | 变量名 | 用途 | 备注 |
| --- | --- | --- | --- |
| 01 | DENO_DIR | 设置缓存目录 |  |
| 02 | DENO_INSTALL_ROOT | 设置 Deno 安装的软件包输入目录 | 默认为 $HOME/.deno/bin |
| 03 | NO_COLOR | 设置禁止使用颜色 |  |
| 04 | DENO_CERT | 从 PEM 编码的文件加载证书颁发机构 |  |
| 05 | HTTP_PROXY | HTTP 请求的代理地址 | 模块 downloads 和 fetch |
| 06 | HTTPS_PROXY | HTTPS 请求的代理地址 | 模块 downloads 和 fetch |

具体基本环境变量会在“通读 Deno 环境变量”章节进行深入了解。

## 通读 Deno 通用指令

> 相关实战代码都收录在[《Deno 钻研之术》仓库](https://github.com/hylerrix/deno-tutorial)中的 demos/ningowood/v1-cli-example 下。

本章目录按照 14 个内置工具使用到的数量进行由大到小的排序。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596529966276-8030cc66-b39d-4051-8615-0c11a10ebbc4.png#align=left&display=inline&height=205&margin=%5Bobject%20Object%5D&name=image.png&originHeight=574&originWidth=666&size=138294&status=done&style=none&width=238)

### (01) --log-level/--quiet

这两个指令所有内置工具都可以使用。

在 --log-level 中，可以加入 debug 或 info 参数 来设置日志等级。其中设置为 debug 时会出现如下信息。此时是非常详细的信息，一个简单的启动和网络访问都会打印出很多行的日志来。

```bash
$ deno run --allow-net --log-level debug main.ts
Deno isolate init with snapshots.
rust:shared_queue:reset
DEBUG JS - cwd /Users/{$HOME}/WorkSpace/Hylerrix/deno-tutorial/demos/ningowood/v1-cli-example
DEBUG JS - args []
...
⚠️️  Granted network access to "0.0.0.0:8000"
New listener 3 0.0.0.0:8000
Welcome to Deno 🦕
http://localhost:8000/
DEBUG JS - sendAsync op_accept
```

--quiet 指令于 2019-10-20 日的 issues 被提出[新功能建议（#3162）](https://github.com/denoland/deno/issues/3162)，2020-03-10 日成功添加。目的之一是解决多次运行同一程序但获得到不同的输出的情况。官方文档上该指令介绍是：将本来可读性友好的诊断消息限制为通用错误类型。

### (02) --unstable/--cert/--config

这三个指令是除了所有指令都能用到的 --log-level 和 --quiet 外，被使用量最大的前三名。

--unstable 允许程序执行时使用不稳定的 API 列表。什么样的 API 是不稳定的？官网文档这么解答：

> 纵使 Deno v1 开始 Deno 命名空间的 API 稳定起来，但并非 Deno 的所有功能都可以投入生产。由于尚未准备就绪的功能仍处于草稿阶段，因此将其锁定在 --unstable 命令行标志后面。

不稳定的 API 大多没有经过安全性检查，将来可能会发生重大的 API 更改，并且尚未准备好投入生产环境。

同时，Deno 的标准模块（[https://deno.land/std/](https://deno.land/std/)）也尚不稳定。当前 Deno 对标准模块的版本与 CLI 不同，以强调不稳定这一特点。 请注意，与 Deno 命名空间不同，使用标准模块不需要 --unstable 标志（除非标准模块本身使用了不稳定的 Deno 功能）。测试方式：

```bash
$ deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts
```

--cert 用来从 PEM 编码的文件中加载证书颁发机构。那么问题来了：

- **什么是 PEM**？PEM 这是一种容器格式，可以只包含公共证书，或者可以包括完整的证书链，包括公共密钥，私钥和根证书；名称来源于网络安全领域一款增强安全的私人邮件类型 Privacy Enhanced Mail。
- **PEM 格式**？以"-----BEGIN..."开头, "-----END..."结尾，内容是 ASCII（Base64）编码。
- **查看 PEM 格式证书的信息**？openssl x509 -in certificate.pem -text -noout。

--config 用来读取 tsconfig.json 文件，当然也可以读取其它名称的文件来当作 tsconfig.json。

```bash
deno run --allow-net main.ts --config tsconfig.json
```

### (03) --inspect*/--v8-flags

这几个指令均只能在 run、eval、test 或 repl 四个工具包中使用。

Deno 支持 V8 Inspector Protocol，使用 --inspect 或 --inspect-brk 指令可以在 Chrome Devtools 或其他支持该协议的客户端（比如 VSCode）上调试 Deno 程序。

--inspect 允许在任何时间点连接调试器，而 --inspect-brk 选项会等待调试器连接，在第一行代码处暂停执行。输入以下代码，打开 chrome://inspect，点击 target 旁边的 Inspect 进行调试测试：

```bash
$ deno run --inspect-brk --allow-read --allow-net https://deno.land/std/http/file_server.ts
Debugger listening on ws://127.0.0.1:9229/ws/4947ac73-b9fc-4fd2-9336-c6071f4f3e9e
Debugger session started.
Debugger session ended: WebSocket protocol error: Connection reset without closing handshake.
HTTP server listening on http://0.0.0.0:4507/
```

--v8-flags 前身是 --v8-options，于 [2019-11-21 日（#3389）](https://github.com/denoland/deno/pull/3389)更替为 --v8-flags，负责设置 v8 的命令行选项。可以这样了解具体参数：

```bash
$ deno run --v8-flags=--help main.ts
SSE3=1 SSSE3=1 SSE4_1=1 SSE4_2=1 SAHF=1 AVX=1 FMA3=1 BMI1=1 BMI2=1 LZCNT=1 POPCNT=1 ATOM=0
Synopsis:
  shell [options] [--shell] [<file>...]
  d8 [options] [-e <string>] [--shell] [[--module] <file>...]
...
```

### (04) --allow-*

--allow-* 作为一个整体，只被 run、install 和 test 三个工具分别使用，其中包括：

- -A, --allow-all：允许所有权限，这将禁用所有安全限制。
- --allow-env：允许环境访问，例如读取和设置环境变量
- --allow-hrtime：允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用
- --allow-net：允许网络访问。可以指定一系列用逗号分隔的域名，来提供域名白名单
- --allow-plugin：允许加载插件。请注意：这目前是一个不稳定功能
- --allow-read：允许读取文件系统。可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。
- --allow-run：允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用
- --allow-write：允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单

在 Denon （监听 Deno 应用程序中的所有更改并自动重新启动，还可以配置更多功能）中，可以这样简单的设置在 denon.config.ts 中：

```bash
import { DenonConfig } from "https://deno.land/x/denon/mod.ts"
import { config as env } from "https://deno.land/x/dotenv/mod.ts"

const config: DenonConfig = {
  scripts: {
    start: {
      allow: [ "env", "net", "read", "write", "plugin" ],
      ...
}

export default config
```

执行 denon start 这将默认替换为：

```bash
$ deno run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable main.ts
```

### (05) --cached-only/--seed

这两个指令只被 run 和 test 工具使用。

--cached-only 要求远程依赖已经被缓存，当我们使用这个指令从远程找一个没有缓存过其软件包的 Deno 程序执行的时候，会报错无法从缓存中找到这个软件包：

```bash
$ deno run --allow-net --cached-only not-cache.ts
error: Cannot find module "https://deno.land/x/alosaur@v0.21.1/mod.ts"
from "file:///Users/{$HOME}/WorkSpace/Hylerrix/deno-tutorial/
...demos/ningowood/v1-cli-example/not-cache.ts" in cache, --cached-only is specified
```

--seed 为程序提供种子随机值。程序怎么获取这个随机值？留下来以后思考。

```bash
$ deno run --allow-net --seed 1 main.ts
```

### (06) --reload/--lock*/.--no-*

这五个指令是剩余的最后指令，分别被以下工具使用：

- --reload：run, cache, doc, test
- --lock：run, bundle, cache, test
- --lock-write：run, bundle, cache, test
- --no-check：run, cache, info, test
- --no-remote：run, cache, test

--reload 将重新缓存源码，并重新编译 TypeScript，其中又包括：

- --reload：重新加载所有源码
- --reload=https://deno.land/std：重新缓存标准库源码
- --reload=https://deno.land/std/fs/utils.ts,https://deno.land/std/fmt/colors.ts：重新缓存指定的多个源码列表

--lock 和 --lock-write 用来检查锁文件，因为在眼花缭乱的各大库的多版本中，管理、锁定文件版本也是很重要的；--no-check 禁用 TypeScript 的类型检查，从而大大减少程序的启动时间；--no-remote 来不解析远程模块。

```bash
$ deno run --allow-net --reload main.ts
$ deno run --allow-net --lock lock.json main.ts
Subresource integrity check failed --lock=lock.json
https://deno.land/std@0.63.0/textproto/mod.tsa
$ deno run --allow-net --no-check main.ts
$ deno run --allow-net --no-remote main.ts
```

## 通读 Deno 内置工具包

> 相关实战代码都收录在[《Deno 钻研之术》仓库](https://github.com/hylerrix/deno-tutorial)中的 demos/ningowood/v1-cli-example 下。

由于本文在“通读 Deno 通用指令章节”将 Deno 内置工具包可复用的指令都已经一一介绍了一遍。本章重点以目录的形式强调 14 个内置工具包的独立性（中文名以 xx 器来命名），并进行除了通用指令外的一些独特介绍。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596530001606-e5644671-e6a9-48eb-9e25-76ebdaf082e3.png#align=left&display=inline&height=184&margin=%5Bobject%20Object%5D&name=image.png&originHeight=368&originWidth=390&size=38226&status=done&style=none&width=195)

### (01) 运行器：deno run

run 工具支持近乎 100% 的通用指令列表（--json 指令除外），且上一个章节的通用指令示例都以 run 工具来举例，这里无需多讲。

- deno-run：执行一个模块程序，可以是一个文件名或 URL 地址。
- 使用方式：`deno run [OPTIONS] <脚本参数>...`
- 常用示例：

```bash
# 默认情况下所有的程序都会运行在安全沙盒中，无法访问硬盘、网络或生成子进程。
$ deno run https://deno.land/std/examples/welcome.ts
# 给予所有权限
$ deno run -A https://deno.land/std/http/file_server.ts
# 给予读取权限和网络监听权限：
$ deno run --allow-read --allow-net https://deno.land/std/http/file_server.ts
# 给予允许读取权限的硬盘目录白名单：
$ deno run --allow-read=/etc https://deno.land/std/http/file_server.ts
# Deno 允许指定文件名 “-” 以从 stdin 中读取文件。
$ curl https://deno.land/std/examples/welcome.ts | target/debug/deno run -
```

### (02) 脚本安装器：deno install

- deno-install：将脚本作为可执行文件安装在安装路`径的根目录的 bin 目录中。
- 使用方式：`deno install [OPTIONS] <命令>...`
- 独特指令：
   - `-f, --force`：强制覆盖现有安装
   - `-n, --name <NAME>`：可执行文件名
   - `--root <PATH>`：安装路径
- 常用示例：

```bash
$ deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
$ deno install https://deno.land/std/examples/colors.ts
# 要更改可执行文件的名称，请使用 -n/-name：
$ deno install --allow-net --allow-read -n serve https://deno.land/std/http/file_server.ts
# 可执行文件名称默认情况下被推断：
#   - 尝试获取 URL 路径文件结构。正如上方上面的例子
#     become 'file_server'.
#   - 如果文件结构是通用名称（例如“main”、“mod”、“index”或“ cli”），并且该路径没有父级，则采用父级路径的文件名。否则，使用通用名称解决。
# 要更改安装根目录，请使用 --root：
$ deno install --allow-net --allow-read --root /usr/local https://deno.land/std/http/file_server.ts
# 按优先级确定安装路径的根目录：
#   - --root option
#   - DENO_INSTALL_ROOT 环境变量
#   - $HOME/.deno
# 如果需要，必须将它们手动添加到路径中。
```

### (03) 打包器：deno bundle

- deno-bundle：打包。
- 使用方式：`deno bundle [OPTIONS] <source_file> [out_file]`
- 常用示例：

```bash
# 输入一个单独的 JavaScript 文件，其拥有所有相关依赖：
$ deno bundle https://deno.land/std/examples/colors.ts colors.bundle.js
# 如果没有指定输入文件，输入将会写入到标准输出流中：
$ deno bundle https://deno.land/std/examples/colors.ts
```

### (04) 缓存器：deno cache

- deno-cache：递归地缓存并编译远程依赖
- 使用方式：`deno cache [OPTIONS] <file>...`
- 常用示例：

```bash
# 下载并编译包括所有静态依赖项的模块并保存在
# 本地缓存中，无需运行任何代码：
$ deno cache https://deno.land/std/http/file_server.ts
# 除非以后运行此模块，否则不会触发下载或编译
# --reload 已指定。
```

### (05) 文档生成器：deno doc

- deno-doc：显示某模块的文档
- 使用方式：`deno doc [OPTIONS] [ARGS]`

- 独特指令：
   - `--private`：输出私有文档
- 常用示例：

```bash
# 输出文档到标准输入流中：
$ deno doc ./path/to/module.ts
# 输出私有文档到标准输出流中：
$ deno doc --private ./path/to/module.ts
# 以 JSON 格式输出文档：
$ deno doc --json ./path/to/module.ts
# 定位特定的符号：
$ deno doc ./path/to/module.ts MyClass.someField
# 显示运行时内置文档：
$ deno doc
$ deno doc --builtin Deno.Listener
```

### (06) 执行器：deno eval

- deno-eval：执行代码。
- 使用方式：`deno eval [OPTIOS] <CODE>`

- 独特指令：
   - `-p, --print`：打印结果到标准输出流中
   - `-T, --ts`：将输入视为 TypeScript
- 常用示例：

```bash
# 从命令行中执行 JavaScript。
$ deno eval "console.log('hello world')"
# 以 TypeScript 方式执行：
$ deno eval -T "const v: string = 'hello'; console.log(v)"
# 此命令具有对所有权限的隐式访问权限（--allow-all）。
```

### (07) 格式化器：deno fmt

- deno-fmt：自动格式化 JavaScript/TypeScript 源代码。
- 使用方式：`deno fmt [OPTIONS] [FILE]...`
- 独特指令：
   - `--check`：检查源文件是否已被格式化
   - `--ignore=<ignore>`：忽略格式化特定的源文件。 与 --unstable 一起使用。
- 常用示例：

```bash
$ deno fmt --help
$ deno fmt
$ deno fmt myfile1.ts myfile2.ts
$ deno fmt --check
# 格式化标准输入流并输出到标准输出流：
$ cat file.ts | deno fmt -
# 通过在其前面加上忽略注释来忽略此行代码格式化：
#   // deno-fmt-ignore
# 通过在文件顶部添加忽略注释来忽略此文件格式化：
#   // deno-fmt-ignore-file
```

### (08) 依赖检查器：deno info

- deno-info：有关模块或缓存目录的信息。
- 使用方式：`deno info [OPTIONS] [FILE]`
- 常用示例：

```bash
# 获取有关模块的信息：
$ deno info https://deno.land/std/http/file_server.ts
# 将显示以下信息：
# local: 文件的本地路径
# type: JavaScript、TypeScript 或者 JSON。
# compiled: 编译源代码的本地路径。（仅 TypeScript）
# map: 源映射的本地路径。 （仅 TypeScript）
# deps: 源文件的依赖关系树。
# 没有任何其他参数，“deno info” 将显示：
# DENO_DIR: 包含 Deno 管理文件的目录。
# Remote modules cache: 包含下载的远程模块的子目录。
# TypeScript compiler cache: 包含 TS 编译器输出的子目录。
```

### (09) 规范器：deno lint

- deno-lint：规范 JavaScript/TypeScript 源码。
- 独特指令：
   - --rules：列出可用规则
- 使用方式：deno lint `[OPTIONS] [FILE]...`
- 常用示例：

```bash
$ deno lint --unstable
$ deno lint --unstable myfile1.ts myfile2.js
# 列出可用规则：
$ deno lint --unstable --rules
# 通过在其前面加上忽略注释来忽略下一行的诊断，规则名称:
#   // deno-lint-ignore no-explicit-any
#   // deno-lint-ignore require-await no-empty
# 必须在忽略注释之后指定要忽略的规则的名称。
# 还支持 ESLint 忽略注释：
#   // eslint-ignore-next-line @typescrit-eslint/no-explicit-any no-empty
# 通过在文件顶部添加忽略注释来忽略整个文件：
#   // deno-lint-ignore-file
```

### (10) 测试器：deno test

- deno-test：使用 Deno 的内置测试运行程序运行测试。
- 使用方式：`deno test [OPTIONS] [文件名]...`
- 独特指令：
   - --allow-none：如果未找到测试文件，则不返回错误代码
   - --failfast：在第一个错误发生时停止
   - --filter <FILTER>：使用测试名称中的此字符串或模式运行测试
- 常用示例：

```bash
# 执行给定的模块，运行'Deno.test（）'声明的所有测试，然后将结果输出到到标准输出溜中：
$ deno test src/fetch_test.ts src/signal_test.ts
# 目录参数扩展为与 glob 匹配的所有包含文件
# {*_,*.,}test.{js,mjs,ts,jsx,tsx}：
$ deno test src/
```

### (11) 类型器：deno types

- deno-types：打印运行时的 TypeScript 声明。
- 使用方式：`deno types [OPTIONS]`
- 常用示例：

```bash
$ deno types --help
$ deno types > lib.deno.d.ts
# 声明文件可以保存并用于录入新内容。
```

### (12) 补全器：deno completions

- deno-completions：输入 shell 补全信息到标准输出流中。
- 使用方式：`deno completions [OPTIONS] <shell>`
- 常用示例：

```bash
$ deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
$ source /usr/local/etc/bash_completion.d/deno.bash
# [shell 可能的值： zsh, bash, fish, powershell, elvish]
```

### (13) 升级器：deno upgrade

- deno-upgrade：将 deno 可执行文件升级到给定的版本。
- 使用方式：`deno upgrade [OPTIONS]`
- 独特指令：
   - `--dry-run`：执行所有检查，而不替换旧的 exe
   - `-f, --force`：即使不是过期也要替换当前的 exe
   - `--output <output>`：将更新版本输出到的路径
   - `--version <version>`：想要升级到的版本号
- 常用示例：

```bash
$ deno upgrade --help
# 默认将更新到最新版。
# 该版本是从这里下载：
# https://github.com/denoland/deno/releases
# 并且用于替换当前的可执行文件。
# 如果您不想替换当前的 Deno 可执行文件，而是下载一个新版本到其他位置，请使用 --output 标志
$ deno upgrade --output $HOME/my_deno
```

### (14) REPL 器：deno repl

- deno-repl：读取 执行 打印 循环
- 使用方式：`deno repl [OPTIONS]`
- 常用示例：

```bash
$ deno repl # deno
```

## 通读 Deno 环境变量

> 相关实战代码都收录在[《Deno 钻研之术》仓库](https://github.com/hylerrix/deno-tutorial)中的 demos/ningowood/v1-cli-example 下。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596530091439-70d08757-bba7-4808-9b38-68d2ff4fcd2d.png#align=left&display=inline&height=212&margin=%5Bobject%20Object%5D&name=image.png&originHeight=424&originWidth=520&size=244601&status=done&style=none&width=260)

### (01) DENO_DIR

DENO_DIR 默认为 $HOME/.cache/deno，但可以设置为任何路径。这是 Deno 存放生成的代码和缓存的源码的路径。

输入 deno info，可以看到自己的缓存位置，其中为远程模块、TypeScript 编译位置提供了专门的目录。

```bash
$ deno info
# DENO_DIR 位置: "/Users/{$HOME}/Library/Caches/deno"
# 远程模块缓存位置: "/Users/{$HOME}/Library/Caches/deno/deps"
# TypeScript 编译缓存位置: "/Users/{$HOME}/Library/Caches/deno/gen"
$ tree -L 2 /Users/{$HOME}/Library/Caches/deno
.
├── deno_history.txt
├── deps
│   ├── http
│   └── https
├── gen
│   ├── xxx.js
│   ├── xxx.js.map
│   ├── file
│   └── https
├── lib.deno.d.ts
├── lib.deno_runtime.d.ts
└── lib.webworker.d.ts
```

### (02) DENO_INSTALL_ROOT

默认为 $HOME/.deno/bin。输入如下命令，可以看到我目前安装在全局的几个 Deno 程序：

```bash
$ tree /Users/{$HOME}/.deno
.
└── bin
    ├── Trex
    ├── Trex_Cache_Map
    ├── deno
    ├── denon
    ├── pagic
    └── vr
```

### (02) NO_COLOR

如果 NO_COLOR 被设置，Deno 将会关闭彩色输出 ([https://no-color.org](https://no-color.org/))。用户代码可以通过布尔常量 Deno.noColor 测试 NO_COLOR 是否被设置，这不需要环境权限 (--allow-env)。

```bash
$ deno run var.ts 
Check file:///Users/didi/WorkSpace/Hylerrix/deno-tutorial/demos/ningowood/v1-cli-example/no-color.ts
false
```

### (03) DENO_CERT & HTTP*_PROXY

留个空白猜猜怎么用。

## 总结 & 订阅

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1596530467334-3a93388d-504b-4587-84af-333c8c32796d.png#align=left&display=inline&height=174&margin=%5Bobject%20Object%5D&name=image.png&originHeight=436&originWidth=450&size=111988&status=done&style=none&width=180)

至此，《从 CLI 指令通读 Deno v1.x 全特性》文章大功告成。在写作的这 14h+ 过程中，产生了很多灵感，也对更多内容感兴趣觉得可以深挖。奈何一篇文章能承载的内容十分有限，所以可以从本文引发思考的一些有趣的主题也就先推迟再看了。同时，未来很可能会有更多的指令作为新功能推出，或许也有些指令由于不在文档帮助信息中而没办法收录。

总之可以继续学习的地方还有很多！可以入手学习 Deno 的角度也非常之多。期待一起进行更多的编程实战后，对 Deno CLI 特性会有更为全面的认识。

订阅？你懂得：

- 仓库：[https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial)
- 官网：[http://deno-tutorial.js.org](http://deno-tutorial.js.org/)
- Me：[https://github.com/hylerrix](https://github.com/hylerrix/deno-tutorial)
