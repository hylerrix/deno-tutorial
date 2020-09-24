# Deno CLI 通用手册

> 更新到了 v1.22.2

## 通读命令行基本信息

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
- 使用方式：deno [选项] [子命令]

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
