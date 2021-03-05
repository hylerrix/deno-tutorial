// @deno-types="https://deno.land/x/pagic@v0.9.1/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';
export default {
    srcDir: 'site',
    theme: 'docs',
    plugins: ['sidebar', 'prev_next', 'gitalk', 'ga'],
    title: 'Deno 钻研之术',
    description: '循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。',
    github: 'https://github.com/hylerrix/deno-tutorial',
    head: (React.createElement("link", { rel: "icon", type: "image/png", href: "/favicon.png" })),
    nav: [
        { text: '文章', link: '/articles/' },
        {
            text: '打赏一下!!',
            link: 'http://qiniu.ningo.cloud/hylerrix/reward-alipay.png',
            target: '_blank',
            popover: (React.createElement(React.Fragment, null,
                React.createElement("img", { src: "http://qiniu.ningo.cloud/hylerrix/reward-alipay.png", width: "256", style: { marginRight: '1rem', verticalAlign: 'top' } }),
                React.createElement("img", { src: "http://qiniu.ningo.cloud/hylerrix/reward-wechat.png", width: "256", style: { verticalAlign: 'top' } })))
        },
        { text: '资源', target: '_blank', link: 'https://github.com/hylerrix/awesome-deno-cn' },
        { text: '镜像', target: '_blank', link: 'http://tutorial.deno.js.cn' },
        { text: 'Deno 双周刊', target: '_blank', link: 'https://github.com/hylerrix/deno-feedly' },
        { text: '持续添加中...', target: '_blank', link: 'https://github.com/hylerrix' },
        {
            text: '凝果屋',
            link: 'https://github.com/ningowood',
            target: '_blank',
            popover: (React.createElement("img", { src: "http://qiniu.ningo.cloud/ningo/official-qrcode.png", width: "256", style: { verticalAlign: 'top' } }))
        },
        { text: '关于', target: '_blank', link: 'https://github.com/hylerrix' },
    ],
    sidebar: {
        '/articles/': [
            'articles/README.md',
            {
                link: 'articles/document/README.md',
                title: '文档篇',
                children: [
                    'articles/document/deno-version-handbook.md',
                    'articles/document/deno-cli-handbook.md',
                    'articles/document/deno-translation-dictionary.md',
                ],
            },
            {
                link: 'articles/basic/README.md',
                title: '基础篇',
                children: [
                    'articles/basic/install-and-hello-world.md',
                ],
            },
            {
                link: 'articles/architecture/README.md',
                title: '架构篇',
                children: [
                    {
                        link: 'articles/architecture/cli/README.md',
                        title: '探索 CLI',
                        children: [
                            'articles/architecture/cli/deno-cli-v1-function.md'
                        ],
                    },
                ],
            },
            // {
            //   link: 'articles/frontend/README.md',
            //   title: '前端篇',
            //   children: [],
            // },
            // {
            //   link: 'articles/backend/README.md',
            //   title: '后端篇',
            //   children: [],
            // },
            {
                link: 'articles/ecology/README.md',
                title: '生态篇',
                children: [
                    'articles/ecology/awesome-deno-cn.md'
                ],
            },
            // {
            //   link: 'articles/language/README.md',
            //   title: '语言篇',
            //   children: [],
            // },
            {
                link: 'articles/node/README.md',
                title: 'Node 篇',
                children: [
                    'articles/node/create-react-app-intro.md',
                    'articles/node/javascript-toolchain-rome.md',
                ],
            },
            {
                link: 'articles/official/README.md',
                title: '官方篇',
                children: [
                    'articles/official/thoroughgoing-deno-in-2020.md',
                    'articles/official/thoroughgoing-deno-1-8.md',
                ],
            },
            {
                link: 'articles/translation/README.md',
                title: '翻译篇',
                children: [
                    'articles/translation/the-deno-handbook.md',
                    'articles/translation/deno-chat-app.md',
                    'articles/translation/from-node-to-deno.md',
                    'articles/translation/deno-oak-todo-api.md',
                    'articles/translation/deno-oak-mysql.md',
                    'articles/translation/why-deno-wrong.md',
                ],
            },
            {
                link: 'articles/rust/README.md',
                title: 'Rust 篇',
                children: [
                    'articles/rust/rust-tutorial-todo-app.md',
                ],
            },
            // {
            //   link: 'articles/forward/README.md',
            //   title: '转载篇',
            //   children: [],
            // },
            'articles/THANKS.md',
        ],
    },
    tools: {
        editOnGithub: true,
        backToTop: true
    },
    gitalk: {
        clientID: '60180eea2c09238f8998',
        clientSecret: 'e9ea0ff6555185eda28eff4dfd4b755b1764abf3',
        repo: 'deno-tutorial',
        owner: 'hylerrix',
        admin: ['hylerrix'],
        pagerDirection: 'first'
    },
    ga: {
        id: 'UA-169223577-1'
    },
    port: 8011
};
