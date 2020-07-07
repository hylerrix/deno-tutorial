# 深入浅出 Create React App

本文差点难产而死。因为总结的过程中，多次怀疑本文是对官方文档的直接翻译和简单罗列；同时官方文档很全面，全范围的介绍无疑加深了写作的心智负担。但在最终的梳理中，发现走出了一条与众不同的路，于是坚持分享出来。

希望本文除了能带领我们再次了解 Create React App(后文简称 CRA) 外，还能提供一种不同的知识组织结构和技术视角，加深我们对整个 React 技术生态的理解。

> 本文可能是多篇博客的综合体，整理和写作时间 15h+，仔细阅读时间 30min+，请慢用。

本文面向的读者是：

- 前端开发初学者或 React 初学者；
- 使用过 CRA 搭建 React 项目但想拓展相关知识面的人；
- 希望通过一篇文章快速复习 CRA 的人；
- 英文初学者，想要通过一篇中文技术文章来让自己接下来读英文文档不再困难的人；
- 以及就想点进来支持一下的人。

其次，本文在对官方文档进行一定的重新编排下，加上了如下创新点以完善整体的阅读学习体验：

- [x] 添加了实战 1：使用单个 HTML 文件构建 React App；
- [x] 添加了实战 2：使用 Webpack 手动构建 React App；
- [x] 添加了实战 3：使用 CRA 一站式构建 React App；
- [x] 添加了实战 4：使用 Source Map Explorer 分析打包文件；
- [x] 添加了实战 5：在已有的 React 项目中引入/升级 CRA；
- [x] 添加了实战 6：使用 React App Rewired 注入新配置；
- [x] 添加了：对 CRA 未来版本的简单展望；
- [x] 添加了：一个 Dan 十年回顾文章的导读。

最终，本文不涉及源码的解读，想要阅读源码的同学可以移步官方源码仓库，整体设计思路并不是很难，具体实现原理可以细细品嚼；且本文对与 CRA 不直接相关的技术点会略略而过，欢迎从点到面主动学习更多。以下是官方源码仓库以及官方文档地址：

- Github 地址：[https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)
- 官方文档地址：[https://create-react-app.dev](https://create-react-app.dev/)

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1578586685262-ca35e2db-94b8-4510-a922-8ef68ade06ee.png#align=left&display=inline&height=704&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1408&originWidth=2790&size=145496&status=done&style=none&width=1395)

## 初始化 React App 的多种方式

常见的初始化 React App 的方式有：

- 不使用构建工具构建 React App；
- 使用 Webpack 手动构建 React App；
- 使用 Create React App 一站式构建 React App；
- 在在线沙箱平台直接构建 React App（一般用于 Demo 预演，本文不涉及）。

下面我们分别进行介绍与实战练习。

## 实战 1：使用单个 HTML 文件构建 React App

React 本身专注于构建用户界面，并不依赖于某个构建工具，因此我们可以用传统的方式引入 React 并书写第一个“Hello World!” App。这种方式是快速尝试 React 的好方法，但并不适用于正式开发。

以下 HTML 代码段是一种实现方式，使用了可选的 Babel 编译和 JSX 语法，基于非构建工具的更多初始化页面的方法（如不使用 JSX 等）可以自行探索。

```html
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> <!-- 不需要用于生产环境 -->
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      )
    </script>
  </body>
</html>
```

## 实战 2：使用 Webpack 手动构建 React App

构建工具有很多种，目前最为主流的构建工具当属 Webpack。如何使用 Webpack 逐步构建 React App？

> 果不其然，为了证明 CRA 的便捷性而引出的本节 Webpack 实战，耗费了一小时多的时间进行了亲自踩坑，搜索了较多的博文都由于发布时间性而不能和最新的版本进行融合，最终根据 Github 中 [react-webpack-babel](https://github.com/ReactJSResources/react-webpack-babel) 库的 package.json 文件里的相关信息才得到实现。

```bash
# 创建一个项目并进入该项目
$ mkdir react-webpack-steper & cd react-webpack-steper
# 使用默认选项直接生成一个初始化的 package.json
$ npm init -y
# 安装 React 基础包
$ sudo npm install --save react react-dom
# 安装 Webpack 相关工具 - 打包、本地启动支持、本地异步请求模拟以及热更新等
$ sudo npm install --save webpack webpack-cli webpack-dev-server
# 安装 Babel 相关工具 - 提供 ES6+ 新功能支持
$ sudo npm install --save-dev @babel/cli @babel-core @babel/preset-env @babel/preset-react
$ sudo npm install --save-dev babel-loader babel-plugin-module-resolver html-webpack-plugin
# 新建打包、编译配置文件并准备编写
$ touch webpack.config.js
$ touch .babelrc
# 新建 React 文件
$ mkdir src
$ touch src/index.js
$ touch src/index.html
```

其中，webpack.config.js 源码如下：

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
}
```

.babelrc 源码如下：

```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"]
    }]
  ]
}
```

src/index.html 源码如下：

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hello World!</title>
</head>
<body>
  <div id="root">Loading...</div>
</body>
</html>
```

src/index.js 源码如下：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```

此时，一个基于 Webpack 手动搭建的简易型“Hello World”App 开发完成，可以通过如下命令本地运行。

```bash
$ webpack-dev-server --mode development --open --hot
```

更多自定义内容如添加 devServer 支持、添加多页应用支持...等各种各样新技术栈的支持，也可以引申实战。

## 因此，我们需要 CRA

可见，不使用构建工具编写不切实际，使用构建工具手动搭建 React App 又很繁琐。因此我们需要一个能初始化一个可直接运行项目的工具，并提供各种简易的插件，Create React App 应运而生。

> CRA 适用于中小型 React 项目。

### CRA 的设计哲学

- 一种依赖关系。尽管 CRA 使用了 Webpack，Babel，ESLint 等各种出色的项目，但我们只需要 CRA 一种依赖；从 CRA 生成项目的 package.json 中也可以看到并没有 Webpack、Babel 的痕迹。
- 无需配置。我们无需进行任何额外配置便可以直接运行代码，专注业务开发；同时 CRA 还提供了开发和生产版本的合理配置。
- 非锁定配置。只需要运行一个命令， 所有的配置项和构建依赖项都将直接“弹出”到项目中，交由我们来修改。

### CRA 包含了什么？

CRA 将具有构建现代单页 React 应用所需的一切：

- React，JSX，ES6，TypeScript 和 Flow 语法支持；
- ES6+ 标准的支持，例如对象传播运算符；
- CSS 自动添加前缀的支持，因此我们不需要 -webkit- 或其他前缀；
- 快速的交互式单元测试运行程序，内置对覆盖率报告的支持；
- 实时开发服务器，警告常见错误；
- 一个构建脚本，用于将 JS，CSS 和图像与哈希和源映射捆绑在一起进行生产；
- 满足所有渐进式 Web 应用程序标准的 [ServiceWorker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) 和 [Web 应用程序清单](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) 支持 （注意：从react-scripts@2.0.0及更高版本开始支持 ServiceWorker）；
- 单一依赖项即可轻松更新上述工具。

### CRA 的使用场景

Create React App 非常适合：

- 在方便且功能丰富的开发环境中学习 React；
- 快速启动新的单页 React 应用程序；
- 快速使用 React 为库和组件创建示例。

如果我们想在没有数百个传递构建工具依赖的情况下尝试 React，请考虑使用单个 HTML 文件构建或使用在线沙箱平台构建。

- 如果需要将 React 代码与服务器端模板框架（如 Rails，Django 或 Symfony）集成，或者如果不构建单页应用，请考虑使用更灵活的 [nwb](https://github.com/insin/nwb) 或 [Neutrino](https://neutrino.js.org/)。特别是对于 Rails，可以使用 [Rails Webpacker](https://github.com/rails/webpacker)。对于 Symfony，请尝试 [Symfony's Webpack Encore](https://symfony.com/doc/current/frontend/encore/reactjs.html)；
- 如果需要发布 React 组件，[nwb](https://github.com/insin/nwb) 以及 Neutrino 的 [react-components preset](https://neutrino.js.org/packages/react-components/) 也可以这样做；
- 如果要使用 React 和 Node.js 进行服务器渲染，请查看 [Next.js](https://github.com/zeit/next.js/) 或 [Razzle](https://github.com/jaredpalmer/razzle)。 Create React App 与后端无关，仅生成静态HTML / JS / CSS包；
- 如果网站大部分是静态的（例如，投资组合或博客），请考虑改用 [Gatsby](https://www.gatsbyjs.org/)。与 Create React App 不同，它在构建时会将网站预先渲染为 HTML；
- 最后，如果需要更多自定义设置，请查看 Neutrino 及其 [React preset](https://neutrino.js.org/packages/react/)。

### CRA 支持的浏览器

一些支持的浏览器规则如下：

- 默认情况下，生成的项目支持所有现代浏览器。 对 Internet Explorer 9、10 和 11 的支持需要 polyfill。 对于一组支持旧版浏览器的 polyfill，请使用 [react-app-polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)；
- 默认情况下，生成的项目在 package.json 文件中包含一个 browserslist 配置，以针对基于全球使用情况（> 0.2％）的广泛浏览器（用于生产构建）和用于开发的现代浏览器。 这提供了良好的开发体验，尤其是在使用异步/等待等语言功能时，但仍与生产中的许多浏览器保持高度兼容性；
- browserslist 配置控制输出的 JavaScript，以使注入的代码与指定的浏览器兼容。 通过运行构建脚本来创建生产构建时，将使用生产列表，而在运行启动脚本时，将使用开发列表。 可以使用 [https://browserl.ist](https://browserl.ist) 查看配置的浏览器列表支持的浏览器；
- 请注意，这不会自动包括 polyfills，仍然需要根据所支持的浏览器来添加语言功能（见上文）；
- 在编辑 browserslist 配置时，我们的更改可能不会立即被获取。 这是由于 babel-loader 中的一个未检测到 package.json 中更改的问题。 一种快速的解决方案是删除 node_modules/.cache 文件夹，然后重试。

这里的重点是 BrowsersList，一个“在不同的前端工具之间共用目标浏览器和 node 版本的配置工具”。简而言之，就是 Babel 等转移工具通过我们设置的 BrowsersList 中想要支持的浏览器版本来决定哪些语法需要被编译。

### CRA 支持的 ES 标准

一些支持的 ES 标准规则如下：

- 该项目支持最新 JavaScript 标准的超集。 除ES6语法功能外，它还支持：
   - [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016)；
   - [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017)；
   - [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018)；
   - [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 4 proposal)；
   - [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal)；
   - [JSX](https://facebook.github.io/react/docs/introducing-jsx.html), [Flow](https://create-react-app.dev/docs/adding-flow) and [TypeScript](https://create-react-app.dev/docs/adding-typescript)；
   - Learn more about [different proposal stages](https://tc39.github.io/process-document/)。
- 尽管 Facebook 建议谨慎使用实验性功能，但 Facebook 会在产品代码中大量使用这些功能，因此，如果将来任何这些建议发生更改，Facebook 都打算提供 [codemod](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb)；
- 请注意，默认情况下，该项目不包含任何 [polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)；
- 如果您使用任何其他需要运行时支持的ES6 +功能（例如Array.from（）或Symbol），请确保[手动包括适当的polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)，或者您要定位的浏览器已支持它们。

### CRA 的两个核心库

Create React App 有两个核心库，如下:

- create-react-app 是全局命令，用于创建初始化的 React 项目；
- react-scripts 是所生成的项目中的开发依赖项，包括运行项目、测试项目、打包项目等多种命令。由于 CRA 的一种依赖性原则，react-scripts 便开放了所有内部其它依赖的使用方式。

## 实战 3：使用 CRA 构建 React App

到这里，我们终于需要通过命令行来安装和使用 CRA，来构建我们的第三个“Hello World”App。

### 全局安装 CRA

为保证每一个新项目都能使用到 CRA 最新最全的功能，请确保 CRA 为最新版本。

```bash
# 在已安装 CRA 的情况下，可以先卸载 CRA
$ npm uninstall -g create-react-app
# 正式安装 CRA
$ npm install -g create-react-app
```

### 初始化 CRA 项目

根据我们的 npm 版本，选择相应命令来安装最新版的 CRA 并初始化第一个项目。同时检查自己的 node 版本，需要在本地开发计算机上安装 Node 8.16.0 或 Node 10.16.0 或更高版本（但服务器上不需要）。 我们可以使用nvm（macOS / Linux）或 nvm-windows 在不同项目之间切换Node版本。

```bash
# 查看自己的 npm 版本
$ npm --version

# 第一种新建项目方式——npm 5.2+ 时，以下命令会安装最新版 CRA
$ npx create-react-app my-app
# 第一种新建项目方式——npm 版本小于等于 5.1 时
$ create-react-app my-app

# 第二种新建项目方式
# npm 6+ 开始支持 npm init <initializer> 
$ npm init react-app my-app

# 第三种新建项目方式
$ yarn create react-app my-app
```

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1578397692108-1eba7684-3757-43c0-96a1-4705bd26ecaf.png#align=left&display=inline&height=298&margin=%5Bobject%20Object%5D&name=image.png&originHeight=595&originWidth=825&size=51054&status=done&style=none&width=412.5)

### 项目的文件结构

通过命令行的构建，我们初始化了第一个 CRA 项目，其中帮我们生成的项目目录结构如下（只有 src 下的文件才会被 Webpack 处理，只有 public 下的文件才能被 public/index.html 使用）：

```bash
my-app
├── .git # 隐藏文件夹，会初始化第一个 Commit 记录
├── README.md
├── node_modules
├── package.json # 依赖配置文件
├── .gitignore
├── [floder_name] # 根目录下可以建立其他文件夹，但不会被用在生产环境中
├── public # 只有 public 下的文件才能被 public/index.html 使用
│   ├── favicon.ico
│   ├── index.html # public/index.html 页面模板
│   └── manifest.json
└── src # 只有 src 下的文件才会被 Webpack 处理
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── [floder_name] # 可以建立其他文件夹，以被 Webpack 成功导入
    ├── index.css
    ├── index.js # JavaScript 打包入口文件
    ├── logo.svg
    └── serviceWorker.js
```

关于 package.json、index.js 和 public/index.html 文件夹，我们通过“实战 2”已经有所了解。前者是 JavaScript 打包入口文件，通常链接整个业务代码；后者是页面模板，是打包后整个静态页面的总入口。

这里对以下两个文件的出现进行简要的意义概括。
_

- src/serviceWorker.js：提供渐进式 Web 应用的核心功能，不论网络状况如何都能立即加载，并且在不需要网络请求（离线时）的情况下也能展示 UI ；
- public/manifest.json：是渐进式 Web 应用将自身添加至桌面的功能依赖文件，也可以对图标、名称等信息进行配置。

### 运行 CRA 项目

CRA 默认提供了运行、测试、打包、部署以及弹出项目的命令。其中的一些贴士：

- npm start 内置热更新机制，代码改动时页面自动刷新；
- npm test 以交互方式运行测试观察程序，默认情况下运行与自上次提交以来更改的文件相关的测试；
- npm run build 将要生产的应用程序生成到生成文件夹。它在生产模式下正确捆绑了React，并优化了构建以获得最佳性能。生成文件被压缩，并且文件名包含哈希；
- npm run eject 将内置的各种 Webpack 配置弹出到项目中，让我们可以进行自定义。同时此操作不可逆，意味着我们承担了弹出配置后的风险。通常不推荐弹出，可以通过 React App Rewired 库进行配置注入。

```bash
# ---- 运行 ----
$ npm start
$ open http://localhost:3000
# ---- 测试 ----
$ npm test
# ---- 打包 ----
$ npm run builds
# ---- 弹出配置 ----
$ npm run eject
```

### 搭建 CRA 生态

根据官方文档的思路，我们还能从更多角度拓展 CRA 的使用边界，下面进行概要介绍。

- 为开发环境添加额外功能：包括“配置编辑器风格”、“开发隔离组件”、“分析打包文件”和“添加 HTTPS 支持”；
- 添加样式与静态资源支持：包括“添加样式表文件”、“添加 CSS Modules 支持”、“添加 Sass 支持”、“添加 PostCSS 支持”、“添加图片文字和字体支持”、“添加 GraphQL 支持”、“使用 public 文件夹”、“进行代码拆分”；
- 添加业务驱动支持：包括安装各种依赖项如“BootStrap”、“Flow”、“TypeScript”、“Delay”、“Router”，以及“导出组件”、“使用全局变量”、“配置环境变量”、“制作渐进式 Web 应用”和“创建生产环境”；
- 添加测试支持：包括“运行测试”和“调试测试”；
- 添加后端集成支持：包括“在开发环境中代理 API 请求”、“使用 AJAX 请求获取数据”、“集成后端 API”和“使用 Title & Meta 标签”；
- 部署进阶：包括“静态服务器”、“Azure”、“Firebase”、“Github Pages”等平台的部署等。

这里无法深入展开，每一个点都可以是一个新的实战，当我们需要某个功能时便可以查阅相关文档来主动探索。其中“分析打包文件”的解读见“实战 4”。

## 实战 4：使用 Source Map Explorer 分析打包文件

```bash
# 安装文件分析工具 source-map-explorer
$ sudo npm install --save source-map-explorer
# 打包项目
$ npm run build
# 将如下命令放入 package.json 中并生成快捷方式 npm run analyze
# $ source-map-explorer 'build/static/js/*.js'
# 注意此命令直接在命令行输入会提示找不到相关命令
$ npm run analyze
```

对于一个刚被 CRA 生成的 React App 来说，分析的结果如下，包大小总计 129.38k。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1578588582058-7e1849b9-420a-4ef1-87ce-f032359d3826.png#align=left&display=inline&height=443&margin=%5Bobject%20Object%5D&name=image.png&originHeight=886&originWidth=1502&size=59266&status=done&style=none&width=751)

## 实战 5：在已有的 React 项目中引入/升级 CRA

回到刚才“实战 2”建立的 react-webpack-steper 项目中，当我们已经编写了一部分业务时，能否直接在当前项目中无痛引入 CRA？

解决思路便是：在大多数情况下，更改 package.json 中的 react-scripts 版本并删除不必要依赖配置，接着在此文件夹中运行 npm install 就足够了，但最好参考更改日志以了解潜在的重大更改。CRA 致力于将重大更改保持在最低限度，以便可以轻松升级 React 脚本。

```bash
# 卸载 CRA 本身已经提供的依赖
$ sudo npm uninstall --save webpack webpack-cli webpack-dev-server
$ sudo npm uninstall --save-dev @babel/cli @babel-core @babel/preset-env @babel/preset-react
$ sudo npm uninstall --save-dev babel-loader babel-plugin-module-resolver html-webpack-plugin
# 删除 CRA 不需要使用的文件
$ rm webpack.config.js .babelrc
# 删除 node_modules
$ rm -rf node_modules
# 手动安装 React Script
$ sudo npm install --save react-scripts@latest
# 由于 CRA 默认规则，将 src/index.html 移至 public/index.html
$ mkdir public
$ mv src/index.html public
# 在 package.json 中添加 React Script 启动命令
$ vim package.json
```

package.json 中添加/覆盖如下指令。

```bash
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
```

再次执行即可。由于每个人的具体配置不一定一致，可根据自身所遇问题进行搜索。升级原理类似。

```bash
# 当没有 BrowsersList 时，CRA 会进行询问并帮助我们生成
$ npm start
```

## 实战 6：使用 React App Rewired 注入新配置

CRA 官方并不推荐使用 npm run eject 弹出配置，这会增加更多的 Webpack 维护工作。对于实在想改的 Webpack 配置来说，我们可以使用 [React App Rewired](https://github.com/timarney/react-app-rewired) 库进行配置注入，这里来做个小例子。

> 此工具可以在不 'eject' 也不创建额外 react-scripts 的情况下修改 create-react-app 内置的 webpack 配置，然后你将拥有 create-react-app 的一切特性，且可以根据你的需要去配置 webpack 的 plugins, loaders 等。

继续使用 react-webpack-steper 项目，我们的简易目标是增加 devServer 本地代理。

**第一步：安装依赖并进行基础配置**

```bash
# 安装依赖
$ sudo npm install --save-dev react-app-rewired customize-cra
# 根目录建立 config-overrides.js
$ touch config-overrides.js
# 修改 package.json
$ vim package.json
# 运行项目
$ npm start
```

其中，config-overrides.js 的初始代码为：

```javascript
/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

package.json 的修改思路为：

```javascript
/* package.json */
"scripts": {
- "start": "react-scripts start",
+ "start": "react-app-rewired start",
- "build": "react-scripts build",
+ "build": "react-app-rewired build",
- "test": "react-scripts test --env=jsdom",
+ "test": "react-app-rewired test --env=jsdom",
  "eject": "react-scripts eject"
}
```

**第二步：编写配置，进行代理**

```bash
# 新增配置文件
$ mkdir config
$ touch config/proxy.js
# 修改 config-overrides.js
$ vim config-overrides.js
```

其中，config/proxy.js 源码是：

```javascript
module.exports = {
  '/api/**': {
      target: 'http://110.114.120.120:8080',
      secure: false,
      changeOrigin: false,
  },
}
```

config-overrides.js 修改为：

```javascript
const { overrideDevServer } = require('customize-cra')
const proxy = require('./config/proxy')

module.exports = {
  devServer: overrideDevServer((config) => {
      config.proxy = proxy
      return config
  }),
}
```

此时，本地的所有 api 开头的接口请求都会被转发到 [http://110.114.120.120:8080](http://110.114.120.120:8080) 的模拟后端 IP 上。

## 对 CRA 未来版本的简单展望

截止目前(2020-01-10)，CRA 的最新版本是 v3.3.0，我们可以从 Github 的 MileStone 中看到未来可能会改善的功能，其中整理并如下所述。

- v3.x：添加多入口文件支持（不只是一个 index.js 入口）；使用 worker-loader 添加对 WebWorker 的支持；更早地检查 Node 的版本；添加对子资源完整性 SRI 支持；生产环境中预加载脚本和链接...
- v4.0：支持 Webpack 5.0（Webpack 目前最新版 v4.41.5，v5 也推出了一年多内测版）；在 tsconfig.json 和 jsconfig.json 里新增对 baseUrl 和 paths 的支持（方便写 @ 绝对路径等）；支持 Jest 配置中设置browser 为 true（根据环境提供正确的 Node 或 Browser 模块）...
- v100.0：提供构建过程中的监视模式；适用于 Hooks 的热加载...

让我们一起持续关注。

## 结语

回顾文章，我们从初始化 React App 的多种方式，引出 CRA 的必要性再对其进行较为充分的解释，最后配上 6 个角度来从一些角度对 CRA 的使用方式进行了实战，最后回归到 CRA 的版本展望之中。

感谢你的阅读，如果你有什么更多的疑惑，CRA 的官方文档 + 开源仓库一定会满足你的一切。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1578591055691-2065e9cb-0776-4c28-85e4-7eab17645dbe.png#align=left&display=inline&height=284&margin=%5Bobject%20Object%5D&name=image.png&originHeight=860&originWidth=796&size=425153&status=done&style=none&width=263)

最后，一起拜读一下 CRA 和 Redux 作者、React 的核心贡献者 Dan Abramov 发布的这篇“[我的十年回顾](https://overreacted.io/my-decade-in-review/)”文章。

现在我们可以开始正式深入地学习 React 技术栈了。
