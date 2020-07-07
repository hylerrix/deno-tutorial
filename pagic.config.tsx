// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'

export default {
  srcDir: '.',
  ignore: [/\/demos\//, /\/public\//, /\/\./, /\/LICENSE/, /\/original-articles\//, /\/pagic\.config\.tsx/],
  theme: 'docs',
  // prev_next, gitalk
  plugins: ['sidebar', 'script', 'ga'],
  title: 'Deno 钻研之术',
  description: '循序渐进学 Deno & 先易后难补 Node & 面向未来的 Deno Web 应用开发。',
  github: 'https://github.com/hylerrix/deno-tutorial',
  head: (<link rel="icon" type="image/png" href="/favicon.png" />),
  nav: [
    {
      text: '打赏一下!!',
      link: 'https://github.com/xcatliu/buy-me-a-coffee',
      target: '_blank',
      popover: (
        <>
          <img src="/assets/wechat.png" width="256" style={{ marginRight: '1rem', verticalAlign: 'top' }} />
          <img src="/assets/alipay.png" width="256" style={{ verticalAlign: 'top' }} />
        </>
      )
    },
    { text: '官网', link: 'https://deno.land' },
    { text: '资源', link: 'https://github.com/hylerrix/awesome-deno-cn' },
    { text: '手册', link: 'https://nugine.github.io/deno-manual-cn' },
    { text: 'deno.js.cn', link: 'https://deno.js.cn' },
    { text: 'denocn.org', link: 'https://denocn.org' },
    { text: 'Deno 库排行', link: 'https://yoshixmk.github.io/deno-x-ranking/' },
    { text: '关于作者', link: 'https://github.com/hylerrix' },
    { text: '关于作者', link: 'https://github.com/hylerrix' },
    { text: '感谢', link: 'articles/THANKS.md' },
  ],
  sidebar: [
    'README.md',
    { // 基础篇
      link: 'articles/basic/README.md',
      children: [
        'articles/basic/install-and-hello-world.md',
      ]
    },
    { // 生态篇
      link: 'articles/ecology/README.md',
      children: [
        'articles/ecology/awesome-deno-cn.md'
      ]
    },
    { // Node 篇
      link: 'articles/node/README.md',
      children: [
        'articles/node/create-react-app-intro.md',
        'articles/node/javascript-toolchain-rome.md',
      ]
    },
    { // 翻译篇
      link: 'translations/README.md',
      children: [
        'translations/001-the-deno-handbook.md',
        'translations/002-deno-chat-app.md',
        'translations/003-from-node-to-deno.md',
        'translations/004-deno-oak-todo-api.md',
        'translations/005-deno-oak-mysql.md',
      ]
    }
  ],
  tools: {
    editOnGithub: true,
    backToTop: true
  },
  // gitalk: {
  //   clientID: '60180eea2c09238f8998',
  //   clientSecret: 'e9ea0ff6555185eda28eff4dfd4b755b1764abf3',
  //   repo: 'deno-tutorial',
  //   owner: 'hylerrix',
  //   admin: ['hylerrix'],
  //   pagerDirection: 'first'
  // },
  ga: {
    id: window.Deno?.env.get('GA_ID') ?? 'UA-169223577-1' 
  }
}
