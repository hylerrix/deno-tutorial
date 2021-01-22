import projectConfig from '/pagic.config.js';
import IndexPage from './index_content.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "index.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "",
    'content': React.createElement(IndexPage, { config: {
            branch: 'main',
            description: '循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。',
            exclude: [
                '**/.*',
                '**/package.json',
                '**/package-lock.json',
                '**/node_modules',
                'pagic.config.ts',
                'pagic.config.tsx',
                '**/config.gypi',
                '**/CVS',
                '**/npm-debug.log',
                'dist'
            ],
            ga: {
                id: 'UA-169223577-1'
            },
            gitalk: {
                admin: [
                    'hylerrix'
                ],
                clientID: '60180eea2c09238f8998',
                clientSecret: 'e9ea0ff6555185eda28eff4dfd4b755b1764abf3',
                owner: 'hylerrix',
                pagerDirection: 'first',
                repo: 'deno-tutorial'
            },
            github: 'https://github.com/hylerrix/deno-tutorial',
            head: React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            include: undefined,
            nav: [
                {
                    link: '/articles/',
                    text: '文章'
                },
                {
                    link: 'http://qiniu.ningo.cloud/hylerrix/reward-alipay.png',
                    popover: React.createElement(React.Fragment, null,
                        React.createElement("img", { src: "http://qiniu.ningo.cloud/hylerrix/reward-alipay.png", style: { marginRight: '1rem', verticalAlign: 'top' }, width: "256" }),
                        React.createElement("img", { src: "http://qiniu.ningo.cloud/hylerrix/reward-wechat.png", style: { verticalAlign: 'top' }, width: "256" })),
                    target: '_blank',
                    text: '打赏一下!!'
                },
                {
                    link: 'https://github.com/hylerrix/awesome-deno-cn',
                    target: '_blank',
                    text: '资源'
                },
                {
                    link: 'http://tutorial.deno.js.cn',
                    target: '_blank',
                    text: '镜像'
                },
                {
                    link: 'https://github.com/hylerrix/deno-feedly',
                    target: '_blank',
                    text: 'Deno 双周刊'
                },
                {
                    link: 'https://github.com/hylerrix',
                    target: '_blank',
                    text: '持续添加中...'
                },
                {
                    link: 'https://github.com/ningowood',
                    popover: React.createElement("img", { src: "http://qiniu.ningo.cloud/ningo/official-qrcode.png", style: { verticalAlign: 'top' }, width: "256" }),
                    target: '_blank',
                    text: '凝果屋'
                },
                {
                    link: 'https://github.com/hylerrix',
                    target: '_blank',
                    text: '关于'
                }
            ],
            outDir: 'dist',
            plugins: [
                'clean',
                'init',
                'md',
                'tsx',
                'script',
                'layout',
                'out',
                'sidebar',
                'prev_next',
                'gitalk',
                'ga'
            ],
            port: 8011,
            root: '/',
            serve: false,
            sidebar: {
                '/articles/': [
                    'articles/README.md',
                    {
                        children: [
                            'articles/document/deno-version-handbook.md',
                            'articles/document/deno-cli-handbook.md',
                            'articles/document/deno-translation-dictionary.md'
                        ],
                        link: 'articles/document/README.md',
                        title: '文档篇'
                    },
                    {
                        children: [
                            'articles/basic/install-and-hello-world.md'
                        ],
                        link: 'articles/basic/README.md',
                        title: '基础篇'
                    },
                    {
                        children: [
                            {
                                children: [
                                    'articles/architecture/cli/deno-cli-v1-function.md'
                                ],
                                link: 'articles/architecture/cli/README.md',
                                title: '探索 CLI'
                            }
                        ],
                        link: 'articles/architecture/README.md',
                        title: '架构篇'
                    },
                    {
                        children: [
                            'articles/ecology/awesome-deno-cn.md'
                        ],
                        link: 'articles/ecology/README.md',
                        title: '生态篇'
                    },
                    {
                        children: [
                            'articles/node/create-react-app-intro.md',
                            'articles/node/javascript-toolchain-rome.md'
                        ],
                        link: 'articles/node/README.md',
                        title: 'Node 篇'
                    },
                    {
                        children: [
                            'articles/official/thoroughgoing-deno-in-2020.md'
                        ],
                        link: 'articles/official/README.md',
                        title: '官方篇'
                    },
                    {
                        children: [
                            'articles/translation/the-deno-handbook.md',
                            'articles/translation/deno-chat-app.md',
                            'articles/translation/from-node-to-deno.md',
                            'articles/translation/deno-oak-todo-api.md',
                            'articles/translation/deno-oak-mysql.md',
                            'articles/translation/why-deno-wrong.md'
                        ],
                        link: 'articles/translation/README.md',
                        title: '翻译篇'
                    },
                    'articles/THANKS.md'
                ]
            },
            srcDir: 'site',
            theme: 'docs',
            title: 'Deno 钻研之术',
            tools: {
                backToTop: true,
                editOnGithub: true
            },
            watch: false
        }, content: null, head: React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }), layoutPath: "_layout.tsx", outputPath: "index.html", pagePath: "index.tsx", script: null, title: "" }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "" })
};
