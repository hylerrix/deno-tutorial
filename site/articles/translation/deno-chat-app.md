# Deno + WebSockets 打造聊天室应用

> - 原文地址：[Learn Deno: Chat app](https://aralroca.com/blog/learn-deno-chat-app)
> - 原文作者：Aral Roca
> - 原文发布时间：2020-05-10
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文已获原作者授权，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。

![](https://cdn.nlark.com/yuque/0/2020/jpeg/86548/1590401997017-804006f5-6110-4c28-8a17-2242352773d1.jpeg#align=left&display=inline&height=432&margin=%5Bobject%20Object%5D&originHeight=432&originWidth=960&size=0&status=done&style=none&width=960)

Node.js 最初由 [Ryan Dahl](https://en.wikipedia.org/wiki/Ryan_Dahl) 于 2009 年基于 C++ 语言创建。到了 2012 年，Ryan 觉得自己或多或少地已经实现了当年的目标便离开了 Node.js 项目。

如今他的目标已大不相同：在意识到无法轻易在 Node.js 中修复某些当时的错误设计后，他决定创建一个全新的 JavaScript（也包括如今流行的 TypeScript） 运行时——基于 Rust 语言实现的 Deno。 Deno 1.0.0 版本将于 2020 年 05 月 13 日正式发布。

![](https://cdn.nlark.com/yuque/0/2020/svg/86548/1590401996680-7ccca422-ba2b-40e6-9e13-988e7635cdfe.svg#align=left&display=inline&height=254&margin=%5Bobject%20Object%5D&originHeight=1365&originWidth=1365&size=0&status=done&style=none&width=254)

我们将在本文中探索 Deno 是如何工作的、Deno 和 Node.js 有什么区别并实现一个简单的聊天室程序。

**本文的目录如下：**

- 安装 Deno
- 简单的 “Hello World” 实战
- 本地监听 index.html 文件
- 引入 WebSockets
- 第三方库与 Dep.ts 约定
- 编写测试代码
- 浏览器调试
- 总结
- 本文的代码
- 参考文献

## 安装 Deno

有各种各样安装 Deno 的方法：使用 curl、iwr、Homebrew、Chocolatey...，可以参阅[此处](https://github.com/denoland/deno_install)查看如何安装。 Deno 没有外部依赖性，是个单独的二进制可执行文件。

本文将采用 Homebrew 来安装：

```
➜  ~ brew install deno
➜  ~ deno --version
deno 1.0.0-rc1
v8 8.2.308
typescript 3.8.3
```

我们可以看到，Deno 上没有类似 `npm` 的包管理器——Npm 在 Node 生态系统中变得至关重要，它是模块的集中（也可以私有化控制）存储库。 Deno 正在改变这一现状。稍后我们将看到如何在无需 package.json 和 node_modules 文件的情况下安装并执行软件包。

我们可以使用 `deno upgrade` 命令来将 Deno 升级为最新的版本。

我推荐使用 `deno help` 来了解 Deno 上可以使用的各种命令：

> 译者注：为方便阅读，下方打印的结果部分内容也进行翻译。

```
使用方式:
    deno [OPTIONS] [SUBCOMMAND]

OPTIONS（选项）:
    -h, --help                     打印帮助信息
    -L, --log-level <log-level>    设置日志的等级【可选值包括 debug、info】
    -q, --quiet                    禁止输出诊断信息
    -V, --version                  打印版本信息

SUBCOMMAND（子命令）:
    bundle         将项目的模块和依赖项捆绑到单个文件中
    cache          缓存依赖项
    completions    生成 Shell 补全信息
    doc            显示某模块的文档
    eval           运行一段代码，例如 `deno eval "console.log(1 + 2)`
    fmt            内置的代码格式化程序（类似于 Go 语言中的 `gofmt`）
    help           打印某消息或某给定子命令的帮助信息
    info           显示有关缓存的信息或与源文件有关的信息
    install        将脚本安装为可执行文件
    repl           开启 REPL 环境（默认子命令）
    run            运行给定文件名或 URL 的程序
    test           运行测试
    types          打印运行时的 TypeScript 声明
    upgrade        升级 Deno 到最新版本

ENVIRONMENT VARIABLES（环境变量）:
    DENO_DIR             设置 Deno 的基本目录（默认为 $HOME/.deno）
    DENO_INSTALL_ROOT    设置 Deno install 的输出目录（默认为 $HOME/.deno/bin）
    NO_COLOR             设置为禁用颜色
    HTTP_PROXY           设置 HTTP 请求的代理地址（用来模块的下载和获取）
    HTTPS_PROXY          同上，但是用来处理 HTTPS 请求
```

如果你使用的是 Visual Studio Code 编辑器，建议你安装如下插件以简化使用 Deno 的繁琐操作：

- [https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno)

> 译者注：接下来会有 VS Code 版的官方插件，到时候可以在 VS Code 插件市场中搜索。

## 简单的 “Hello World” 实战

对于 Deno 中一个简单的 “Hello world” 程序，我们只需要创建一个相应的 `.js` 或 `.ts` 文件，并通过 `deno run [文件名]` 命令来执行。

如果是 `.ts` 文件，Deno 将编译后执行；而对于 `.js` 文件，Deno 将直接执行：

```javascript
// example.ts file
console.log('Hello from Deno 🖐')
```

然后在终端中输入如下命令执行：

```bash
➜  deno run example.ts
Compile file:///Users/aralroca/example.ts
Hello from Deno 🖐
```

因为 Deno 本身支持直接运行 TypeScript 文件，`tsconfig.json` 配置文件便是可选的。要手动导入 `tsconfig.json` 配置，则需要执行 `deno run -c tsconfig.json [文件名]`。

同时，Deno 会尽可能地支持 Web 标准，我们可以很方便的使用兼容浏览器环境的 `window`、`fetch`、`Worker` 变量。

## 本地监听 index.html 文件

Deno 有它内置的标准库（[https://deno.land/std/](https://deno.land/std/)），因此我们可以直接从官方提供的 **URL** 上直接导入并使用这些模块。Deno 的目标之一包括支持运行一个存放于 URL 上、具有最小耦合性的单个可执行文件。这时便可以直接将这些模块导入到用户的项目中或者通过 `deno run https:// ...` 命令来在终端上执行。

我们可以使用 `[https://deno.land/std/http/](https://deno.land/std/http/)` 模块来创建 HTTP 服务器并本地监听一个 `index.html` 文件。

在接下来的示例中我们将创建 `server.ts` 和 `index.html` 两个文件。

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <title>Example using Deno</title>
  </head>
  <body>
    index.html served correctly
  </body>
</html>
```

server.ts

```javascript
import { listenAndServe } from 'https://deno.land/std/http/server.ts'

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === 'GET' && req.url === '/') {
    req.respond({
      status: 200,
      headers: new Headers({
        'content-type': 'text/html',
      }),
      body: await Deno.open('./index.html'),
    })
  }
})

console.log('Server running on localhost:3000')
```

Deno 中，我们可以直接使用 ES 标准来导入模块，而不再需要遵循 Common.js 的标准。这意味着文件扩展名要始终位于末尾。而且 Deno 支持最新的如 `async-await` 等功能。

> 译者注：在 Node.js 早期的设计中，由于 ES 标准还没发展到如今的状态，Node.js 需要使用 Common.js 的模块规范来导入、导出模块。这虽然极大地推进了 JavaScript 模块化的发展，但也成了 ES 模块标准推出后急需解决但在 Node.js 中并不那么容易解决的历史遗留问题之一。

另外，我们不必再担心代码格式化问题。我们还可以直接使用内置的 `deno fmt` 命令来格式化文件，而无需 Node.js 中需要引入的 Prettier 等第三方工具。

首次执行 `deno run server.ts` 命令时，我们将会看到与上文“Hello World”示例的两个区别：

1. 命令执行后、项目运行前，Deno 下载安装了“HTTP 模块”及其所有的依赖项，而不再需要使用 `yarn` 或 `npm install` 提前手动安装。由于缓存机制，这样的过程只发生在第一次。我们也可以使用 `--reload` 参数来清理缓存重新下载。
1. 执行命令后终端抛出错误： `Uncaught PermissionDenied: network access to "127.0.0.1:3000", run again with the --allow-net flag`。这是因为在 Deno 默认的安全性协议下，不允许未授权的程序访问网络或读取文件（示例中的 index.html）——这是一个对比 Node.js 来说重大的改进之一，Node.js 中任何库都可以通过 CLI 做很多用户未授权的事情。Deno 提供了控制安全性的可能，如使用 `deno --allow-read=/etc` 来限制程序只在 `/etc` 文件夹下拥有读取的权限。更多许可标志可以使用 `deno run -h` 来查看。

现在我们已经充分了解完毕，可以本地监听 `index.html` 了：

```bash
➜ deno run --allow-net --allow-read server.ts
Compile file:///Users/aralroca/server.ts
Server running on localhost:3000
```

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1590401996995-e78e4067-778a-4def-ab64-c5900f0f73ae.png#align=left&display=inline&height=83&margin=%5Bobject%20Object%5D&originHeight=83&originWidth=300&size=0&status=done&style=none&width=300)

## 引入 WebSockets

WebSocket、UUID 以及其它对于 Node.js 来说必要的库都没有包含在 Node.js 的内核中。这意味着我们需要寻找第三方库来使用这些功能。现在，你可以直接在 Deno 的官方标准仓库中使用 WebSockets、UUID 等库了。因此，你不再需要担心这些库如果是第三方库的情况下，它们的不稳定性问题了——Deno 会直接维护这些功能。

为了继续完善我们这个简单的聊天室应用程序，我们来创建一个名为 `chat.ts` 的文件：

```typescript
import {
  WebSocket,
  isWebSocketCloseEvent,
} from 'https://deno.land/std/ws/mod.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

const users = new Map<string, WebSocket>()

function broadcast(message: string, senderId?: string): void {
  if (!message) return
  for (const user of users.values()) {
    user.send(senderId ? `[${senderId}]: ${message}` : message)
  }
}

export async function chat(ws: WebSocket): Promise<void> {
  const userId = v4.generate()

  // Register user connection
  users.set(userId, ws)
  broadcast(`> User with the id ${userId} is connected`)

  // Wait for new messages
  for await (const event of ws) {
    const message = typeof event === 'string' ? event : ''

    broadcast(message, userId)

    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(userId)
      broadcast(`> User with the id ${userId} is disconnected`)
      break
    }
  }
}
```

现在，改动 `server.ts` 来注册一个 `/ws` 路由以开放公开聊天功能：

```typescript
import { listenAndServe } from 'https://deno.land/std/http/server.ts'
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts'
import { chat } from './chat.ts'

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === 'GET' && req.url === '/') {
    req.respond({
      status: 200,
      headers: new Headers({
        'content-type': 'text/html',
      }),
      body: await Deno.open('./index.html'),
    })
  }

  // WebSockets Chat
  if (req.method === 'GET' && req.url === '/ws') {
    if (acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      }).then(chat)
    }
  }
})

console.log('Server running on localhost:3000')
```

为了实现我们的客户端部分，我们将选择使用 Preact 模块而无需通过 Npm、Babel、和 Webpack 进行前端预构建，就像我们在[上一篇文章](https://aralroca.com/blog/app-with-react-api-without-tools-as-webpack-or-babel)上介绍过的使用方式一样。

> 译者注：这里指的上一篇是作者的《一个使用 React API 但无需 Webpack 或 Babel 工具的应用实战》文章。文章中使用到了 Preact 库——一个遵循 React API 设计风格、不直接使用需要 Babel 转移的 JSX 语法、仅仅有 3kb 大小且性能优于 React 的前端库。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Chat using Deno</title>
  </head>
  <body>
    <div id="app" />
    <script type="module">
      import {
        html,
        render,
        useEffect,
        useState,
      } from 'https://unpkg.com/htm/preact/standalone.module.js'

      let ws

      function Chat() {
        // Messages
        const [messages, setMessages] = useState([])
        const onReceiveMessage = ({ data }) => setMessages((m) => [...m, data])
        const onSendMessage = (e) => {
          const msg = e.target[0].value

          e.preventDefault()
          ws.send(msg)
          e.target[0].value = ''
        }

        // Websocket connection + events
        useEffect(() => {
          if (ws) ws.close()
          ws = new WebSocket(`ws://${window.location.host}/ws`)
          ws.addEventListener('message', onReceiveMessage)

          return () => {
            ws.removeEventListener('message', onReceiveMessage)
          }
        }, [])

        return html`
          ${messages.map((message) => html` <div>${message}</div> `)}

          <form onSubmit=${onSendMessage}>
            <input type="text" />
            <button>Send</button>
          </form>
        `
      }

      render(html`<${Chat} />`, document.getElementById('app'))
    </script>
  </body>
</html>
```

结果如下：

![](https://cdn.nlark.com/yuque/0/2020/gif/86548/1590401997122-f932682f-51e7-467f-a0ab-820dc296a559.gif#align=left&display=inline&height=264&margin=%5Bobject%20Object%5D&originHeight=264&originWidth=800&size=0&status=done&style=none&width=800)

这是一个并不优雅的的聊天室：没有样式，但是功能丰富。毕竟我们的目的是了解 Deno 的工作方式。

## 第三方库与 Dep.ts 约定

通过直接导入 URL 上的模块，我们可以像使用 Deno 标准库一样使用第三方库。

- STD，Deno 内置标准库：[https://deno.land/std/](https://deno.land/std/)
- X，Deno 第三方库：[https://deno.land/x/](https://deno.land/x/)

但是，https：[//deno.land/x/](https://deno.land/x/) 的生态系统如今还很小。好消息是，我们可以使用 [https://www.pika.dev](https://www.pika.dev) 中的软件包，来借助 Parcel 或 Minibundle 之类的工具以将 Node.js 的库编译为模块，以在 Deno 项目中重复使用它们。

> 译者注：pika.dev 用来在 Npm 上找到现代 ESM 软件包（更快、更小）；Parcel 是极速零配置的 Web 应用打包工具。

我们将使用 [camel-case](https://www.pika.dev/npm/camel-case) 包来将每个聊天消息转换转换为小驼峰法（camelCase）的文本。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1590401997781-3be97974-8e27-491d-ac06-5f0243444821.png#align=left&display=inline&height=162&margin=%5Bobject%20Object%5D&originHeight=162&originWidth=700&size=0&status=done&style=none&width=700)

让我们将如下内容添加到我们的 `chat.ts` 文件中：

```javascript
import { camelCase } from 'https://cdn.pika.dev/camel-case@^4.1.1'
// ...before code
const message = camelCase(typeof event === 'string' ? event : '')
// ... before code
```

好了，现在来执行 `server.ts` 会下载 `camel-case` 软件包，并会发现小驼峰法的转换功能已能成功使用：

![](https://cdn.nlark.com/yuque/0/2020/gif/86548/1590401996783-d919cf6b-614b-4378-a175-a5a65da9c26e.gif#align=left&display=inline&height=199&margin=%5Bobject%20Object%5D&originHeight=199&originWidth=600&size=0&status=done&style=none&width=600)

但是，如果我想在多个文件中都使用 `camelCase` 这个软件包，将 URL 导入语句添加到每个文件中会很麻烦：URL 中包括着我们想要使用的软件包的具体版本，如果想要升级依赖项则需要搜索并替换所有相关文件中的导入语句。不用担心，Deno 的依赖项规则可以解决这类问题，我们可以创建一个 `deps.ts` 文件来导出当前项目的所有依赖项。

```javascript
// deps.ts file
export { camelCase } from 'https://cdn.pika.dev/camel-case@^4.1.1'
```

此时再导入：

```javascript
// chat.ts file
import { camelCase } from './deps.ts'
// ...
const message = camelCase(typeof event === 'string' ? event : '')
// ...
```

## 编写测试代码

我们将构建一个 `camelize.ts` 函数来看看 Deno 如何进行测试。该函数返回小驼峰法转换后的文本，并带有一个附加值（与大写字母数量相同的若干个 🐪）。

```javascript
/**
 * Return the text in camelCase + how many 🐪
 *
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text
 * @returns {string}
 */
export function camelize(text: string) {
  // @todo
}
```

顺便说一下，我们可以使用 `deno doc [文件名]` 命令可视化文件的文档：

```bash
➜  deno doc camelize.ts
function camelize(text: string)
  Return the text in camelCase + how many 🐪
```

让我们创建一个 `test.ts` 文件，`Deno.test（）` 内置在 Deno 的核心中，我们可以通过标准库中的 [https://deno.land/std/testing/asserts.ts](https://deno.land/std/testing/asserts.ts) 来执行断言。

```javascript
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts'
import { camelize } from './camelize.ts'

Deno.test('camelize works', async () => {
  assertStrictEq(camelize('this is an example'), 'thisIsAnExample 🐪🐪🐪')
})
```

我们只需要执行 `deno test` 来运行当前项目的所有测试：

```bash
➜  deno test
Compile file:///Users/aralroca/test.ts
running 1 tests
test camelize works ... FAILED (0ms)

failures:

camelize works
AssertionError: actual: undefined expected: thisIsAnExample 🐪🐪🐪
    at assertStrictEq (asserts.ts:224:11)
    at test.ts:5:3
    at asyncOpSanitizer ($deno$/testing.ts:36:11)
    at Object.resourceSanitizer [as fn] ($deno$/testing.ts:70:11)
    at TestApi.[Symbol.asyncIterator] ($deno$/testing.ts:264:22)
    at TestApi.next (<anonymous>)
    at Object.runTests ($deno$/testing.ts:346:20)

failures:

        camelize works

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out (0ms)
```

当然上面的执行结果会失败，因为我们尚未实现 camelize 函数具体的内容，但在这里我们可以看到错误是如何显示出来的。

在实现 `camelize` 函数之后：

```javascript
import { camelCase } from './deps.ts'

/**
 * Return the text in camelCase + how many 🐪
 *
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text
 * @returns {string}
 */
export function camelize(text: string) {
  const camelCaseText = camelCase(text)
  const matches = camelCaseText.match(/[A-Z]/g) || []
  const camels = Array.from({ length: matches.length })
    .map(() => '🐪')
    .join('')

  return `${camelCaseText} ${camels}`
}
```

我们的测试结果将会通过：

```bash
➜  deno test
Compile file:///Users/aralroca/camelize.ts
running 1 tests
test camelize works ... ok (3ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (3ms)
```

如果你想使用一个能监听文件改动的观察者程序，在测试代码改动后重新执行测试，而非每次都得在改动后再次执行测试命令，则可以使用基于 `nodemon` 的 [https://deno.land/x/denon/](https://deno.land/x/denon/) 库，然后运行 `denon test` 命令来提供热更新功能。

现在我们可以在 `chat.ts` 上使用这个 camelize 函数了。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1590401996997-b1bda177-c81a-4fa6-bd86-e0518d923c7a.png#align=left&display=inline&height=132&margin=%5Bobject%20Object%5D&originHeight=132&originWidth=700&size=0&status=done&style=none&width=700)

## 浏览器调试

想要在 Deno 中进行调试的话：

1. 先在代码的某些行进行 `debugger;` 断点声明；
1. 带上 `--inspect-brk` 参数：`deno run --inspect-brk ...` 或 `deno test --inspect-brk ...` 来调试/测试；
1. 在 Chrome 中打开 `chrome://inspect` URL。
1. 在“远程目标”标签下点击“检查”按钮。
1. 按名为“继续”的脚本执行按钮，让代码将在你所设立的断点处暂停。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1590401998603-f54c9d49-8249-4a25-b21c-92d8d9c63d7c.png#align=left&display=inline&height=468&margin=%5Bobject%20Object%5D&originHeight=468&originWidth=700&size=0&status=done&style=none&width=700)

## 总结

通过在 TypeScript 中创建一个简单的聊天室应用程序，我们了解了 Deno 的工作原理。我们在没有使用 Npm、package.json、node_modules、Webpack、Babel、Jest、Pettertier 的情况下完成了这些操作...因为我们不再需要它们，Deno 简化了它们。

我们从如上项目中探索了权限、Deno 命令、使用第三方依赖项、监听文件、WebSocket、格式化文件、测试和调试等 Deno 的重要功能。

我希望本文对入手在 2020 年 05 月 13 日发布的 Deno 1.0.0 会有所帮助。

## 本文的代码

我上传了本文的相关代码在我的 Github 上：

- [https://github.com/aralroca/chat-with-deno-and-preact](https://github.com/aralroca/chat-with-deno-and-preact)

> 译者注：同时本文的代码也收录在了：[https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 的 demos 目录下。

## 参考文献

- [https://deno.land/](https://deno.land/)
- [https://github.com/denoland/deno/tree/master/docs](https://github.com/denoland/deno/tree/master/docs)
- [https://blog.logrocket.com/deno-1-0-what-you-need-to-know/](https://blog.logrocket.com/deno-1-0-what-you-need-to-know/)
- [https://twitter.com/flaviocopes/status/1259068673966383105](https://twitter.com/flaviocopes/status/1259068673966383105)
- [https://www.youtube.com/watch?v=M3BM9TB-8yA](https://www.youtube.com/watch?v=M3BM9TB-8yA)
- [https://github.com/denoland/deno](https://github.com/denoland/deno)
- [https://en.wikipedia.org/wiki/Ryan_Dahl](https://en.wikipedia.org/wiki/Ryan_Dahl)
