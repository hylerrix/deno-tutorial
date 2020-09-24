import Gitalk from '/_gitalk.js';
import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'prev': {
        "text": "前端篇",
        "link": "articles/frontend/index.html"
    },
    'next': {
        "text": "语言篇",
        "link": "articles/language/index.html"
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/backend/index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "\u540E\u7AEF\u7BC7" }),
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
                }
            ],
            "text": "文档篇",
            "pagePath": "articles/document/README.md"
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
            "text": "基础篇",
            "pagePath": "articles/basic/README.md"
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
                    "text": "CLI 篇",
                    "pagePath": "articles/architecture/cli/README.md"
                }
            ],
            "text": "架构篇",
            "pagePath": "articles/architecture/README.md"
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
            "text": "生态篇",
            "pagePath": "articles/ecology/README.md"
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
            "text": "Node 篇",
            "pagePath": "articles/node/README.md"
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
                }
            ],
            "text": "翻译篇",
            "pagePath": "articles/translation/README.md"
        },
        {
            "link": "articles/ROADMAP.html",
            "title": "未来规划",
            "children": [
                {
                    "text": "前端篇",
                    "link": "articles/frontend/index.html",
                    "pagePath": "articles/frontend/README.md"
                },
                {
                    "text": "后端篇",
                    "link": "articles/backend/index.html",
                    "pagePath": "articles/backend/README.md"
                },
                {
                    "text": "语言篇",
                    "link": "articles/language/index.html",
                    "pagePath": "articles/language/README.md"
                },
                {
                    "text": "转载篇",
                    "link": "articles/forward/index.html",
                    "pagePath": "articles/forward/README.md"
                },
                {
                    "text": "周报篇",
                    "link": "articles/weekly/index.html",
                    "pagePath": "articles/weekly/README.md"
                }
            ],
            "text": "未来规划",
            "pagePath": "articles/ROADMAP.md"
        },
        {
            "text": "感谢",
            "link": "articles/THANKS.html",
            "pagePath": "articles/THANKS.md"
        }
    ],
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['undefined'] },
    'pagePath': "articles/backend/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/backend/index.html",
    'title': "后端篇",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>后端篇</h1>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
