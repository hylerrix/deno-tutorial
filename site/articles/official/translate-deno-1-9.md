# 译《Deno v1.9 发布说明》

> - 原文地址：[Deno 1.9 Release Notes](https://deno.com/blog/v1.9)
> - 原文作者：Bartek Iwańczuk, Luca Casonato, Ryan Dahl, Aaron O'Mullan
> - 译者：[@hylerrix](https://github.com/hylerrix)
> - 原文发布时间/翻译时间：20210413/20210430
> - 本文属于《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》系列。

今天我们发布了 Deno v1.9.0。此版本包含了许多新功能、性能优化以及 Bug 修复：

- **原生 HTTP/2 Web 服务器**：Deno 下的一个快速、准确、功能完整的 HTTP 服务器。
- **使用 serde_v8 更快地调用 Rust**：将我们的 op 基准开销优化了 98%。
- **Blob URL 支持与 **`**fetch**`** 改进**：新的 Web 兼容性功能。
- **LSP 中 import 的支持更完整**：本地、远程和注册表的支持现可以再次使用。
- **交互式权限提示框**：以交互式提示框来请求权限而无须预先声明。

如果你已经安装了 Deno，可以通过 `deno upgrade` 命令来更新到 1.9 版本。如果你是第一次体验 Deno，你可以尝试使用如下命令之一：

```bash
# Using Shell (macOS and Linux):
curl -fsSL https://deno.land/x/install/install.sh | sh

# Using PowerShell (Windows):
iwr https://deno.land/x/install/install.ps1 -useb | iex

# Using Homebrew (macOS):
brew install deno

# Using Scoop (Windows):
scoop install deno

# Using Chocolatey (Windows):
choco install deno
```

## 原生 HTTP/2 Web 服务器

目前 Deno 下的 HTTP 服务器 [std/http](https://deno.land/std/http)，是在 TCP 套接字顶部用纯 TypeScript 实现。尽管用了脚本化的 HTTP 服务器，但其依然具有良好的尾部延迟。但是  std/http 的主要缺点在于，它仅仅是 HTTP/1.1，没有提供通向 HTTP/2 的便捷方法。

最终，我们不想忙于编写 HTTP 服务器的工作。HTTP 变得越来越重要，并且在底层代码里已经存在了良好实现的 HTTP 服务器。

因此，我们使用 [Hyper](https://hyper.rs/) 来在 Deno 中构建新的原生 HTTP/2 服务器 API。

与纯 TypeScript 编写的 HTTP 服务器 std/http 相比，该绑定将 http-world 的吞吐量提高了 48%。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1618885267588-a8833216-e0b2-46d8-bb2d-8d32fa40a452.png#height=576&id=hO1uu&margin=%5Bobject%20Object%5D&name=image.png&originHeight=576&originWidth=864&originalType=binary&size=45678&status=done&style=none&width=864)
我们希望尽快稳定这个新的 API，但是现在你必须使用 `--unstable` 标志。欢迎进行测试并给我们提供反馈。

```typescript
const body = new TextEncoder().encode("Hello World");
for await (const conn of Deno.listen({ port: 4500 })) {
  (async () => {
    for await (const { respondWith } of Deno.serveHttp(conn)) {
      respondWith(new Response(body));
    }
  })();
}
```

我们已经很谨慎地使用与 **fetch()** API 相同的 **Request** 和 **Response** 对象。Rust 和 Response 对象都具有流体（streamable bodies），允许与客户端进行全双工通信。

另请参考下文关于 ALPN 的部分，这是通过 TLS 发布 HTTP/2 所必需的。

## 使用 serde_v8 更快地调用 Rust

我们已经将绑定基础设施重建得更加简单和快捷：我们从核心中删除了 1500 多行代码，将基线绑定（又称为 ops 或 opcall）的开销提高了约 65 倍或 -98%，并且建立了干净的 op 基础，可以为我们的发展提供良好的基础（比如用于插件和未来的优化等）。

在 Deno 的早期版本中，opcalls 遵循请求/响应模式，在 ArrayBuffer 的自定义“有效负载”中对其数据进行编码。此前，这些有效负载使用范围从 JSON、flatbuffers 到自定义二进制编码的各种编码...这不仅成为性能瓶颈，也成为复杂性和碎片化的重要起源。

[@AaronO](https://github.com/AaronO) 建议，与其在这些二进制格式（JS 和 Rust）之间来回序列化，[不如直接更有效率地](https://github.com/denoland/deno/issues/9540)在 v8 和 Rust 值之间进行序列化。在此建议和一个快速的原型设计下，[serde_v8](https://github.com/denoland/deno/tree/main/serde_v8) 诞生。`serde_v8` 旨在在 v8 和 Rust 之间提供“最大效率”或“零开销”的双射，同时保持表达性和准确性（因为它建立在 David Tolnay 奇妙的 [serde](https://github.com/serde-rs/serde) 库之上）。

基线 op 开销是衡量给定类 opcall 的最小开销 （单位为每个调用的纳秒） 的一个重要基准。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619651649773-15561fc4-5a83-4e3e-9db5-c750340b2734.png#height=768&id=gwrKs&margin=%5Bobject%20Object%5D&name=image.png&originHeight=768&originWidth=1536&originalType=binary&size=59100&status=done&style=none&width=1536)

这些 op-layer 的改进不仅仅是学术上的，还大大提升了 Deno 的效率，也提高了我们在 [HTTP 基准测试](https://deno.com/blog/v1.9#http-benches)的吞吐量和延迟。你可以在你自己的 Deno 程序中看到在重负荷下或者是以前遇到的 opcall 效率瓶颈时的改进。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619651701252-8ed60358-9325-48d9-8b4b-66974f2928bc.png#height=768&id=RM2Va&margin=%5Bobject%20Object%5D&name=image.png&originHeight=768&originWidth=1536&originalType=binary&size=61096&status=done&style=none&width=1536)

如上所见，Deno 中很多常用的功能现在都可以快 ~3 倍地运行。

## 支持 Blob URL 与改进 `fetch`

此版本下，我们引入了 `blob:`（又称 object URLs）——一个与浏览器中相同的，可以用来创建和撤销 blob URL 的 API：

```typescript
const blob = new Blob(["Hello World!"]);
const url = URL.createObjectURL(blob);
console.log(url); // blob:null/7b09af21-03d5-461e-90a3-af329667d0ac

const resp = await fetch(url);
console.log(await resp.text()); // Hello World!

URL.revokeObjectURL(url);
```

Blob URLs 可用于 `fetch`，使用 `new Worker` 来实例化 Web Worker，以及动态导入（使用`import()`）。

除了 blob URLS，`fetch` 现在还支持 `data` URLs：

```typescript
const resp = await fetch("data:text/plain;base64,SGVsbG8gV29ybGQh");
console.log(await resp.text()); // Hello World!
```

## LSP 中 import 的支持更完整

此版本中，还为 Deno Language Server（一个为 Deno 提供编辑器拓展功能的工具）添加了一些很棒的新功能和改进。

首先，我们从旧的 VS Code 拓展中改进并重新引入了导入补全功能。它允许用户在 import 语句中获得补全。LSP 提供本地文件的补全、已经下载到 DENO——DIR 缓存的文件以及注册表的补全。

这是功能的示例：

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619674354680-5d0fc90d-59f9-4a47-be4c-58526873ad75.png#height=373&id=ztKIY&margin=%5Bobject%20Object%5D&name=image.png&originHeight=373&originWidth=731&originalType=binary&size=226251&status=done&style=none&width=731)

想要开启 [https://deno.land/x](https://deno.land/x) 仓库的补全功能，需要在你的 VS Code（或其它编辑器） 中添加如下配置：

```typescript
{
  "deno": {
    "suggest": {
      "imports": {
        "hosts": {
          "https://deno.land": true
        }
      }
    }
  }
}
```

注册表自动补全功能目前由 [https://deno.land/x](https://deno.land/x) 提供。我们希望更多的其它注册表会根据注册表协议来支持这个功能。[Skypack](https://skypack.dev/) 注册表显示出了相关兴趣，并且可能很快会得到支持。如果要添加对自己注册表的支持，则可以阅读[注册表实现文档](https://github.com/denoland/vscode_deno/blob/main/docs/ImportCompletions.md#module-registry-completions)。

除了新的导入补全功能之外，我们还实现了 `textDocument/foldingRange` 和 `textDocument/selectionRange` 的 LSP 函数，使你的编辑器可以再选择期间提供更好地文本捕捉，并更好地支持折叠和拓展代码块。

此版本还包含许多针对 LSP 的错误修复，其中一个特殊的缺陷是 Windows 系统上的一个讨厌的错误：当 LSP 遇到特定的 `file://` URL时，会导致 LSP 崩溃。

## `--allow-env` 和 `--allow-run` 的白名单

Deno 的多个权限标志接收一个允许列表，使得程序权限可以再细粒度地得到控制。例如，使用 `--allow-read=/tmp` 仅授予对 `/tmp` 目录的读取权限。

在 1.9 之前的版本中，`--allow-env` 和 `--allow-run` 都是全部开启或全部关闭，这意味着通过这些标志将授予对环境变量的完全访问权限，并且可以分别为系统中的任何二进制文件生成子进程。

现在可以精确地指定程序应该访问哪些环境变量，或者允许程序产生哪些子进程：

```bash
$ deno run --allow-env=DEBUG,LOG https://deno.com/v1.9/env_permissions.ts
$ deno run --allow-run=deno https://deno.com/v1.9/run_permissions.ts
```

此外，`Deno.permissions.query()` 现在允许使用命令字段查询执行特定二进制文件的权限：

```typescript
await Deno.permissions.query({ name: "run", command: "deno" });
```

## 交互式权限提示框

当前在 Deno 中，如果你运行的程序确实相应的权限标志，它将抛出错误并退出。在 1.9 中，我们添加了  --pormpt 标志，允许用户迭代地授予运行时所需的权限。

当从 Internet 运行一次性脚本时，使用 --prompt 尤其有用：你无需预先知道所有必需的权限，而是可以在没有任何权限的情况下运行脚本，并根据程序的请求逐一授予或拒绝。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1619678240453-25965a97-de73-4537-a48a-b9589cee6fa5.png#height=200&id=iC4Ki&margin=%5Bobject%20Object%5D&name=image.png&originHeight=200&originWidth=686&originalType=binary&size=151177&status=done&style=none&width=686)

尝试运行这个示例：`deno run --prompt ``[https://deno.com/v1.9/prompt_permissions.ts](https://deno.com/v1.9/prompt_permissions.ts)`。

如果 --prompt 对你有用，请告诉我们，我们正在考虑在将来的版本中默认将其打开。

## `Deno.listenTls` 中的 ALPN 支持

HTTP/2 协议与连接无关。因此，它可以用于 Unix 套接字、TCP 套接字或者使用 TLS 的连接。主流浏览器只允许在 TLS 握手过程中宣布支持 HTTP/2 的 TLS 连接。它通过“应用层协议协商”TLS 扩展来实现，也被称为 ALPN。这种对 TLS 握手的扩展允许 TLS 服务器和客户端就它们将使用哪种应用协议来进行 TLS 连接通信进行协商。HTTP/1.1 和 HTTP/2 是网络上两个主要的应用协议。这些协议的 ALPN 名称分别为“http/1.1”和“h2”。浏览器只会将 HTTP/ 2 请求发送到声明支持 HTTP/2 的服务器。如果没有列出 ALPN 协议，或者在 ALPN 协议中只列出了“http/1.1”，则将使用 HTTP/1.1。

迄今为止，`std/http` 服务器仅支持 HTTP/1.1，因此无需支持 TLS 连接上的 ALPN。当`Deno.serviceHttp` 在这一版本中引入时，事情发生了变化。要在 Deno 中实现完全的 HTTP/2，我们现在添加了对指定 ALPN 协议的支持，当 TLS 侦听器通过 `Deno.ListentLs` 启动时，它将进行公告。

下面是一个创建完全支持 HTTP/2 的 HTTPS 服务器的例子：

```typescript
const listener = Deno.listenTls({
  port: 443,
  certFile: "./cert.pem",
  keyFile: "./key.pem",
  alpnProtocols: ["h2", "http/1.1"],
});

for await (const conn of listener) {
  handleConn(conn);
}

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const { request, respondWith } of httpConn) {
    respondWith(new Response(`Responding to ${request.url}`));
  }
}
```

## 新稳定的 API

1.9 稳定了与文件系统相关的几个 API：

- `Deno.fstat`
- `Deno.fstatSync`
- `Deno.ftruncate`
- `Deno.ftruncateSync`

此外如下方法加入到了 Deno.file 类中：

- `File.stat`
- `File.statSync`
- `File.truncate`
- `File.truncateSync`

## 新弃用的 API

为了使更多使用 Deno 编写的代码直接移植到浏览器和其他非 Deno 运行时中，我们决定弃用并最终从 Deno 命名空间中删除所有不受系统 API 支持的 API。这些 API 将被移植至 Deno 标准库中，该库也可以在浏览器中使用。

在此版本中，我们不推荐使用以下 API：

- `Deno.Buffer`
- `Deno.readAll`
- `Deno.readAllSync`
- `Deno.writeAll`
- `Deno.writeAllSync`
- `Deno.iter`
- `Deno.iterSync`

这些 API 已移至 `std/io` 模块中。我们在 `deno lint` 中引入了一个新的 lint 规则，它可以发现开发者使用这些不稳定的 API，并发出警告。它还会建议开发者在标准库找到该 API。

在 Deno 2.0 中，我们计划删除这些废弃的 API。更激进的弃用信息可能会出现在 2.0 之前的版本。请尽可能快地迁移使用到这些弃用 API 的代码。

## 新的 TypeScript 默认选项 `useDefineForClassFields`

在此发布中，我们修改了默认的 Deno tsconfig，包括 `"useDefineForClassFields": true` 选项。这个选项使 TypeScript 对类字段的处理符合标准 ECMA 脚本语义。此选项不能在用户代码中覆盖。我们希望大部分用户不必更改代码。

> © [https://github.com/hylerrix/deno-tutorial](https://github.com/hylerrix/deno-tutorial) 2020~2021
