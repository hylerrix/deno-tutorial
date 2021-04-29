import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "Rust 语言入门教程：从实战 To-Do App 开始",
        "link": "articles/rust/rust-tutorial-todo-app.html"
    },
    'next': {
        "text": "感谢",
        "link": "articles/THANKS.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/TIMELINE.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/TIMELINE.html",
    'title': "开发日志",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>开发日志</h1>\n<h2 id="20210323">20210323<a class="anchor" href="#20210323">§</a></h2>\n<ul>\n<li>这段时间翻译了 Deno 两篇官方博客，分类为精读系列</li>\n<li>翻译了一篇 Rust 文章</li>\n<li>持续更新版本 -&gt; Pagic @v1.2.0, Deno @v1.8.0</li>\n<li>增加了《Blitz.js + React 全栈开发手册》的宣传</li>\n</ul>\n<h2 id="20200924">20200924<a class="anchor" href="#20200924">§</a></h2>\n<ul>\n<li>升级 Pagic v0.9.1 + Github Action</li>\n<li>重新整理骨架并填充其内容</li>\n<li>首页支持，二级目录支持</li>\n<li>彻底解决图床问题 -&gt; 七牛云（其实最后没解决）</li>\n</ul>\n<h2 id="20200805">20200805<a class="anchor" href="#20200805">§</a></h2>\n<ul>\n<li>修复部分图片外链 403 问题 - 切换为七牛云图床</li>\n</ul>\n<h2 id="20200707">20200707<a class="anchor" href="#20200707">§</a></h2>\n<ul>\n<li>更新 Pagic 为最新版本并使用其最新功能\n<ul>\n<li>每个文件夹填充 <a href="http://README.md">README.md</a> 来介绍</li>\n<li>增加赞助功能</li>\n</ul>\n</li>\n<li>细化目录结构 -&gt; 未来等 pagic 1.0 三级目录结构</li>\n<li>引入 <a href="https://github.com/gitalk/gitalk">Gittalk</a></li>\n</ul>\n<h2 id="20200616">20200616<a class="anchor" href="#20200616">§</a></h2>\n<ul>\n<li>这两天合并了 <a href="https://github.com/justjavac">@justjavac</a> 的若干个关于 Github Actions 的优化与更新：\n<ul>\n<li>优化：部署方式；</li>\n<li>更新：根据不同环境分析不同 Google Analysis。</li>\n</ul>\n</li>\n</ul>\n<h2 id="20200612">20200612<a class="anchor" href="#20200612">§</a></h2>\n<ul>\n<li>随着 Pagic 主题修复 Bug，增加 Google Analytics 分析。</li>\n</ul>\n<h2 id="20200611">20200611<a class="anchor" href="#20200611">§</a></h2>\n<ul>\n<li>向 <a href="http://js.org/">js.org</a> 提交 PR 注册域名。</li>\n<li>花费了一些时间来思考 Github Pages 为什么 404，同时显示 <code>http://hylerrix.github.io/deno-tutorial/</code>。</li>\n<li>线上网站在 <a href="http://js.org">js.org</a> 上部署成功：<a href="https://deno-tutorial.js.org">deno-tutorial.js.org</a>。</li>\n</ul>\n<h2 id="20200609">20200609<a class="anchor" href="#20200609">§</a></h2>\n<blockquote>\n<p>遇到问题不要慌，放好心态，逐步排查，然后搜重点，实在不行社区里问问题。</p>\n</blockquote>\n<ul>\n<li>合并 (#4)[<a href="https://github.com/hylerrix/deno-tutorial/pull/4">https://github.com/hylerrix/deno-tutorial/pull/4</a>] PR。</li>\n<li>三小时尝试构建 pagic，解决了如下安装时的问题：\n<ul>\n<li>报错 <code>error: Uncaught Http: error sending request for url (https://raw.githubusercontent.com/pillarjs/path-to-regexp/v6.1.0/src/index.ts): error trying to connect: tcp connect error: Connection refused (os error 61)</code>：给 <code>/etc/hosts</code> 文件增加 <code>199.232.68.133 raw.githubusercontent.com</code> 即可。</li>\n<li>报错 <code>TS2345 [ERROR]: Argument of type \'{ type: string; }\' is not assignable to parameter of type \'string\'.</code>：升级 Deno 版本到 v1.0.5 即可。</li>\n</ul>\n</li>\n</ul>\n<h2 id="2020051320200531">20200513~20200531<a class="anchor" href="#2020051320200531">§</a></h2>\n<ul>\n<li>值 Deno v1.0 发布之际开源本电子书。</li>\n<li>这段时间创作了两篇文章并授权翻译了三篇文章。</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u5F00\u53D1\u65E5\u5FD7"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="20210323">20210323<a class="anchor" href="#20210323">§</a></h2>\n<ul>\n<li>这段时间翻译了 Deno 两篇官方博客，分类为精读系列</li>\n<li>翻译了一篇 Rust 文章</li>\n<li>持续更新版本 -&gt; Pagic @v1.2.0, Deno @v1.8.0</li>\n<li>增加了《Blitz.js + React 全栈开发手册》的宣传</li>\n</ul>\n<h2 id="20200924">20200924<a class="anchor" href="#20200924">§</a></h2>\n<ul>\n<li>升级 Pagic v0.9.1 + Github Action</li>\n<li>重新整理骨架并填充其内容</li>\n<li>首页支持，二级目录支持</li>\n<li>彻底解决图床问题 -&gt; 七牛云（其实最后没解决）</li>\n</ul>\n<h2 id="20200805">20200805<a class="anchor" href="#20200805">§</a></h2>\n<ul>\n<li>修复部分图片外链 403 问题 - 切换为七牛云图床</li>\n</ul>\n<h2 id="20200707">20200707<a class="anchor" href="#20200707">§</a></h2>\n<ul>\n<li>更新 Pagic 为最新版本并使用其最新功能\n<ul>\n<li>每个文件夹填充 <a href="http://README.md">README.md</a> 来介绍</li>\n<li>增加赞助功能</li>\n</ul>\n</li>\n<li>细化目录结构 -&gt; 未来等 pagic 1.0 三级目录结构</li>\n<li>引入 <a href="https://github.com/gitalk/gitalk">Gittalk</a></li>\n</ul>\n<h2 id="20200616">20200616<a class="anchor" href="#20200616">§</a></h2>\n<ul>\n<li>这两天合并了 <a href="https://github.com/justjavac">@justjavac</a> 的若干个关于 Github Actions 的优化与更新：\n<ul>\n<li>优化：部署方式；</li>\n<li>更新：根据不同环境分析不同 Google Analysis。</li>\n</ul>\n</li>\n</ul>\n<h2 id="20200612">20200612<a class="anchor" href="#20200612">§</a></h2>\n<ul>\n<li>随着 Pagic 主题修复 Bug，增加 Google Analytics 分析。</li>\n</ul>\n<h2 id="20200611">20200611<a class="anchor" href="#20200611">§</a></h2>\n<ul>\n<li>向 <a href="http://js.org/">js.org</a> 提交 PR 注册域名。</li>\n<li>花费了一些时间来思考 Github Pages 为什么 404，同时显示 <code>http://hylerrix.github.io/deno-tutorial/</code>。</li>\n<li>线上网站在 <a href="http://js.org">js.org</a> 上部署成功：<a href="https://deno-tutorial.js.org">deno-tutorial.js.org</a>。</li>\n</ul>\n<h2 id="20200609">20200609<a class="anchor" href="#20200609">§</a></h2>\n<blockquote>\n<p>遇到问题不要慌，放好心态，逐步排查，然后搜重点，实在不行社区里问问题。</p>\n</blockquote>\n<ul>\n<li>合并 (#4)[<a href="https://github.com/hylerrix/deno-tutorial/pull/4">https://github.com/hylerrix/deno-tutorial/pull/4</a>] PR。</li>\n<li>三小时尝试构建 pagic，解决了如下安装时的问题：\n<ul>\n<li>报错 <code>error: Uncaught Http: error sending request for url (https://raw.githubusercontent.com/pillarjs/path-to-regexp/v6.1.0/src/index.ts): error trying to connect: tcp connect error: Connection refused (os error 61)</code>：给 <code>/etc/hosts</code> 文件增加 <code>199.232.68.133 raw.githubusercontent.com</code> 即可。</li>\n<li>报错 <code>TS2345 [ERROR]: Argument of type \'{ type: string; }\' is not assignable to parameter of type \'string\'.</code>：升级 Deno 版本到 v1.0.5 即可。</li>\n</ul>\n</li>\n</ul>\n<h2 id="2020051320200531">20200513~20200531<a class="anchor" href="#2020051320200531">§</a></h2>\n<ul>\n<li>值 Deno v1.0 发布之际开源本电子书。</li>\n<li>这段时间创作了两篇文章并授权翻译了三篇文章。</li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#20210323" }, "20210323")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200924" }, "20200924")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200805" }, "20200805")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200707" }, "20200707")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200616" }, "20200616")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200612" }, "20200612")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200611" }, "20200611")),
            React.createElement("li", null,
                React.createElement("a", { href: "#20200609" }, "20200609")),
            React.createElement("li", null,
                React.createElement("a", { href: "#2020051320200531" }, "20200513~20200531")))),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-23T03:11:47.000Z",
    'updated': null,
    'excerpt': "20210323 - 这段时间翻译了 Deno 两篇官方博客，分类为精读系列 - 翻译了一篇 Rust 文章 - 持续更新版本 -> Pagic @v1.2.0, Deno @v1.8.0 - 增加了《Blitz.js + React 全栈开发手册》的宣传 20200924 - 升级 Pagic v0.9.1 + Gi...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "Deno 钻研之术",
            "link": "articles/index.html",
            "pagePath": "articles/README.md"
        },
        {
            "link": "articles/document/index.html",
            "title": "文档篇",
            "children": [
                {
                    "text": "Deno 版本历史概览",
                    "link": "articles/document/deno-version-handbook.html",
                    "pagePath": "articles/document/deno-version-handbook.md"
                },
                {
                    "text": "Deno CLI 通用手册",
                    "link": "articles/document/deno-cli-handbook.html",
                    "pagePath": "articles/document/deno-cli-handbook.md"
                },
                {
                    "text": "Deno 专业术语翻译手册",
                    "link": "articles/document/deno-translation-dictionary.html",
                    "pagePath": "articles/document/deno-translation-dictionary.md"
                }
            ],
            "pagePath": "articles/document/README.md",
            "text": "文档篇"
        },
        {
            "link": "articles/basic/index.html",
            "title": "基础篇",
            "children": [
                {
                    "text": "Hello，从多样化安装到简单实战",
                    "link": "articles/basic/install-and-hello-world.html",
                    "pagePath": "articles/basic/install-and-hello-world.md"
                }
            ],
            "pagePath": "articles/basic/README.md",
            "text": "基础篇"
        },
        {
            "link": "articles/architecture/index.html",
            "title": "架构篇",
            "children": [
                {
                    "link": "articles/architecture/cli/index.html",
                    "title": "探索 CLI",
                    "children": [
                        {
                            "text": "从 CLI 指令通读 Deno v1.x 全特性",
                            "link": "articles/architecture/cli/deno-cli-v1-function.html",
                            "pagePath": "articles/architecture/cli/deno-cli-v1-function.md"
                        }
                    ],
                    "pagePath": "articles/architecture/cli/README.md",
                    "text": "CLI 篇"
                }
            ],
            "pagePath": "articles/architecture/README.md",
            "text": "架构篇"
        },
        {
            "link": "articles/ecology/index.html",
            "title": "生态篇",
            "children": [
                {
                    "text": "Awesome Deno 中文资源全图谱",
                    "link": "articles/ecology/awesome-deno-cn.html",
                    "pagePath": "articles/ecology/awesome-deno-cn.md"
                }
            ],
            "pagePath": "articles/ecology/README.md",
            "text": "生态篇"
        },
        {
            "link": "articles/official/index.html",
            "title": "官方篇",
            "children": [
                {
                    "text": "精读《Deno 2020 官方回顾及 2021 展望》",
                    "link": "articles/official/thoroughgoing-deno-in-2020.html",
                    "pagePath": "articles/official/thoroughgoing-deno-in-2020.md"
                },
                {
                    "text": "精读《Deno v1.8 发布说明》",
                    "link": "articles/official/thoroughgoing-deno-1-8.html",
                    "pagePath": "articles/official/thoroughgoing-deno-1-8.md"
                },
                {
                    "text": "译《Deno v1.9 发布说明》",
                    "link": "articles/official/translate-deno-1-9.html",
                    "pagePath": "articles/official/translate-deno-1-9.md"
                }
            ],
            "pagePath": "articles/official/README.md",
            "text": "官方篇"
        },
        {
            "link": "articles/translation/index.html",
            "title": "翻译篇",
            "children": [
                {
                    "text": "Deno 入门手册：附大量 TypeScript 代码实例",
                    "link": "articles/translation/the-deno-handbook.html",
                    "pagePath": "articles/translation/the-deno-handbook.md"
                },
                {
                    "text": "Deno + WebSockets 打造聊天室应用",
                    "link": "articles/translation/deno-chat-app.html",
                    "pagePath": "articles/translation/deno-chat-app.md"
                },
                {
                    "text": "从 Node 到 Deno：探索各大主流库替代方案",
                    "link": "articles/translation/from-node-to-deno.html",
                    "pagePath": "articles/translation/from-node-to-deno.md"
                },
                {
                    "text": "Deno + Oak 构建酷炫的 Todo API",
                    "link": "articles/translation/deno-oak-todo-api.html",
                    "pagePath": "articles/translation/deno-oak-todo-api.md"
                },
                {
                    "text": "Deno + Oak 连接 MySQL 实战教程",
                    "link": "articles/translation/deno-oak-mysql.html",
                    "pagePath": "articles/translation/deno-oak-mysql.md"
                },
                {
                    "text": "为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？",
                    "link": "articles/translation/why-deno-wrong.html",
                    "pagePath": "articles/translation/why-deno-wrong.md"
                },
                {
                    "text": "为什么 Deno 没有众望所归？超越 Node.js 还要做些什么？",
                    "link": "articles/translation/why-deno-flopped.html",
                    "pagePath": "articles/translation/why-deno-flopped.md"
                },
                {
                    "text": "如何在 Deno 中构建一个 URL 短链生成器",
                    "link": "articles/translation/deno-url-shortener.html",
                    "pagePath": "articles/translation/deno-url-shortener.md"
                },
                {
                    "text": "如何在 Deno 下使用 AlpehJS 库构建 React 应用",
                    "link": "articles/translation/deno-alpeh-react.html",
                    "pagePath": "articles/translation/deno-alpeh-react.md"
                }
            ],
            "pagePath": "articles/translation/README.md",
            "text": "翻译篇"
        },
        {
            "link": "articles/rust/index.html",
            "title": "Rust 篇",
            "children": [
                {
                    "text": "Rust 语言入门教程：从实战 To-Do App 开始",
                    "link": "articles/rust/rust-tutorial-todo-app.html",
                    "pagePath": "articles/rust/rust-tutorial-todo-app.md"
                }
            ],
            "pagePath": "articles/rust/README.md",
            "text": "Rust 篇"
        },
        {
            "text": "开发日志",
            "link": "articles/TIMELINE.html",
            "pagePath": "articles/TIMELINE.md"
        },
        {
            "text": "感谢",
            "link": "articles/THANKS.html",
            "pagePath": "articles/THANKS.md"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/TIMELINE.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "\u5F00\u53D1\u65E5\u5FD7" })
};
