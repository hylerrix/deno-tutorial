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
  ],
  sidebar: [
    'README.md',
    {
      // link: 'articles/basic/README.md',
      text: '基础篇',
      children: [
        'articles/basic/install-and-hello-world.md',
      ]
    },
    {
      // link: 'articles/ecology/README.md',
      text: '生态篇',
      children: [
        'articles/ecology/awesome-deno-cn.md'
      ]
    },
    {
      // link: 'articles/node/README.md',
      text: 'Node 篇',
      children: [
        'articles/node/create-react-app-intro.md',
        'articles/node/javascript-toolchain-rome.md',
      ]
    },
    {
      // link: 'translations/README.md',
      text: '翻译篇',
      children: [
        'translations/the-deno-handbook.md',
        'translations/deno-chat-app.md',
        'translations/from-node-to-deno.md',
        'translations/deno-oak-todo-api.md',
        'translations/deno-oak-mysql.md',
      ]
    },
    {
      text: '感谢', link: 'articles/THANKS.md',
    }
  ],
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
    id: window.Deno?.env.get('GA_ID') ?? 'UA-169223577-1' 
  }
}
