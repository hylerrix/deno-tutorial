# Deno + Oak 构建酷炫的 Todo API

> - 原文地址：[How to Create a Todo API in Deno and Oak](https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/)
> - 原文作者：Adeel Imran
> - 原文发布时间：2020-05-29
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。
> - 备注：《Deno 钻研之术》电子书官网上线啦！https://deno-tutorial.js.org

![](http://qiniu.ningo.cloud/articles/1b4-01.jpg)

## 序言

我是一位 JavaScript/Node 开发者，默默地喜欢甚至爱慕着 Deno。Deno 诞生之初就深深地吸引了我，此后我成为了 Deno 的忠实粉丝，期待着有朝一日能正式玩上 Deno。

本文专注于创造一个基于 REST API 设计的待做清单（Todo）应用。请记住本文中还不会涉及有关数据库操作的知识，其内容会在我之后的[另一篇文章](https://www.freecodecamp.org/news/how-to-use-mysql-in-deno-oak/)中进行详细介绍。

如果你想能够随时回顾或参考本文的代码，可以访问我的这个仓库：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground)，收录了该系列的所有代码。

> 译者注：另一篇文章《How to Use MySQL With Deno and Oak》即将会被翻译，其相关 Demo 也会被收录在《Deno 钻研之术》中。

![](http://qiniu.ningo.cloud/articles/1b4-02.jpg)

照片来自于 [Bernard de Clerk](https://unsplash.com/@bernardtheclerk?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### 本文会涉及的内容

- 创建一个最基础的服务器
- 创建 5 个 APIs（路由 routes/控制器 controller）
- 创建一个中间件来给 API 请求添加终端输出的日志功能
- 创建一个 404 中间件来处理用户访问未知 API 时的情况

### 本文需要的知识准备

- 一个已经安装好的 Deno 环境（别怕，我会告诉你怎么做）
- 对 TypeScript 有浅要的了解
- 如果你之前对 Node/Express 一定的了解就更好了（不了解也没关系，本文还是很通俗易懂的）

## 让我们开始吧

首先我们要先安装 Deno。由于我使用的是 Mac 操作系统，所以在这里我将使用 brew。只需要打开终端并输入这条命令即可：

```bash
$ brew install deno
```

但如果你用的是其它操作系统的话，这里有一个安装手册可以看看：[deno.land installation](https://deno.land/#installation)。上面有多样化的安装方式可供你根据不同的操作系统来选择。

一旦你安装成功，关闭终端并打开另一个后，输入这条命令：

```bash
$ deno --version
```

一切正常的话终端会产生如下输出：

![](http://qiniu.ningo.cloud/articles/1b4-03.jpg)

 `deno --version` 命令用来查看当前安装的 Deno 是哪个版本。

棒极了！通过这个介绍我们已经成功完成了本文 10% 的挑战。

让我们继续探索，并为我们的待做清单应用创建一个后端 API 吧。

## 项目的准备工作

阅读下文，可以来提前来仓库里看看本文收录的所有代码：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground)。

这里我们从零做起：

- 创建一个名为 `chapter_1:oak` 的新文件夹（你也可以随意起名）。
- 当你创建完毕后使用 `cd` 命令进入这个文件夹中。创建一个名为 **server.ts** 的文件并填充如下代码：

```typescript
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port: number = 8080;

console.log('running on port ', port);
await app.listen({ port });
```

让我们先运行这个文件。打开你的终端并进入当前项目的根目录后，输入如下命令：

```bash
$ deno run --allow-net server.ts
```

别急别急，我会在之后来介绍 `--allow-net` 参数到底做了什么的 😄。

不出意外的话，你会得到如下结果：

![](http://qiniu.ningo.cloud/articles/1b4-04.jpg)

到现在为止，我们创建了一个监听着 8080 端口的服务端应用。只有 8080 端口不被占用，这个应用才能正常执行。

如果你有过使用 JavaScript 开发的经验，你可能会注意到我们导入模块的方式有些不一样。我们在这里是这样导入模块的：

```
import { Application } from "https://deno.land/x/oak/mod.ts";
```

当你在终端中执行 `deno run ---allow-net <file_name>` 命令时，Deno 会读取你的导入信息，并在本地的全局环境中没有安装该模块的情况下安装这些模块。

第一次执行时 Deno 会尝试访问 `https://deno.land/x/oak/mod.ts` 模块并安装 `oak` 库。 Oak 是一个专注于编写 API 的 Deno Web 框架。

接下来的一行我们是这样写的：

```typescript
const app = new Application();
```

这条语句为我们的应用创建了一个实例，这个实例是本文深入探索 Deno 的基石。你可以为这个实例增加路由，配置中间件（如日志中间件），编写 404 未知路由处理程序等等。

接下来我们是这样写的：

```typescript
const port: number = 8080;
// const port = 8080; // => 也可以写成这样
```

上面两行在功能上是等价的，唯一的区别是 `const port: number = 8080` 告诉 TypeScript： `port` 变量的类型是数值类的。

如果你这样写的话：`const port: number = "8080"`，终端会产生类似这样的报错：port 变量应该是 `number` 类型的，但是这类尝试用 `string` 类型的 "8080" 来为其赋值。

如果你想学习关于 Type 的更多类型现在就可以看看这个简单的文档：[TypeScript 官方 - 基础 Types 类型](https://www.typescriptlang.org/docs/handbook/basic-types.html)。仅仅 2~3 分钟就可以重新回到本文。

在文件的最后我们是这样写的：

```typescript
console.log('running on port ', port);
await app.listen({ port });
```

如上我们让 Deno 监听了 8080 端口，端口号是写死的。

在你的 **server.ts** 文件中添加如下更多的代码：

```typescript
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port: number = 8080;

const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});
app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });
```

相比之前新增的内容是从 `oak` 中同时导入了 `Application` 和 `Router` 变量。

其中关于 `Router` 的相关代码是：

```
const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});
app.use(router.routes());
app.use(router.allowedMethods());
```

我们通过 `const router = new Router()` 语句创建了新的 Router 示例，然后我们为其根目录 `/` 创建了处理 `get` 请求的执行方式。

让我们重点看看如下内容：

```typescript
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});
```

`router.get` 函数接收两个参数。第一个参数是路由挂载的路径 `/`，第二个参数是一个函数。函数本身也接受一个对象参数，这里使用 ES6 语法将其解构，只取了其中 response 变量的值。

接下来就像之前编写 `const port: number = 8080;` 语句一样为 `response` 变量声明类型。`{ response }: { response: any }` 语句告诉 TypeScript 我们这里解构的 `response` 变量是 `any` 类型的。

`any` 类型可以帮准你避免 TypeScript 进行严格的类型检查，你可以通过[这个文档](https://www.typescriptlang.org/docs/handbook/basic-types.html#any)来了解更多。

接下来我所编写的就是使用 `response` 变量，并设置 `response.body.message = "hello world";`。

```
response.body = {
  message: "hello world",
};
```

最后同样重要的是，我们编写了如下两行代码：

```
app.use(router.routes());
app.use(router.allowedMethods());
```

第一行告诉 Deno 要包含我们的 router 变量里设置的所有路径（目前我们只设置了根路径），第二行让 Deno 允许任意访问方法来请求我们设置的路径，比如 `GET, POST, PUT, DELETE`。

到这里就可以测试运行了 ✅ ，让我们执行这行语句来看看最终会发生什么：

```bash
$ deno run --allow-net server.ts
```

`---allow-net` 参数告诉 Deno：用户授予了这个应用在打开的端口上访问网络的权限。

现在通过你常用的浏览器打开 `http://localhost:8080` 地址，就可以得到如下结果：

![](http://qiniu.ningo.cloud/articles/1b4-05.jpg)
浏览器打开 localhost:8080 的执行结果

最难的部分差不多搞定了，但在对概念的更多了解中我们只进行了 60% 的介绍。

![](http://qiniu.ningo.cloud/articles/1b4-06.jpg)
来自 Yoda 大师的批准

棒极了。

在我们正式开始编写待做清单的 API 前，我们最后要做的事是将如下代码：

```typescript
console.log('running on port ', port);
await app.listen({ port });
```

替换成这样：

```typescript
app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = ${protocol}${hostname ?? "localhost"}:${port};
  console.log(Listening on: ${port});
});

await app.listen({ port });
```

我们之前的代码是先在控制台上简单的打印一条成功日志，然后再让应用开始在端口上监听，不是很优雅（译者注：有可能会在监听失败的情况下依然打印监听成功的日志）。

在替换后的版本中，我们通过 `app.addEventListener("listen", ({ secure, hostname, port }) => {}` 语句来向应用实例添加事件侦听器后，再让应用监听在端口上。

侦听器的第一个参数是我们想侦听的事件。一语双关，这里侦听（listen）的就是 `listen` 事件 😅。第二个参数是一个可以被解构的对象，这里解构出 `{ secure, hostname, port }` 三个变量。Secure 变量是布尔类型，hostname 变量是字符串类型，port 变量是数值类型。

此时运行这个应用的话，只有在成功监听指定端口后才会输出监听成功的日志，

我们可以再向远方迈出一步，使其更加丰富多彩。让我们在 `server.ts` 文件的顶部添加这样一个新模块：

```typescript
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
```

接下来我们可以在之前的事件侦听器函数里将如下代码：

```typescript
console.log(Listening on: ${port});
```

替换为：

```typescript
console.log(${yellow("Listening on:")} ${green(url)});
```

接下来当我们执行：

```bash
$ deno run --allow-net server.ts
```

将会打印输出如下日志：

![](http://qiniu.ningo.cloud/articles/1b4-07.jpg)

太酷了，我们现在有了一个色彩缤纷的控制台。

如果你在某处卡住了，你可以直接访问本教程的源码仓库：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak)。

让我们接下来创建待做清单的 API 吧。

- 在项目的根目录创建一个 `routes` 文件夹，然后再文件夹里面创建一个 `todo.ts` 文件。
- 与此同时在项目根目录创建一个 `controllers` 文件夹，再在文件夹里也创建一个 `todo.ts` 文件。

我们先来填充 `controllers/todo.ts` 文件里的内容：

```typescript
export default {
  getAllTodos: () => {},
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

我们在这里先简单地导出了一个包含很多有名字的函数的对象，这些函数目前都是空的。

接下来在 `routes/todo.ts` 文件中填充这些：

```typescript
import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();
// controller 控制器
import todoController from "../controllers/todo.ts";
router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
```

对于编写过 Node 和 Express 的人来说，对如上的代码风格一定很熟悉。

其中包括从 `oak` 中导入了 `Route` 变量并通过 `const router = new Router();` 语句将其实例化。

接下来我们导入我们的控制器：

```
import todoController from "../controllers/todo.ts";
```

这里需要注意的是：在 Deno 中我们每次导入一个本地文件到项目中的时候，我们都必须填写完整这个文件的后缀。否则 Deno 是不知道用户想要导入的文件后缀到底以 `.js` 还是 `.ts` 结尾。

接下来我们通过如下代码为应用配置了我们需要的所有 RESTful 风格的路径。

```typescript
router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);
```

上面的代码会将路径解析为这样：

| 请求方式 | API 路由 |
| --- | --- |
| GET | /todos |
| GET | /todos/:id |
| POST | /todos |
| PUT | /todos/:id |
| DELETE | /todos/:id |

最后我们通过 `export default router;` 语句来将配置好的路由导出。

此时我们已经完成了创建路由的工作（但是由于我们的控制器还是空的函数，所以每个路由并都不会做任何反应，我们将向其中添加功能）。

在我们开始向每个控制器添加功能之前的最后一个难题是，我们需要将此 `router` 挂载到我们的 `app` 实例上。

因此回到 `server.ts` 文件中我们这样做：

- 将这行代码添加至文件顶部：

```typescript
// routes 路由
import todoRouter from "./routes/todo.ts";
```

- 删除这一段代码：

```typescript
const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});
app.use(router.routes());
app.use(router.allowedMethods());
```

- 将其替换为：

```
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
```

终于搞定了，你的 `server.ts` 现在应该是这个样子：

```typescript
import { Application } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

// routes
import todoRouter from "./routes/todo.ts";

const app = new Application();
const port: number = 8080;

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

await app.listen({ port });
```

如果你在某处卡住了，你可以直接访问本教程的源码仓库：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak)。

由于路由的控制器上暂时没有任何功能，现在一起来手动为我们的控制器添加功能。

在此之前我们得先创建两个（小）文件：

- 在项目的根目录上创建一个 `interfaces` 文件夹并在其中创建一个 `Todo.ts`（确保 Todo 首字母大写，因为如果不这样做，它将不会在此处给出任何语法错误——这只是一种约定）。
- 同时在项目根目录创建一个 `stubs` 文件夹并在其中创建一个 `todos.ts` 文件。

在 `interfaces/Todo.ts` 文件中编写如下接口说明：

```interfaces
export default interface Todo {
  id: string,
  todo: string,
  isCompleted: boolean,
}
```

什么是 interface（接口）？

要知道 TypeScript 的核心功能之一是检查一个变量的类型。就像前文的 `const port: number = 8080` 和 `{ response }: { response : any }` 一样，我们也可以检测一个变量是否为对象类型。

在 TypeScript 中，interface 负责命名类型，并且是**定义代码内外类型约束**的有效方法。

这里有一个有关 interface 的示例：

```typescript
// 写了个接口
interface LabeledValue {
  label: string;
}

// 此函数的labeledObj 参数是符合 LabeledValue 接口类型的
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = {label: "Size 10 Object"};
printLabel(myObj);
```

希望如上示例可以让你对 interface 有更多的了解。如果你想了解更多的信息可以查看：[Interfaces 官方文档](https://www.typescriptlang.org/docs/handbook/interfaces.html)。

现在关于 interface 的知识已经介绍够了，我们一起来模拟一些假数据（因为本文不涉及有关数据库的操作）。

我们在 `stubs/todos.ts` 文件中来为 todos 变量填充一些模拟数据。这样即可：

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interface
import Todo from '../interfaces/Todo.ts';

let todos: Todo[] = [
  {
    id: v4.generate(),
    todo: 'walk dog',
    isCompleted: true,
  },
  {
    id: v4.generate(),
    todo: 'eat food',
    isCompleted: false,
  },
];

export default todos;
```

- 有两件需要注意的事项：我们这里引用了一个新的模块并且通过 `import { v4 } from "https://deno.land/std/uuid/mod.ts";` 语句解构了其中的 `v4` 变量。接下来我们每次使用 `v4.generate()` 语句都能生成一个随机的 ID 字符串。这个 `id` 不能是 `number` 类型的，而需是 `string` 类型的，因为我们之前的 `Todo` 接口已经声明了 `id` 的类型必须是字符串。
- 另一个需要注意的是 `let todos: Todo[] = []` 语句。此语句告诉 Deno 我们的 todos 变量是一个 `Todo` 数组（此时编译器将会知道数组的每一个元素都是 `{id: _string_, todo: _string_ & isCompleted: _boolean_}` 类型的，并不允许其他任何类型）。

如果你想了解更多的信息可以查看：[Interfaces 官方文档](https://www.typescriptlang.org/docs/handbook/interfaces.html)。

太棒了，你已经进行到如此之远，再接再厉。

![](http://qiniu.ningo.cloud/articles/1b4-08.jpg)

巨石强森感激你所做的一切努力。

## 让我们关注在控制器上

在你的 `controllers/todo.ts` 文件中：

```typescript
export default {
  getAllTodos: () => {},
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

让我们先编写 `getAllTodos` 控制器：

```typescript
// stubs
import todos from "../stubs/todos.ts";

export default {
  /**
   * @description 获取所有 todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

在开始介绍这段代码前，让我解释下每个控制器都有的参数——`context`（上下文）参数。

因此我们才能解构 `getAllTodos: (context) => {}` 为：

```typescript
getAllTodos: ({ request, response, params }) => {}
```

并且自从哪个我们使用 `typescript` 后，我们需要为每个这样的变量添加类型声明：

```typescript
getAllTodos: (
  { request, response, params }: { 
    request: any, 
    response: any, 
    params: { id: string },
  },
) => {}
```

此时我们为解构的三个变量 `{ request, response, params }` 添加了类型说明。

- `request` 变量有关用户发来的请求（比如请求头和 JSON 类的请求体）。
- `response` 变量有关服务器端通过 API 返回的信息。
- `params` 变量是我们在路由配置中定义的参数，如下：

```typescript
.get("/todos/:id", ({ params}: { params: { id: string } }) => {})
```

`/todos/:id` 中的 `:id` 是一个变量，用来从 URL 中获得动态的数据。因此当用户访问这个 API （比如 `/todos/756`）的时候，**756** 则是 **:id** 参数的值。并且我们知道 URL 里的这个值的类型是 `string` 类的。

现在我们有了基本的声明后，让我们回到我们的 todos 控制器：

```typescript
// stubs
import todos from "../stubs/todos.ts";

export default {
  /**
   * @description 获取所有 todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

对于 `getAllTodos` 方法来说我们只需要简单的返回结果。如果你记得之前说的，会想起来 `response` 是用来处理服务器想要给用户返回的数据。

对于编写过 Node 和 Express 的人来说，这里的一大不同是我们不需要 `return` 响应对象。 Deno 会自动为我们执行此操作。

我们需要做的第一件事是通过 `response.status` 来设置此次请求的响应码是 `200`。

更多 HTTP 响应码可以看 [MDN 上的 HTTP 响应状态码文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

另一件事是设置 `response.body` 的值为：

```typescript
{
  success: true,
  data: todos
}
```

重新运行我们的服务器：

```bash
$ deno run --allow-net server.ts
```

> 修订：--allow-net 属性告诉 Deno，此应用程序授予用户通过打开的端口访问网络的权限。

一旦你的服务端示例跑通，挺可以通过 `GET /todos` 方式来请求这个 API。这里我使用的是 Google Chrome 浏览器下的一个插件 `postman`，[在这里下载](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40)。

你可以使用任意的 REST 风格的客户端，我喜欢使用 `postman` 是因为它真的很简单好用。

在 Postman 中，打开一个新的标签页。设置请求方式为 `GET` 请求并且在 `URL` 输入框中输入 `http://localhost:8080/todos` 。点击 `Send` 按钮便会得到想要的结果：

![](http://qiniu.ningo.cloud/articles/1b4-09.jpg)

GET /todos API 返回结果。

酷！一个 API 搞定了，还剩 4 个等着我们 👍👍。

如果你在某处卡住了，可以在[配套的源码仓库](https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak)中寻找答案。

让我们关注下一个控制器吧：

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interfaces
import Todo from "../interfaces/Todo.ts";
// stubs
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: () => {},
  /**
   * @description Add a new todo
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    // 如果请求体验证通过，则返回新增后的所有 todos
    let newTodo: Todo = {
      id: v4.generate(),
      todo: body.value.todo,
      isCompleted: false,
    };
    let data = [...todos, newTodo];
    response.body = {
      success: true,
      data,
    };
  },
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

由于我们将要添加一个新的 Todo 到列表中，因此我在 controller 文件中导入了 2 个通用模块：

- `import { v4 } from "https://deno.land/std/uuid/mod.ts"` 语句用来为每一个 todo 元素创建一个独一无二的标识。
- `import Todo from "../interfaces/Todo.ts";` 语句用来保证新建的 todo 遵循 todo 元素的接口格式标准。

我们的 `createTodo` 控制器是 `async` 异步的代表函数中会使用到一些 Promise 技术。

让我们来截断说明其中的小片段：

```typescript
const body = await request.body();
if (!request.hasBody) {
  response.status = 400;
  response.body = {
    success: false,
    message: "No data provided",
  };
  return;
}
```

首先我们读取请求体中用户传来的的 JSON 内容。接下来我们使用 `oak` 的内置 `request.hasBody` 方法来检查用户传来的内容是否为空。如果为空，我们将进入 `if (!request.hasBody) {}` 代码块中执行相关操作。

里面我们将响应体的状态码设置成 `400`（400 代表着用户端出现了一些本不该出现的错误），并且服务端返回的响应体为 `{success: false, message: "no data provided }`。之后程序直接执行 `return;` 语句来保证接下来的代码不会被执行。

接下来我们这样编写：

```typescript
// 如果请求体验证通过，则返回新增后的所有 todos
let newTodo: Todo = {
  id: v4.generate(),
  todo: body.value.todo,
  isCompleted: false,
};
let data = [...todos, newTodo];
response.body = {
  success: true,
  data,
};
```

其中我们通过如下代码创建了一个全新的 todo 元素：

```typescript
let newTodo: Todo = {
  id: v4.generate(),
  todo: body.value.todo,
  isCompleted: false,
};
```

`let newTodo: Todo = {}` 保证 `newTodo` 变量的值和其它 todo 元素一样都遵循相同的接口格式。然后，我们使用 `v4.generate()` 分配一个随机 ID，将 todo 的键值设置为 `body.value.todo` 并将 `isCompleted` 变量值设置为 `false`。

这里需要知道的是，用户给我们发的内容我们可以通过 `oak` 中的 `body.value` 来获取。

接下来我们这样做：

```typescript
let data = [...todos, newTodo];
response.body = {
  success: true,
  data,
};
```

这里将 `newTodo` 添加到整个 todo 列表中中，并在响应体中返回 `{success: true & data: data`。

此时这个控制器也运行成功了 ✅。

让我们重新运行我们的服务器：

```bash
$ deno run --allow-net server.ts
```

在 postman 中，我再打开一个新的标签页。设置请求的方式为 `POST` 类型，并在 `URL` 输入框中输入 `http://localhost:8080/todos` 后，点击 `Send` 便会得到如下结果：

![](http://qiniu.ningo.cloud/articles/1b4-10.jpg)

因为上面的请求体中发送了空的内容，所以得到了 400 错误响应码及其错误原因。

但如果我们给请求体中加入如下 JSON 内容，并重新发送：

![](http://qiniu.ningo.cloud/articles/1b4-11.jpg)

通过 { todo: "eat a lamma" } 来 POST /todos 后的成功结果，我们可以看到新的元素已经加入到列表中。

酷，我买可以看到我们的 API 已经一个个以预期的方式执行成功了。

两个 API 搞定，还剩三个要做。

我们快要搞定了，因为大部分难的内容已经介绍完毕。☺️ 🙂🤗🤩

让我们看看第三个 API：

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interfaces
import Todo from "../interfaces/Todo.ts";
// stubs
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: () => {},
  createTodo: async () => {},
  /**
   * @description 通过 ID 获取 todo
   * @route GET todos/:id
   */
  getTodoById: (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const todo: Todo | undefined = todos.find((t) => {
      return t.id === params.id;
    });
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    // 如果 todo 找到了
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  },
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
```

我们先来聊聊 `GET todos/:id` 下的控制器，此控制器会通过 ID 来查找相应的 todo 元素。

让我们继续通过截取小片段来深入分析：

```typescript
const todo: Todo | undefined = todos.find((t) => t.id === params.id);
if (!todo) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

在第一行我们声明了一个 `const todo` 变量并将其类型设置为 `Todo` 或 `undefined` 类。因此 `todo` 元素只能是符合 `Todo` 接口规范的变量或者是一个 `undefined` 值，而不能是其它任何类型。

我们接下来使用 `todos.find((t) => t.id === params.id);` 语句来通过 [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 方法和 `params.id` 的值来查找指定的 `todo` 元素。如果找到了我们会得到 `Todo` 类型的 `todo` 元素，发否则得到一个 `undefined` 值。

如果得到的 `todo` 的值是 undefined 的，意味着如下 if 条件中的代码会执行：

```typescript
if (!todo) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

这里我们设置响应的状态码为 `404`，代表着 `not found` 没有找到相关元素，并且返回体的格式也是标准的 `{ status, message }`。

很酷不是嘛？ 😄

接下来我们简单地编写：

```typescript
// 如果 todo 找到了
response.status = 200;
response.body = {
  success: true,
  data: todo,
};
```

设置一个响应状态码为 `200` 的响应体并返回 `success: true & data: todo` 内容。

我们来在 postman 中测试：

先一起重新启动服务端：

```bash
$ deno run --allow-net server.ts
```

在 postman 中，继续打开一个新的标签页，设置请求方式为 `GET` 请求并在 `URL` 输入框中输入 `http://localhost:8080/todos/:id` 后，点击 `Send` 来执行请求。

自从我们使用了随机 ID 生成器，首先我们需要调取获取所有元素的 API。并在元素列表里选取一个 ID 来测试这个新的 API。每次你重启 Deno 程序时，新的 ID 都会被重新生成。

我们这样输入：

![](http://qiniu.ningo.cloud/articles/1b4-12.jpg)

服务端返回 404，且告诉我们没有相关数据被找到。

![](http://qiniu.ningo.cloud/articles/1b4-13.jpg)

但如果输入一个正确的 ID，服务端会返回其 ID 和这个 ID 的一样的数据并且响应状态为 200。

如果你需要参考本文的源码可以访问这里：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground)。

不错，3 个 API 搞定，只剩 2 个了。

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interfaces
import Todo from "../interfaces/Todo.ts";
// stubs
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: () => {},
  createTodo: async () => {},
  getTodoById: () => {},
  /**
   * @description Update todo by id
   * @route PUT todos/:id
   */
  updateTodoById: async (
    { params, request, response }: {
      params: { id: string },
      request: any,
      response: any,
    },
  ) => {
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    // 如果找到相应 todo 则更新它
    const body = await request.body();
    const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
    let newTodos = todos.map((t) => {
      return t.id === params.id ? { ...t, ...updatedData } : t;
    });
    response.status = 200;
    response.body = {
      success: true,
      data: newTodos,
    };
  },
  deleteTodoById: () => {},
};
```

让我们来探讨下一个控制器 `PUT todos/:id`。这个控制器会更新一个元素的内容。

我们继续截断代码来细看：

```typescript
const todo: Todo | undefined = todos.find((t) => t.id === params.id);
if (!todo) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

这里做的和之前控制器做的一样，所以我就不深入介绍了。

高级提示：如果你想将这段代码设为通用代码块，然后在两个控制器中都使用它，完全可以。

接下来我们这样做：

```typescript
// 如果找到相应 todo 则更新它
const body = await request.body();
const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
let newTodos = todos.map((t) => {
  return t.id === params.id ? { ...t, ...updatedData } : t;
});
response.status = 200;
response.body = {
  success: true,
  data: newTodos,
};
```

其中我想在这里重点讨论的代码如下：

```typescript
const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
let newTodos = todos.map((t) => {
  return t.id === params.id ? { ...t, ...updatedData } : t;
});
```

首先，我们执行 `const updatedData = body.value`，然后将类型检查添加到 `updatedData` 上，如下所示：

```typescript
updatedData: { todo?: string; isCompleted?: boolean }
```

这一小段代码告诉 TS：`updatedData` 变量是一个有可能包含也有可能不包含 todo、isComplete 熟悉的对象。

接下来我们遍历每一个 todo 元素，就像这样：

```typescript
let newTodos = todos.map((t) => {
  return t.id === params.id ? { ...t, ...updatedData } : t;
});
```

其中当 `params.id` 和 `t.id` 的值一致时，我们将此时的对象的内容重新覆盖为用户传来的想要更改为的内容。

我们也编写成功了这个 API。

让我们重新启动服务器：

```bash
$ deno run --allow-net server.ts
```

在 Postman 中打开一个标签页。将请求方式设置为 `PUT`，并在 `URL` 输入框中输入 `http://localhost:8080/todos/:id` 后，点击 `Send`：

自从我们使用了随机 ID 生成器，首先我们需要调取获取所有元素的 API。并在元素列表里选取一个 ID 来测试这个新的 API。

每次重启 Deno 程序时，新的 ID 都会被重新生成。

![](http://qiniu.ningo.cloud/articles/1b4-14.jpg)

如上返回了 404 状态码并提示我们没有找到相关的 todo 元素。

![](http://qiniu.ningo.cloud/articles/1b4-15.jpg)

提供一个已知的 ID，并且请求体中填写需要改变的内容。服务端会返回一个更改后的元素及其它所有元素。

酷，四个 API 搞定我们只剩最后一个需要做。

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interfaces
import Todo from "../interfaces/Todo.ts";
// stubs
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: () => {},
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  /**
   * @description 通过 ID 删除指定 todo
   * @route DELETE todos/:id
   */
  deleteTodoById: (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const allTodos = todos.filter((t) => t.id !== params.id);

    // remove the todo w.r.t id and return
    // remaining todos
    response.status = 200;
    response.body = {
      success: true,
      data: allTodos,
    };
  },
};
```

让我们最后来讨论下 `Delete todos/:id` 控制器的执行过程，此控制器会通过给定的 ID 来删除相应 todo 元素。

我们这里只需简单地加一条过滤方法：

```
const allTodos = todos.filter((t) => t.id !== params.id);
```

遍历所有元素并删除 `todo.id` 和 `params.id` 值一样的元素，并返回其余所有元素。

接下来我们这样编写：

```typescript
// 删除这个 todo 并返回其它所有内容
response.status = 200;
response.body = {
  success: true,
  data: allTodos,
};
```

只需返回所有没有相同 todo.id 的待办事项清单即可。

让我们重启服务器：

```bash
$ deno run --allow-net server.ts
```

在 Postman 中打开一个标签页。将请求方式设置为 `PUT`，并在 `URL` 输入框中输入 `http://localhost:8080/todos/:id` 后，点击 `Send`：

自从我们使用了随机 ID 生成器，首先我们需要调取获取所有元素的 API。并在元素列表里选取一个 ID 来测试这个新的 API。每次你重启 Deno 程序时，新的 ID 都会被重新生成。

每次重启 Deno 程序时，新的 ID 都会被重新生成。

![](http://qiniu.ningo.cloud/articles/1b4-16.jpg)

我们终于搞定了所有 5 个 API。

![](http://qiniu.ningo.cloud/articles/1b4-17.jpg)

现在我们只剩下两件事了：

- 增加一个 404 中间件，来让用户访问不存在的路由时得到该有的提示；
- 增加一个日志 API 来打印所有请求的执行时间。

## 创建一个 404 路由中间件

在项目的根目录中创建一个名为 `middlewares` 的文件夹，并在其中创建一个名为 `notFound.ts` 的文件后，添加如下代码：

```typescript
export default ({ response }: { response: any }) => {
  response.status = 404;
  response.body = {
    success: false,
    message: "404 - Not found.",
  };
};
```

如上代码并没有引入什么新的知识点——它对于我们的控制器结构来使用了说很熟悉的风格。这里仅仅返回了 `404` 状态码（代表着相关路由没有找到）并且返回了一段 JSON 内容： `{ success, message }`。

接下来在你的 `server.ts` 文件中增加如下内容：

- 在文件顶部添加相关导入语句：

```typescript
// 没有找到
import notFound from './middlewares/notFound.ts';
```

- 接下来在 `app.use(todoRouter.allowedMethods())` 下面增加如下内容：

```typescript
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// 404 page
app.use(notFound);
```

执行顺序在这里很重要：每当我们尝试访问 API 路由时，它都会首先匹配/检查来自 `todoRouter` 的路由。 如果没有找到，它将执行 `app.use(notFound);` 语句。

让我们看看是否能成功运行。

重启服务器：

```bash
$ deno run --allow-net server.ts
```

在 Postman 中打开一个标签页。将请求方式设置为 `PUT`，并在 `URL` 输入框中输入 `http://localhost:8080/todos/:id` 后，点击 `Send`：

![](http://qiniu.ningo.cloud/articles/1b4-18.jpg)

因此，我们现在有了一个路由中间件，将 `app.use(notFound);` 放在 `server.ts` 文件中其它路由的后面。如果请求路由不存在，它将执行并返回 `404` 状态代码（表示未找到），并像往常一样简单地返回一个响应消息，即 `{success, message}`。

**高级贴士**：我们已经约束 `{success, message}` 是在请求失败时返回的格式，`{success, data}` 是在请求成功时候返回给用户的格式。因此，我们甚至可以将其作为对象接口，并将其添加到项目中，以确保接口的一致性和进行安全的类型检查。

酷，现在我们已经搞定了其中一个中间件——让我们添加另一个中间件来在终端打印日志吧。

**切记**：如果你在某些地方卡住了，可以看看文章的配套源码：[@adeelibr/deno-playground](https://github.com/adeelibr/deno-playground)。

## 终端中打印日志的中间件

在你的 `middlewares` 文件夹中创建一个新的 `logger.ts` 文件并填充如下内容：

```typescript
import {
  green,
  cyan,
  white,
  bgRed,
} from "https://deno.land/std@0.53.0/fmt/colors.ts";

const X_RESPONSE_TIME: string = "X-Response-Time";

export default {
  logger: async (
    { response, request }: { response: any, request: any },
    next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    console.log(`${green(request.method)} ${cyan(request.url.pathname)}`);
    console.log(`${bgRed(white(String(responseTime)))}`);
  },
  responseTime: async (
    { response }: { response: any },
    next: Function,
  ) => {
    const start = Date.now();
    await next();
    const ms: number = Date.now() - start;
    response.headers.set(X_RESPONSE_TIME, `${ms}ms`)
  },
};
```

在 `server.ts` 文件中添加如下代码：

- 文件顶部添加 import 语句来导入模块：

```typescript
// logger
import logger from './middlewares/logger.ts';
```

- 在之前提到的 `todoRouter` 代码前这样增加中间件代码：

```typescript
// 以下代码的编写顺序很重要
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
```

现在我们来讨论到底发生了什么。

我们先来讨论 `logger.ts` 文件，先截断看这里：

```typescript
import {
  green,
  cyan,
  white,
  bgRed,
} from "https://deno.land/std@0.53.0/fmt/colors.ts";
```

我在这里导入了有关终端颜色的模块，想要用在我们的日志中间件上。

这里和我们在之前的 `server.ts` 文件中使用 `eventListener` 的方式很像。我们将使用有颜色的日志信息来记录我们的 API 请求。

接下来我们设置了 `const X_RESPONSE_TIME: string = "X-Response-Time";`。这条语句用来在与用户请求到来时给响应头的 Header 中注入 `X_RESPONSE_TIME` 变量的值：`X-Response-Time`。我会在后面进行说明。

然后我们像这样一样导出一个对象：

```typescript
export default {
  logger: async ({ response, request }, next) {}
  responseTime: async ({ response }, next) {}
};
```

此时我们在 `server.ts` 中这样使用：

```typescript
// 以下两行的编写顺序很重要
app.use(logger.logger);
app.use(logger.responseTime);
```

现在我们来讨论下日志中间件到底做了什么，并且通过 `next()` 来说明其执行过程。

![](http://qiniu.ningo.cloud/articles/1b4-19.jpg)

上图为调用 GET / todos API 时日志记录中间件的执行顺序。

这里和以前的控制器唯一的区别是使用了 `next()` 函数，此函数有助于我们从一个控制器跳到另一个控制器，如上图所示。

因此有了这段：

```typescript
export default {
  logger: async (
    { response, request }: { response: any, request: any },
    next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    console.log(${green(request.method)} ${cyan(request.url.pathname)});
    console.log(${bgRed(white(String(responseTime)))});
  },
  responseTime: async (
    { response }: { response: any },
    next: Function,
  ) => {
    const start = Date.now();
    await next();
    const ms: number = Date.now() - start;
    response.headers.set(X_RESPONSE_TIME, ${ms}ms)
  },
};
```

请留意我们在 `server.ts` 中的编写方式：

```typescript
// 以下代码的编写顺序很重要
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
```

这里的执行顺序如下：

- logger.logger 中间件
- logger.responseTime 中间件
- todoRouter 控制器（无论用户想要访问什么路由，出于解释的目的，这里假设用户都调用 `GET /todos` 来获取所有待办事项）。

因此会先执行 logger.logger 的内容：

```typescript
logger: async (
    { response, request }: { response: any, request: any },
    next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    console.log(${green(request.method)} ${cyan(request.url.pathname)});
    console.log(${bgRed(white(String(responseTime)))});
  },
```

当遇到 `await next()` 时会立即跳到下一个中间件——`responseTime` 上。

![](http://qiniu.ningo.cloud/articles/1b4-20.jpg)

再次分享此图来回顾这个过程。

在 `responseTime` 中，只会先执行如下两行（参考上图的执行过程 2）：

```typescript
const start = Date.now();
await next();
```

然后跳转到 `getAllTodos` 控制器中并执行 `getAllTodos` 里的所有代码。

在这个控制器中我们不需要使用 `next()`，它会自动返回到 `responseTime` 中间件中，并执行接下来的内容：

```typescript
const ms: number = Date.now() - start;
response.headers.set(X_RESPONSE_TIME, ${ms}ms)
```

现在，我们便了解了 2、3、4 的执行顺序过程（参见上图）。

这里是发生的具体过程：

- 我们通过执行 `const start = Date.now();` 来捕获以 `ms` 为单位的数据。然后，我们立即调用 `next()` 来跳转到 `getAllTodos` 控制器并运行其中的代码。然后再次返回到 `responseTime` 控制器中。
- 然后，通过执行 `const ms: number = Date.now() - start;` 来减去请求刚来的时间。在这里，它将返回一个毫秒差的数字，将告诉 Deno 执行 getAllTodos 控制器所花费的所有时间。

再次分享这个文件来回顾这个过程：

![](http://qiniu.ningo.cloud/articles/1b4-21.jpg)

- 接下来我们在 `response` 响应头的 Headers 中设置：

```typescript
response.headers.set(X_RESPONSE_TIME, ${ms}ms)
```

将 X-Response-Time 的值设置为 Deno getAllTodos API 所花费的毫秒数。

- 然后从执行顺序 4 返回到执行顺序 5（参考上图）。

在这里简单地编写：

```typescript
const responseTime = response.headers.get(X_RESPONSE_TIME);
console.log(${green(request.method)} ${cyan(request.url.pathname)});
console.log(${bgRed(white(String(responseTime)))});
```

- 打印日志时我们从 `X-Response-Time` 中获取到了执行 API 耗费的时间。
- 接下来我们用带有颜色的字体将其打印在终端。

`request.method` 返回用户请求的方式，比如 `GET, PUT 等`，同时 `request.url.pathname` 返回用户请求的路径，比如 `/todos`。

让我们看看是否能成功运行。

重启服务器：

```bash
$ deno run --allow-net server.ts
```

在 Postman 中打开一个标签页。将请求方式设置为 `GET`，并在 `URL` 输入框中输入 `http://localhost:8080/todos` 后，点击 `Send`：

![](http://qiniu.ningo.cloud/articles/1b4-22.jpg)

在 Postman 中多请求几次 API，然后返回到控制台查看日志时，应该看到类似如下的内容：

![](http://qiniu.ningo.cloud/articles/1b4-23.jpg)

每个 API 请求都会被日志中间件记录在终端。

就是这样 —— 我们搞定了这一切。

如果你在哪里卡住了，可以看看本文的全部源码：[github.com/adeelibr/deno-playground/tree/master/chapter_1:oak](https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak)

我希望你觉得本文会很有帮助，并且真的能帮助你学到一些新的知识。

如果你喜欢，欢迎分享到社交平台上。如果你想要深入交流，可以在 [Twitter](https://twitter.com/adeelibr) 上与我联系。
