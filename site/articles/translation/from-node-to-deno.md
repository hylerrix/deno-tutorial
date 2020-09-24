# 从 Node 到 Deno：探索各大主流库替代方案

> - 原文地址：[From Node to Deno](https://aralroca.com/blog/from-node-to-deno)
> - 原文作者：Aral Roca
> - 原文发布时间：2020-05-17
> - 译者：[@hylerrix](https://github.com/hylerrix), [@YunKou](http://github.com/yunkou)
> - 备注：本文已获原作者授权，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。
> - 备注：本文独立争取授权与翻译的同时，发现 InfoQ 等平台也独立授权翻译，可以作为对比。看来翻译的文章不能积压，要不也会错失风口~

![](http://qiniu.ningo.cloud/articles/1b3-01.jpg)

上周我发表了一篇关于 Deno 的文章：[《Deno + WebSockets 打造聊天室应用》](https://aralroca.com/blog/learn-deno-chat-app)。在那之后，有很多困惑接踵而至——其中大部分都在思考如何在全新的 Deno 生态中来做 Node.js 上常做的工作。

所以我尝试整理一些 Node.js 中常见库在 Deno 下的相关解决方案。在这里我得强调，很多 Node.js 的模块都可以重用，并且没有必要为每个库都重新造一遍轮子。你可以访问 [pika.dev](https://www.pika.dev/about) 来寻找在 Deno 中可以直接使用的 ES 模块。

> 译者注：《Deno + WebSockets 打造聊天室应用》已经翻译并收录；pika.dev 用来在 Npm 上寻找符合现代 ESM 标准的软件包（更快、更小）。

**本文的目录如下：**

- Electron
- Forever / PM2
- Express / Koa
- MongoDB
- PostgresSQL
- MySQL / MariaDB
- Redis
- Nodemon
- Jest、Jasmine、Ava...
- Webpack、Parcel、Rollup...
- Prettier
- NPM Scripts
- Nvm
- Npx
- 在 Docker 上运行
- 作为 Lambda 运行
- 小结

## Electron

我们可以使用基于 Node.js + `Chromium` 的 Electron 来依托 Web 技术栈创建桌面应用程序。那么我们可以在 Deno 下使用 Electron 吗？或者还有其它更多选择吗？

![](http://qiniu.ningo.cloud/articles/1b3-02.jpg)

答案是如今的 Electron 还远远不能运行在 Deno 上，我们必须寻找其它的解决方案。自从 Deno 选择用 Rust 语言构建其内核后，我们可以使用 Rust 生态上的 Web View [@Bosop/web-view](https://github.com/Boscop/web-view) 来在 Deno 上运行桌面应用。

于是 [@eliassjogreen/deno_webview](https://github.com/eliassjogreen/deno_webview) 应运而生。

```typescript
import { WebView } from "https://deno.land/x/webview/mod.ts";

const sharedOptions = {
  width: 400,
  height: 200,
  resizable: true,
  debug: true,
  frameless: false,
};

const webview1 = new WebView({
  title: "Multiple deno_webview example",
  url: `data:text/html,
    <html>
    <body>
      <h1>1</h1>
    </body>
    </html>
    `,
  ...sharedOptions,
});

const webview2 = new WebView({
  title: "Multiple deno_webview example",
  url: `data:text/html,
    <html>
    <body>
      <h1>2</h1>
    </body>
    </html>
    `,
  ...sharedOptions,
});

await Promise.all([webview1.run(), webview2.run()]);
```

![](http://qiniu.ningo.cloud/articles/1b3-03.jpg)

## Forever / PM2

[Forever](https://github.com/foreversd/forever) 和 [PM2](https://github.com/Unitech/pm2) 是用来守护指定脚本其进程的两个 CLI 工具。PM2 相比 Forever 来说功能更为完善，相比还能同时作为负载均衡器。在 Node.js 中这两个工具都很有用，我们可以在 Deno 中也使用它们吗？

Forever 专为 Node.js 创造，就不用考虑了；而 PM2 可以运行 Node.js 之外的的脚本语言，因此我们可以让 PM2 和 Deno 搭配起来。

![](http://qiniu.ningo.cloud/articles/1b3-04.jpg)

创建一个 `app.sh` 文件：

```bash
#!/bin/bash
deno run -A myCode.ts
```

保存后在当前目录执行（请确保 pm2 已成功安装）：

```bash
pm2 start ./app.sh
```

![](http://qiniu.ningo.cloud/articles/1b3-05.jpg)

## Express / Koa

[Express](https://github.com/expressjs/express) 和 [Koa](https://github.com/koajs/koa) 以其强大的路由系统和友好的 HTTP 工具库（重定向、缓存等）而闻名于 Node.js 社区。我们可以在 Deno 中使用它们吗？答案是不能...但也有一些替代方案。

![](http://qiniu.ningo.cloud/articles/1b3-06.jpg)

### HTTP（标准库）

Deno 内置的 STD 标准库已经涵盖了 `Express` 或 `Koa` 的绝大多数功能：[https://deno.land/std/http/](https://deno.land/std/http/)。

```typescript
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

let request = new ServerRequest();
request.headers = new Headers();
request.headers.set("Cookie", "full=of; tasty=chocolate");

const cookies = getCookies(request);
console.log("cookies:", cookies);
```

但由于 Deno 内置的 HTTP 标准库其声明路由的方式并不那么吸引人，我们来看看其它的解决方案，如下。

### Oak (第三方库)

受 Koa 启发，这是目前最优雅的解决方案之一：[https://github.com/oakserver/oak](https://github.com/oakserver/oak)。

```typescript
import { Application,  } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

### Abc (第三方库)

类似于 `Oak`：[https://deno.land/x/abc](https://deno.land/x/abc)。

```typescript
import { Application } from "https://deno.land/x/abc/mod.ts";

const app = new Application();

app.static("/static", "assets");

app.get("/hello", (c) => "Hello!")
  .start({ port: 8080 });
```

### Deno-Express（第三方库）

也许是最类似于 Express Framework 的替代品：[https://github.com/NMathar/deno-express](https://github.com/NMathar/deno-express)。

```typescript
import * as exp from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

const port = 3000;
const app = new exp.App();

app.use(exp.static_("./public"));
app.use(exp.bodyParser.json());

app.get("/api/todos", async (req, res) => {
  await res.json([{ name: "Buy some milk" }]);
});

const server = await app.listen(port);
console.log(`app listening on port ${server.port}`);
```

## MongoDB

[MongoDB](https://github.com/mongodb/mongo) 是一个广受欢迎的文档数据库，具有强大的可扩展性和灵活性。在 JavaScript 生态系统中已经被广泛使用：比如很多像 `MEAN` 或 `MERN` 这样的技术堆栈。

> 译者注：MEAN = MongoDB(数据库) + Express(后端) + Angular(前端) + Node.js(运行时)；MERN 同左，但其中的 R 代表 React。如上技术栈都对 JavaScript 语言极其友好。

![](http://qiniu.ningo.cloud/articles/1b3-07.jpg)

因此，我们可以让 Deno 和 MongoDB 搭配起来，比如使用这个模块：[https://github.com/manyuanrong/deno_mongo](https://github.com/manyuanrong/deno_mongo)。

```typescript
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// Initialize the plugin
await init();

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("test");
const users = db.collection("users");

// insert
const insertId = await users.insertOne({
  username: "user1",
  password: "pass1"
});

// findOne
const user1 = await users.findOne({ _id: insertId });

// find
const users = await users.find({ username: { $ne: null } });

// aggregation
const docs = await users.aggregation([
  { $match: { username: "many" } },
  { $group: { _id: "$username", total: { $sum: 1 } } }
]);

// updateOne
const { matchedCount, modifiedCount, upsertedId } = await users.updateOne(
  username: { $ne: null },
  { $set: { username: "USERNAME" } }
);

// deleteOne
const deleteCount = await users.deleteOne({ _id: insertId });
```

## PostgresSQL

![](http://qiniu.ningo.cloud/articles/1b3-08.jpg)

与 MongoDB 一样，[PostgresSQL](https://github.com/postgres/postgres/) 也有一个 Deno 生态库：[https://github.com/buildondata/deno-postgres。](https://github.com/buildondata/deno-postgres%E3%80%82)

```typescript
import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "user",
  database: "test",
  hostname: "localhost",
  port: 5432
});
await client.connect();
const result = await client.query("SELECT * FROM people;");
console.log(result.rows);
await client.end();
```

## MySQL / MariaDB

![](http://qiniu.ningo.cloud/articles/1b3-09.jpg)

与 `MongoDB` 和 `PostgresSQL` 一样，Deno 生态下也有 [MySQL](https://github.com/mysqljs/mysql)/[MariaDB](https://github.com/mariadb-corporation/mariadb-connector-nodejs) 的相关库：[https://github.com/manyuanrong/deno_mysql](https://github.com/manyuanrong/deno_mysql)。

```typescript
import { Client } from "https://deno.land/x/mysql/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "dbname",
  poolSize: 3, // connection limit
  password: "password",
});

let result = await client.execute(`INSERT INTO users(name) values(?)`, [
  "aralroca",
]);
console.log(result);
// { affectedRows: 1, lastInsertId: 1 }
```

## Redis

![](http://qiniu.ningo.cloud/articles/1b3-10.jpg)

[Redis](https://github.com/NodeRedis/node-redis) 是著名的缓存数据库之一，Deno 下也有相关库：[https://github.com/keroxp/deno-redis](https://github.com/keroxp/deno-redis)。

```typescript
import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379
});
const ok = await redis.set("example", "this is an example");
const example = await redis.get("example");
```

## Nodemon

![](http://qiniu.ningo.cloud/articles/1b3-11.jpg)

[Nodemon](https://github.com/remy/nodemon) 在开发环境中监控文件的任何改变，并能自动更新服务器。这使 `node` 下的发更加有趣，无需手动停止并重启服务器来查看应用的变化。那么 Nodemon 可以在 Deno 中使用吗？

抱歉，不能...但仍然有另一种选择：Denon：[https://github.com/eliassjogreen/denon](https://github.com/eliassjogreen/denon)。

我们可以像是 `deno run` 执行脚本的方式一样使用 `Denon`。

```bash
➜ denon server.ts
```

## Jest、Jasmine、Ava...

![](http://qiniu.ningo.cloud/articles/1b3-12.jpg)

在 `Node.js` 的生态系统中，有很多不同的测试工具和方法。但直到现在，官方也没有推出一种正式的机制来测试 `Node.js` 代码。

在 Deno 中，可以使用官方测试 `std` 库测试：[https://deno.land/std/testing](https://deno.land/std/testing)。

```typescript
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts'

Deno.test('My first test', async () => {
  assertStrictEq(true, false)
})
```

运行测试：

```bash
➜  deno test
```

## Webpack、Parcel、Rollup...

![](http://qiniu.ningo.cloud/articles/1b3-13.jpg)

Deno 的优势之一是我们可以将 `ESmodules` 与`TypeScript` 一起使用，而无需诸如 [Webpack](https://github.com/webpack/webpack)、[Parcel](https://github.com/parcel-bundler/parcel) 或[Rollup](https://github.com/rollup/rollup) 之类的工具。

然而，可能你会想，如果给定一个文件目录，我们是否可以将其统一打包在有一个 JavaScript 文件里，并让其能直接在 Web 上以模块的形式运行。

答案是完全可行，我们可以通过 Deno 的 CLI 来实现。因此，不需要第三方的打包工具。

```bash
➜ deno bundle myLib.ts myLib.bundle.js
```

现在可以将其加载到浏览器中了：

```html
<script type="module">
  import * as myLib from "myLib.bundle.js";
</script>
```

## Prettier

![](http://qiniu.ningo.cloud/articles/1b3-14.jpg)

在过去的几年中，[Prettier](https://prettier.io/) 在 JavaScript 生态中已广为人知，因为有了它，我们不必担心格式化文件。

事实上 Prettier 也可以在 Deno 上使用，但是没有必要：因为 Deno 有自己内置的格式化程序。

您可以使用以下命令格式化文件：

```bash
➜  deno fmt
```

## NPM Scripts

![](http://qiniu.ningo.cloud/articles/1b3-15.jpg)

我非常怀念的一件事就是曾在 `package.json` 中配置各种命令行脚本。但在 Deno 上，`package.json` 已经不复存在了。

Deno 上的一个简单的替代方法是使用 `makefile` 技术，用 `make` 命令运行。但如果你怀念 NPM 的语法，Deno 上也有一个 NPM 风格的脚本运行器：[https://github.com/umbopepato/velociraptor](https://github.com/umbopepato/velociraptor)

您可以使用脚本定义文件：

```yaml
# scripts.yaml
scripts:
  start: deno run --allow-net server.ts
  test: deno test --allow-net server_test.ts
```

并执行：

```bash
➜  vr run <SCRIPT>
```

还有一个替代品是 [denox](https://github.com/BentoumiTech/denox)，与 `Velociraptor` 非常相似。

## Nvm

![](http://qiniu.ningo.cloud/articles/1b3-16.jpg)

[Nvm](https://github.com/nvm-sh/nvm) 是一个用于管理多个 Node.js 版本的 `CLI` 工具，可以根据具体的项目来轻松升级或降级 Node.js 版本。

在 Deno 中，可以使用相当于 `nvm` 的 `dvm` ：[https://github.com/axetroy/dvm](https://github.com/axetroy/dvm)。

```bash
➜  dvm use 1.0.0
```

## Npx

[NPX](https://github.com/npm/npx) 在近几年非常流行，可以在 NPM 不安装的情况下直接执行 NPM 包。由于 Deno 是一个独立的生态系统，因此如今很多 NPM 库都不可直接使用，那么我们如何只使用 `deno install [https://url-of-module.ts](https://url-of-module.ts)` 而无需安装就能执行 Deno 模块呢？

就像我们通过命令行运行项目一样，只不过这里把我们使用 URL 模块名的代替了文件名：

```bash
➜  deno run https://deno.land/std/examples/welcome.ts
```

如上所见，我们不仅仅需要记住模块的名称，还要记住整个 URL 地址，这使它的使用更加麻烦；但是另一方面，也因此提供了更大的灵活性——我们可以运行任何文件，而不仅仅能运行像 Npx 这样在 `package.json` 中指定的二进制文件。

## 在 Docker 上运行

![](http://qiniu.ningo.cloud/articles/1b3-17.jpg)

要在 `Docker` 内部运行 Deno，我们可以创建以下 `Dockerfile`：

```bash
FROM hayd/alpine-deno:1.0.0

EXPOSE 1993  # Port.

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts # Cache the deps

ADD . .
RUN deno cache main.ts # main entrypoint.

CMD ["--allow-net", "main.ts"]
```

构建并运行它：

```bash
➜  docker build -t app . && docker run -it --init -p 1993:1993 app
```

相关仓库：[https://github.com/hayd/deno-docker](https://github.com/hayd/deno-docker)

## 作为 Lambda 运行

![](http://qiniu.ningo.cloud/articles/1b3-18.jpg)

要将 Deno 作为 `lambda` 运行，需要 `Deno STD` 库中有类似于这样的模块：[https://deno.land/x/lambda](https://deno.land/x/lambda)。

```typescript
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "https://deno.land/x/lambda/mod.ts";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  return {
    body: `Welcome to deno ${Deno.version.deno} 🦕`,
    headers: { "content-type": "text/html;charset=utf8" },
    statusCode: 200
  };
}
```

参考：

- `Vercel` 中的Deno：[https://github.com/lucacasonato/now-deno](https://github.com/lucacasonato/now-deno)。
- `AWS` 中的Deno：[https://blog.begin.com/deno-runtime-support-for-architect-805fcbaa82c3](https://blog.begin.com/deno-runtime-support-for-architect-805fcbaa82c3)。

## 小结

本文中，我难免会遗漏一些 Node 库如何在 Deno 使用的解决方案。如果有什么更多的地方需要我解释，欢迎告诉我。希望这篇文章能帮助你打破快速入手 Deno 应用开发的僵局。

这里可以探索 Deno 下绝大多数可以上手的库：

- [https://deno.land/std](https://deno.land/std)
- [https://deno.land/x](https://deno.land/x)
- [https://www.pika.dev/](https://www.pika.dev/)
