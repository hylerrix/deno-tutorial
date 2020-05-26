# 从 Node 到 Deno

![从 Node 到 Deno](https://tva1.sinaimg.cn/large/007S8ZIlly1gexm53yyjqj30qn0c0q4e.jpg)

> 原文地址: 《[From Node to Deno](https://aralroca.com/blog/from-node-to-deno)》

上周我发表了一篇关于 Deno 的文章: [如何用 Deno 和 Preact 创建一个聊天应用](https://aralroca.com/blog/learn-deno-chat-app)。很多疑问接踵而至。期中大部分都是如何用 Done 来做 Node 之前所做的事情。

所以我尝试整理一些 Node 常见问题的 Deno 替代方案。这非必要，很多模块可以重用。可以访问 [pika.dev](https://www.pika.dev/about)来寻找在 Deno 中使用的模块。

收集列表如何下：

- Electron
- Forever / PM2
- Express / Koa
- MongoDB
- PostgresSQL
- MySQL / MariaDB
- Redis
- Nodemon
- Jest, Jasmine, Ava...
- Webpack, Parcel, Rollup...
- Prettier
- NPM Scripts
- Nvm
- Npx
- Run on a Docker
- Run as a lambda
- Conclusion

## Electron

Electron 使用 `Chromium` 作为界面来运行 Web 环境。可以通过 `Node.js + Electron` 创建桌面应用程序。Deno 替代方案么？

![Electron](https://aralroca.com/images/blog-images/55.png)

现在Electron还远远不能在Deno下运行。我们必须寻找替代方案。因为Deno是用Rust制作的，所以我们可以使用 [web-view rust bindings](https://github.com/Boscop/web-view) 来运行桌面应用。

这样一来，我们可以使用原生操作系统的webview来运行我们想要的webview。

回购：[https://github.com/eliassjogreen/deno_webview](https://github.com/eliassjogreen/deno_webview)

``` typescript
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

![webview](https://tva1.sinaimg.cn/large/007S8ZIlly1gexmx17u6jj30m80eugm6.jpg)

## Forever / PM2

[Forever](https://github.com/foreversd/forever) 和 [PM2](https://github.com/Unitech/pm2) 是CLI工具，用于确保给定脚本作为守护进程连续运行。与Forever不同的是，PM2的功能更完善，同时还可以作为负载均衡。这两个工具在Node中都非常有用，但是在Deno中可以使用吗？

`Forever`只适用于Node，所以使用它是不可行的。另一方面，用PM2我们可以运行非Node脚本，所以我们还是可以在Deno中使用它。

![pm2](https://tva1.sinaimg.cn/large/007S8ZIlly1geyzx0tohgj305k01kwea.jpg)

创建一个`app.sh`文件

```bash
#!/bin/bash
deno run -A myCode.ts
```

和

```bash
 pm2 start ./app.sh
```

![pm2](https://tva1.sinaimg.cn/large/007S8ZIlly1gexn4dvlfuj30j60700sx.jpg)

## Express / Koa

[Express](https://github.com/expressjs/express) 和 [Koa](https://github.com/koajs/koa) 是最著名的Node框架。它们以其强大的路由系统和HTTP助手（重定向、缓存等）而闻名。我们可以在Deno中使用它们吗？答案是不能.....。但也有一些替代方案。

![Express / Koa](https://tva1.sinaimg.cn/large/007S8ZIlly1geyzy0tmdjj308c047aa2.jpg)

## Http（标准库）

Deno自己的STD库已经涵盖了`Express`或`Koa`功能。[https://deno.land/std/http/](https://deno.land/std/http/)。

``` typescript
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

let request = new ServerRequest();
request.headers = new Headers();
request.headers.set("Cookie", "full=of; tasty=chocolate");

const cookies = getCookies(request);
console.log("cookies:", cookies);
```

但是，STD库的方式并不是很吸引人。所以，我们再来看看一些备选方案。

## Oak (第三方库)

受Koa启发，这是目前最优雅的解决方案之一。[https://github.com/oakserver/oak](https://github.com/oakserver/oak)

```typescript
import { Application,  } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

## Abc (第三方库)

类似于 `Oak`。[https://deno.land/x/abc](https://deno.land/x/abc)。

``` typescript
import { Application } from "https://deno.land/x/abc/mod.ts";

const app = new Application();

app.static("/static", "assets");

app.get("/hello", (c) => "Hello!")
  .start({ port: 8080 });
```

## Deno-Express（第三方lib）

也许是最类似于Express Framework的替代品，[https://github.com/NMathar/deno-express](https://github.com/NMathar/deno-express)。

``` typescript
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

[MongoDB](https://github.com/mongodb/mongo) 是一个文档数据库，具有巨大的可扩展性和灵活性。在JavaScript生态系统中已经被广泛使用，有很多像`MEAN`或`MERN`这样的堆栈都在使用它。它是非常受欢迎的。

![MongoDB](https://tva1.sinaimg.cn/large/007S8ZIlly1gez0s1scqej30b4030jre.jpg)

我们可以使用MongoDB与Deno。我们可以使用这个模块：[https://github.com/manyuanrong/deno_mongo](https://github.com/manyuanrong/deno_mongo)。

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

![PostgresSQL](https://tva1.sinaimg.cn/large/007S8ZIlly1gez0ufgdaqj304604baa2.jpg)

与MongoDB一样，[PostgresSQL](https://github.com/postgres/postgres/) 也有一个库。[https://github.com/buildondata/deno-postgres。](https://github.com/buildondata/deno-postgres。)

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

![MySQL / MariaDB](https://tva1.sinaimg.cn/large/007S8ZIlly1gez0uug6xbj306403hglo.jpg)

与`MongoDB`和`PostgresSQL`一样，还有[MySQL](https://github.com/mysqljs/mysql)/[MariaDB](https://github.com/mariadb-corporation/mariadb-connector-nodejs)的库。[https://github.com/manyuanrong/deno_mysql](https://github.com/manyuanrong/deno_mysql)

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
![Redis](https://tva1.sinaimg.cn/large/007S8ZIlly1gez0vhsz3hj304603lq2v.jpg)

[Redis](https://github.com/NodeRedis/node-redis) 是最著名的缓存数据库，也有Deno的库.[https://github.com/keroxp/deno-redis](https://github.com/keroxp/deno-redis)

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

![Nodemon](https://tva1.sinaimg.cn/large/007S8ZIlly1gez0wa67d9j303c03tmx0.jpg)

[Nodemon](https://github.com/remy/nodemon) 开发环境中用于监控你的文件的任何变化，自动重启服务器。这使`node`开发更加有趣，无需手动停止并重启服务器来查看应用的变化。它可以在Deno中使用吗？

抱歉，您不能...但是仍然有另一种选择：Denon。+

[https://github.com/eliassjogreen/denon](https://github.com/eliassjogreen/denon)

我们可以像`deno run`执行脚本一样使用`Denon`。

```bash
➜ denon server.ts
```

## Jest, Jasmine, Ava...

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gexswm785fj30dw05kwep.jpg)

在`Node.js`的生态系统中，有很多替代性的测试方法。然而，目前还没有一种官方正式的方法来测试`Node.js`代码。

在Deno中，有一种官方方法，您可以使用测试`std`库。

[https://deno.land/std/testing](https://deno.land/std/testing)

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

## Webpack, Parcel, Rollup...

![Webpack, Parcel, Rollup](https://tva1.sinaimg.cn/large/007S8ZIlly1gexsz3vhemj30cf04u74e.jpg)

Deno的优势之一是我们可以将`ESmodules`与`TypeScript`一起使用，而无需诸如[Webpack](https://github.com/webpack/webpack)，[Parcel](https://github.com/parcel-bundler/parcel)或[Rollup](https://github.com/rollup/rollup)之类的工具。

然而，可能你会想，如果给定一个文件的树，我们是否可以打一个js包，把所有的东西都放在一个文件里，让它在web运行。

完全可以。我们可以通过Deno的CLI来实现。因此，不需要第三方的打包工具。

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

![Prettier](https://tva1.sinaimg.cn/large/007S8ZIlly1gext2kv18hj3046046dfm.jpg)

在过去的几年中，[Prettier](https://prettier.io/)在 JavaScript 生态系统中已广为人知，因为有了它，您不必担心格式化文件。

事实是，它仍然可以在Deno上使用，但是失去了意义，因为Deno有自己的格式化程序。

您可以使用以下命令格式化文件：

```bash
➜  deno fmt
```

## NPM Scripts

![NPM Scripts](https://tva1.sinaimg.cn/large/007S8ZIlly1gext47qcsmj305k00wt8h.jpg)

使用Deno，`package.json`已经不存在了。我非常怀念的一件事就是在`package.json`中声明的脚本。

一个简单的解决办法是使用`makefile`，用`make`执行。但是，如果你怀念npm语法，有一个npm风格的脚本运行器，用于Deno。

[https://github.com/umbopepato/velociraptor](https://github.com/umbopepato/velociraptor)

您可以使用脚本定义文件：

```yaml
# scripts.yaml
scripts:
  start: deno run --allow-net server.ts
  test: deno test --allow-net server_test.ts
```

执行：

```bash
➜  vr run <SCRIPT>
```

另一个替代品是[denox](https://github.com/BentoumiTech/denox)，与`Velociraptor`非常相似。

## Nvm

![Nvm](https://aralroca.com/images/blog-images/51.png)

[Nvm](https://github.com/nvm-sh/nvm)是一个`CLI`，用于管理多个活动的Node版本，根据项目的不同，轻松升级或降级版本。

在Deno中，`dvm`相当于`nvm`。

[https://github.com/axetroy/dvm](https://github.com/axetroy/dvm)

```bash
➜  dvm use 1.0.0
```

## Npx

[NPX](https://github.com/npm/npx)在近几年非常流行，可以不用安装就可以执行npm包。现在很多项目都不会在npm中存在，因为Deno是一个独立的生态系统。那么，我们如何用 `deno install https://url-of-module.ts`，不用安装就能执行Deno模块呢？

就像我们运行项目一样，我们在运行项目时，我们把模块的`URL`代替了文件。

```bash
➜  deno run https://deno.land/std/examples/welcome.ts
```

如你所见，不仅我们必须记住模块的名称，而且还要记住整个URL，这使它的使用更加困难。另一方面，它提供了更大的灵活性，因为我们可以运行任何文件，而不仅仅是像npx这样在`package.json`中指定的二进制文件。

## 在Docker上运行

![Docker](https://aralroca.com/images/blog-images/53.png)

要在`Docker`内部运行Deno，我们可以创建以下`Dockerfile`：

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

要构建并运行它：

```bash
➜  docker build -t app . && docker run -it --init -p 1993:1993 app
```

Repo: [https://github.com/hayd/deno-docker](https://github.com/hayd/deno-docker)

## Run as a lambda

![lambda](https://aralroca.com/images/blog-images/54.png)

要将Deno作为`lambda`，需要`Deno STD`库中有一个模块。[https://deno.land/x/lambda](https://deno.land/x/lambda)。

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

参考

- `Vercel`中的Deno：[https://github.com/lucacasonato/now-deno](https://github.com/lucacasonato/now-deno)
- `AWS`中的Deno：[https://blog.begin.com/deno-runtime-support-for-architect-805fcbaa82c3](https://blog.begin.com/deno-runtime-support-for-architect-805fcbaa82c3)

## 小结

我肯定我会忘记了一些Node主题以及它们的Deno替代方案，如果有什么遗漏的地方需要我解释，请告诉我。希望这篇文章能帮助你打破Deno的僵局。

要探索你可以使用Deno的所有库。

- [https://deno.land/std](https://deno.land/std)
- [https://deno.land/x](https://deno.land/x)
- [https://www.pika.dev/](https://www.pika.dev/)
