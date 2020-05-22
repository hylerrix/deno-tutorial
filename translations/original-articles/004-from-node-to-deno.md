---
title: From Node to Deno
created: 05/17/2020
description: Learn how to use Node ecosystem in Deno.
tags: node, deno, javascript
cover_image: /images/cover-images/10_cover_image.jpg
cover_image_mobile: /images/cover-images/10_cover_image_mobile.jpg
cover_image_vert: /images/cover-images/10_cover_image_vert.jpg
cover_color: '#353133'
---

# [From Node to Deno](https://aralroca.com/blog/from-node-to-deno)

Last week I published an article about Deno, and how to create a [Chat app with Deno and Preact](https://aralroca.com/blog/learn-deno-chat-app). Since then, many doubts have arisen. Mostly of them are about how to do the same thing we did in Node, but with the new Deno ecosystem.

I've tried to collect some of the most used topics in Node, and looked for their alternative with Deno. First of all, I would like to make it clear that we can use many of the current Node.js modules. There is no need to look for an alternative for everything, as many modules are reusable. You can visit [pika.dev](https://www.pika.dev/about) to look for modules to use in Deno. That said, let's start with the list:

**We will cover the following:**

- [From Node to Deno](#from-node-to-deno)
  - [Electron](#electron)
  - [Forever / PM2](#forever--pm2)
  - [Express / Koa](#express--koa)
    - [Http (std lib)](#http-std-lib)
    - [Oak (Third party lib)](#oak-third-party-lib)
    - [Abc (Third party lib)](#abc-third-party-lib)
    - [Deno-express (Third party lib)](#deno-express-third-party-lib)
  - [MongoDB](#mongodb)
  - [PostgresSQL](#postgressql)
  - [MySQL / MariaDB](#mysql--mariadb)
  - [Redis](#redis)
  - [Nodemon](#nodemon)
  - [Jest, Jasmine, Ava...](#jest-jasmine-ava)
  - [Webpack, Parcel, Rollup...](#webpack-parcel-rollup)
  - [Prettier](#prettier)
  - [NPM Scripts](#npm-scripts)
  - [Nvm](#nvm)
  - [Npx](#npx)
  - [Run on a Docker](#run-on-a-docker)
  - [Run as a lambda](#run-as-a-lambda)
  - [Conclusion](#conclusion)

## Electron

With Node.js we can create desktop applications using [Electron](https://github.com/electron/electron). Electron uses Chromium as interface to run a web environment. But, can we use Electron with Deno? Are there alternatives?

![](https://aralroca.com/images/blog-images/55.png)

Well, right now Electron is far from being able to be executed under Deno. We must look for alternatives. Since Deno is made with Rust, we can use [web-view rust bindings](https://github.com/Boscop/web-view) to run Destkop application in Deno.

This way, we can use the native OS webview to run as many webviews as we want.

**Repo**: https://github.com/eliassjogreen/deno_webview

```js
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

![](https://aralroca.com/images/blog-images/40.jpg)

## Forever / PM2

[Forever](https://github.com/foreversd/forever) and [PM2](https://github.com/Unitech/pm2) are CLI tools for ensuring that a given script runs continuously as a daemon. Unlike Forever, PM2 is more complete and also serves as load balancer. Both are very useful in Node, but can we use them in Deno?

Forever is intended for Node only, so using it is not feasible. On the other hand, with PM2 we can run non-node scripts, so we could still use it for Deno.

![](https://aralroca.com/images/blog-images/56.png)

Creating an `app.sh` file

```bh
#!/bin/bash
deno run -A myCode.ts
```

And

```
➜ pm2 start ./app.sh 
```

![](https://aralroca.com/images/blog-images/41.png)

## Express / Koa

[Express](https://github.com/expressjs/express) and [Koa](https://github.com/koajs/koa) are the best known Node frameworks. They're known for their robust routing system and their HTTP helpers (redirection, caching, etc). Can we use them in Deno? The answer is not... But there are some alternatives.

![](https://aralroca.com/images/blog-images/42.png)

### Http (std lib)

Deno's own STD library already covers many of the needs provided by Express or Koa. https://deno.land/std/http/.

```js
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

let request = new ServerRequest();
request.headers = new Headers();
request.headers.set("Cookie", "full=of; tasty=chocolate");

const cookies = getCookies(request);
console.log("cookies:", cookies);
```

However, the way to declare routes is not very attractive. So let's look at some more alternatives.

### Oak (Third party lib)

One of the most elegant solutions right now, very inspired by Koa. https://github.com/oakserver/oak

```js
import { Application,  } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

### Abc (Third party lib)

Similar to Oak. https://deno.land/x/abc.

```js
import { Application } from "https://deno.land/x/abc/mod.ts";

const app = new Application();

app.static("/static", "assets");

app.get("/hello", (c) => "Hello!")
  .start({ port: 8080 });
```

### Deno-express (Third party lib)

Maybe the most similar alternative to Express Framework. https://github.com/NMathar/deno-express.

```js
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

[MongoDB](https://github.com/mongodb/mongo) is a document database with a huge scability and flexibility. In the JavaScript ecosystem has been widely used, with many stacks like MEAN or MERN that use it. It's very popular.

![](https://aralroca.com/images/blog-images/43.png)

So yes, we can use MongoDB with Deno. To do this, we can use this driver: https://github.com/manyuanrong/deno_mongo.

```js
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

![](https://aralroca.com/images/blog-images/44.png)

Like MongoDB, there is also a driver for [PostgresSQL](https://github.com/postgres/postgres/). 

* https://github.com/buildondata/deno-postgres.

```js
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

![](https://aralroca.com/images/blog-images/45.png)

As with MongoDB and PostgresSQL, there is also a driver for [MySQL](https://github.com/mysqljs/mysql) / [MariaDB](https://github.com/mariadb-corporation/mariadb-connector-nodejs).

* https://github.com/manyuanrong/deno_mysql

```js
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

![](https://aralroca.com/images/blog-images/46.png)

[Redis](https://github.com/NodeRedis/node-redis), the best known database for caching, has also a driver for Deno.

* https://github.com/keroxp/deno-redis

```js
import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379
});
const ok = await redis.set("example", "this is an example");
const example = await redis.get("example");
```


## Nodemon

![](https://aralroca.com/images/blog-images/47.png)

[Nodemon](https://github.com/remy/nodemon) is used in development environment to monitor any changes in your files, automatically restarting the server. This makes node development much more enjoyable, without having to manually stop and restart the server to see the applied changes. Can it be used in Deno?

Sorry, but you can't... but still, there is an alternative: Denon.

* https://github.com/eliassjogreen/denon

We can use Denon as we use `deno run` to execute scripts.

```
➜ denon server.ts
```

## Jest, Jasmine, Ava...

![](https://aralroca.com/images/blog-images/48.png)

In the Node.js ecosystem there are a lot of alternatives for test runners. However, there isn't one official way to test the Node.js code.

In Deno, there is an official way, you can use the testing std library.

* https://deno.land/std/testing

```js
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts'

Deno.test('My first test', async () => {
  assertStrictEq(true, false)
})
```

To run the tests:

```
➜  deno test
```

## Webpack, Parcel, Rollup...

![](https://aralroca.com/images/blog-images/52.png)

One of the strengths of Deno is that we can use ESmodules with TypeScript without the need for a bundler such as [Webpack](https://github.com/webpack/webpack), [Parcel](https://github.com/parcel-bundler/parcel) or [Rollup](https://github.com/rollup/rollup).

However, probably you wonder if given a tree of files, we can make a bundle to put everything in one file to run it on the web.

Well, it's possible, yes. We can do it with Deno's CLI. Thus, there's no need for a third-party bundler.

```
➜ deno bundle myLib.ts myLib.bundle.js
```
Now it's ready to be loaded in the browser:

```html
<script type="module">
  import * as myLib from "myLib.bundle.js";
</script>
```

## Prettier

![](https://aralroca.com/images/blog-images/49.png)

In the last few years [Prettier](https://prettier.io/) has become quite well known within the JavaScript ecosystem because with it you don't have to worry about formatting the files.

And the truth is, it can still be used on Deno but it loses its meaning, because Deno has its own formatter.

You can format your files using this command:

```
➜  deno fmt
```

## NPM Scripts

![](https://aralroca.com/images/blog-images/50.png)

With Deno, the `package.json` no longer exists. One of the things I really miss are the scripts that were declared in the `package.json`.

A simple solution would be to use a `makefile` and execute it with `make`. However, if you miss the npm syntax, there is an npm-style script runner for Deno:

* https://github.com/umbopepato/velociraptor

You can define a file with your scripts:

```yaml
# scripts.yaml
scripts:
  start: deno run --allow-net server.ts
  test: deno test --allow-net server_test.ts
```
 
Execute with:

```
➜  vr run <SCRIPT>
```

Another alternative is [denox](https://github.com/BentoumiTech/denox), very similar to Velociraptor.


## Nvm

![](https://aralroca.com/images/blog-images/51.png)

[Nvm](https://github.com/nvm-sh/nvm) is a CLI to manage multiple active Node versions, to easy upgrade or downgrade versions depending on your projects.

A `nvm` equivalent in Deno is `dvm`.

* https://github.com/axetroy/dvm

```bh
➜  dvm use 1.0.0
```

## Npx

[Npx](https://github.com/npm/npx) in recent years has become very popular to execute npm packages without having to install them. Now many projects won't exist within npm because Deno is a separate ecosystem. So, how can we execute Deno modules without having to install them with `deno install https://url-of-module.ts`?

In the same way that we run our project, instead of a file we put the URL of the module:

```
➜  deno run https://deno.land/std/examples/welcome.ts
```

As you can see, not only we have to remember the name of the module, but the whole URL, which makes it a little more difficult to use. On the other hand it gives a lot more flexibility as we can run any file, not just what's specified as a binary in the `package.json` like `npx`.

## Run on a Docker

![](https://aralroca.com/images/blog-images/53.png)

To run Deno inside a Docker, we can create this Dockerfile:

```dockerfile
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

To build + run it:

```
➜  docker build -t app . && docker run -it --init -p 1993:1993 app
```


Repo: https://github.com/hayd/deno-docker

## Run as a lambda

![](https://aralroca.com/images/blog-images/54.png)

To use Deno as a lambda, there is a module in Deno STD library. https://deno.land/x/lambda.

```ts
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

Interesting references:

* Deno in Vercel: https://github.com/lucacasonato/now-deno
* Deno in AWS: https://blog.begin.com/deno-runtime-support-for-architect-805fcbaa82c3

## Conclusion

I'm sure I forgot some Node topics and their Deno alternative, let me know if there's anything I missed that you'd like me to explain. I hope this article helps you break the ice with Deno.

To explore all libraries you can use with Deno:

* https://deno.land/std
* https://deno.land/x
* https://www.pika.dev/
