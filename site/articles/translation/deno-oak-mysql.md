# Deno + Oak 连接 MySQL 实战教程

> - 原文地址：[How to Use MySQL With Deno and Oak](https://www.freecodecamp.org/news/how-to-use-mysql-in-deno-oak/)
> - 原文作者：Adeel Imran
> - 原文发布时间：2020-06-07
> - 译者：[hylerrix](https://github.com/hylerrix)
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的翻译篇中。
> - 备注：《Deno 钻研之术》电子书官网上线啦！[https://deno-tutorial.js.org](https://deno-tutorial.js.org)
> - 备注：最近着手准备原创 JavaScript 模块化从零到 Deno 模块机制系列 & 构思 Oak 开源应用中...

![](https://cdn.nlark.com/yuque/0/2020/jpeg/86548/1592877025767-bf6733e8-cd46-4f80-84e8-fa677389bf0c.jpeg#align=left&display=inline&height=1333&margin=%5Bobject%20Object%5D&originHeight=1333&originWidth=2000&size=0&status=done&style=none&width=2000)

我最近写了一篇关于 [Deno + Oak 构建酷炫 Todo API](https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/) 的文章 ，其中并没有使用数据库相关的知识点。您可以在我的 Github 仓库 [adeelibr/deno-playground](https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak) 的 chapter_1:oak 中查看当时的整套代码。

> 译者注：翻译版的[《Deno + Oak 构建酷炫的 Todo API》](https://deno-tutorial.js.org/translations/004-deno-oak-todo-api.html)在这里，相关 Demo 也可以在电子书仓库中找到。

本文将进一步讲起，一起来学习如何将 MySQL 集成到我们的 Deno + Oak 项目中。

如果你想随时了解本文的完整代码，可以在 [chapter_2:mysql](https://github.com/adeelibr/deno-playground/tree/master/chapter_2:mysql) 中找到，欢迎给仓库点个 Star。

我将假设你已经阅读了上一篇文章，如果没有，可以先在[此处](https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/)阅读完后再回到本文来。

在我们开始前，请确保你已经安装了一个 MySQL 客户端并你能成功运行：

- MySQL community server [[在这里下载](https://dev.mysql.com/downloads/mysql/)]
- MySQL Workbench [[在这里下载](https://dev.mysql.com/downloads/workbench/)]

同时我也为 MacOS 用户写了一个简短的，关于[如何安装 MySQL 的教程](https://github.com/adeelibr/deno-playground/blob/master/guidelines/setting-up-mysql-mac-os-catalina.md)。

如果你是在 Windows 环境下，你可以使用和上面相同的工具，或者直接使用 [XAMPP](https://www.apachefriends.org/index.html) 来快速运行 MySQL 实例到你的机器上。

当你将 MySQL 成功跑起来后，我们就可以开始本文的探索了。

## 让我们开始吧

假设你已经阅读了[上一篇文章](https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/)，我们将编写如下功能：

- 创建一个 MySQL 数据库的连接；
- 编写一个小脚本，每当我们重启 Deno 服务器时数据库会自动重置；
- 在一个数据表上执行 CRUD 操作；
- 将 CURD 操作连接到我们的 API 控制器中。

开始前的最后一件事：我将上一篇的代码添加 MySQL 版本后的具体 Git 变动可以[在这里](https://github.com/adeelibr/deno-playground/pull/1/commits/5b63b51ebcadededcfec452fe6877a0bd0f1f83f)查阅。

在你的项目根目录中（我的叫做 _`chapter_2:mysql`_，你的可以随便起），创建一个 **db** 文件夹，并在其中创建一个 **config.ts** 并添加如下内容：

```typescript
export const DATABASE: string = "deno";
export const TABLE = {
  TODO: "todo",
};
```

这里没什么新知识点，仅仅导出了我们定义的数据库的名称以及一个 TABLE 对象。通过这个导出，我们的项目中将会有一个名为 “deno” 的数据库，其中又会有一个名为 “todo” 的数据表。

接下来，在 **db** 文件夹中再创建一个名为 **client.ts** 的文件并填充如下内容：

```typescript
import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";

const client = await new Client();
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});
```

这段代码包含了若干条功能。

我们从 Deno 的一个第三方 `mysql` 模块中解构出了 `Client` 变量，这个变量可以用来连接数据库并执行指定的增删改查工作。

```typescript
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});
```

`Client` 内置一个 `connect` 方法，用来供我们设置 `hostname`、`username`、`password` 和 `db` 等字段的值，以设置与 MySQL 的连接配置。

请确保你的 `username` 用户没有设置 `password`，因为目前的 Deno MySQL 模块无法连接有密码的用户。如果你不知道如何清空用户密码，可以阅读[这里](https://github.com/adeelibr/deno-playground/blob/master/guidelines/setting-up-mysql-mac-os-catalina.md#set-your-mysql-password-to-empty)。

我在此处将  `database` 字段留空，因为我想稍后在脚本中手动选择它。

让我们添加一个用来初始化名为“deno”的数据库并为其创建一个名为“todo”表的脚本。

在 `db/client.ts` 文件中我们添加以下内容：

```typescript
import { Client } from "https://deno.land/x/mysql/mod.ts";
// 加载配置文件里的配置
import { DATABASE, TABLE } from "./config.ts";
const client = await new Client();
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});
const run = async () => {
  // 创建一个数据库 (前提是之前没有创建过)
  await client.execute(CREATE DATABASE IF NOT EXISTS ${DATABASE});
  // 选择我们的数据库
  await client.execute(USE ${DATABASE});
  // 如果已经创建过名为 Todo 的数据表，将其删除
  await client.execute(DROP TABLE IF EXISTS ${TABLE.TODO});
  // 创建 Todo 数据表
  await client.execute(CREATE TABLE ${TABLE.TODO} (
        id int(11) NOT NULL AUTO_INCREMENT,
        todo varchar(100) NOT NULL,
        isCompleted boolean NOT NULL default false,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;);
};

run();

export default client;
```

这里我们从我们的最早的配置文件中导入了 `DATABASE` 和 `TABLE`，并通过  `run()` 方法创建相关的数据库和表。

让我们截取 `run()` 方法相关的代码片段。我在代码中已经编写了帮助你理解的注释。

```typescript
const run = async () => {
  // 创建一个数据库 (前提是之前没有创建过)
  await client.execute(CREATE DATABASE IF NOT EXISTS ${DATABASE});
  // 选择我们的数据库
  await client.execute(USE ${DATABASE});
  // 如果已经创建过名为 Todo 的数据表，将其删除
  await client.execute(DROP TABLE IF EXISTS ${TABLE.TODO});
  // 创建 Todo 数据表
  await client.execute(CREATE TABLE ${TABLE.TODO} (
        id int(11) NOT NULL AUTO_INCREMENT,
        todo varchar(100) NOT NULL,
        isCompleted boolean NOT NULL default false,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;);
};

run();
```

- 创建一个名为 `deno` 的数据库，如果之前已经有这个数据库则跳过此步骤。
- 选择我们当前名为 `deno` 的这个数据库。
- 在 `deno` 数据库中，如果名为 `todo` 的表存在，则将其删除。
- 接下来，在 `deno` 数据库中创建一个新的 `todo` 表，并且定义其表结构：表结构将包含一个唯一的、自增长的、数值型的 `id` 字段；也将包含一个名为 `todo` 的字符串型字段；同时还包含一个名为  `isCompleted` 的布尔型字段；最后将 `id` 字段定义为主键。

我写这段代码的原因是因为我不想在 MySQL 实例中有代码上无法直观看出来的信息。有了这段代码后，每次重启服务器时，它都会重新初始化所有内容。

你可以不编写这段代码。但如果不编写的话，则必须手动创建数据库和表。

同时，你也可以查阅 Deno MySQL 模块的 [db creation](https://deno.land/x/mysql/#create-database) 和 [table creation](https://deno.land/x/mysql/#create-table) 文档。

回到文章的主旨，我们已经完成了上面提到的四个目标的两个目标：

- 创建一个 MySQL 数据库的连接；
- 编写一个小脚本，每当我们重启 Deno 服务器时数据库会自动重置。

这意味着本文 50% 的知识点已经介绍完毕。但不幸运的是，现在还测试不了任何数据操作功能。一起来快速添加几个 CRUD 功能来看看具体是怎样执行的。

## 在数据表上执行 CRUD 操作并将功能添加到 API 控制器中

我们需要先编写 Todo 接口。创建 `interfaces/Todo.ts` 文件并添加如下内容：

```typescript
export default interface Todo {
  id?: number,
  todo?: string,
  isCompleted?: boolean,
}
```

代码中的 `?` 符号代表这个键是可选的。之所以这样做是因为接下来我们有的地方仅需要其中的若干个键。

如果你想了解更多 TypeScript 中可选的属性，可以查阅[这里](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties)。

接下来，在根目录创建一个名为 **models** 的文件夹并在其中创建一个名为 **todo.ts** 的文件，添加如下内容：

```typescript
import client from "../db/client.ts";
// 加载配置文件
import { TABLE } from "../db/config.ts";
// 加载接口文件
import Todo from "../interfaces/Todo.ts";

export default {
  /**
   * 通过解构的 id 参数值，来检查相应的 todo 元素是否存在于数据表中
   * @param id
   * @returns 返回布尔值来代表是否存在
   */
  doesExistById: async ({ id }: Todo) => {},
  /**
   * 将会返回 todo 表中的所有内容
   * @returns 返回全部都是 todo 元素的数组
   */
  getAll: async () => {},
  /**
   * 过解构的 id 参数值，来返回相应的 todo 元素
   * @param id
   * @returns 返回一个 todo 元素
   */
  getById: async ({ id }: Todo) => {},
  /**
   * 在 todo 表中增加一个新的 todo 元素
   * @param todo
   * @param isCompleted
   */
  add: async (
    { todo, isCompleted }: Todo,
  ) => {},
  /**
   * 修改某个 todo 元素的内容
   * @param id
   * @param todo
   * @param isCompleted
   * @returns 返回一个数字 (代表影响的行数)
   */
  updateById: async ({ id, todo, isCompleted }: Todo) => {},
  /**
   * 通过 ID 来删除指定的元素
   * @param id
   * @returns integer (count of effect rows)
   */
  deleteById: async ({ id }: Todo) => {},
};
```

此时每个函数都是空的，不用担心，我们接下来会一一填充。

接下来创建 `controllers/todo.ts` 文件并保证填充如下内容：

```typescript
// 加载接口文件
import Todo from "../interfaces/Todo.ts";
// 加载模型操作文件
import TodoModel from "../models/todo.ts";

export default {
  /**
   * @description 获取所有 todo 元素
   * @route GET /todos
   */
  getAllTodos: async ({ response }: { response: any }) => {},
  /**
   * @description 新增一个 todo 元素
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {},
  /**
   * @description 通过 id 获取指定的 todo 元素
   * @route GET todos/:id
   */
  getTodoById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {},
  /**
   * @description 通过 id 更新指定的 todo 元素
   * @route PUT todos/:id
   */
  updateTodoById: async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
    },
  ) => {},
  /**
   * @description 通过 id 删除指定的 todo 元素
   * @route DELETE todos/:id
   */
  deleteTodoById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {},
};
```

这个文件目前同样是空的内容，现在开始一一将其填充吧。

### [Get] 获取全部 Todos 的 API

在 `models/todo.ts` 文件中为 `getAll` 方法添加具体逻辑：

```typescript
import client from "../db/client.ts";
// config
import { TABLE } from "../db/config.ts";
// Interface
import Todo from "../interfaces/Todo.ts";

export default {
   /**
   * 将会返回所有 todo 表中的数据
   * @returns array of todos
   */
  getAll: async () => {
    return await client.query(`SELECT * FROM ${TABLE.TODO}`);
  },
}
```

我们这里直接用 SQL 原生语法来获取表中的所有内容。

除了 `connect`（使用于 db/client.ts 文件中）方法外， `Client` 还公开了另一种方法，即 `query`。通过 `client.query` 方法，我们可以直接从 Deno 代码上运行 MySQL 查询。

接下来打开 `controllers/todo.ts` 文件并为 `getAllTodos` 填充内容：

```typescript
// interfaces
import Todo from "../interfaces/Todo.ts";
// models
import TodoModel from "../models/todo.ts";

export default {
  /**
   * @description 获取所有 todo
   * @route GET /todos
   */
  getAllTodos: async ({ response }: { response: any }) => {
    try {
      const data = await TodoModel.getAll();
      response.status = 200;
      response.body = {
        success: true,
        data,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
}
```

我们这里所做的就是导入 `TodoModel` 对象并使用其中我们刚定义不久的 `getAll` 方法。因为需要该函数需要处理 Promise 类型的异步过程，所以我们将整个函数定义为 async/await 类型。

`TodoModel.getAll()` 方法返回一个数组后，我们将这个数组包装起来并将 `response.body` 的响应状态 `status` 设置为 `200`。

如果执行过程中有任何异常比如 Promise 报错，程序将通过进入 catch 块，向用户返回状态码为 400 的响应体（此时 `success` 为 false，`message` 为错误原因。

就这么简单地搞定了，现在来在终端上运行。

请保证你的 MySQL 实例运行中，然后在终端输入：

```bash
$ deno run --allow-net server.ts 
```

不出意外的话，此时你的终端会有这样类似的结果：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120604886-50fe6669-3837-4a82-bcb6-a2673aff83f4.png#align=left&display=inline&height=146&margin=%5Bobject%20Object%5D&originHeight=146&originWidth=1866&size=0&status=done&style=none&width=1866)

这也是当我通过命令行运行服务器时终端的样子。

终端告诉了我们两件事：

1. Deno API 服务器成功运行在了 8080 端口上；
1. Deno API 服务器程序成功连接到了 MySQL 客户端 `127.0.0.1:3306` （`http://localhost:3306`）上。

让我们测试下我们的 API，我使用的是 [Postman](https://www.postman.com/)，但是你可以用任何你喜欢的 API 测试工具。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120600946-d327c4cb-9ad2-476d-9e34-c7d948da6c1d.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos 后，我们得到了所有 todos 列表。

虽然现在的 todos 列表返回的是空数组，但当我们能成功给 `todo` 数据表增加数据后就会获得更多数据。

棒极了，一个 API 搞定只剩下四个要搞。

### [Post] 新增一个 Todo 的 API

在 `models/todo.ts` 文件中，为 `add()` 函数添加如下内容：

```typescript
export default {
   /**
   * 为 todo 数据表新增一行数据
   * @param todo
   * @param isCompleted
   */
  add: async (
    { todo, isCompleted }: Todo,
  ) => {
    return await client.query(
      `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?)`,
      [
        todo,
        isCompleted,
      ],
    );
  },
}
```

add 函数在参数列表中将解构 `todo` 和 `isCompleted` 两个变量。

同时，上面代码的 `add: async ({ todo, isCompleted }: Todo) => {}` 片段和 `({todo, isCompleted}: {todo:string, isCompleted:boolean})` 语句是等价的。但我们已经在  `interfaces/Todo.ts` 中定义过 Todo 接口：

```typescript
export default interface Todo {
  id?: number,
  todo?: string,
  isCompleted?: boolean,
}
```

此时我们将可以简单地写成  `add: async ({ todo, isCompleted }: Todo) => {}`。这条语句告诉 TypeScript 当前函数有两个参数：字符串类型的 `todo`，以及布尔类型的 `isCompleted`。

如果你想了解更多关于接口的知识，TypeScript 官方文档上有一个绝佳的介绍，可以查看[这里](https://www.typescriptlang.org/docs/handbook/interfaces.html)。

在 add 函数中还有如下代码：

```typescript
return await client.query(
  `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?)`,
  [
    todo,
    isCompleted,
  ],
);
```

这是一条 MySQL 查询语句，可以被拆分为如下两个部分：

- `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?)`。其中的两个问号意味着这里需要使用到变量的值。
- 另一部分 `[todo, isCompleted]` 是上一部分需要使用的变量，其值将会替代 `(?, ?)`。
- `Table.Todo` 是一个从  `db/config.ts` 读取来的字符串，其值为"`todo`"。

接下来在我们的控制器 `controllers/todo.ts` 文件中，编写 `createTodo()` 函数：

```typescript
export default {
   /**
   * @description 新增一个 todo
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

    try {
      await TodoModel.add(
        { todo: body.value.todo, isCompleted: false },
      );
      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
}
```

我们继续将其拆分为两个部分来介绍：

**第一部分**

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

我们在这里所做的是检查用户请求当前接口时是否在 body 中传递了请求数据。如果没有的话将返回一个有 `400` 状态码且包括  `success: false` 和 `message: <erromessage-string>` 的响应体。

**第二部分**

```typescript
try {
  await TodoModel.add(
    { todo: body.value.todo, isCompleted: false },
  );
  response.body = {
    success: true,
    message: "The record was added successfully",
  };
} catch (error) {
  response.status = 400;
  response.body = {
    success: false,
    message: `Error: ${error}`,
  };
}
```

接下来如果没有任何意外错误，则调用 `TodoModel.add()` 函数并返回一个状态为 `200` 且给用户提示执行函数成功的响应体。

否则将进入 catch 代码段，来返回函数执行错误及其原因，正如前文介绍过的 API 一样。

现在我们搞定了。打开你的终端并且确保你的 MySQL 正在运行。在终端输入：

```bash
$ deno run --allow-net server.ts
```

打开 [Postman](https://www.postman.com/) 并且测试当前 API 能否正常运行：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120600265-f1064593-73fd-40c6-9f80-3f57ecf4df96.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [POST] localhost:8080/todos => 将会为 todo 列表新增一个新的数据。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120601570-1c97b07a-1fe8-4aaf-aca9-378529e5b5b5.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

再次执行 [GET] localhost:8080/todos => 将会返回所有 todos，可以看到刚刚新增 todo 已经被加入到数据库中。

很棒，已经搞定了两个 API，只剩三个要做。

### [GET] 通过 ID 查询某 Todo 的 API

在你的 `models/todo.ts` 文件中，为 `doesExistById()` 和 `getById()` 两个函数填充其内容：

```typescript
export default {
   /**
   * Takes in the id params & checks if the todo item exists
   * in the database
   * @param id
   * @returns boolean to tell if an entry of todo exits in table
   */
  doesExistById: async ({ id }: Todo) => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  /**
   * 解构 id 变量 & 返回找到的相关 todo
   * against it.
   * @param id
   * @returns object of todo item
   */
  getById: async ({ id }: Todo) => {
    return await client.query(
      `SELECT * FROM ${TABLE.TODO} WHERE id = ?`,
      [id],
    );
  },
}
```

让我们逐个介绍这两个函数：

- `doesExistById` 函数从参数列表中解构出 `id` 变量，并返回一个 `boolean` 布尔值，来表明想要检测的这个独特 todo 是否存在于数据库中。

```typescript
const [result] = await client.query(
  `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
  [id],
);
return result.count > 0;
```

我们通过 count 值来检查指定 todo 是否存在。如果其值大于 0 返回 `true`，否则返回 `false`。

- `getById` 函数通过指定的 id 返回相应的数据：

```typescript
return await client.query(
  `SELECT * FROM ${TABLE.TODO} WHERE id = ?`,
  [id],
);
```

上面一行代码直接执行了 MySQL 语句，来通过 id 查询数据并返回结果。

接下来，打开 `controllers/todo.ts` 文件并为 `getTodoById` 控制器填充内容：

```typescript
export default {
   /**
   * @description 通过 id 获取相关 tod
   * @route GET todos/:id
   */
  getTodoById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isAvailable = await TodoModel.doesExistById(
        { id: Number(params.id) },
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      const todo = await TodoModel.getById({ id: Number(params.id) });
      response.status = 200;
      response.body = {
        success: true,
        data: todo,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
}
```

这段代码也可以拆分为两段更小的部分来看：

```typescript
const isAvailable = await TodoModel.doesExistById(
  { id: Number(params.id) },
);

if (!isAvailable) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

首先我们通过以下代码来检查想要查找的 todo 是否存在于数据库中：

```typescript
const isAvailable = await TodoModel.doesExistById(
  { id: Number(params.id) },
);
```

我们在其中需要转换 `params.id` 为 `Number` 数值类，因为接口中声明了我们的 `id` 键值必须是一个数字。接下来我们将转换为数值后的 `params.id` 传递给 `doesExistById` 方法，这个方法会返回布尔值。

接着检查这个布尔值，如果是 false 则返回像前文一样的包含 `404` 状态码的响应体：

```typescript
if (!isAvailable) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

第二部分是：

```typescript
try {
  const todo: Todo = await TodoModel.getById({ id: Number(params.id) });
  response.status = 200;
  response.body = {
    success: true,
    data: todo,
  };
} catch (error) {
  response.status = 400;
  response.body = {
    success: false,
    message: `Error: ${error}`,
  };
}
```

这段代码和前文的很像。我们从数据库中获取到指定数据给 `todo` 变量，然后返回响应体。如果执行过程中有任何错误则响应体将包含错误信息返回给用户。

现在打开你的终端并且确保你的 MySQL 正在运行。在终端输入：

```bash
$ deno run --allow-net server.ts
```

打开 [Postman](https://www.postman.com/) 来测试当前接口能否正常运行。

请记住我们每次重启服务器时都会重置数据库。如果你不想要这个功能，你可以注释掉 `db/client.ts` 文件中的整个 `run` 方法。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120600852-9d266fff-b37f-42fe-a9db-1116c8175077.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [POST] localhost:8080/todos => 将会新增一个新的 todo。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120600548-03c7b5e9-a429-475b-b6ed-7b0e0b8ae916.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [POST] localhost:8080/todos => 将会返回所有的 todo。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120601586-f37a1f6e-d480-4822-9dcd-e0c077a49f5a.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos/:id => 将会当查找指定 todo，并返回其内容。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120602036-5ffdd056-87d9-473d-9818-c3c645fa9993.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos/ => 将会返回包含 404 状态码及其错误信息的响应体。

目前我们搞定了如下 API：

- 获取所有 todos
- 创建一个新的 todo
- 通过 ID 获取指定的 Todo

仅剩下的 API：

- 通过 ID 更新指定的 Todo
- 通过 ID 删除指定的 Todo

### [PUT] 通过 ID 更新某 Todo 的 API

让我们先为这个 API 创建模型（models）代码。进入 `models/todo.ts` 文件并为 `updateById` 方法填充其内容：

```typescript
**
 * 更新某个指定 todo
 * @param id
 * @param todo
 * @param isCompleted
 * @returns integer (count of effect rows)
 */
updateById: async ({ id, todo, isCompleted }: Todo) => {
  const result = await client.query(
    `UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?`,
    [
      todo,
      isCompleted,
      id,
    ],
  );
  // return count of rows updated
  return result.affectedRows;
},
```

`updateById` 方法将会从参数列表解构三个变量：`id`、`todo` 以及 `isCompleted`。

我们直接编写了 MySQL 语句来执行查询：

```typescript
const result = await client.query(
  `UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?`,
  [
    todo,
    isCompleted,
    id,
  ],
);
```

这段代码将通过 `id` 来更新指定的 `todo` 其 `isCompleted` 的值。

接下来我们返回此条 MySQL 语句执行后影响到的数据表行数：

```typescript
// return count of rows updated
return result.affectedRows;
```

这个行数值只会是 0 或者 1，且绝不会超过 1。因为我们数据表中的 ID 是唯一的——不同 todo 共用同一 ID的情况是不存在的。

接下来打开 `controllers/todo.ts` 文件并为 `updateTodoById` 方法填充其内容：

```typescript
updateTodoById: async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  try {
    const isAvailable = await TodoModel.doesExistById(
      { id: Number(params.id) },
    );
    if (!isAvailable) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    // 如果 todo 被找到了则更新它
    const body = await request.body();
    const updatedRows = await TodoModel.updateById({
      id: Number(params.id),
      ...body.value,
    });
    response.status = 200;
    response.body = {
      success: true,
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: `Error: ${error}`,
    };
  }
},
```

这段代码和前文的几个 API 中的代码几乎一样。与众不同的地方在这里：

```typescript
// if todo found then update todo
const body = await request.body();
const updatedRows = await TodoModel.updateById({
  id: Number(params.id),
  ...body.value,
});
```

我们将用户传递来的 JSON 格式的 body 数据直接传给 `TodoModel.updateById` 函数。

记得需要转换 `id` 的变量类型为数值型以遵循接口的类型约束。

这行代码执行后将返回受到影响的行数。我们直接将其包装在响应体里返回。执行过程中如果有任何错误，将会被 catch 到并返回通用的报错信息。

让我们来重启服务器来检查是否能成功运行。请确保你的 MySQL 正在运行并在终端输入：

```typescript
$ deno run --allow-net server.ts
```

打开 [Postman](https://www.postman.com/) 来测试当前接口能否正常运行：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120601980-528ffcbb-5171-47c4-a88a-e11a849e86e7.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [PUT] localhost:8080/todos/:id => 将会通过指定的 id 来更新相应的 todo 内容

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120605861-56dee4d7-1a70-4c0a-84ee-96d2b9301ed7.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos/ => 将会返回所有 todo 列表，来验证是否更新成功。

### [DELETE] 通过 ID 删除某 Todo 的 API

在你的 `models/todo.ts` 文件中创建一个 `deleteById` 函数并填充如下内容：

```typescript
/**
 * 通过指定 ID 来删除相应 todo
 * @param id
 * @returns integer (count of effect rows)
 */
deleteById: async ({ id }: Todo) => {
  const result = await client.query(
    `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
    [id],
  );
  // return count of rows updated
  return result.affectedRows;
},
```

这里我们根据解构出的 `id` 值来通过 MySQL 删除指定的元素，并返回受到影响的行数。影响的行数的值依然只能是 0 或者 1，因为这个 ID 最多只会对应一个元素。

接下来，打开 `controllers/todo.ts` 文件并填充 `deleteByTodoId` 方法：

```typescript
/**
 * @description 通过指定 ID 来删除相应 todo 
 * @route DELETE todos/:id
 */
deleteTodoById: async (
  { params, response }: { params: { id: string }; response: any },
) => {
  try {
    const updatedRows = await TodoModel.deleteById({
      id: Number(params.id),
    });
    response.status = 200;
    response.body = {
      success: true,
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: `Error: ${error}`,
    };
  }
},
```

这里很“爽快”地将解构出的 `params.id` 交给 `TodoModel.deleteById` 发方法，并返回此次执行过程中在数据库中的影响行数。

如果执行过程中有任何错误都会返回标准错误响应体。

让我们来检查这个 API 能否成功运行。

请确保你的 MySQL 正在运行，并在终端输入：

```bash
$ deno run --allow-net server.ts
```

打开 [Postman](https://www.postman.com/) 来测试：

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120601647-4163c485-9b93-40b7-95d5-7f89581d2e4c.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos/ => 将会得到所有 todo。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120600928-ca4557e3-eef7-48ce-8d55-4e7b81d49507.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [DELETE] localhost:8080/todos/:id => 将会通过指定的 id 删除相应元素。

![](https://cdn.nlark.com/yuque/0/2020/png/86548/1592120601874-96619e89-242c-407b-8df6-09280e6d90d9.png#align=left&display=inline&height=1165&margin=%5Bobject%20Object%5D&originHeight=1165&originWidth=2000&size=0&status=done&style=none&width=2000)

执行 [GET] localhost:8080/todos/ => 将会返回所有 todo 列表，来看看之前想要删除的 todo 是否还在。

到了这里我们就结束了 Deno + Oak + MySQL 的实战教程。

整篇文章的代码可以在这里看到：[https://github.com/adeelibr/deno-playground](https://github.com/adeelibr/deno-playground)。如果你有任何问题都可以在上面交流。或者提交你的 PR 到仓库中。

如果你感觉本系列很有帮助，可以分享它到社交网络中。同时我的 [Twitter 账号是 @adeelibr](https://twitter.com/adeelibr)。我会很期待听到你的任何想法。
