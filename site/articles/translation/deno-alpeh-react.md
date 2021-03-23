# 如何在 Deno 下使用 AlpehJS 库构建 React 应用

> - 原文地址：[How to Build React Applications with Deno Using the AlephJS Library](https://www.freecodecamp.org/news/build-react-app-using-deno-and-alephjs/)
> - 原文作者：Akash Joshi
> - 原文发布时间/翻译时间：20210312/20210429
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。

如果你是刚刚开始使用 Deno 的前端开发人员，你可能会像知道，你是否可以使用 Deno 构建像 NextJS 或 create-react-app（CRA）应用程序一样复杂的东西？

我最近在想同样的事情。我想尝试使用能提供高共享性的 Deno，其能够直接从 URL 运行 JavaScript 和 TypeScript 应用程序。同时 Deno 编译器支持从 URL 中导入模块，从而实现了更大的可移植性。

我查阅了线上是否有任何相应的解决方案，但我只先找到了[这篇文章](https://dev.to/adriantwarog/react-deno-server-side-rendering-with-deno-ssr-4438)，它使用了一些复杂的技术构建了一个 SSR 的 React 应用程序。复杂得并不简单，不像 NextJS 或 CRA 那样入门友好。

所以，通过更多的查阅，我最终找到了 AlephJS 框架，有着相比之前最酷的主页。

![](https://cdn.nlark.com/yuque/0/2021/gif/86548/1619653831303-b973d071-5cd0-447b-8420-8f8fde1764dd.gif#height=1200&id=DBhf1&originHeight=1200&originWidth=2460&originalType=binary&size=0&status=done&style=none&width=2460)

与 NextJS 一样，Aleph 是一个零配置，由 TypeScript 驱动的 React 框架。唯一的缺点是 Aleph 仍然处于 Alpha 状态。

因此，让我们开始使用 AlephJS，来在 Deno 中获得真正的类似于 Next 的 React 体验。它具有 Next 相同的许多约定，例如：

- 一个 `/pages` 目录用来创建 URL 路由
- pages 中直接支持 `.js .jsx .ts .tsx` 格式。
- 一个 `/public` 目录用来存放静态资源比如视频、音频或图片文件。
- 一个 /pages/api 目录用来存放 JavaScript 或 TypeScript 的 serverless APIs。

## 如何从 AlephJS 开始

为了能够使用到 AlephJS，你需要确保你已安装了 Deno。你可以在我[之前的这篇文章中](https://www.freecodecamp.org/news/build-a-url-shortener-in-deno/)查看如何安装 Deno。

准备好后，你需要先通过如下命令安装 Aleph CLI：

```bash
deno install -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts
```

安装完后，你可以运行 `aleph -h` 来检查是否安装成功。

由于 Deno 的 URL 特性，你可以使用 `deno run -A [https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts](https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts) start $app_URI` 替换 aleph 来执行任何命令，并且无需本地安装 CLI 即可运行 Aleph 程序。

运行如下命令来初始化一个应用：

```bash
aleph init hello
cd hello
```

然后使用 `aleph dev` 在开发模式下启动该应用，以在端口 `8080` 上启动服务器。

要以生产模式启动该应用程序，你必须首先 `build` 构建该应用程序。你可以通过以下命令执行此操作：

```bash
aleph build # build your app
aleph start # runs built app
```

在你初始化完毕 Aleph 之后，你会发现根组件已经在 `pages/index.tsx` 中定义了。这是正常的 React 组件。你可以对其进行修改，以了解 Aleph 的工作原理。

你也可以通过在 `pages` 文件夹中创建更多 `.jsx` 或 `.tsx` 文件来向应用添加更多的路由。你可以[在此处](https://alephjs.org/docs/basic-features/routing)阅读有关 Aleph 中路由的更多知识。

## 如何在 Deno 中导入库

我之前在 freeCodeCamp 中写过有关 Deno 的文章，其中演示了一些 Deno 的基础知识，比如 URL 的导入。由于 Aleph 是 Deno 框架，因此所有导入均以“Deno 的方式”进行。

你可以在 Deno 应用程序中导入这两种库：

1. Importing Deno-Native Libraries: These libraries were either built for Deno, or ported over from npm to support Deno usage.
1. 导入 Deno 原生库：这些库要么是为 Deno 构建的，要么是从 npm 移植过来的，均支持 Deno 的使用。
1. 从 NPM 中导入：如果你最近使用过 JS，则很可能了解 npm。不了解的话：npm（node 包管理器背后的公司）是所有 JavaScript 库的一种标准托管库。幸运的是，Deno 对 npm 库有一定限度的支持。可以使用诸如 [esm.sh](http://esm.sh/) 或 skypack.dev 这样的工具，用户可以将 npm 库导入到 Deno 中。

### 1. 如何导入 Deno 原生库

你可以直接通过 URL 导入 Deno 原生库。你也可以在这里这倒 Deno 库的列表：[deno.land/x](http://deno.land/x)。

想要测试这个功能，让我们导入一个标准 Deno 日期格式库，然后在 React 页面中调用日期格式函数。在应用程序的 `pages` 文件夹中创建一个文件 `date-import.tsx`。在文件内部编写如下代码：

```jsx
// react 是 Aleph 中已经安装好的基础库
import React from "react";

// 从 URL 中导入其 format 函数
import { format } from "https://deno.land/std@0.88.0/datetime/mod.ts";

// 将函数名称大写，以便将其识别为一个 React 组件
export default function DateImport() {
  // 在这里，直接调用 format 函数可以正常使用
  return <section>Hello all! Today is: {format(new Date(), "dd-MM-yyyy")}</section>;
}
```

要查看此文件的输出，请跳转到 [localhost:8080/date-import](http://localhost:8080/date-import)，你应该可以看到显示今天日期的页面。

### 2. 如何从 NPM 中导入库

要导入 npm 库，你也可以直接从 URL 导入——但在这种情况下，需要进行一些更改。自从我们讨论了 [esm.sh](http://esm.sh/) 和 skypack.dev 以来，让我们尝试在实际中使用它们。此时，我们尝试在项目中导入 [dayjs](https://www.npmjs.com/package/dayjs) 库。

> 注意：并非所有 npm 库都可以在 Deno 中正常工作，因为它们可能依赖于特定于 Node 的功能。

要在 [esm.sh](http://esm.sh/) 中导入库，请将库的软件包名追加到 URL 后面。比如导入 dayjs 的话，我们可以导入 `[https://esm.sh/dayjs](https://esm.sh/dayjs)` 地址。这同时适用于你可能从库中导入的任何 CSS 文件。

现在，让我们在名为 `pages` 中创建一个文件 `dayjs-import.tsx`。因此，我们页面中的代码将如下所示：

```jsx
// react 是 Aleph 中已经安装好的基础库
import React from "react";

// 使用 esm.sh 导入 dayjs npm 库
import dayjs from "https://esm.sh/dayjs";

// 将函数名称大写，以便将其识别为一个 React 组件
export default function DateImport() {
  // 直接调用 dayjs 函数来显示今天的日期
  return <section>Hello all! Today is: {dayjs().format("DD-MM-YYYY")}</section>;
}
```

要查看此文件的输出，打开 [localhost:8080/dayjs-import](http://localhost:8080/dayjs-import)，你应该会看到显示当天日期的页面。

但在我们进行下一步之前，有一件重要的事——你如何导入 React 下的 `useState`、`useEffect` 等？幸运的是，Aleph 开发人员已经为我们编写了一个示例。

进入 `./lib/useCounter.ts`，你将找到在页面中用于计数器自定义钩子的代码。

由于我在本文中将重点介绍 Aleph 和 React 本身，因此，要查看在 Aleph 中导入 CSS文件的所有不同方法，请访问[官方文档中的相关页面](https://alephjs.org/docs/basic-features/built-in-css-support)。

## 如何使用 Deno 和 AlephJS 构建示例应用

现在，让我们进入实战环境，来尝试自己在 Aleph 中构建一个 React 应用。我们将构建“Is It Down”，这是我使用现有的网站检查 API 制作的一个示例应用。这个应用将使我们能够检查一个网站当前是打开还是关闭的。

这是 CodeSandbox 链接：[https://codesandbox.io/s/awesome-firefly-5dofg](https://codesandbox.io/s/awesome-firefly-5dofg)

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619687189056-ae37faf6-7db8-4b4a-a7d5-27b8dad0292d.png#height=157&id=RGlqP&margin=%5Bobject%20Object%5D&name=image.png&originHeight=157&originWidth=707&originalType=binary&size=9891&status=done&style=none&width=707)

构建此应用将向你展示如何使用 State hook、Effect Hook 以及如何在 Aleph 中进行 API 调用。

在 `pages` 文件夹中创建一个名为 `web-checker.tsx` 的新文件。让我们从仅添加 UI 元素开始。我们将显示一个带标题的 `h1` 元素，一个链接到 API 的 `h2` 元素以及一个接受用户输入的 form 元素。这是一个非交互式的页面，仅显示元素。

```jsx
import React from "react";

export default function App() {
	return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Is it Down?</h1>
      <h2>
        Go{" "}
        <a
          href="https://rapidapi.com/jakash1997/api/website-data-gathering-and-update-tracking"
          target="_blank"
        >
          here
        </a>{" "}
        to get an API key
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

接下来，为了捕获输入字段的状态，以及捕获我们必须进行的 API 调用的响应，让我们引入一下 state。

```jsx
// import useState from react
import React, { useState } from "react";

export default function App() {
  // define both state variables
  const [siteURL, setUrl] = useState("");
  const [response, setResponse] = useState(undefined);
...
```

现在，我们可以再输入元素中使用此状态，以便它可以对此作出响应：

```jsx
...
<input
  value={siteURL}
  onChange={(e) => setUrl(e.target.value)}
  type="text"
/>
...
```

当 API 返回响应时，我们还需要添加一些代码来显示响应：

```jsx
...
	</form>
	
	

	
	<code>{JSON.stringify(response, null, 2)}</code>
</div>
...
```

现在，准备开始集成 API。让我们尝试正确的组合请求体。此时，API 是一个简单的 `GET` 调用，因此我们只需传递一个参数和一个 API 秘钥。

首先转到此处来生成 API 秘钥：[https://rapidapi.com/jakash1997/api/website-data-gathering-and-update-tracking](https://rapidapi.com/jakash1997/api/website-data-gathering-and-update-tracking)。如下截图所示，找到密码并将其存储到安全的地方：

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619653831580-8df0a0a1-5c89-4c93-bfb1-d3d26136b93c.png#height=952&id=Rfrkt&originHeight=952&originWidth=2000&originalType=binary&size=0&status=done&style=none&width=2000)

接下来，让我们创建一个单独的函数 `sumitData`，用来生成所需的请求体。我们将使用 `axios` 库进行 GET 调用，同时用到 `options` 对象。

```jsx
...
const [response, setResponse] = useState(undefined);

const submitData = (siteURL) => {
  setResponse("Loading...");
  const options = {
		// passing siteURL here through object shorthand
    params: { siteURL },

		// passing the required headers here
    headers: {
      "x-rapidapi-key": "YOUR_API_KEY",
      "x-rapidapi-host":
        "website-data-gathering-and-update-tracking.p.rapidapi.com",
    },
  };

	// print options here
	console.log("options", options);
};

return (
...
```

然后，将其添加到表单的 `onSubmit` 函数中。

```jsx
onSubmit={(e) => {
  e.preventDefault();
  submitData(siteURL);
}}
```

现在，每当你点击 Submit 按钮时，你都能看到我们在控制台中生成的 **options**。如果你能看到，代表目前为止一切都正常！

接下来，我们只需执行简单的步骤，即使用 [http://esm.sh](http://esm.sh/) 来导入 axios 库并使用它进行 API 调用。

在 `React` 导入之后，像这样导入 `axios`：

```jsx
import React, { useState } from "react";
import axios from "https://esm.sh/axios";

...
```

并将其在 submitData 函数中使用：

```jsx
...
	axios
    .get(
      "https://website-data-gathering-and-update-tracking.p.rapidapi.com/sitecheck",
      options
    )
    .then(function (response) {
      setResponse(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
...
```

就这么简单！尝试再次提交表单，这次你将在屏幕和控制台上都能看到正确的结果。

## 结论

现在你了解了 Aleph 的基础知识。这是一个非常有趣的工具，它使你可以将现有的 React 知识与 [deno.land](http://deno.land/) 的前沿性和安全性结合。

如果你喜欢本教程，可以再 Twitter 上关注我 [@thewritingdev](http://twitter.com/thewritingdev)。

> © [https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 2020~2021
