# Rust 语言入门教程：从实战 To-Do App 开始

> - 原文：[Rust Programming Language Tutorial – How to Build a To-Do List App](https://www.freecodecamp.org/news/how-to-build-a-to-do-app-with-rust/)
> - 作者/译者：Claudio Restifo/[@hylerrix](https://github.com/hylerrix)
> - 发布时间/翻译时间：20210104/20210129
> - 备注：本文遵循 [freeCodeCamp 翻译规范](https://github.com/freeCodeCamp/news-translation)，同时本文会收录在[《Deno 钻研之术》](https://github.com/hylerrix/deno-tutorial)的 Rust 篇中。

![](https://cdn.nlark.com/yuque/0/2021/png/86548/1611302172869-1896d3be-0c1b-444b-a17f-e945faf3c05c.png#align=left&display=inline&height=800&margin=%5Bobject%20Object%5D&name=&originHeight=800&originWidth=1200&size=70280&status=done&style=none&width=1200)

Rust 语言从 2015 年发布的首个开源版本开始，便获得了社区大量的关注。从 [StackOverflow](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages) 上的开发者调查来看，Rust 也是 2016 年每年都最受开发者喜欢的编程语言。

Rust 由 Mozilla 设计，被定义为一个系统级编程语言（就像 C 和 C++）。Rust 没有垃圾处理器，因此性能极为优良。且其中的一些设计也常让 Rust 看起来很高级。

Rust 的学习曲线被普遍认为是较为艰难的。我并不是 Rust 语言的深入了解者，但在这篇教程中，我将尝试提供一些概念的实用方法，来帮助你更深入的理解。

## 我们将在这篇实战教程中构建什么？

我决定通过遵循 JavaScript 应用的悠久传统，来将一个 to-do app 当做我们的第一个 Rust 项目。我们将重点使用命令行，所以有关命令行的知识必须有所了解。同时，你还需要了解一些有关编程概念的基础知识。

这个程序将基于终端运行。我们将存储一些元素的集合，并在其中分别存储一个表示其活动状态的布尔值。

## 我们将会围绕哪些概念来讨论？

- Rust 中的错误处理。
- Options 和 Null 类型。
- Structs 和 impl。
- 终端 I/O。
- 文件系统处理。
- Rust 中的所有权（Ownership）和借用（borrow）。
- 匹配模式。
- 迭代器和闭包。
- 使用外部的包（crates）。

## 在我们开始之前

对于来自 JavaScript 背景的开发者来说，这里有几个我们开始深入前的建议：

- Rust 是一个强类型的语言。这意味着当编译器无法为我们推断类型时，我们需要时刻关注变量类型。
- 同样和 JavaScript 不同的是，Rust 中没有 [AFI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion)。这意味着我们必须主动在语句后键入分号 (";")——除非它是函数的最后一条语句（此时可以省略分号 `;` 来将其当做一条 return）。

> 译者注：AFI，Automatic semicolon insertion，自动分号插入。JavaScript 可以不用写分号，但某些语句也必须使用分号来保证正确地被执行。

事不宜迟，让我们开始吧！

## Rust 如何从零开始

开始的第一步：下载 Rust 到你的电脑上。想要下载，可以在 Rust 官方文档中的[入门篇](https://www.rust-lang.org/learn/get-started)中根据指导来安装。

> 译者注：通过 `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` 安装。

在上面的文档中，你还会找到有关如何将 Rust 与你熟悉的编辑器集成以获得更好开发体验的相关说明。

除了 Rust 编译器本身外，Rust 还附带了一个工具——[Cargo](https://doc.rust-lang.org/cargo/index.html)。Cargo 是 Rust 的包管理工具，就像 JavaScript 开发者会用到的 npm 和 yarn 一样。

要开始一个新项目，请先在终端下进入到你想要创造项目的位置，然后只需运行 `cargo new <project-name>` 即可开始。就我而言，我决定将我的项目命名为“todo-cli”，所以有了如下命令：

```bash
$ cargo new todo-cli
```

现在切入到新创建的项目目录并打印出其文件列表。你应该会在其中看到这两个文件：

```bash
$ tree .
.
├── Cargo.toml
└── src
 └── main.rs
```

在本教程的剩余篇章中，我们将会主要关注在 `src/main.rs` 文件上，所以直接打开这个文件吧。

就像其它众多的编程语言一样，Rust 有一个 main 函数来当作一切的入口。`fn` 来声明一个函数，同时 `println!` 中的 `!` 符号是一个[宏](https://doc.rust-lang.org/book/ch19-06-macros.html)（macro）。你很可能会立马看出来，这是 Rust 语言下的一个“`Hello World`”程序。

想要编译并运行这个程序，可以直接直接 `cargo run`。

```bash
$ cargo run
Hello world!
```

## 如何读取命令行参数

我们的目标是让我们的 CLI 工具接收两个参数：第一个参数代表要执行的操作类型，第二个参数代表要操作的对象。

我们将从读取并打印用户输入的参数开始入手。

使用如下内容**替换**掉 main 函数里的内容：

```rust
let action = std::env::args().nth(1).expect("Please specify an action");
let item = std::env::args().nth(2).expect("Please specify an item");

println!("{:?}, {:?}", action, item);
```

来一起消化下代码里的重要信息：

- `let` [[文档]](https://doc.rust-lang.org/std/keyword.let.html) 给变量绑定一个值
- `std::env::args()` [[文档]](https://doc.rust-lang.org/std/env/fn.args.html) 是从标准库的 env 模块中引入的函数，该函数返回启动程序时传递给其的参数。由于它是一个迭代器，我们可以使用 `nth()` 函数来访问存储在每个位置的值。位置 0 引向程序本身，这也是为什么我们从第一个元素而非第零个元素开始读取的原因。
- `expect()` [[文档]](https://doc.rust-lang.org/std/option/enum.Option.html#method.expect) 是一个 `Option` 枚举定义的方法，该方法将返回一个需要给定的值，如果给定的值不存在，则程序立即会被停止，并打印出指定的错误信息。

由于程序可以不带参数直接运行，因此 Rust 通过给我们提供 Option 类型来要求我们检查是否确实提供了该值。

作为开发者，我们有责任确保在每种条件下都采取适当的措施。

目前我们的程序中，如果未提供参数，程序会被立即退出。

让我们通过如下命令运行程序的同时传递两个参数，记得参数要附加在 `--` 之后。

```bash
$ cargo run -- hello world!
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
     Running target/debug/todo_cli hello 'world'\!''
"hello", "world!"
```

## 如何使用一个自定义类型插入和保存数据

让我们考虑一下我们想在这个程序中实现的目标：能够读取用户在命令行输入的参数，更新我们的 todo 清单，然后存储到某个地方来提供记录。

为了达到这个目标，我们将实现自定义类型，来在其中满足我们的业务。

我们将使用 Rust 中的 [struct](https://doc.rust-lang.org/std/keyword.struct.html)（结构体），它使开发者能设计有着更优良结构的代码，从而避免了必须在主函数中编写所有的代码。

### 如何定义我们的结构体

由于我们将在项目中会用到很多 HashMap，因此我们可以考虑将其纳入自定义结构体中。

在文件顶部添加如下行：

```rust
use std::collections::HashMap
```

这将让我们能直接地使用 `HashMap`，而无需每次使用时都键入完整的包路径。

在 main 函数的下方，让我们添加以下代码：

```rust
struct Todo {
  // 使用 Rust 内置的 HashMap 来保存 key - val 键值对。
  map: HashMap<String, bool>,
}
```

这将定义出我们需要的 Todo 类型：一个有且仅有 map 字段的结构体。

这个字段是 [HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html) 类型。你可以将其考虑为一种 JavaScript 对象，在 Rust 中要求我们声明键和值的类型。

- `HashMap<String, bool>` 表示我们具有一个字符串组成的键，其值是一个布尔值：在应用中来代表当前元素的活动状态。

### 如何给我们的结构体中新增方法

方法就像常规的函数一样——都是由 `fn` 关键字来声明，都接受参数且都可以有返回值。

但是，它们与常规函数不同之处在于它们是在 struct 上下文中定义的，并且它们的第一个参数始终是 `self`。

我们将定义一个 _impl_（实现）代码块在上文新增的结构体下方。

```rust
impl Todo {
  fn insert(&mut self, key: String) {
    // 在我们的 map 中新增一个新的元素。
    // 我们默认将其状态值设置为 true
    self.map.insert(key, true);
  }
}
```

该函数内容十分简单明了：它通过使用 HashMap 内置的 [insert](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.insert) 方法将传入的 key 插入到 map 中。

其中两个很重要的知识是：

- **mut**  [[doc]](https://doc.rust-lang.org/std/keyword.mut.html) 设置一个可变变量
  - 在 Rust 中，每个变量默认是不可变的。如果你想改变一个值，你需要使用 `mut` 关键字来给相关变量加入可变性。由于我们的函数需要通过修改 map 来添加新的值，因此我们需要将其设置为可变值。
- **&**  [[doc]](https://doc.rust-lang.org/std/primitive.reference.html) 标识一个引用。
  - 你可以认为这个变量是一个指针，指向内存中保存这个值的具体地方，并不是直接存储这个值。
  - 在 Rust 属于中，这被认为是一个**借用**（borrow），意味着函数并不拥有该变量，而是指向其存储位置。

## Rust 所有权系统的简要概览

有了前面关于借用（borrow）和引用（reference）的知识铺垫，现在是个很好的时机来简要地讨论 Rust 里的所有权（ownership）。

所有权是 Rust 中最独特的功能，它使 Rust 程序员无需手动分配内存（例如在 C/C++ 中）就可以编写程序，同时仍可以在无需垃圾收集器（如 JavaScript 或 Python）的情况下运行，Rust 会不断查看程序的内存以释放未使用的资源。

所有权系统有如下三个规则：

- Rust 中每个值都有一个变量：即为其所有者。
- 每个值一次只能有一个所有者。
- 当所有者超出范围时，该值将被删除。

Rust 会在编译时检查这些规则，这意味着是否以及何时要在内存中释放值需要被开发者明确指出。

思考一下如下示例：

```rust
fn main() {
  // String 的所有者是 x
  let x = String::from("Hello");

  // 我们将值移动到此函数中
  // 现在 doSomething 是 x 的所有者
  // 一旦超出 doSomething 的范围
  // Rust 将释放与 x 关联的内存。
  doSomething(x);

  // 由于我们尝试使用值 x，因此编译器将引发错误
  // 因为我们已将其移至 doSomething 内
  // 我们此时无法使用它，因为此时已经没有所有权
  // 并且该值可能已经被删除了
  println!("{}", x);
}
```

在学习 Rust 时，这个概念被广泛地认为是最难掌握的，因为它对许多程序员来说都是新概念。

你可以从 Rust 的官方文档中阅读有关[所有权](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)的更深入的说明。

我们不会深入研究所有权制度的来龙去脉。现在，请记住我上面提到的规则。尝试在每个步骤中考虑是否需要“拥有”这些值后删除它们，或者是否需要继续引用它以便可以保留它。

例如，在上面的 insert 方法中，我们不想拥有 `map`，因为我们仍然需要它来将其数据存储在某个地方。只有这样，我们才能最终释放被分配的内存。

### 如何将 map 保存到硬盘上

由于这是一个演示程序，因此我们将采用最简单的长期存储解决方案：将 map 写入文件到磁盘。

让我们在 `impl` 块中创建一个新的方法。

```rust
impl Todo {
  // [其余代码]
  fn save(self) -> Result<(), std::io::Error> {
    let mut content = String::new();
    for (k, v) in self.map {
      let record = format!("{}\t{}\n", k, v);
      content.push_str(&record)
    }
    std::fs::write("db.txt", content)
  }
}
```

- `->` 表示函数返回的类型。我们在这里返回的是一个 `Result` 类型。
- 我们遍历 map，并分别格式化出一个字符串，其中同时包括 key 和 value，并用 tab 制表符分隔，同最后用新的一个换行符来结尾。
- 我们将格式化的字符串放入到 content 变量中。
- 我们将 `content` 容写入名为 `db.txt` 的文件中。

值得注意的是，`save` 拥有自 self 的_所有权_。此时，如果我们在调用 save 之后意外尝试更新 map，编译器将会阻止我们（因为 self 的内存将被释放）。

这是一个完美的例子，展示了如何使用 Rust 的内存管理来创建更为严格的代码，这些代码将无法编译（以防止开发过程中的人为错误）。

### 如何在 main 中使用结构体

现在我们有了这两种方法，就可以开始使用了。现在我们将继续在之前编写的 main 函数内编写功能：如果提供的操作是 add，我们将该元素插入并存储到文件中以供未来使用。

将如下代码添加到之前编写的两个参数绑定的下方：

```rust
fn main() {
  // ...[参数绑定代码]

  let mut todo = Todo {
    map: HashMap::new(),
  };
  if action == "add" {
    todo.insert(item);
    match todo.save() {
      Ok(_) => println!("todo saved"),
      Err(why) => println!("An error occurred: {}", why),
    }
  }
}
```

让我们看看我们都做了什么：

- `let mut todo = Todo` 让我们实例化一个结构体，绑定它到一个可变变量上。
- 我们通过 `.` 符号来调用 `TODO insert` 方法。
- 我们将[匹配](https://doc.rust-lang.org/std/keyword.match.html) save 功能返回的结果，并在不同情况下载屏幕上显示一条消息。

让我们测试运行吧。打开终端并输入：

```rust
$ cargo run -- add "code rust"
todo saved
```

让我们来检查元素是否真的保存了：

```console
$ cat db.txt
code rust true
```

你可以在这个 [gist](https://gist.github.com/Marmiz/b67e98c2fc7be3561d124294cf3cb6ac) 中找到完整的代码片段。

## 如何读取文件

现在我们的程序有个根本性的缺陷：每次“add”添加时，我们都会重写整个 map 而不是对其进行更新。这是因为我们在程序运行的每一次都创造一个全新的空 map 对象，现在一起来修复它。

### 在 TODO 中新增 new 方法

我们将为 Todo 结构实现一个新的功能。调用后，它将读取文件的内容，并将已存储的值返回给我们的 Todo。请注意，这不是一个方法，因为它没有将 self 作为第一个参数。

我们将其称为 `new`，这只是一个 Rust 约定（请参阅之前使用的 `HashMap::new()`）。

让我们在 impl 块中添加以下代码：

```rust
impl Todo {
  fn new() -> Result<Todo, std::io::Error> {
    let mut f = std::fs::OpenOptions::new()
      .write(true)
      .create(true)
      .read(true)
      .open("db.txt")?;
    let mut content = String::new();
    f.read_to_string(&mut content)?;
    let map: HashMap<String, bool> = content
      .lines()
      .map(|line| line.splitn(2, '\t').collect::<Vec<&str>>())
      .map(|v| (v[0], v[1]))
      .map(|(k, v)| (String::from(k), bool::from_str(v).unwrap()))
      .collect();
    Ok(Todo { map })
  }

// ...剩余的方法
}
```

如果看到上面的代码感到头疼的话，请不用担心。我们这里使用了一种更具函数式的编程风格，主要是用来展示 Rust 支持许多其他语言的范例，例如迭代器，闭包和 lambda 函数。

让我们看看上面代码都具体发生了什么：

- 我们定义了一个 `new` 函数，其会返回一个 Result 类型，要么是 `Todo` 结构体要么是 `io:Error`。
- 我们通过定义各种 [OpenOptions](https://doc.rust-lang.org/std/fs/struct.OpenOptions.html) 来配置如何打开“db.txt”。最显著的是 `create(true)` 标志，这代表如果该文件不存在则创建这个文件。
- `f.read_to_string(&mut content)?` 读取文件中的所有字节，并将它们附加到 `content` 字符串中。
  - _注意_：记得添加使用 `std:io::Read` 在文件的顶部以及其他 use 语句来使用 `read_to_string` 方法。
- 我们需要将文件中的 String 类型转换为 HashMap。为此我们将 map 变量与此行绑定：`let map: HashMap<String, bool>`。
  - 这是编译器在为我们推断类型时遇到麻烦的情况之一，因此我们需要自行声明。
- lines [[文档]](https://doc.rust-lang.org/std/primitive.str.html#method.lines) 在字符串的每一行上创建一个 Iterator 迭代器，来在文件的每个条目中进行迭代。因为我们已在每个条目的末尾使用了 `/n` 格式化。
- map [[文档]](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map) 接受一个闭包，并在迭代器的每个元素上调用它。
- `line.splitn(2, '\t')` [[文档]](https://doc.rust-lang.org/std/primitive.str.html#method.splitn) 将我们的每一行通过 tab 制表符切割。 
- `collect::<Vec<&str>>()` [[文档]](https://doc.rust-lang.org/core/iter/trait.Iterator.html#method.collect) 是标准库中最强大的方法之一：它将迭代器转换为相关的集合。
  - 在这里，我们告诉 map 函数通过将 `::Vec<&str>` 附加到方法中来将我们的 Split 字符串转换为借来的字符串切片的 Venctor，这回告诉编译器在操作结束时需要哪个集合。
- 然后为了方便起见，我们使用 `.map(|v| (v[0], v[1]))` 将其转换为元祖类型。
- 然后使用 `.map(|(k, v)| (String::from(k), bool::from_str(v).unwrap()))` 将元祖的两个元素转换为 String 和 boolean。
  - 注意：记得添加 `use std::str::FromStr;` 在文件顶部以及其它 use 语句，以便能够使用 from_str 方法。
- 我们最终将它们收集到我们的 HashMap 中。这次我们不需要声明类型，因为 Rust 从绑定声明中推断出了它。
- 最后，如果我们从未遇到任何错误，则使用 `Ok(Todo { map })` 将结果返回给调用方。
  - 注意，就像在 JavaScript 中一样，如果键和变量在结构内具有相同的名称，则可以使用较短的表示法。

_phew!_

![](https://cdn.nlark.com/yuque/0/2021/gif/86548/1611302104430-0cd9e432-dab4-4e0b-bf55-fba774e75349.gif#align=left&display=inline&height=490&margin=%5Bobject%20Object%5D&originHeight=490&originWidth=734&size=0&status=done&style=none&width=734)

你做的很棒！图片来源于 [https://rustacean.net/](https://rustacean.net/)。

### 另一种等价方式

尽管通常认为 map 更为好用，但以上内容也可以通过基本的 `for` 循环来使用。你可以选择自己喜欢的方式。

```rust
fn new() -> Result<Todo, std::io::Error> {
  // 打开 db 文件
  let mut f = std::fs::OpenOptions::new()
    .write(true)
    .create(true)
    .read(true)
    .open("db.txt")?;
  // 读取其内容到一个新的字符串中
  let mut content = String::new();
  f.read_to_string(&mut content)?;
  
  // 分配一个新的空的 HashMap
  let mut map = HashMap::new();
  
  // 遍历文件中的每一行
  for entries in content.lines() {
    // 分割和绑定值
    let mut values = entries.split('\t');
    let key = values.next().expect("No Key");
    let val = values.next().expect("No Value");
    // 将其插入到 HashMap 中
    map.insert(String::from(key), bool::from_str(val).unwrap());
  }
  // 返回 Ok
  Ok(Todo { map })
}
```

上述代码和之前的函数式代码是功能性等价的关系。

### 如何使用这个新方法

在 main 中，只需要用以下代码块来初始化 todo 变量：

```rust
let mut todo = Todo::new().expect("Initialisation of db failed");
```

现在如果我们回到终端并执行若干个如下“add”命令，我们应该可以看到我们的数据库被正确的更新了。

```console
$ cargo run -- add "make coffee"
todo saved
$ cargo run -- add "make pancakes"
todo saved
$ cat db.txt
make coffee     true
make pancakes   true
```

你可以在这个 [gist](https://gist.github.com/Marmiz/b659c7835054d25513106e3804c4539f) 中找到目前阶段下所有的完整代码。

## 如何在集合中更新一个值

正如所有的 todo app 一样，我们希望不仅能够添加项目，而且能够对齐进行状态切换并将其标记为已完成。

### 如何新增 complete 方法

我们需要在 Todo 结构体中新增一个 complete 方法。在其中，我们获取到 key 的引用值，并更新其值。在 key 不存在的情况下，返回 `None`。

```rust
impl Todo {
  // [其余的 TODO 方法]

  fn complete(&mut self, key: &String) -> Option<()> {
    match self.map.get_mut(key) {
      Some(v) => Some(*v = false),
      None => None,
    }
  }
}
```

让我们看看上面代码发生了什么：

- 我们声明了方法的返回类型：一个空的 `Option`。
- 整个方法返回 `Match` 表达式的结果，该结果将为空 `Some() `或 `None`。
- 我们使用 `*` [[文档]](https://doc.rust-lang.org/book/appendix-02-operators.html) 运算符来取消引用该值，并将其设置为 false。

### 如何使用 complete 方法

我们可以像之前使用 insert 一样使用 “complete” 方法。

在 `main` 函数中，我们使用 `else if` 语句来检查命令行传递的动作是否是“complete”。

```rust
// 在 main 函数中

if action == "add" {
  // add 操作的代码
} else if action == "complete" {
  match todo.complete(&item) {
    None => println!("'{}' is not present in the list", item),
    Some(_) => match todo.save() {
      Ok(_) => println!("todo saved"),
      Err(why) => println!("An error occurred: {}", why),
    },
  }
}
```

是时候来分析我们在上述代码中做的事了：

- 如果我们检测到返回了 Some 值，则调用 todo.save 将更改永久存储到我们的文件中。
- 我们匹配由 `todo.complete(&item)` 方法返回的 Option。
- 如果返回结果为 `None`，我们将向用户打印警告，来提供良好的交互性体验。
   - 我们通过 `&item` 将 item 作为引用传递给“todo.complete”方法，以便 main 函数仍然拥有该值。这意味着我们可以再接下来的 `println!` 宏中继续使用到这个变量。
   - 如果我们不这样做，那么该值将由“complete”用于，最终被意外丢弃。
- 如果我们检测到返回了 `Some` 值，则调用 `todo.save` 将此次更改永久存储到我们的文件中。

和之前一样，你可以在这个 [gist](https://gist.github.com/Marmiz/1480b31e8e0890e8745e7b6b44a803b8) 中找到目前阶段下的所有相关代码。

## 运行这个程序吧

现在是时候在终端来完整运行我们开发的这个程序了。让我们通过先删除掉之前的 db.txt 来从零开始这个程序：

```bash
$ rm db.txt
```

然后在 todos中进行新增和修改操作：

```bash
$ cargo run -- add "make coffee"
$ cargo run -- add "code rust"
$ cargo run -- complete "make coffee"
$ cat db.txt
make coffee     false
code rust       true
```

这意味着在这些命令执行完成后，我们将会得到一个完成的元素（“make coffee”），和一个尚未完成的元素（“code rust”）。

假设我们此时再重新新增一个喝咖啡的元素“make coffee”：

```bash
$ cargo run -- add "make coffee"
$ cat db.txt
make coffee     true
code rust       true
```

## 番外：如何使用 Serde 将其存储为 JSON

该程序即使很小，但也能正常运行了。此外，我们可以稍微改变一些逻辑。对于来自 JavaScript 世界的我，决定将值存储为 JSON 文件而不是纯文本文件。

我们将借此机会了解如何安装和使用来自 Rust 开源社区的名为 [creates.io](https://crates.io/) 的软件包。

### 如何安装 serde

要将新的软件包安装到我们的项目中，请打开 `cargo.toml` 文件。在底部，你应该会看到一个 `[dependencies]` 字段：只需要将以下内容添加到文件中：

```rust
[dependencies]
serde_json = "1.0.60"
```

这就够了。下次我们运行程序的时候，cargo 将会编译我们的程序并下载和导入这个新的包到我们的项目之中。

### 如何改动 Todo::New

我们要使用 Serde 的第一个地方是在读取 db 文件时。现在，我们要读取一个 JSON 文件而非“.txt”文件。

在 `impl` 代码块中，我们更像一下 `new` 方法：

```rust
// 在 Todo impl 代码块中

fn new() -> Result<Todo, std::io::Error> {
  // 打开 db.json
  let f = std::fs::OpenOptions::new()
    .write(true)
    .create(true)
    .read(true)
    .open("db.json")?;
  // 序列化 json 为 HashMap
  match serde_json::from_reader(f) {
    Ok(map) => Ok(Todo { map }),
    Err(e) if e.is_eof() => Ok(Todo {
      map: HashMap::new(),
    }),
    Err(e) => panic!("An error occurred: {}", e),
  }
}
```

值得注意的改动是：

- 文件选项不再需要 `mut f` 来绑定，因为我们不需要像以前一样手动将内容分配到 String 中。Serde 会来处理相关逻辑。
- 我们将文件拓展名更新为了 `db.json`。
- `serde_json::from_reader` [[文档]](https://docs.serde.rs/serde_json/fn.from_reader.html) 将为我们反序列化文件。它会干扰 map 的返回类型，并会尝试将 JSON 转换为兼容的 HashMap。如果一切顺利，我们将像以前一样返回 Todo 结构。
- `Err(e) if e.is_eof()` 是一个[匹配守卫](https://doc.rust-lang.org/reference/expressions/match-expr.html#match-guards)，可让我们优化 Match 语句的行为。
   - 如果 Serde 作为错误返回一个过早的 EOF（文件结尾），则意味着该文件完全为空（例如，在第一次运行时，或如果我们删除了该文件）。在那种情况下，我们从错误中恢复并返回一个空的 HashMap。
- 对于其它所有错误，程序会立即被中断退出。

### 如何改动 Todo.save

我们要使用 Serde 的另一个地方是将 map 另存为 JSON。为此，将 impl 块中的 `save` 方法更新为：

```rust
// 在 Todo impl 代码块中
fn save(self) -> Result<(), Box<dyn std::error::Error>> {
  // 打开 db.json
  let f = std::fs::OpenOptions::new()
    .write(true)
    .create(true)
    .open("db.json")?;
  // 通过 Serde 写入文件
  serde_json::to_writer_pretty(f, &self.map)?;
  Ok(())
}
```

和以前一样，让我们看看这里所做的更改：

- `Box<dyn std::error::Error>`。这次我们返回一个包含 Rust 通用错误实现的 [Box](https://doc.rust-lang.org/std/boxed/index.html)。
  - 简而言之，Box 是指向内存中分配的指针。
  - 由于打开文件时可能会返回 Serde 错误，所以我们实际上并不知道函数会返回这两个错误里的哪一个。
  - 因此我们需要返回一个指向可能错误的指针，而不是错误本身，以便调用者处理它们。
- 我们当然已经将文件名更新为 `db.json` 以匹配文件名。
- 最后，我们让 Serde 承担繁重的工作：将 HashMap 编写为 JSON 文件。
- 请记得从文件顶部删除 `use std::io::Read;` 和 `use std::str::FromStr;`，因为我们不再需要它们了。

这就搞定了。

现在你可以运行你的程序并检查输出是否保存到文件中。如果一切都很顺利，你会看到你的 todos 都保持为 JSON 了。

你可以在这个 [gist](https://gist.github.com/Marmiz/541c3ccea832a27bfb60d4882450a4a8) 中阅读当前阶段下完整的代码。

## 结语、技巧和更多资源

这是一段漫长的旅程，很荣幸你能阅读到这里。

我希望你能在这个教程中学到一些东西，并产生了更多的好奇心。别忘了我们在这里介绍的是一门非常“底层”的语言。

这是 Rust 吸引我的重要原因——Rust 使我能够编既快速又具有内存效率的代码，而不必畏惧承担过多的编码责任：我知道编译器会帮我优化更多，在运行前可能会出现错误的情况下提前中断运行。

在结束前，我想向你分享一些其他技巧和资源，以帮助你在 Rust 的旅途中继续前行：

- [Rust fmt ](https://github.com/rust-lang/rustfmt)是一个非常方便的工具，你可以按照一致的模式运行以格式化代码。不必再浪费时间配置你喜欢的 linter 插件。
- `cargo check` [[文档]](https://doc.rust-lang.org/cargo/commands/cargo-check.html) 将尝试在不运行的情况下编译代码：这在你只想在不实际运行时检查代码正确性的情况下，会变得很有用。
- Rust 带有集成的测试套件和生成文档的工具：[cargo test](https://doc.rust-lang.org/cargo/commands/cargo-test.html) 和 [cargo doc](https://doc.rust-lang.org/cargo/commands/cargo-rustdoc.html)。这次我们没有涉及它们，因为本教程内容量已经足够多了，或许未来会有所涉及。

想要了解有关 Rust 的更多内容，我认为这些资源真的很棒：

- 官方 [Rust 网站](https://www.rust-lang.org/)，所有重要信息的聚集地。
- 如果你喜欢通过聊天来互动交流，Rust 的 Discord [服务器](https://discord.gg/rust-lang)是个很活跃和有用的社区。
- 如果你想要通过读书来学习，“Rust 程序设计语言”一书是个很好的选择。
- 如果你更喜欢视频类型的资料，Ryan Levick 的“[Rust 介绍](https://youtu.be/WnWGO-tLtLA)”视频系列是个很棒的资源。

你可以在 [Github](https://github.com/Marmiz/todo-cli) 中找到本文的相关源码。

文中的插图来自于 [https://rustacean.net/](https://rustacean.net/)。

感谢阅读，祝你编码愉快！

## 译者结语

由于《[Deno 钻研之术](https://github.com/hylerrix/deno-tutorial)》的铺垫，Rust 语言的探索之旅也正式开启。在本文阅读的过程中，如果 cargo 安装包下载速度太慢的话，可以将 cargo 源设置为 [https://mirrors.ustc.edu.cn/](https://mirrors.ustc.edu.cn/)。

最后，随着这篇文章的结束，一月结束。二月份会除了 Deno 期刊外停更一段时间文章，这段时间会以编码和高效学习为主，重点包括但不限于：

- 《[ECMAScript+ 面试宝典](https://github.com/hylerrix/es-interview)》：打造 2021 年的面试宝典。
- 《[Deno LeetCode 算法之旅](https://github.com/hylerrix/deno-algorithm)》 - 暂译名：在 Deno 下使用 TypeScript 刷 LeetCode 算法。
- ...实现我的更多开源灵感。

欢迎持续关注！Github：[https://github.com/hylerrix](https://github.com/hylerrix/)，公众号（@ningowood）。
