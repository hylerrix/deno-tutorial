// @deno-types="https://deno.land/x/pagic@v0.9.1/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'

export default {
  srcDir: 'site',
  exclude: [/\/demos\//, /\/public\//, /\/\./, /\/LICENSE/, /\/original-articles\//, /\/pagic\.config\.tsx/],
  theme: 'docs',
  plugins: ['sidebar', 'prev_next', 'script', 'gitalk', 'ga'],
  title: 'Deno 钻研之术',
  description: '循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。',
  github: 'https://github.com/hylerrix/deno-tutorial',
  head: (<link rel="icon" type="image/png" href="/favicon.png" />),
  nav: [
    { text: '文章', link: '/articles/' },
    {
      text: '打赏一下!!',
      link: 'http://qiniu.ningo.cloud/hylerrix/reward-alipay.png',
      target: '_blank',
      popover: (
        <>
          <img src="http://qiniu.ningo.cloud/hylerrix/reward-alipay.png" width="256" style={{ marginRight: '1rem', verticalAlign: 'top' }} />
          <img src="http://qiniu.ningo.cloud/hylerrix/reward-wechat.png" width="256" style={{ verticalAlign: 'top' }} />
        </>
      )
    },
    { text: '资源', target: '_blank', link: 'https://github.com/hylerrix/awesome-deno-cn' },
    // { text: '官网', target: '_blank', link: 'https://deno.land' },
    // { text: '手册', target: '_blank', link: 'https://nugine.github.io/deno-manual-cn' },
    // { text: '中文社区 1', target: '_blank', link: 'https://deno.js.cn' },
    // { text: '中文社区 2', target: '_blank', link: 'https://denocn.org' },
    // { text: 'Deno 库排行', target: '_blank', link: 'https://yoshixmk.github.io/deno-x-ranking' },
    { text: '镜像', target: '_blank', link: 'http://tutorial.deno.js.cn' },
    { text: '持续添加中...', target: '_blank', link: 'https://github.com/hylerrix' },
    {
      text: '凝果屋',
      link: 'https://github.com/ningowood',
      target: '_blank',
      popover: (
        <img src="http://qiniu.ningo.cloud/ningo/official-qrcode.png" width="256" style={{ verticalAlign: 'top' }} />
      )
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
        link: 'articles/translation/README.md',
        title: '翻译篇',
        children: [
          'articles/translation/the-deno-handbook.md',
          'articles/translation/deno-chat-app.md',
          'articles/translation/from-node-to-deno.md',
          'articles/translation/deno-oak-todo-api.md',
          'articles/translation/deno-oak-mysql.md',
        ],
      },
      // {
      //   link: 'articles/forward/README.md',
      //   title: '转载篇',
      //   children: [],
      // },
      // {
      //   link: 'articles/weekly/README.md',
      //   title: '周报篇',
      //   children: [],
      // },
      {
        link: 'articles/ROADMAP.md',
        title: '未来规划',
        children: [
          'articles/frontend/README.md', // 前端篇
          'articles/backend/README.md', // 后端篇
          'articles/language/README.md', // 语言篇
          'articles/forward/README.md', // 转载篇
          'articles/weekly/README.md', // 周报篇
        ],
      },
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
}
