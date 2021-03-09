import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "Awesome Deno 中文资源全图谱",
        "link": "articles/ecology/awesome-deno-cn.html"
    },
    'next': {
        "text": "深入浅出 Create React App",
        "link": "articles/node/create-react-app-intro.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/node/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/node/index.html",
    'title': "Node 篇",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Node 篇</h1>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Node \u7BC7"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': null,
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-09T09:46:04.000Z",
    'updated': null,
    'excerpt': "",
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
            "link": "articles/node/index.html",
            "title": "Node 篇",
            "children": [
                {
                    "text": "深入浅出 Create React App",
                    "link": "articles/node/create-react-app-intro.html",
                    "pagePath": "articles/node/create-react-app-intro.md"
                },
                {
                    "text": "欲取代绝大多 JavaScript 工具链？Rome 尝鲜",
                    "link": "articles/node/javascript-toolchain-rome.html",
                    "pagePath": "articles/node/javascript-toolchain-rome.md"
                }
            ],
            "pagePath": "articles/node/README.md",
            "text": "Node 篇"
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
                }
            ],
            "pagePath": "articles/translation/README.md",
            "text": "翻译篇"
        },
        {
            "link": "articles/rust/README.md",
            "title": "Rust 篇",
            "children": [
                {
                    "text": "Rust 语言入门教程：从实战 To-Do App 开始",
                    "link": "articles/rust/rust-tutorial-todo-app.html",
                    "pagePath": "articles/rust/rust-tutorial-todo-app.md"
                }
            ],
            "text": "articles/rust/README.md"
        },
        {
            "text": "感谢",
            "link": "articles/THANKS.html",
            "pagePath": "articles/THANKS.md"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/node/index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Node \u7BC7" })
};
