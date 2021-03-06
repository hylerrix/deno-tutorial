# 精读《Deno v1.8 发布说明》

> - 原文地址：[Deno 1.8 Release Notes](https://deno.land/posts/v1.8)
> - 原文作者：Bartek Iwańczuk, Luca Casonato, Ryan Dahl
> - 译者：[@hylerrix](https://github.com/hylerrix)
> - 原文发布时间/翻译时间：20210302/20210305
> - 本文属于《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》系列，原文翻译内容会同步更新到 [Deno 中文网](https://deno-cn.vercel.app) 上（TL;DR。如果觉得本文精读笔记太长，可以在这里只读原文翻译 [https://deno-cn.vercel.app/posts](https://deno-cn.vercel.app/posts)）。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614933956579-41955b43-0535-45fa-8548-f579a0a029eb.png#align=left&display=inline&height=247&margin=%5Bobject%20Object%5D&name=image.png&originHeight=492&originWidth=1156&size=92894&status=done&style=none&width=580)

今天我们发布了 Deno v1.8.0。此版本涵盖了大量的新功能和标准化工作：

- **实验性支持 WebGPU API**：在 Deno 中为开箱即用的 GPU 加速机器学习铺平道路。
- **启用内置的国际化 API**：支持所有 JS 标准下的 `Intl` API 开箱即用。
- **翻新测试覆盖工具**：测试覆盖功能支持输出 `lcov` 报告。
- **落地 Import Maps 标准**：Web 兼容的依赖重写现已发布。
- **支持获取私有模块**：可以使用授权的 token 令牌从私有的服务端获取远程模块。

如果你已经安装了 Deno，可以通过 `deno upgrade` 命令来更新到 1.8 版本。如果你是第一次体验 Deno，你可以尝试使用如下命令之一：

```bash
# 使用 Shell (macOS and Linux)
$ curl -fsSL https://deno.land/x/install/install.sh | sh
# 使用 PowerShell (Windows):
$ iwr https://deno.land/x/install/install.ps1 -useb | iex
# 使用 Homebrew (macOS):
$ brew install deno
# 使用 Scoop (Windows):
$ scoop install deno
# 使用 Chocolatey (Windows):
$ choco install deno
```

精读笔记

- **cURL**：提供一个 libcurl 库和一个 curl 命令，支持通过多种网络协议传输各种类型的数据。起始于 1996 年，作者最初的想法是自动为 IRC （因特网中继聊天）用户获取因特网上可以查到的货币汇率。2020 时新的网站每月服务流量超过 10TB。
- **PowerShell**：微软开发的任务自动化和配置管理框架。最初仅是 Windows 组件（基于 .NET Framew），后于 2016 年开源并提供跨平台支持（基于 .NET Core）。由命令行 Shell 和相关的脚本语言构成。
- **Homebrew**：MacOS（或 Linux）下缺失的包管理器，基于 Ruby 和 Git，免费且开源。孵化出的 Homebrew Cask 可以用来管理和分发二进制应用程序。
- **Scoop**：Windows 下的命令行安装器。相比 PowerShell 能以最小的安装量安装程序，更贴近 Unix 风格。无须管理员权限即可安装应用到自己的主目录。 
- **Chocolatey**：Windows 下的软件管理工具。诞生于 2011 年，起初的设想是为 Windows 提供一个统一的包管理器。基于现代自动化和 DevOps 方法构建。
- **推荐**：使用 cURL 下载 Deno 的最新版本，未来使用 deno upgrade 自更新即可。

## 实验性支持 WebGPU API

WebGPU API 给开发者提供一个底层、高性能和跨平台的方式来通过 JavaScript 在 GPU 硬件上编码。这个 API 是 WebGL 在网络上的有力继承者。相关规范虽未正式确定，但目前 Firefox、Chromium 和 Safari 已逐步开始支持，Deno 也一样在跟进。

该 API 可以让开发者从 Deno 内部进行 GPU 渲染和通用 GPU 计算。一旦该 API 标准化结束并在 Deno 中被取消 unstable 标记，这将正式为开发者提供一种从 Web、服务器和开发机器上访问 GPU 资源的便捷方法。

GPU 可以允许开发者使某些数值算法高度并行。这在渲染图形和游戏外也很有用。在机器学习中高效使用 GPU 开启了复杂的神经网络体系——常被称为“深度学习”。计算机视觉、翻译、图像生成和强化学习等领域的飞速发展都源于有效利用了 GPU 硬件。

如今，大多数神经网络都是在 Python 中定义的，而计算交由 GPU 负责。我们相信如果存在适当基础架构的情况下， JavaScript（而不是 Python），也可以成为表达数学思想的理想语言。在 Deno 中提供开箱即用的 WebGPU 支持是朝向这个方向的一步。我们的目标是通过支持 GPU 加速，以在 Deno 上运行 [Tensorflow.js](https://www.tensorflow.org/js)。我们期望这将在未来几周或几个月内落实。

这是一个演示如何访问连接的 GPU 设备并读取名称和其所支持的功能的基本示例：

```typescript
// 执行 `deno run --unstable https://deno.land/posts/v1.8/webgpu_discover.ts`

// 尝试从用户代理来获取一个 adapter 适配器
const adapter = await navigator.gpu.requestAdapter();
if (adapter) {
  // 打印出这个适配器的一些基本详情
  console.log(`Found adapter: ${adapter.name}`);
  const features = [...adapter.features.values()];
  console.log(`Supported features: ${features.join(", ")}`);
} else {
  console.error("No adapter found");
}
```

这是一个小示例，演示 GPU 如何使用渲染着色器在绿色背景上渲染一个简单的红色三角形：

```bash
$ deno run --unstable --allow-write=output.png https://raw.githubusercontent.com/crowlKats/webgpu-examples/f3b979f57fd471b11a28c5b0c91d0447221ba77b/hello-triangle/mod.ts
```

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614733817983-a4befa3d-f137-42b6-8230-1ba8b9ab92c9.png#align=left&display=inline&height=200&margin=%5Bobject%20Object%5D&originHeight=200&originWidth=200&size=0&status=done&style=none&width=200)

[注意这里使用 WebAssembly 来编写的 PNG](https://github.com/crowlKats/webgpu-examples/blob/f3b979f57fd471b11a28c5b0c91d0447221ba77b/utils.ts#L77-L106)。更多示例可以查看：[https://github.com/crowlKats/webgpu-examples](https://github.com/crowlKats/webgpu-examples)。

最终的 PR 足足占用了 15.5 万行代码，并且在跟进后花了整整 5个月的时间来合并。这非常感谢 [crowlKats](https://github.com/crowlKats) 领导了将 WebGPU 集成到 Deno 的工作。我们也非常感谢为 Deno 中的 WebGPU 支持奠定基础的 [wgpu](https://github.com/gfx-rs/wgpu) 和 gfx-rs 项目的所有贡献者。也特别感谢 WebGPU 规范的编辑 [kvark](https://github.com/kvark) 以及 webgpu 和 gfx-rs 的首席开发者们，他们均为实现 WebGPU API 提供了出色的指导。

精读笔记：

- **GPU**：图形处理器。相比于传统 CPU，是专门运行绘图运算工作的微处理器，也专为通用计算设计。GPU 的并行架构可并行运行大量计算，在 3D 渲染、运行分析、深度学习和机器学习算法时都很有用。
- **OpenGL**：开放图形库。用于渲染 2D、3D 矢量图形的跨语言、跨平台的 API，常用于 CAD、虚拟现实、科学可视化程序和电子游戏开发。尽管这些 API 完全可以通过软件实现，但它是为大部分或全部使用硬件加速而设计。与语言和平台均无关，纯粹专注于渲染。
- **DirectX**：由微软公司创建的一系列专为多媒体以及游戏开发的 API。其中的 Direct3D 与 OpenGL 同为电脑绘图软件和电脑游戏最常使用的两套绘图编程介面之一。
- **WebGL**：OpenGL 的 JavaScript 绑定。用于在不使用插件的情况下载任何兼容的网页浏览器中呈现交互式 2D 和 3D 图形。WebGL 可将影像处理和 GPU 加速使用方式当做网页 Canvas 的一部分。WebGL 基于 OpenGL ES，使用 HTML5 Canvas 并允许利用文档对象模型接口。可利用部分 JavaScript 实现自动存储器管理等。
- **WebGPU**：公开了用于在 GPU 上加速图形和计算的未来 Web 标准和 JavaScript API，旨在提供“现代 3D 图形和计算功能”。与 WebGL 不同的是，WebGPU 不是任何现有的 native API 的直接端口，可以从某种角度上看作是下一代 WebGL。
- **硬件加速**：是指在计算机中把计算量非常大工作分配给专门的硬件来处理以减轻 CPU 的工作量之技术。
- **机器学习**：人工智能的一个分支。理论主要是设计和分析一些让计算机可以自动“学习”的算法——从数据中自动分析获得规律，并利用规律对位置数据进行预测的算法。
- **深度学习**：是机器学习的分支之一，一种以神经网络为架构，对资料进行表征学习的算法。
- **神经网络**：在机器学习和认知科学领域，是一种模仿生物神经网络的结构和功能的数学模型或计算模型，用于对函数进行估计或近似。神经网络由大量的人工神经元联结进行计算。大多数情况下人工神经网络能在外界信息的基础上改变内部结构，是一种自适应系统。广泛用于机器视觉和语音识别等领域。
- **Tensorflow.js**：使用 JavaScript 训练和部署机器学习模型，并直接在浏览器或 Node.js 中使用机器学习模型。Deno 未来将也支持。
- **wgpu**：基于 gfx-hal 的原生 WebGPU 实现，由 Rust 语言编写。
- **gfx-rs**：开源组织，专注于 Rust 中的可移植图形和计算。
- **three.js**：JavaScript 3D 库。目的是使用默认的 WebGL 渲染器创建易于使用、轻巧的 3D 库，同时提供 Canvas 2D、SVG 和 CSS 3D 等渲染器。未来也会计划支持 WebGPU 渲染。

## 支持 ICU

支持 ICU 已成为 Deno 下第二受关注的功特性。我们很高兴地宣布 Deno v.1.8 现已随附了完整的 ICU 支持。

所有基于 ICU 的 JavaScript API 现在都可以与浏览器 API 相兼容。

在 REPL 中可以进行如下尝试：

```bash
$ deno
Deno 1.8.0
exit using ctrl+d or close()
> const d = new Date(Date.UTC(2020, 5, 26, 7, 0, 0));
undefined
> d.toLocaleString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
"Freitag, 26. Juni 2020"
```

精读笔记：

- **ICU**：Unicode 国际组件。用于 Unicode 支持、软件国际化和软件全球化，可广泛移植到许多操作系统和环境中，在所有平台上以及 C、C++、Java 之间为应用程序提供相同的结果。
- **ICU 提供**：Unicode 文本处理、完整字符属性和字符集转换、Unicode 正则表达式、完整的 Unicode 集、字符/单词和行边界、语言敏感的整理和搜索、通过通用语言环境数据库库（CLDR）的全面的语言环境数据和资源包体系结构、多日历和时区，以及基于规则的日期/时间/数字/货币/好消息的格式设置和解析。
- **Unicode**：整理、编码了世界上大部分的文字系统，使得电脑可以用更为简单的方式来呈现和处理文字。基于 Unicode 的全球化软件可最大程度地扩大市场范围并降低成本。全球化软件可以一次构建和安装，但可以处理来自世界各地的用户和来自世界各地的用户的文本，并适应他们的文化习俗。通过消除每种语言的构建，安装和维护更新，将成本降到最低。
- **基于 Unicode 的常见字符集**：UTF-8、UTF-16、UTF-32 等。JavaScript 使用的是已被 Unicode 兼容掉的旧 UCS-2 字符集（因为那时还没出 UTF-16 ），ES6 加强了对 Unicode 的支持。根据标准，JSON 数据必须是 UTF-8 编码。Emoji 表情是四个字节。
- **中文字符集的发展历程**：GB2312 -> GBK -> GB18030 / DBCS。

## 改进覆盖率工具链：`deno coverage`

此版本通过扩大我们测试覆盖范围的基础架构，增加了一些强大的新功能。主要的变化是测试覆盖率现在分为覆盖率集合和覆盖率报告两个部分。

此前，覆盖范围的收集和报告都在单个子命令中进行，只需要在执行 `deno test` 时指定 `--coverage` 标志即可。现在，用于 `deno test` 的 `--coverage` 标志将接收一个参数——用来存储收集的配置文件的目录路径。这就是覆盖率集合。接下来第二步可以调用 deno coverage 并制定存储覆盖率配置文件的目录路径。该子命令可以再控制台上输出格式化友好的文本报告，也可以输出 lcov 文件（`--lcov` 标志）以供 `genhtml`、coveralls.io 或 codecov.io 之类的工具使用。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614933595923-41b3e221-b7fd-4cc7-a957-8707a43ceb9d.png#align=left&display=inline&height=595&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1530&originWidth=2192&size=1251808&status=done&style=none&width=853)

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614933618991-cc1887d0-4714-4094-a93a-24e5f801c3d7.png#align=left&display=inline&height=600&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1530&originWidth=2192&size=633084&status=done&style=none&width=860)

几天来，我们一直在 [`deno_std`](https://github.com/denoland/deno_std) 上对该功能进行测试。我们将每次提交的覆盖率报告同步上传到 codecov.io 上。你可以在这里查看相关内容：[https://codecov.io/gh/denoland/deno_std](https://codecov.io/gh/denoland/deno_std)。添加这个功能并不难，在 Github Actions 工作流上仅进行了如下 10 行的更改：

```diff
   - name: Run tests
-    run: deno test --unstable --allow-all
+    run: deno test --coverage=./cov --unstable --allow-all
+
+  - name: Generate lcov
+    run: deno coverage --unstable --lcov ./cov > cov.lcov
+
+  - name: Upload coverage
+    uses: codecov/codecov-action@v1
+    with:
+      name: ${{ matrix.os }}-${{ matrix.deno }}
+      files: cov.lcov
```

有关与 coverals.io 集成的相关示例，可以参考这个仓库：[https://github.com/lucacasonato/deno_s3](https://github.com/lucacasonato/deno_s3)。

精读笔记：

- **LCOV**：GCC 覆盖率测试工具 gcov 的图形化前端，收集多个源文件的 gcov 数据，并创建 HTML 页面，其中包含带有覆盖率信息注释的源代码。LCOV 支持语句、功能和分支覆盖率的度量。
- **GCOV**：是源代码覆盖率分析工具，可以跟踪每个语句的精确执行次数等。
- **genhtml**：lcov 命令的附带工具，可以将 lcov 格式的文件生成 HTML 页面来浏览。
- **coveralls.io**：通过显示测试中未覆盖的代码部分来帮助分析测试覆盖率，同时提供开源项目的测试覆盖情况的 badge 图标。
- **codecov.io**：辅助生成代码覆盖的线上网站之一，可以配合 Github Action 将 lcov 文件上传并在线查看覆盖率情况等。

## Import maps 现已稳定

标准化的 [Import maps](https://github.com/WICG/import-maps) 已在 Chrome 89 中支持 ，随后我们也进项了相应的更新以匹配该规范的最新版本，现在也被认为很稳定。这意味着接下来使用 `--import-map` 时不再需要 `--unstable` 标志。

```bash
$ deno run --import-map=./import_map.json ./mod.ts
```

此外，`--import-map `标志现在不仅接受本地路径，而且接受 URL 路径，从而可以使开发者从远程服务器加载 import maps。

```bash
$ deno run --import-map=https://example.com/import_map.json ./mod.ts
```

Import maps 允许用户使用所谓的“裸”说明符来表示依赖关系，而不是相对或绝对文件地址/HTTP URL：

```typescript
// Deno 默认情况下不支持此类说明符
// 但通过 import maps 用户可以将裸说明符重新映射到指定的 URL
import * as http from "std/http";
```

```json
{
  "imports": {
    "std/http": "https://deno.land/std@0.85.0/http/mod.ts"
  }
}
```

用户应该记住，import maps 不可组合的：这意味着你只能为 `deno run` / `deno test` 提供单个的 import maps。因此，库作者仍应使用常规非“裸”的说明符（相对或绝对的文件路径 / http URLs）；否则库用户将需要手动将你的库（和你的库依赖项）额裸说明符添加到用户自己的 import maps 中。

Import maps 一个更有用的功能是能够将常规说明符重新映射为一个完全不同的说明符。例如，如果你的模块图中深嵌套了一些破碎（broken）的依赖关系，你可以在将其上游修复前将其自主修复到指定版本。或者如果你使用将哈希值注入到模块文件名的构建过程，则可以直接在源码中引入该文件（无需 hash 值）并仅在运行时使用 import maps 重新映射说明符。

有关更多的示例和详细说明，请参考 [import maps 规范](https://github.com/WICG/import-maps#the-import-map)。

精读笔记 - import maps：

- 该提案允许控制 JavaScript import 语句和 import() 表达式获取如何 URL。
- 同时允许“裸的导入说明符”起作用（如 `import moment from "moment"`）。
- import maps 则可以说明模块路径如何解析。
- 提供 `<script type="importmap">` 和 `<link rel="modulepreload" href="import:lodash">` 支持。
- 类似于 Service Workers，import maps 是应用级产物，不应该被手动组合，应该由控制整个 app 视角的人或工具生成。库里包含 import map 没有意义，应让整个应用决定如何映射 URL。
- ...以及更多 [https://github.com/WICG/import-maps](https://github.com/WICG/import-maps)。

## 支持 token 权限令牌来获取模块

不是所有的代码都是在互联网上公开的。此前 Deno 无法从需要身份验证的服务器上下载代码。在此次版本中我们增加了用户首次获取模块时可以使用身份验证令牌的功能。

为了达到这个目的，Deno CLI 将尝试查找一个名为 `DENO_AUTH_TOKENS` 的环境变量，以确定在请求远程模块时英考虑使用的身份验证令牌。环境变量的值采用以分号（;）分隔的 n 个令牌的格式，其中每个令牌的格式为 `{token}@{hostname[:port]}`。

例如，单个 token 令牌看起来像这样：

```bash
DENO_AUTH_TOKENS=a1b2c3d4e5f6@deno.land
```

多个 token 令牌可能像这样：

```bash
DENO_AUTH_TOKENS=a1b2c3d4e5f6@deno.land;f1e2d3c4b5a6@example.com:8080
```

当 Deno 将要获取一个远程模块时，如果远程模块的 hostname 主机名匹配到了环境变量中的 hostname 主机名：Deno 将会在请求头中设置一个 `Authorization` header 字段，其值格式为 `Bearer { token }`。这将支持远程服务器识别出该请求头是已经过身份验证的用户的授权请求，并在服务器上提供适当资源和模块的访问。

有关从私有 Github 存储库中提取信息的更详细的使用指南和配置环境说明，可以参考相关的[手册条目](https://deno.land/manual/linking_to_external_code/private)。

精读笔记：

- **Authorization Header**：包含用于在服务器以 401 未经授权状态和 WWW-Authenticate 标头响应后（通常但不是必须）向服务器认证用户代理的屏蔽。通常是 Basic 类型（Base 64 编码，但并不意味着加密，以明文形式发送且编码可逆，最好将 HTTPS 与 Basic 身份验证结合使用）。
- **Bearer**：RFC 6750，此类 token 来获取 OAuth 2.0 相关的权限资源。除此之外还有 Basic、Digest（只有 md5 哈希在 Firefox 中支持）、HOBA（基于原点的身份验证，基于数字签名）、Mutual、AWS4-HMAC-SHA256。

## `Deno.test` 支持 Exit 清理器

`Deno.test` API 已经有[两个清理器](https://deno.land/manual@v1.7.5/testing#resource-and-async-op-sanitizers)可以帮助开发者确保代码不会“泄露”操作或资源——即在测试用例结束之前，所有打开的文件/网络句柄都已关闭，并且没有其他挂起的系统调用。

Deno 1.8 添加了一个新的清理器可以确保经过测试的代码不会调用 `Deno.exit()`。异常 exit 语句可能会提供假正的测试结果，并且经常被滥用或忘记删除。

默认情况下，所有测试都会启用这个清理器，但可以再测试定义中将 `sanitizeExit` 布尔值设置为 false 来禁用此功能。

```typescript
Deno.test({
  name: "false success",
  fn() {
    Deno.exit(0);
  },
  sanitizeExit: false,
});

// 此条测试语句永不会执行
Deno.test({
  name: "failing test",
  fn() {
    throw new Error("this test fails");
  },
});
```

你可以自己运行此脚本： `deno test [https://deno.land/posts/v1.8/exit_sanitizer.ts](https://deno.land/posts/v1.8/exit_sanitizer.ts)`。

## `Deno.permissions` API 现已稳定

Deno 的安全模型基于权限机制。当前，只有在启动应用程序时才能授予这些权限。这在大多数情况下都适用。但在某些情况下，在运行时请求/撤销权限会带来更好的用户体验。

在 Deno 1.8 中，现在有一个稳定的 API 可以 `query` 查询、`request` 请求和 `revoke` 撤销权限。这些 API 包含在 `Deno.premissions` 对象中。这是一个如何工作的示例：

```typescript
function homedir() {
  try {
    console.log(`Your home dir is: ${Deno.env.get("HOME")}`);
  } catch (err) {
    console.log(`Failed to get the home directory: ${err}`);
  }
}

// 尝试获取 home 目录（这里会失败，因为没有 env 权限）
homedir();

const { granted } = await Deno.permissions.request({ name: "env" });
if (granted) {
  console.log(`You have granted the "env" permission.`);
} else {
  console.log(`You have not granted the "env" permission.`);
}

// 尝试获取 home 目录（这里会在用户同意授权后成功）
homedir();

await Deno.permissions.revoke({ name: "env" });

// 尝试获取 home 目录（这里会失败，因为用户取消了授权）
homedir();
```

你可以自己运行此脚本：`deno run [https://deno.land/posts/v1.8/permission_api.ts](https://deno.land/posts/v1.8/permission_api.ts)`。

精读笔记：

- **Deno.permissions 对象**：包含 query、revoke、request 三个方法，PermissionDescriptor 类。
- **Deno 的权限类型**：`--allow-all`、`--alow-env`、`--alow-hrtime`、`--alow-net`、`--alow-plugin`、`--alow-read`、`--alow-run`、`--alow-write`。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614933733155-ce0e94f6-beeb-45d5-b21c-d0cabbb751b2.png#align=left&display=inline&height=514&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=2012&size=541049&status=done&style=none&width=862)

## `Deno.link` 和 `Deno.symlink` API 现已稳定

此版本带来了与符号链接相关的四个稳定的 API：

- `Deno.link`
- `Deno.linkSync`
- `Deno.symlink`
- `Deno.symlinkSync`

在稳定之前，需要对这些 API 进行安全检查，并且需要适当的权限才能使用它们。

`Deno.link` 和 `Deno.linkSync` 需要对源路径和目标路径都具有读写权限。

`Deno.symlink` 和 `Deno.symlinkSync` 需要对目标路径具有写权限。

精读笔记：

- `Deno.link` 和 `Deno.linkSync`：创建新路径作为到旧路径的硬链接。前者是异步，后者是同步。
- `Deno.symlink` 和 `Deno.symlinkSync`：创建新路径作为到旧路径的链接。options.type 参数可以设置为 file 或 dir。

## 更细粒度的 `Deno.metrics`

随着 Deno 变得更加稳定，对于开发者来说，使用更简便的方法来检测它们的应用程序变得越来越重要。这需要从最底层（运行时本身）开始支持。在 Deno 中，JS 的所有特权操作（转到 Rust 的操作）都是通过 JS 和 Rust 之间的单个中心接口来实现的。我们称通过该接口的请求为“ops”。例如，调用 `Deno.open` 将调用特权端的 `op_open_async`，浙江返回打开文件的资源 ID（或返回一个错误）。

早在两年多前的 2018 年 10 月 11 日，我们添加了一种可以让开发者来查看所有 Rust 和 JS 之间 ops 指标的新方法：`Deno.metrics`。该 API 现在公开开始、完成的同步/异步操作的数量，以及通过操作接口发送的数据量。之前仅限于所有不同操作的组合数据。没有办法确定哪个 ops 被调用了多少次，通常只有一个总体结果。

与 `--unstable` 一起运行时，此版本向 `Deno.metrics` 添加了一个名为 `ops` 的新字段。此字段包含每个操作的信息，这些信息涉及 API 的调用频率以及通过 API 传输的数据量。这允许对运行时进行更精细的检测。

下面是如何使用的示例：

```typescript
$ deno --unstable
Deno 1.8.0
exit using ctrl+d or close()
> Deno.metrics().ops["op_open_async"]
undefined
> await Deno.open("./README.md")
File {}
> Deno.metrics().ops["op_open_async"]
{
  opsDispatched: 1,
  opsDispatchedSync: 0,
  opsDispatchedAsync: 1,
  opsDispatchedAsyncUnref: 0,
  opsCompleted: 1,
  opsCompletedSync: 0,
  opsCompletedAsync: 1,
  opsCompletedAsyncUnref: 0,
  bytesSentControl: 54,
  bytesSentData: 0,
  bytesReceived: 22
}
```

在即将发布的未来版本中，`Deno.test` 中的异步操作清理工具将使用此新信息，以在测试完成之前未完成异步操作时提供更多可操作性的错误。我们已经看到此功能用于检测应用程序并将数据通过管道传输到监视软件中。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1614733818013-ce9d6209-f859-4f10-bd16-13b55a048f1c.png#align=left&display=inline&height=552&margin=%5Bobject%20Object%5D&originHeight=1216&originWidth=1834&size=0&status=done&style=none&width=833)

- **Deno.open**：打开一个文件，并将其解析为 Deno.File 的实例。如果使用 create 或 createNew 打开，则该文件不需要打开前存在。结束文件操作后，调用者有责任主动关闭文件。
- **Deno.metrics**：跟踪 Deno 特权方面的指标，主要用于 Deno 的开发中。ops 是 Deno JavaScript 和 Deno Rust 之间的过渡。

## 在 `deno fmt` 中支持 JSON 格式

`deno fmt` 现已支持格式化为 `.json` 和 `.jsonc` 文件。就像 JS/TS 一样，格式化工具还可以在 Markdown 文件中格式化 json 和 jsonc 代码块。

精读笔记：

- **JSON**：基于 ES3 的子集，一种文本格式，完全独立于语言。在大多数语言中，是通过数组、向量、列表或序列来实现的。
- **JSONC**：JSONC 支持注释。
- **JSON-C**：JSON 的一种变体，主要针对 C 开发，JSONC 实现了引用计数对象模型，可以轻松用 C 构造 JSON 对象，输出 JSON 格式的字符串，并将 JSON 格式的字符串解析回 JSON 对象的 C 表示形式。

## 在 `Deno.emit` 中支持 IIFE 包

内置的打包器可以打包出立即调用函数表达式（IIFE）格式的包。

默认情况下，输出格式仍为 `esm`，但用户可以将 `EmitOptions.bundle` 选项设置为 `iife` 来更改此格式：

```typescript
const { files } = await Deno.emit("/a.ts", {
  bundle: "iife",
  sources: {
    "/a.ts": `import { b } from "./b.ts";
        console.log(b);`,
    "/b.ts": `export const b = "b";`,
  },
});

console.log(files["deno:///bundle.js"]);
```

输出结果为：

```typescript
(function() {
    const b = "b";
    console.log(b);
    return {
    };
})();
```

你可以自己运行此脚本：`deno run --unstable [https://deno.land/posts/v1.8/emit_iife.ts](https://deno.land/posts/v1.8/emit_iife.ts)`。

为不支持 ESM 的较旧浏览器创建打包时，这个特性特别有用。

精读笔记：

- **ESM 模块**：标准化后的 JavaScript 模块预发，逐步被 Node、各大主流浏览器支持。可以更为方便地提供拆分和懒加载等。
- **IIFE 模块**：是一种 JavaScript 函数，在定义后立即运行。可以是一种设计模式，也成自执行匿名函数，包含两个主要部分：匿名函数（防止变量污染等）和立即调用的表达式 `()`。

## `deno lsp` 现已稳定

在过去的几个月中，我们一直在努力替换旧的 VS Code 编辑器集成下的 Deno 扩展。旧的扩展仅适用于 VS Code，且解析出的类型并不总是与 Deno CLI 中对应的类型相匹配。

在 Deno 1.6 的 canary 版本中，我们发布了内置的语言服务器 `deno lsp`。LSP 允许我们仅通过同一份代码向支持 LSP 协议的所有编辑器提供编辑器集成功能。内置的语言服务器与 Deno CLI 的其余部分基于相同的架构——因此，它提供的 TypeScript 诊断与 CLI 的其余部分相同。

两周前，在 Deno 1.7.5 中我们稳定了 deno lsp 并将[官方 VS Code 拓展](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)切换到最新。到目前为止，我们已收到了很好的反馈，并将努力解决所有用户建议的问题。如果你在拓展程序中遇到问题，请在我们的问题跟踪器中报告该问题。因为我们无法解决我们并不知道的问题。

除了官方的 VS Code 集成外，还创建了很多基于 `deno lsp` 构建的社区集成。

- Vim 与 CoC：[https://github.com/fannheyward/coc-deno](https://github.com/fannheyward/coc-deno)
- Neovim：[https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#denols](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#denols)
- Emacs：[https://emacs-lsp.github.io/lsp-mode/page/lsp-deno/](https://emacs-lsp.github.io/lsp-mode/page/lsp-deno/)
- Kakoune:  [https://deno.land/manual/getting_started/setup_your_environment#example-for-kakoune](https://deno.land/manual/getting_started/setup_your_environment#example-for-kakoune)
- Sublime：[https://deno.land/manual/getting_started/setup_your_environment#example-for-sublime-text](https://deno.land/manual/getting_started/setup_your_environment#example-for-sublime-text)

精读笔记：

- **Deno canary （金丝雀）版本**：提供更为频繁的分支变动，可以支持预测试未来版本的功能。可以从 [https://dl.deno.land/](https://dl.deno.land/) 中下载。
- **LSP 协议**：语言服务器协议。定义了在编辑器或  IDE与语言服务器之间使用的协议，该语言服务器提供诸如自动完成、转到定义、查找所有引用等语言功能。语言服务器索引格式（LSIF，类似于 “ else if”）是为了支持开发工具或 Web UI 中的丰富代码导航，而不需要源代码的本地副本。逐步被更多语言支持。使用 JSON-RPC 发送消息格式。

## TypeScript 4.2

Deno 1.8 同步支持了最新的 TypeScript 稳定版本。

你可以在 [Announcing TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/) 文章中获取更多关于 TypeScript 4.2 的新特性信息。

精读笔记 - TypeScript 4.2 新特性包括但不止于：

> 参考：[TypeScript 4.2 发布](https://www.oschina.net/news/131046/typescript-4-2-released)

- **更智能的类型别名保护**。TypeScript 4.2 将通过保留一段时间内最初编写和构造的内容来跟踪类型的构造方法，还会跟踪并区分将别名键入其他别名的实例。
- **元组类型中 rest 元素支持放在任意位置**。此前 TypeScript 仅允许 rest 元素位于元组中的最后一个位置，现在 rest 元素可以再元组中的任何位置出现。唯一的限制是，后面不能存在其它可选元素或 rest 元素。
- **更严格地检查 in 操作符**。在 JavaScript 中，在 in 运算符的右侧使用非对象类型是一个运行时错误。现在，TypeScript 4.2 确保可以在编码时捕获它。
- **支持 abstract 构造签名**。将 abstract 修饰符添加到构造签名表示可以在 abstract 构造函数中传递。
- **支持 `--explainFiles` 选项**。使用此选项时，TypeScript 编译器将给出一些非常冗长的输出，理清文件如何最终访问到所有相关文件。
- 通过 **`--strictNullChecks` 选项支持** `&&` 和 `||` 表达式来优化逻辑表达式中的未调用函数检查。
- **可选属性和字符串索引签名**之间的规则更加宽松。
- **支持快速声明缺失的函数**。

## 译者结语

全文译完，并在每个章节做了简单的精读笔记。本次翻译是“精读”系列的第二篇，上一篇是《[精读《Deno 2020 官方回顾及 2021 展望》](https://github.com/hylerrix/deno-tutorial/)》。

《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》的精读系列将重点围绕[官方博客](https://deno.land/posts)展开，同时每翻译完一篇文章，也会争取 PR 合并到目前的 [Deno 中文网](https://deno-cn.vercel.app/)上。欢迎对 [@hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 仓库进行 star 或关注公众号 (@ningowood) 来及时接收消息，携手助力 Deno 在 2021 变得更好！

> © [https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 2020~2021
