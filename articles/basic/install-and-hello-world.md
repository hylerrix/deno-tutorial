# Hello，从多样化安装到简单实战

> 《Deno 钻研之术》系列于 Deno v1 正式发售之日全新推出，每周不定期更新在 Github 中（[https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial)）。让我们一起循序渐进学 Deno，先易后难补 Node，面向未来开发属于自己的 Deno Web App。欢迎订阅，欢迎交流。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589276497896-b44833fd-0e49-4f4f-8b09-c571226431c1.png#align=left&display=inline&height=227&margin=%5Bobject%20Object%5D&name=image.png&originHeight=500&originWidth=1500&size=1423569&status=done&style=none&width=681)

## 学习 Deno 的 N+ 种理由

时隔 Deno 开源两年整，万众期待的 Deno v1 正式版今日正式登场。或许你已经听过 Deno 的大名、或许你在项目中已经大量使用 Deno 作者的上一个明星项目 Node.js，亦或许今天才刚刚接触这一切...总之现在上车，背后是业界多年 Web App 开发经验的累加，面前是一片充满未知与惊喜的 Deno 蓝海。

### 简单地介绍一下 Deno？

Deno 是一个基于 Chrome V8 引擎开发的一个安全的 JavaScript 和 TypeScript 运行时，底层由 Rust 语言编写（最初选型为 Go），发起人是 Ryan Dahl。Ry 也是 Node.js 的发起人，当 Ry 将 Node 交付给社区一段时间后回看 Node 的现状，提出了很多无法忽视的缺陷，于是带来了全新的项目，Deno。

正是 2011 年左右 Node.js 的出现，将 JavaScript 正式带入服务端应用开发领域；也通过彼时领先的模块化思想，促进了 Web 前端工程化的火速发展。同时验证并促进了 Atwood 定律的发展——任何可以用 JavaScript 来写的应用，最终都将用 JavaScript 来写。

雨后春笋，纵使如今在 Node.js 上构建的各大基础设施（开源库、框架、脚手架等）支撑着从创业公司到各大主流互联网公司的数以万计的核心业务发展，但在 Node 本身不那么容易抛开的历史包袱下，新生的 Deno 依然拥有着很多前瞻性的理念，比如：

- **底层使用 Rust 语言开发**：有很多 Rust 的优良特性支持；
- **原生支持编译 TypeScript 语言**：无需额外进行繁琐的手动配置；
- **核心标准库维护在 Deno 自身中**：无需纠结在各大第三方库中如何选型的同时无需担心这些库的无保障维护问题；
- **独特的安全沙箱支持**：默认情况下脚本不具有读写权限，需要授权；
- **尽可能地支持 Web 标准**：无需更多的手动配置，绝大部分功能开箱即用；
- **支持 ES 模块标准**：无需再承担 Node.js 的 CommonJS “历史包袱”；
- **重新设计的包管理器**：抛弃繁重的 Node Modules，甚至可以很方便地从 URL 中导入模块；
- **重新思考 package.json**：让逐渐庞大的 package.json 能得到合理的“释放”；
- **原生支持 JSDoc**：并将其用于内置的文档系统；
- **更好的工具链支持**：开发者真的不想再忙于各种配置过程之中了；
- **内置监视文件功能**：让热更新更加方便简单。

这就是 Deno，一个令人激动的项目。更多具体的知识点，会在本系列后期逐步展开。

下方 Deno 知识体系示意图的截图来自基于机器学习的信息抽取和检索系统 [Magi.com](https://magi.com/search?q=deno)，“它能将任何领域的自然语言文本中的知识提取成结构化的数据，通过终身学习持续聚合和纠错，进而为人类用户和其他人工智能提供可解析、可检索、可溯源的知识体系”。图中内容仅供参考。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589270606077-239e082b-2a4d-477b-a93e-c261702aca6a.png#align=left&display=inline&height=460&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1590&originWidth=1262&size=288393&status=done&style=none&width=365)

### 优秀的生态，Star 量破 50k+

在 [Star History 网站](https://star-history.t9t.io/)上，我们可以看到这两年来社区对 Deno 的关注度稳增不减。从发布一个月多便接近 20k+，到现在已经达到了 50k+ 的 Star 数量，这意味着 Deno 已经跻身 Github 项目全球排行榜至少前 70 位。

截止目前，诞生两年的 Deno 贡献者数量达到 270+ 位，有 3k+ 的 commit、416/1920 的 issues 解决比例和 42/3273 的 PR 解决比例（2020-05-12）。与此同时，诞生近十年的 Node 有 2690+ 位贡献者，30k+ 的 commit、977/11585 的 issues 解决比例和 316/21192 的 PR 解决比例。

下图即为 Deno 目前的 Star History 趋势图。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589254908950-ab9617d9-960c-40fe-8e01-5df5653b0e89.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1194&originWidth=1680&size=120735&status=done&style=none&width=697)

### 押宝 Deno？

关于为什么学习 Deno，每个人都会有自己的理由。社区中有一种有趣的声音：学习 Deno 是一种“押宝”，希望通过学习 Deno 能彻底放弃 Node 并在未来通过 Deno 获得更好的编程机会。

实则 Deno 还是处于早期阶段，且 Node.js 的成功是有时代背景选择而不可复制。因此将所有学习重心都押宝在 Deno 上尚且过早。

那么如何对待 Deno？Deno 是在开源社区的“礼物文化”环境下诞生的，我们一起将 Deno 看成是加入大家庭的新生命，一起从整个 Web 领域的进程中取长补短共同建设 Deno，才是现阶段对待这份“礼物”最好的状态。

要知道，从 Node 到 Deno，其中有太多的中国开发者的积极贡献融入其中。

### 只是为了好玩

以 Ecma 成员名义发起，阿里巴巴、腾讯等公司领衔的最新《[Node.js 开发者 2020 年度报告](https://mp.weixin.qq.com/s/KmgkLgqq7QzZX7Krq1LfoQ)》中指出，越年轻的同学越关注 Deno。因此，这里着重引用一位年轻的谷歌华人实习生，Deno 核心贡献者之一的 @kevinkassimo 的一句话来看，为什么学习 Deno？

> 平心而论，我最初参与的主要目的其实最早是想着“我一直在用 Node 但不了解它真实背后的工作原理”，所以最早看到 Deno 的时候在想“了解 Node 原理的比较好的一个方法是干脆自己去做一个新的 Node”。
> ——@kevinkassimo

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589292642770-239c2471-bb9c-4bab-a292-476ebeb7ca54.png#align=left&display=inline&height=236&margin=%5Bobject%20Object%5D&name=image.png&originHeight=472&originWidth=950&size=788927&status=done&style=none&width=475)

这也正是我对于 Deno 的重要心态。大学初入校园期间正值 Node.js 最火的时刻，自己因为对 Node.js 的喜欢选择了大前端领域，接下来的几年也参加、举办过很多前端相关活动，但对于 Node.js 的了解因为自己的身份局限一直没有得到更好的突破。

毕业这一年来看，Node.js 已经发展出一个十分庞大的生态，我们畅游其中能找到大量解决自身编程需求的 NPM 库——这也更显示出自己对于 Node.js 的熟悉差距越来越大。现在 Deno 崭新一片，为了更好的了解 Deno，包括了解 Node.js，更包括跟上整个 Web 的发展进程，我也开始了我的 Deno 之旅。

同时，另一个更大的心态就像 Linux 之父 Linus Torvalds 的自传名一样，“只是为了好玩”。在自身于职场负责的各种各样前端业务外，出于好玩的心态，出于尝鲜的心态，出于一种“Uncharted（神秘海域）”的心态，开启了这一切。

那么：你，为什么学 Deno？

## Deno 在 MacOS 上的多种安装方式

在开发者群体中，除了最常见的 Windows 操作系统外，Linux 和 MacOS 环境也占重大的比重。Deno 的安装方式在各个平台都有相关的解决方案，本节包括以后所有章节均将默认在 MacOS 上学习 Deno，未来可能会涉及在 Linux 云服务器上部署 Deno Web App。

因此如果你的操作系统是 MacOS，那很方便通过本文进行实战学习。如果你的本地环境是 Linux 或者 Windows，除了一些包管理器的不同、安装目录的不同、环境变量的配置方式不太相同外，并不会阻止你深入学习 Deno 的脚步。可以根据自身操作系统来在 Deno 官方、Deno 社区或者《Deno 钻研之术》系列仓库的 issues 区进行搜寻、讨论 Deno 的其它多种安装方式。

从命令行安装一个软件包需要注意什么？当然是该软件包是否安装成功、安装的过程有哪些日志、是否能运行成功、是否简单配置来升级和卸载......基于这个角度，以下的安装方式会选取 deno -V 来验证是否安装成功（产生了个 idea：“命令行安装软件检查清单”，有趣）。

本节内容专注安装过程，更加深入的安装原理篇未来会有所涉及，正式开始吧！

### 安装方式 1：使用 curl 直接安装

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589293245925-d3e01ff5-18ec-4190-a848-1f26b53fb8d6.png#align=left&display=inline&height=85&margin=%5Bobject%20Object%5D&name=image.png&originHeight=137&originWidth=457&size=12408&status=done&style=none&width=285)

curl 在命令行或脚本中用于传输数据。这里，第一种安装方式便是通过 curl 下载远程的安装脚本 install.sh 中的 deno.zip 压缩包到本地并立即执行，如下。

```bash
$ curl -fsSL https://deno.land/x/install/install.sh | sh
# ######################################################################## 100.0%-#O#- #   #                                                                 ######################################################################## 100.0%
# Archive:  /Users/${USER_NAME}/.deno/bin/deno.zip
#   inflating: deno
# Deno was installed successfully to /Users/${USER_NAME}/.deno/bin/deno
# Manually add the directory to your $HOME/.bash_profile (or similar)
#   export DENO_INSTALL="/Users/${USER_NAME}/.deno"
#   export PATH="$DENO_INSTALL/bin:$PATH"
# Run '/Users/${USER_NAME}/.deno/bin/deno --help' to get started
$ deno -V
# zsh: command not found: deno
```

此时安装便成功了一半。从安装成功后的终端日志可以看出，Deno 成功安装在了用户的 ~/.deno 下，并且进入这个目录可以看出里面只剩下二进制软件 ~/.deno/bin/deno，解压前的 deno.zip 已被删除。接下来输入 deno -V 并不能运行成功 deno 命令，需要我们手动配置环境变量来让终端知道 deno 命令该在哪执行。

注意：${USER_NAME} 是你在自己操作系统下的用户名，需要手动改为自己的用户名。

根据日志提示，执行如下命令后，输入 deno -V 便能看出 deno 命令已成功配置。

```bash
$ export DENO_INSTALL="/Users/${USER_NAME}/.deno"
$ export PATH="$DENO_INSTALL/bin:$PATH"
$ deno -V
# deno 1.0.0-rc2
$ which deno
# /Users/${USER_NAME}/.deno/bin/deno
$ echo $PATH
# /Users/${USER_NAME}/.deno/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/...
```

这里安装到的 Deno 版本是 1.0.0-rc2，截止 2020-05-13 早上最新的版本是 1.0.0-rc3，让 Deno 自更新版本的命令如下。

```bash
$ deno upgrade
# Checking for latest version
# Version has been found
# Deno is upgrading to version 1.0.0-rc3
# downloading https://github.com/denoland/deno/releases/download/v1.0.0-rc3/deno-x86_64-apple-darwin.zip
# downloading https://github-production-release-asset-2e65be.s3.amazonaws.com/133442384/...
```

### 安装方式 2：从 Homebrew 中安装


![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589293222295-d0881591-7470-4e6b-bf68-70426bdf4ea5.png#align=left&display=inline&height=198&margin=%5Bobject%20Object%5D&name=image.png&originHeight=560&originWidth=1200&size=76707&status=done&style=none&width=424)

如果你刚才通过 curl 已经将 Deno 安装成功了，现在想尝试 Homebrew 的安装，可以根据已知的 deno 目录和环境变量值，手动卸载 deno，确保相关目录（~/.deno）和相关环境变量（export -p | grep deno 来验收）都清空。

```bash
# 安装 Homebrew
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

现在我们来使用 MacOS 上最知名的包管理器之一 Homebrew 来安装 Deno。由于 Homebrew 默认每次执行都会自动检查更新，显示超慢的 Updating Homebrew...，而且还不显示具体进度，需要先临时关闭 Homebrew 自动更新后正式安装 Deno。

```bash
$ export HOMEBREW_NO_AUTO_UPDATE=true
$ brew install deno
# ==> Downloading https://homebrew.bintray.com/bottles/deno-0.42.0.catalina.bottle.tar.gz
# ==> Downloading from https://akamai.bintray.com/b4/b4f91dd079eee18b85b157bb03b1535935a37d9fb6f078e271a7b48b2afd34ea?__gda__=exp=15
# ######################################################################## 100.0%
# ==> Pouring deno-0.42.0.catalina.bottle.tar.gz
# ==> Caveats
# Bash completion has been installed to:
#   /usr/local/etc/bash_completion.d

# zsh completions have been installed to:
#   /usr/local/share/zsh/site-functions
# ==> Summary
# 🍺  /usr/local/Cellar/deno/0.42.0: 9 files, 41.4MB
# ==> `brew cleanup` has not been run in 30 days, running now...
# Error: Permission denied @ apply2files - /usr/local/lib/node_modules/expo-cli/node_modules/.bin/detect-libc
```

从如上终端日志和 [https://formulae.brew.sh/formula/deno](https://formulae.brew.sh/formula/deno#default) 中可以看出，Homebrew 上的 Deno 最新版不支持 deno-v1.0.0-rcx 版，只支持 0.42.0。且 Homebrew 会将 Deno 软件放置在 /usr/local/Cellar/deno 下，并在 /usr/local/bin 中自动更新了环境变量。

```bash
$ deno -V
# deno 0.42.0
$ which deno
# /usr/local/bin/deno
$ ll /usr/local/bin/deno
# lrwxr-xr-x  1 ${USER_NAME}  admin    30B May 13 10:53
# /usr/local/bin/deno -> ../Cellar/deno/0.42.0/bin/deno
```

### 安装方式 3：从 ASDF 中安装

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589293179686-78685b0e-d131-4e99-bc67-209355750e0a.png#align=left&display=inline&height=244&margin=%5Bobject%20Object%5D&name=image.png&originHeight=720&originWidth=1280&size=938559&status=done&style=none&width=433)

ASDF 的体验还不错，ASDF 是可扩展的版本管理器，支持 Ruby、Node.js、Elixir 和 Erlang 等，我们可以通过 ASDF 来安装 Deno，包括进行快速的管理 Deno 的多版本。首先安装 ASDF，可以使用通过 Git 安装并手动配置环境变量，也可以通过 Homebrew 来安装。

```bash
$ brew install asdf
# ==> Downloading https://github.com/asdf-vm/asdf/archive/v0.7.8.tar.gz
# Already downloaded: /Users/${USER_NAME}/Library/Caches/Homebrew/downloads/34d73b51ece171e6c4ffe51147d4599c5b7f78749b379dec98ab7dd9174bd595--asdf-0.7.8.tar.gz
# ==> Caveats
# Bash completion has been installed to:
#   /usr/local/etc/bash_completion.d
# 
# zsh completions have been installed to:
#   /usr/local/share/zsh/site-functions
# ==> Summary
# 🍺  /usr/local/Cellar/asdf/0.7.8: 104 files, 219.6KB, built in 18 seconds
```

以上需要安装 Deno 前先配置 Deno 的 ASDF 地址。ASDF 可以很方便的进行 Deno 多版本控制。

```bash
$ asdf plugin-add deno https://github.com/asdf-community/asdf-deno.git
$ asdf plugin list --urls
# deno  https://github.com/asdf-community/asdf-deno.git
$ asdf install deno 1.0.0-rc3
# /Users/${USER_NAME}/.asdf/plugins/deno/bin/install: line 27: [: 100-rc3: integer expression expected
# ∗ Downloading and installing deno...
# Archive:  /Users/${USER_NAME}/.asdf/installs/deno/1.0.0-rc3/bin/deno.zip
#   inflating: /Users/${USER_NAME}/.asdf/installs/deno/1.0.0-rc3/bin/deno
# The installation was successful!
$ which deno
deno not found
```

可见，通过 ASDF 已经成功安装 Deno，但需要创建软链接，即绑定环境变量。

```bash
# 创建软链接
$ ln -s /Users/${USER_NAME}/.asdf/installs/deno/1.0.0-rc3/bin/deno /usr/local/bin
$ deno -V
# deno 1.0.0-rc3
$ which deno
# /usr/local/bin/deno
$ ll /usr/local/bin/deno
# lrwxr-xr-x  1 ${USER_NAME}  admin    50B May 11 18:37
# /usr/local/bin/deno -> /Users/${USER_NAME}/.asdf/installs/deno/1.0.0-rc3/bin/deno
# 全局配置 Deno 版本
$ asdf global deno 1.0.0-rc3
# 在当前目录下设置 Deno 版本
$ asdf local deno 1.0.0-rc3
# 查看所有可以安装的 Deno 版本
$ asdf list all deno
# 查看当前 Deno 版本
$ asdf current deno # 1.0.0-rc3 (set by /Users/${USER_NAME}/.tool-versions)
```

### 安装方式 4：从源码中安装

由于篇幅所限，从源码中安装可以引申出很多知识，本文先不涉及，未来会有所更新。

### 该选择怎样的安装方式？

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589293866295-d1c01be3-033e-4554-bc29-cf7e2849b41d.png#align=left&display=inline&height=242&margin=%5Bobject%20Object%5D&name=image.png&originHeight=896&originWidth=1578&size=2319638&status=done&style=none&width=427)

基于自身所要使用的操作系统和想要学习 Deno 的方式，从“命令行快速安装”、“包管理器单版本安装”、“包管理器多版本安装并控制”、“源码上安装”等角度决定不同安装方式即可。

## Deno 的简单实战

### 准备一个 Hello World 程序

Brian Kernighan 于 1978 年写了一本名叫《C 程序设计语言》的编程书，该书中第一次引用了 Hello World 程序，这个传统便被传承至今。在此，关于 Deno 的第一个程序也可以从 Hello World 开始。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589292490407-ffa09f20-3f70-49d2-94de-98f406d8987a.png#align=left&display=inline&height=189&margin=%5Bobject%20Object%5D&name=image.png&originHeight=880&originWidth=880&size=44684&status=done&style=none&width=189)

因为 Deno 内置 TypeScript 运行时，这里的示例便是官网提供的 welcome.ts，具体如下。

```typescript
// welcome.ts
// 从 URL 上导入 server.ts 模块，并提取（ES6 解构赋值）出 serve 对象
import { serve } from "https://deno.land/std/http/server.ts";
// 实例化一个 serve 对象
const s = serve({ port: 8000 });
// 在终端上打印程序监听的端口地址
console.log("http://localhost:8000/");
// 使用 ES9 新特性 for await 语法，当访问监听端口时，返回一句“Hello World”
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

如果如上的 welcome.ts 能成功在 Deno 中直接运行成功，说明了什么？短短的几行代码，便能看出 Deno 自身提供官方标准库（解决了寻找对比学习第三方库的成本），Deno 的模块可以从 URL 上直接导入（独特的导入方式），Deno 支持最新的 ES 标准（不用忙于配置各种 ES6+ 语法的转移器），Deno 内置 TypeScript 运行时（无需手动安装配置 TypeScript 转移器）。

### Hello World

现在来执行 welcome.ts，由于代码中引入了远程的 server.ts，server.ts 又引入了其它文件，deno 现在会统一下载到全局目录上并执行文件。

```bash
$ deno-tutorial git:(master) deno run --allow-net demos/welcome.ts
# Compile file:///Users/${USER_NAME}/WorkSpace/Hylerrix/deno-tutorial/demos/welcome.ts
# Download https://deno.land/std@0.50.0/http/server.ts
# Download https://deno.land/std@0.50.0/encoding/utf8.ts
# Download https://deno.land/std@0.50.0/io/bufio.ts
# Download https://deno.land/std@0.50.0/testing/asserts.ts
# Download https://deno.land/std@0.50.0/async/mod.ts
# Download https://deno.land/std@0.50.0/http/_io.ts
# Download https://deno.land/std@0.50.0/io/util.ts
# Download https://deno.land/std@0.50.0/path/mod.ts
# Download https://deno.land/std@0.50.0/path/win32.ts
# Download https://deno.land/std@0.50.0/path/posix.ts
# Download https://deno.land/std@0.50.0/path/common.ts
# Download https://deno.land/std@0.50.0/path/separator.ts
# Download https://deno.land/std@0.50.0/path/interface.ts
# Download https://deno.land/std@0.50.0/path/glob.ts
# Download https://deno.land/std@0.50.0/path/_constants.ts
# Download https://deno.land/std@0.50.0/path/_util.ts
# Download https://deno.land/std@0.50.0/fmt/colors.ts
# Download https://deno.land/std@0.50.0/testing/diff.ts
# Download https://deno.land/std@0.50.0/path/_globrex.ts
# Download https://deno.land/std@0.50.0/async/deferred.ts
# Download https://deno.land/std@0.50.0/async/delay.ts
# Download https://deno.land/std@0.50.0/async/mux_async_iterator.ts
# Download https://deno.land/std@0.50.0/textproto/mod.ts
# Download https://deno.land/std@0.50.0/http/http_status.ts
# Download https://deno.land/std@0.50.0/bytes/mod.ts
```

此时打开 localhost:8000 提示成功。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1589194281058-b5f95ddf-a9ce-48a1-90e7-964012cbec7c.png#align=left&display=inline&height=103&margin=%5Bobject%20Object%5D&name=image.png&originHeight=206&originWidth=992&size=33034&status=done&style=none&width=496)

### Deno 的更多实战

未来持续更新在[《Deno 钻研之术》开源电子书仓库](https://github.com/hylerrix/deno-tutorial/)中。

## 参考资料

- [Deno 运行时入门教程：Node.js 的替代品](https://www.ruanyifeng.com/blog/2020/01/deno-intro.html)
- [https://star-history.t9t.io/](https://star-history.t9t.io/)
- [magi.com](http://magi.com)
- [《狼书：更了不起的 Node.js》](http://product.dangdang.com/27880000.html)
- [deno-1-0-what-you-need-to-know](https://blog.logrocket.com/deno-1-0-what-you-need-to-know/)
- [https://gitstar-ranking.com/](https://gitstar-ranking.com/)
- [Node.js 开发者 2020 年度报告](https://mp.weixin.qq.com/s/KmgkLgqq7QzZX7Krq1LfoQ)
- [Hello World 程序的起源与历史](http://blog.fujiji.com/the-history-of-hello-world/)
- [https://curl.haxx.se/](https://curl.haxx.se/)

## 订阅 & 待续

本文属于[《Deno 钻研系列》](https://github.com/hylerrix/deno-tutorial/)的基础篇，未来计划逐步展开添加的章节并填充更多的文章，如：

- 基础篇：循序渐进学 Deno 基础知识；
- Node 篇：先易后难补 Node 知识，探索与 Deno 的异与同；
- Rust 篇：探索 Deno 底层有关 Rust 的更多知识；
- 前端篇：探索 Deno Web 前端应用开发的方式；
- 后端篇：探索 Deno Web 后端应用开发的方式；
- 架构篇：深入到 Deno 底层读 V8，学架构。

欢迎订阅，一起成长，敬请 Star, Watch & Issue 开源仓库[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial/)！三连一下。

- [https://github.com/hylerrix/deno-tutorial/](https://github.com/hylerrix/deno-tutorial/)
- [https://github.com/hylerrix/deno-tutorial/](https://github.com/hylerrix/deno-tutorial/)
- [https://github.com/hylerrix/deno-tutorial/](https://github.com/hylerrix/deno-tutorial/)



