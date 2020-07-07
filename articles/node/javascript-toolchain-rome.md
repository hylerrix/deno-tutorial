# 欲取代绝大多 JavaScript 工具链？Rome 尝鲜

文章缩略图：一个包含希腊斯巴达头盔的罗马项目 Logo

> 条条大路通 Rome。在 Rome 还没有发布 NPM 正式版之际。我们围绕 JavaScript 工具链为核心点，来看看前往 Rome 的路上都有什么；以及 Rome 本身，意味着什么？

二月的最后一天，我在为“[开源爱好者月刊](https://github.com/ningowood/open-source-magazine)”搜寻本月最新的开源项目时，偶遇一个名叫 Rome 的仓库霸榜，眼前着实一亮。“一个实验性的 JavaScript 工具链”、“包括编译器、lint、格式化程序、捆绑器、测试框架等”以及“旨在成为与 JavaScript 源码处理相关的所有功能的综合工具”短短几句话展现了一个宏大的目标。现在，是时候入坑了解一波并在个人能力范围内作一个浅要的分享。

Rome 由就职于 Facebook 同时是 Babel 和 Yarn 作者的 Sebastian McKenzie 主导开源，开源之前，Rome 基本是他的个人项目，现在 Facebook 愿意付薪水让他潜心开发。截止现在（2020 年 04 月初），Rome 的提交记录已经从 70+ 到 600+，贡献者拓展到了 40+ 位，产生了 30+ issues 和 170+ Pull Request。

Rome 的 Star 趋势图，发布之初便 3k+ star：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1586250919893-28d3dc40-57d9-4a99-9023-50e8c259ffbd.png#align=left&display=inline&height=323&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1176&originWidth=1678&size=111441&status=done&style=none&width=461)

此外，或许也能从侧面呼应我曾在月刊第三期中收录的一句关于“创业公司和大公司开源出发点有何不同”的话：大公司可能在一个项目的早期便开源，凭借其号召力希望更多人一起“贡献”迭代，初创团队则会在产品相对成熟的时候再开放，希望尽快吸引用户深度“使用”，注重完善产品在工业环境下的综合表现。

正文 & 背景 & 干货开始。

## Rome：从个人项目到 Facebook 新开源

从官网不难看出，Rome 旨在成为与 JavaScript 源代码处理相关的所有功能的综合工具，其中包括“编译器、Linter、格式化程序、捆绑器、依赖管理器和测试框架”等。Rome 源于对整个项目的扩展范围一致性的渴望。

同时，Rome 也来源于 Babel 作者本身对 Babel 的一些不满足而新创，就像 Deno 之于 Node 一样。

Rome 作者 Sebastian 关于 Rome 的推文集：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1586507768694-82e44955-f16d-4102-9f12-a7e347583ac0.png#align=left&display=inline&height=336&margin=%5Bobject%20Object%5D&name=image.png&originHeight=846&originWidth=1180&size=135209&status=done&style=none&width=469)

本节根据 README.md 和官网首页的介绍，来以问答形式展示 Rome 的背景和想要达到具体目标。

### 01、Rome 的一些来源？

> 在计算机科学中只有两件难事：缓存失效和命名。 ——Phil Karlton

- 立项来源：由 Babel and Yarn 的作者 Sebastian McKenzie 发起，是 React Native 团队的一个项目。
- 名称来源：因“通向罗马的所有道路”，“罗马不是一天建成”和“在罗马时要像罗马人一样”这样的谚语而得名。 这是指整个项目的扩展范围和对一致性的渴望，它始于一个办公室玩笑。
- Logo 来源：一个古希腊斯巴达头盔。虽然它不是罗马字母，也不太相关，但看起来比 Galea （罗马士兵的头盔）酷。

### 02、Rome 的编码架构？

> 在版本控制系统中，monorepo（单声道存储库的音节缩写）是一种软件开发策略，其中许多项目的代码存储在同一存储库中。 截至 2017 年，这种软件工程实践已有十多年的历史，但直到最近才被命名。——Monorepo，维基百科

- 完全使用 TypeScript 编写，很少使用松散类型。
- 支持处理 JSX 以及 Flow 和 TypeScript 代码。
- self-hosted，可以自己编译自己。
- 不是现有工具的集合，所有组件都是自定义的，不使用第三方依赖项（对 JavaScript 生态系统进行了重新思考，对整个工具链采用了不依赖第三方库的大胆实现）。
- 是带有内部软件包的 monorepo 架构以便划定代码边界。

### 03、Rome 的工作展望？

- 旨在成为与 JavaScript 源代码处理相关的所有功能的综合工具。
- 目标是替代许多现有的 JavaScript 工具，但也将提供为其他工具提供自身的集成方案，以根据需要随意使用——例如使用 Rome 编译器作为另一个捆绑程序的插件。
- 目前关注的领域是 Linter（用于分析源代码以标记编程错误，bug，样式错误和可疑结构的工具），这是将 Rome 变成最容易使用的工具链的目标里阻力最小的一个环节。

## 微栏：回看 JavaScript 工具链

> 在学习一个工具之前，往往我们应该先去了解这个工具可以用来解决什么样的问题；同样的，当我们遇到一个问题的时候，我们也应该带着这个问题去找工具解决。
> **——**阿里巴巴集团 高级前端工程师 叶俊星

成熟的软件项目必然遵循的良好的开发规范，也拥有属于自身独特的软件开发生命周期，编程实践只占整个开发周期的很小一部分。当一个 JavaScript 软件被建立时通常还会遇到哪些需要解决的问题？这便涉及到了 JavaScript 项目的技术选型，而 JavaScript 生态圈的明星项目数不胜数，以下作一个纵览，不涉及各个工具的具体使用方式。

JavaScript 工具链示意图：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1586513611176-e3066f3f-4113-43ed-a45c-94c5307217e1.png#align=left&display=inline&height=180&margin=%5Bobject%20Object%5D&name=image.png&originHeight=360&originWidth=708&size=117163&status=done&style=none&width=354)

- **JS 开发环境**？有 V8、Node 甚至是 Deno 等；
- **JS 前端框架**？有 Angular、React、Vue、React Native、jQuery 等；
- **JS 后端框架**？有 Nest、Express、Koa 等；
- **JS 脚手架**？有 Vue CLI、Angular CLI、Create React App、Yeoman 等；
- **JS 转译工具**？有 Babel  等；
- **JS 测试工具**？围绕单元测试、集成测试，有 Mocha、Jasmine、Jest、Karma 等；
- **JS 调试工具**？有 Chrome DevTools/Firebug/Webkit inspector 等各大主流浏览器、VS Code/WebStorm 等各大编辑器/IDE 等；
- **JS 格式规范工具**？有 JSLint、JSHint、ESLint、TSLint 等；
- **JS 接口联调工具**？有 Axios、Fetch 等；
- **JS 包管理器**？有 NPM、Yarn、Bower、PNPM 等；
- **JS 模块加载器**？有 RequireJS、SystemJS、StealJS、ES Module Loader 等；
- **JS 任务管理工具**？Grunt、Gulp、Webpack 监听文件变化，自动执行任务；
- **JS 静态化支持**？有 TypeScript、CoffeeScript、Flow、LiveScript 等；
- **JS 代码后处理工具**？围绕混淆器、缩小器、优化器诸多领域有各种各样的 loader 等；
- **JS 打包工具**？Webpack、Rollup、Parcel、Browserify 等；
- **JS 模板引擎**？有 handlebarsjs、etpl、templatejs 甚至各大前端框架内置的模板语法等；
- **JS 非 Web 框架**？在物联网、区块链、大数据等领域均有相关库支持，本文不涉及。
- **JS 进程管理**？有 Forever、PM2、StrongLoop Process Manager 等；
- **......**？甚至编辑器、IDE、CSS 预处理器、代码托管平台、团队开发模式(纯前端、重后端、前后分离)、WebAssembly、Serverless、JS DevOps 等都可以加到项目的技术选型范围内。

因此可以看出，技术选型便是针对能让项目成功运转各个环节寻找相应的解决方案；工作流（Workflow）是所有解决方案融合后的落实流程；而工具链（Toolchain）便是工作流下所有实现方式的汇总，同时一个工具也能代表一个解决方案。

简而言之，JavaScript 工具链便是 JavaScript 工程师在开发过程中会用到的一系列工具。

## 浅尝初试 Rome (v0.0.52)

现在 Rome 并没有直接在 Github 上发布任何版本，但编译后生成的 rome.json 可以看出有一个 v0.0.52 的版本号，处于一个很早期的状态，项目简介也是“一个实验性的 JavaScript 工具链”。

想要尝试 Rome，就得从以下步骤逐步展开（由于 Rome 没有发布正式版本，这里无需过多涉及如何整合在 package.json 的脚本中使用等工程化过程）。

帝国时代里的罗马大军：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1582968932888-16752733-9ed4-49ff-a135-4b2f1d37b55a.png#align=left&display=inline&height=282&margin=%5Bobject%20Object%5D&name=image.png&originHeight=695&originWidth=1236&size=2575437&status=done&style=none&width=502)

本章所有 Demo 均在 [@hylerrix/demos](https://github.com/hylerrix/demos) 的 Rome 文件夹中。

### 01、git clone rome

既然 Rome 没有正式发布版本，我们也无法直接从 NPM 上直接安装 Rome。现阶段，Rome 提供了本地安装的方式，只需要克隆到本地并本地编译和本地 NPM 安装即可使用。

> 注：安装 Rome 前请确保本地已正常安装 Node 和 NPM

```bash
# 克隆 Rome 项目到本地
$ git clone https://github.com/facebookexperimental/rome
# 命令行进入 Rome 项目
$ cd rome
# 方式一：编译 Rome
$ ./scripts/build-release dist
# 方式二：编译 Rome（Windows 10 的情况下，使用 PowerShell 7）
$ cd rome && node scripts/build-release dist
# 安装编译后的 Rome 到本地全局环境中
$ npm install -g ./dist/
# 现在便可以使用 Rome 了
$ rome # No command specified. Run --help to see available commands.
```

### 02、rome init

rome init 命令会在当前目录生成一个 rome.json 文件，使用推荐配置会初始化以下内容：

```json
{
  "version": "^0.0.52",
  "lint": {
    "enabled": true
  }
}
```

该文件告诉 Rome 至少应为 0.0.52 版本，以便与当前项目一起使用。具体使用文档还在开发中。

### 03、rome run index.ts

rome run 命令将运行传递给它的任何文件，通常与项目的主文件一起使用。目前仍在开发中，可能无法正确处理所有源文件。此时我们为测试 rome run 成功运行，建立一个 index.ts 和 api.ts 文件，如下。

```javascript
// index.ts
import { getData } from './api'

async function setData () {
  const { success, data } = await getData()
  console.log('success:', success)
  console.log('data:', data)
}

await setData()

// api.ts
export const getData = () => Promise.resolve({
  success: true,
  data: 'Hello World!'
})
```

此时，运行如下命令便可以成功使用：

```bash
$ rome run index.ts
# ℹ Bundling index.ts
# success: true
# data: 'Hello World!'
```

### 04、rome lint index.ts

由于我真的不喜欢在 JavaScript 应用里面写分号，这与主流规范有些不同，所以 rome lint 命令刚好派上了用场：rome 默认需要在 JavaScript 语句结尾写分号。同时在 api.ts 中故意不导出一个 interface 且在 index.ts 中故意将其错误导入，重构后的有错误 index.ts 和 api.ts 以及 rome lint 后执行过程如下：

```javascript
// 故意错误编写的 index.ts
import { getData } from './api'

async function setData() {
  const {success, data} = await getData()
  console.log('success:', success)
  console.log('data:', data)
}

await setData()

// 故意错误不导出的 api.ts
interface Params {
  username: string
  token: string
}

export const getData = (params: Params) => Promise.resolve({
  success: true,
  data: 'Hello World!'
})
```


```bash
$ rome lint index.ts
#  index.ts lint/pendingFixes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
#   ✖ Pending fixes
# 
#      1 │ + import {getData, Params} from './api.ts';
#        │ - import {·getData, Params·} from './api.ts'
#      2 │   
#     .. │ 
#      4 │     const param: Params = {
#      5 │       username: 'hylerrix',
#      6 │ +     token: 'ningowood',
#      7 │ +   };
#      8 │ +   const {success, data} = await getData(param);
#      9 │ +   console.log('success:', success);
#     10 │ +   console.log('data:', data);
#     11 │   }
#     12 │   
#     13 │ + await setData();
#     14 │   
# 
#  index.ts:1:18 resolver/unknownExport ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
#   ✖ Couldn't find export Params in api.ts
# 
#   > 1 │ import { getData, Params } from './api.ts'
#       │                   ^^^^^^ 
#     2 │ 
#     3 │ async function setData() {
# 
#   ℹ However we found a matching local variable in api.ts. Did you forget to export it?
# 
#   > 1 │ interface Params {
#       │           ^^^^^^ 
#     2 │   username: string
#     3 │   token: string
# 
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
# ℹ Fixes available. Run `rome lint --fix` to apply.
# ✖ Found 2 problems
$ rome lint index.ts --fix
# ......
# ✔ 1 file fixed
# ✖ Found 2 problems
```

rome lint 命令在这里提示我们需要加分号并需要在 api.ts 中成功导出 interface。前者可以使用 rome lint index.ts --fix 直接来修理（不会在 api.ts 中添加分号）；后者需要手动修理，但是提供了十分完善的友好提示。

### 05、rome compile index.ts

rome compile 命令将使用一组默认转换来编译文件。由于在开发中，当前此命令没有用于指定转换子集的选项。使用这条命令后，输出的结果已经没有了 interface 的存在。

```bash
$ rome compile index.ts
# import {getData, Params} from './api';
# 
# async function setData() {
#   const param = {
#     username: 'hylerrix',
#     token: 'ningowood',
#   };
#   const {success, data} = await getData(param);
#   console.log('success:', success);
#   console.log('data:', data);
# }
# 
# await setData();
```

### 06、rome parse index.ts

rome parse 命令将解析文件并输出格式精美的 AST。

```bash
$ rome parse index.ts
# Program {
#   comments: Array []
#   corrupt: false
#   diagnostics: Array []
#   directives: Array []
#   filename: 'project-rome/index.ts'
#   hasHoistedVars: false
#   mtime: 1_586_498_633_476.8486
#   sourceType: 'module'
#   syntax: Array ['ts']
#   body: Array [
#     ImportDeclaration {
#       source: StringLiteral {value: './api'}
#       namedSpecifiers: Array [
#       	......
```

### 07、Rome 的更多命令

除了官网展示的几个命令外，从源码可以看出还有很多内置的命令正在开发，可以从 rome --help 中寻找答案。

```bash
# 分析并输出文件的依赖
$ rome analyzeDependencies index.ts
# 把 JavaScript 打包为一个文件
$ rome bundle index.ts dist
# 启动 Web 服务器
$ rome develop
# 计算文件路径
$ rome resolve index.ts
# 安全依赖，运行 Linter 和测试
$ rome ci
# 运行测试
$ rome test
# ...restart/start/status/stop/web
# ...config/publish/run/evict/logs/rage
```

## 参考资料

- [English] [Rome Github Project](https://github.com/facebookexperimental/rome)
- [English] [Rome, a new JavaScript Toolchain](https://jasonformat.com/rome-javascript-toolchain/)
- [English] [Rome Official Announcement](https://twitter.com/sebmck/status/1232885861135421441)
- [English] [Rome Timeline](https://twitter.com/sebmck/status/1108407803545214977)
- [English] [Facebook Introduces Rome Experimental JavaScript Toolchain](https://www.infoq.com/news/2020/03/rome-experimental-js-toolchain/)
- [English] [01: Sebastian McKenzie on Babel and the Road to Rome - The Babel Podcast](https://podcast.babeljs.io/rome/)
- [前端工具链课（一）—— 包管理工具](https://zhuanlan.zhihu.com/p/23928404)
- [Rome：Facebook 最新 JS 工具上手](https://blog.csdn.net/qiwoo_weekly/article/details/104624223)

## 总结 & 订阅

经过近几年的蓬勃发展，JavaScript 早已不再局限于“前端开发”的领域中。因此本篇写作的角度并不是仅仅以前端开发为主体探索，而是将 JavaScript 本身抽离出来，这也是自己逐步理清职业发展的一个重要改变。

本文通过学习和写作分享对 Rome 进行了简要的了解，但这还仅仅是入门。自己对 Babel 本身并不熟，还有很多学习过程中产生的疑惑都无法现在进行合适的解答，比如“Rome 和 Babel 的具体异同”、“如何看待 Rome 仓库使用 Git 跟踪 Node Modules”、“Rome 替代现有工具或进行集成方案的具体原理”以及“Rome 的打包流程有何特点”等，挖个坑可以一起交流。

无论最终是否使用 Rome，能引发对 JavaScript 工具链的重新思考也会很有收获。

最后，感谢你的阅读，公众号(@ningowood) 及配套群聊欢迎加入，同时欢迎给如期更新了三期，即将支持线上 UI 界面浏览并提供更多拓展功能的“开源爱好者月刊（[@ningowood/open-source-magazine](https://github.com/ningowood/open-source-magazine)）”仓库点个 Star 吧！（Github 好久没涨粉丝了，也欢迎关注我~）

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1586513640616-7cc6456c-66cd-441d-aa44-09c7567d2960.png#align=left&display=inline&height=258&margin=%5Bobject%20Object%5D&name=image.png&originHeight=258&originWidth=258&size=46759&status=done&style=none&width=258)
