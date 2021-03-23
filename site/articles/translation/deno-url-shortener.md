# 如何在 Deno 中构建一个 URL 短链生成器

> - 原文地址：[How to Build a URL Shortener in Deno](https://www.freecodecamp.org/news/build-a-url-shortener-in-deno/)
> - 原文作者：Akash Joshi
> - 原文发布时间/翻译时间：20201007/20210429
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619653066161-316f1fd4-408a-41db-89bb-5ed381463e71.png#height=853&id=YbFIR&margin=%5Bobject%20Object%5D&name=image.png&originHeight=853&originWidth=1280&originalType=binary&size=2873338&status=done&style=none&width=1280)

在本文中，我们将要学习 Deno 的基础，比如如何运行一个程序并且拥抱 Deno 的安全特性。

Deno 是用 Rust 编写的一个全新 JavaScript 和 TypeScript 运行时。它提供了严格的安全性、开箱即用的 TypeScript、一个单个可运行的执行文件，以及一组经过代码审查的标准模块。

像 Node.js 下的 npm 一样，Deno 的生态库被管理在 [X](https://deno.land/x/) 中心库下。我们将使用其中的一个库——Oak，在 Deno 中构建基于 REST API 的服务器。

通过使用类似 Express 的路由管理库 [Oak](https://deno.land/x/oak@v6.3.0) 的基础知识后，我们将深入探讨 Deno 并构建一个完整的应用程序。

这是我们将构建此应用程序的步骤：

1. 使用基于 JSON 的配置文件来将 URL 短链映射到端口上
1. 在每个 URL 上附加有效期，以便这些重定向仅在有效的时间内生效。

## 0. 前置准备

1. 从[这个链接](https://deno.land/#installation)中安装 Deno。
1. 确保你知道一些 JavaScript 基础。

尽管并不是本文所需，但你还是可以通过以下视频的形式看看 Deno 的基础介绍。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619653037810-e50e2564-bf72-4c05-8325-8b177a87977b.png#height=343&id=D9d0G&margin=%5Bobject%20Object%5D&name=image.png&originHeight=343&originWidth=662&originalType=binary&size=89785&status=done&style=none&width=662)

[一个 Deno 入手的视频教程](https://www.youtube.com/watch?v=VQ8Jb7GLHgk)。

那么，让我们来正式开始？

## 1. 如何构建路由

要为我们的应用编写服务端代码，我们将使用 Oak 模块。它具有类似于 Express 定义 API 路由的语法。

如果我们在[这个文档](https://deno.land/x/oak)中，“[基础用法](https://deno.land/x/oak)”部分几乎涵盖了我们会在本文中用到的一切路由。因此，我们直接拓展这段代码来构建我们的应用。

要直接用到这段代码，可以在文件夹中创建一个名为 index.ts 的文件，然后将“基本用法”里的代码复制到其中。

要了解如何在 Deno 中运行 TypeScript 或 JavaScript 文件，你首先需要理解 Deno 是如何运行文件的。

你可以通过运行 `deno run file_name.ts` 或 `file_name.js` 命令来运行文件，后面可以跟一组参数标志，这些标志将为你的应用程序提供某些系统权限。

为了测试刚刚粘贴的“基础用法”代码能否跑通，使用如下命令：`deno run index.ts`。

你会看到 Deno 警示你没有授予该代码访问网络的权限。所以你需要添加 `-allow-net` 到刚才的 run 命令中。该命令最终会像这样：`deno run index.ts -allow-net`。

“基础用法”中的路由代码会如下所示：

```jsx
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });
```

拆解上面的代码：首先定义了一个 `router` 对象，然后在路由器上调用 get 函数，以定义应用程序的各种端口。端口相应的逻辑在回调函数中定义。

例如，对于 "/" 端口，已定义了在响应体重返回 “Hello World” 的回调函数。我们可以先保持此端口不变，以通过接收响应来测试我们的应用程序服务器是否正在运行。

我们不需要已定义的 “/book” URL，因此可以安全地删除其定义。此时，你的路由应具有如下结构：

```typescript
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });
```

在下一节中，我们将着手于开始实战构建应用程序。

## 2. 如何构建 URL 短链器

现在让我们开始实战构建 URL 短链生成器。

它应该根据 `shortcode` 来重定向到目的地（`dest`）。重定向还应仅在有效期到期之前有效，可以以年-月-日格式提供。

基于这些假设，让我们创建一个名为 `urls.json` 的配置文件。该文件的格式为：

```json
{
  "shortcode": {
    "dest": "destination_url_string",
    "expiryDate": "YYYY-MM-DD"
  }
}
```

你可以[参考这个 JSON 文件](https://github.com/akash-joshi/deno-url-shortener/blob/master/urls.json)。

要在你的代码中读取这个 JSON 文件，请在 `index.ts` 顶部添加以下内容：

```jsx
import { Application, Router } from "<https://deno.land/x/oak/mod.ts>";

const urls = JSON.parse(Deno.readTextFileSync("./urls.json"));

console.log(urls);
```

现在，要运行 `index.ts`，你需要另一个标志 `-allow-read`，否则 Deno 将抛出“未提供读取权限”错误。你的最终命令应该是 `deno run —allow-net —allow-read index.ts`。

运行此命令后，你将在终端窗口中看到打印的 JSON 文件。这意味着你的程序能够正确读取 JSON 文件。

如果我们回到上面看到的“基本用法”示例，则路由 “/book/:id” 风格正是我们接下来所需要的。

将 "/book/:id" 替换为 "/shrt/:urlid"，此时我们将基于 URL ID（`:urlid`）获得各个 URL。

用以下代码替换 "/book/:id" 路由中存在的现有代码：

```jsx
.get("/shrt/:urlid", (context) => {
    if (context.params && context.params.urlid && urls[context.params.urlid]) {
      context.response.redirect(urls[context.params.urlid].dest);
    } else {
      context.response.body = "404";
    }
  });
```

路由中的 `if` 条件执行以下操作：

1. 检查参数是否存在于路由中
1. 检查参数 `urlid` 是否在参数列表中
1. 检查 `urlid` 是否与我们 JSON 中的任何 URL 匹配。

如果有所匹配，用户将重定向到正确的 URL。如果无所匹配，则返回 404 响应。

想要测试这段代码，请将如下代码复制到 `index.ts` 中。路由现在长这个样子：

```jsx
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/shrt/:urlid", (context) => {
    if (context.params && context.params.urlid && urls[context.params.urlid]) {
      context.response.redirect(urls[context.params.urlid].dest);
    } else {
      context.response.body = "404";
    }
  });
```

接下来使用 `deno run —allow-net —allow-read index.ts` 运行文件。

如果你从示例中复制了 JSON 文件，此时打开 `http://localhost:8000/shrt/g`，你会正常重定向到 Google 主页上。

另一方面，如果你使用的随机 shortcode 在我们网址配置中不起作用，则会进入到 404 页面上。

但是，你会看到我们的短链器不会实时响应 JSON 文件中的变更。想要增加更多的配置，请以如下相同格式向 `urls.json` 中添加新的重定向。

```json
"shortcode": {
  "dest": "destination_url_string",
  "expiryDate": "YYYY-MM-DD"
}
```

这是因为 `urls.json` 仅在刚开始时被读取一次。现在，我们需要将实时更新功能添加到服务端上。

## 3. 如何添加实时读取

为了使 **urls** 对象能够实时响应 JSON 文件中的更改，我们只需将 read 语句移动到路由中即可。会长这样：

```jsx
.get("/shrt/:urlid", (context) => {
  const urls = JSON.parse(Deno.readTextFileSync("./urls.json"));

  if (context.params && context.params.urlid && urls[context.params.urlid]) {
    context.response.redirect(urls[context.params.urlid].dest);
  } else {
    context.response.body = "404";
  }
});
```

请注意我们如何是路由内部移动 URL 对象的。此时，每次调用该路由时都会读取配置文件，因此它可以实时响应 `urls.json` 文件中所做的任何更改。即使我们现在添加或删除其他重定向，我们的代码也会做出新的响应。

## 4. 如何向 URL 上添加过期时间

为了使我们的 URL 在某个时间点上过期，我们将使用流行的 Moment.js 库，该库使处理日期变得更容器。

幸运的是，它已经被[良好移植到了 Deno 上](https://deno.land/x/moment)。要了解其工作原理，请在上一句的链接中查看其文档。

要在代码中使用到，请直接通过 URL 导入：

```jsx
import { Application, Router } from "<https://deno.land/x/oak/mod.ts>";
import { moment } from "<https://deno.land/x/moment/moment.ts>";

const router = new Router();
```

为了检查 URL 什么时候过期，我们检查 urls 对象上的 expiryDate 键值。如下所示：

```jsx
if (context.params && context.params.urlid && urls[context.params.urlid]) {
  if (
    urls[context.params.urlid].expiryDate > moment().format("YYYY-MM-DD")
  ) {
    context.response.redirect(urls[context.params.urlid].dest);
  } else {
    context.response.body = "Link Expired";
  }
} else {
  context.response.body = "404";
}
```

在 `moment().format("YYYY-MM-DD")` 中，我们使用 moment() 来获取当前的时间。然后使用 `.format("YYYY-MM-DD")` 将其格式化为 "YYYY-MM-DD"（年-月-日）格式。

通过将其与我们的 **expiryDate** 键进行比较，我们可以检查当前的 URL 是否已过期。

就是这样！你已经在 Deno 中构建了功能齐全的 URL 短链器。你可以[在这个 Github 库](https://github.com/akash-joshi/deno-url-shortener)中找打最终的代码。

通过将 `expiryDate` 设置为当前日期并对 `urls.json` 和我们的代码进行其它更改可以测试更多功能。

## 我对 Deno 的看法

为了总结这篇文章，我将谈谈我对 deno.land 的思考。

当看到一种考虑安全性并支持 TypeScript 的服务端运行时令人耳目一新，但 Deno 在应用到生产环境之前还有很长的路要走。

例如，即使对于像我们刚开发的那样简单的程序，使用 TypeScript 编译也得需要约为 20 秒的时间，这非常的慢。

在错误报告方面，描述错误的地方还很糟糕。比如，当在函数本身中嵌入代码以读取 `urls.json` 时，Deno 无法报告未设置 `-allow-read` 标志。相反，它只会引发内部错误，而不会在终端上打印正确的错误。

> 译者注：现 Deno 1.9 版本已经很好地支持权限提示了，其它的也在逐步支持中。

## 接下来是什么？

你可以通过构建更复杂的应用程序（比如[聊天应用程序](https://css-tricks.com/build-a-chat-app-using-react-hooks-in-100-lines-of-code/)或 [Wikipedia 克隆版](https://auth0.com/blog/building-a-wikipedia-app-using-react-hooks-and-auth0/)）来提高你的 Deno 或 TypeScript 的技能。

你也可以浏览 deno.land 上的 Deno 文档，来更熟悉基础知识。

感谢你阅读本文，祝你编程愉快！

## 重要链接

Deno - [https://deno.land](https://deno.land/)
Deno X (仓库中心) - [https://deno.land/x/](https://deno.land/x/)
Oak (REST 框架) -  [https://deno.land/x/oak](https://deno.land/x/oak)
Oak 基础用法 -  [https://deno.land/x/oak@v6.3.1#basic-usage](https://deno.land/x/oak@v6.3.1#basic-usage)
最终的 GitHub 仓库 -  [https://github.com/akash-joshi/deno-url-shortener](https://github.com/akash-joshi/deno-url-shortener)

> © [https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 2020~2021
