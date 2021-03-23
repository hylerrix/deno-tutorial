import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': {
        "link": "articles/document/index.html",
        "text": "文档篇"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/index.html",
    'title': "Deno 钻研之术",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Deno 钻研之术</h1>\n<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->\n<p><a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square" alt="All Contributors"></a></p>\n<!-- ALL-CONTRIBUTORS-BADGE:END -->\n<blockquote>\n<p>:sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno &amp; 先易后难补 Node &amp; 面向未来的 Deno Web 应用开发。</p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/deno/deno-tutorial-background.png" alt=""></p>\n<p>Deno 钻研之术官方网站：<a href="https://deno-tutorial.js.org">https://deno-tutorial.js.org</a>。基于 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建。</p>\n<p>号外：《Deno 钻研之术》的生态仓库请查收！</p>\n<ul>\n<li><a href="https://github.com/hylerrix/deno-tutorial">deno-tutorial</a>：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。</li>\n<li><a href="https://github.com/hylerrix/deno-algorithm">deno-algorithm</a>：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。</li>\n<li><a href="https://github.com/hylerrix/awesome-deno-cn">awesome-deno-cn</a>：见名知意，中文社区下的 Deno 资源全图谱，求 PR。</li>\n</ul>\n<p>同时，2021 年，开启全新的《Blitz.js + React 全栈开发手册》：</p>\n<ul>\n<li><a href="https://github.com/hylerrix/fullstack-react-handbook">fullstack-react-handbook</a>：专注构建 Blitz.js 社区，探索 React 全栈更多的可能性。</li>\n</ul>\n<h2 id="%E7%9B%AE%E5%BD%95">目录<a class="anchor" href="#%E7%9B%AE%E5%BD%95">§</a></h2>\n<p>目前规划的章节目录如下。</p>\n<ul>\n<li>基础篇：循序渐进学 Deno 基础知识；</li>\n<li>标准库篇：深入标准库的内部世界；</li>\n<li>CLI 篇：探索 CLI 命令行的知识；</li>\n<li>Web 篇：打造 Web 开发基石；</li>\n<li>Node 篇：先易后难补 Node 知识，探索与 Deno 的异与同；</li>\n<li>Rust 篇：探索 Deno 底层有关 Rust 的更多知识；</li>\n<li>前端篇：探索 Deno Web 前端应用开发的方式；</li>\n<li>后端篇：探索 Deno Web 后端应用开发的方式；</li>\n<li>架构篇：深入到 Deno 底层读 V8，学架构；</li>\n<li>生态篇：介绍 Deno 生态的相关内容；</li>\n<li>翻译篇：翻译优质的、授权的英文一手博文。</li>\n<li>以及更多</li>\n</ul>\n<p>目前本仓库的文件结构如下。</p>\n<pre class="language-autoit"><code class="language-autoit"><span class="token punctuation">.</span>\n├── LICENSE\n├── README<span class="token punctuation">.</span>md\n├── articles # 分为多种章节\n├── demos # 收录各大优良 Demo，来源不止于官方\n│   ├── community # 社区 Demo\n│   ├── ningowood # 自研 Demo\n│   └── scattered # 零散 Demo\n└── translations # 收录自己或和小伙伴们一起翻译的优质文章\n</code></pre>\n<h2 id="%E6%96%87%E7%AB%A0">文章<a class="anchor" href="#%E6%96%87%E7%AB%A0">§</a></h2>\n<p>《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>发布时间</th>\n<th>所属章节</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/basic/install-and-hello-world.html">Hello, 从多样化安装到简单实战</a></td>\n<td>2020-05-13</td>\n<td>基础篇</td>\n<td>Deno v1.0 正式发布之日</td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/ecology/awesome-deno-cn.html">Awesome Deno 中文资源全图谱</a></td>\n<td>2020-05-22</td>\n<td>生态篇</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td>:heart: <a href="https://juejin.im/post/6857058738046861320">从 CLI 指令通读 Deno v1.x 全特性</a></td>\n<td>2020-08-04</td>\n<td>CLI 篇</td>\n<td>掘金征文</td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table></div>\n<p>这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>原文发布时间</th>\n<th>翻译发布时间</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/the-deno-handbook.html">Deno 入门手册：附大量 TypeScript 代码实例</a></td>\n<td>2020-05-12</td>\n<td>2020-05-18</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-chat-app.html">Deno + WebSockets 打造聊天室应用</a></td>\n<td>2020-05-10</td>\n<td>2020-05-25</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/from-node-to-deno.html">从 Node 到 Deno：探索各大主流库替代方案</a></td>\n<td>2020-05-17</td>\n<td>2020-06-04</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>004</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-oak-todo-api.html">Deno + Oak 构建酷炫的 Todo API</a></td>\n<td>2020-05-29</td>\n<td>2020-06-15</td>\n<td></td>\n</tr>\n<tr>\n<td>005</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-oak-mysql.html">Deno + Oak 连接 MySQL 实战教程</a></td>\n<td>2020-06-07</td>\n<td>2020-07-06</td>\n<td></td>\n</tr>\n<tr>\n<td>006</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/why-deno-wrong.html">为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？</a></td>\n<td>2020-06-07</td>\n<td>2020-07-06</td>\n<td></td>\n</tr>\n<tr>\n<td>007</td>\n<td><a href="https://deno-tutorial.js.org/official/thoroughgoing-deno-in-2020.html">精读《Deno 2020 官方回顾及 2021 展望》</a></td>\n<td>2021-01-15</td>\n<td>2021-01-22</td>\n<td></td>\n</tr>\n<tr>\n<td>008</td>\n<td><a href="https://deno-tutorial.js.org/official/thoroughgoing-deno-1-8.html">精读《Deno v1.8 发布说明》</a></td>\n<td>2021-03-02</td>\n<td>2021-03-05</td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table></div>\n<p>同时更新在如下第三方平台：</p>\n<ul>\n<li><a href="https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ">微信</a>：公众号 @ningowood。</li>\n<li><a href="https://zhuanlan.zhihu.com/deno-tutorial">知乎</a>。</li>\n<li><a href="https://juejin.im/user/57e9fc052e958a0054509825/posts">掘金</a>。</li>\n<li><a href="https://www.yuque.com/ningowood/beginning/record">语雀</a>。</li>\n<li>...</li>\n</ul>\n<h2 id="%E6%9E%84%E5%BB%BA">构建<a class="anchor" href="#%E6%9E%84%E5%BB%BA">§</a></h2>\n<p>使用 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建：</p>\n<pre class="language-bash"><code class="language-bash">$ deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net -f --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n$ ~/.deno/bin/pagic build --serve --watch\n</code></pre>\n<h2 id="%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">贡献者 ✨<a class="anchor" href="#%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">§</a></h2>\n<p>感谢如下贡献者的贡献（按贡献顺序排名）(<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>):</p>\n<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<div class="table_wrapper"><table>\n  <tr>\n    <td align="center"><a href="https://github.com/hylerrix"><img src="https://avatars1.githubusercontent.com/u/19285461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hylerrix</b></sub></a><br /><a href="#ideas-hylerrix" title="Ideas, Planning, & Feedback">🤔</a></td>\n    <td align="center"><a href="https://www.twitter.com/imcoddy"><img src="https://avatars0.githubusercontent.com/u/622780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>imcoddy</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=imcoddy" title="Documentation">📖</a></td>\n    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#infra-xcatliu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://twitter.com/justjavac"><img src="https://avatars1.githubusercontent.com/u/359395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷渡</b></sub></a><br /><a href="#infra-justjavac" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://github.com/AlvinMi"><img src="https://avatars3.githubusercontent.com/u/21032217?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YuHui</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=AlvinMi" title="Documentation">📖</a></td>\n    <td align="center"><a href="http://ahabhgk.github.io"><img src="https://avatars.githubusercontent.com/u/42857895?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ahab</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=ahabhgk" title="Documentation">📖</a></td>\n  </tr>\n</table></div>\n<!-- markdownlint-restore -->\n<!-- prettier-ignore-end -->\n<!-- ALL-CONTRIBUTORS-LIST:END -->\n<p>本项目贡献者列表遵循 <a href="https://github.com/all-contributors/all-contributors">all-contributors</a> 规范。欢迎你的参与！</p>\n<h2 id="%E8%AE%A2%E9%98%85">订阅<a class="anchor" href="#%E8%AE%A2%E9%98%85">§</a></h2>\n<p>本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。</p>\n<blockquote>\n<p>打赏支持一下吧！<a href="http://qiniu.ningo.cloud/hylerrix/reward-alipay.png">传送门</a></p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/ningo/official-qrcode.png" alt=""></p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Deno \u94BB\u7814\u4E4B\u672F"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->\n<p><a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square" alt="All Contributors"></a></p>\n<!-- ALL-CONTRIBUTORS-BADGE:END -->\n<blockquote>\n<p>:sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno &amp; 先易后难补 Node &amp; 面向未来的 Deno Web 应用开发。</p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/deno/deno-tutorial-background.png" alt=""></p>\n<p>Deno 钻研之术官方网站：<a href="https://deno-tutorial.js.org">https://deno-tutorial.js.org</a>。基于 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建。</p>\n<p>号外：《Deno 钻研之术》的生态仓库请查收！</p>\n<ul>\n<li><a href="https://github.com/hylerrix/deno-tutorial">deno-tutorial</a>：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。</li>\n<li><a href="https://github.com/hylerrix/deno-algorithm">deno-algorithm</a>：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。</li>\n<li><a href="https://github.com/hylerrix/awesome-deno-cn">awesome-deno-cn</a>：见名知意，中文社区下的 Deno 资源全图谱，求 PR。</li>\n</ul>\n<p>同时，2021 年，开启全新的《Blitz.js + React 全栈开发手册》：</p>\n<ul>\n<li><a href="https://github.com/hylerrix/fullstack-react-handbook">fullstack-react-handbook</a>：专注构建 Blitz.js 社区，探索 React 全栈更多的可能性。</li>\n</ul>\n<h2 id="%E7%9B%AE%E5%BD%95">目录<a class="anchor" href="#%E7%9B%AE%E5%BD%95">§</a></h2>\n<p>目前规划的章节目录如下。</p>\n<ul>\n<li>基础篇：循序渐进学 Deno 基础知识；</li>\n<li>标准库篇：深入标准库的内部世界；</li>\n<li>CLI 篇：探索 CLI 命令行的知识；</li>\n<li>Web 篇：打造 Web 开发基石；</li>\n<li>Node 篇：先易后难补 Node 知识，探索与 Deno 的异与同；</li>\n<li>Rust 篇：探索 Deno 底层有关 Rust 的更多知识；</li>\n<li>前端篇：探索 Deno Web 前端应用开发的方式；</li>\n<li>后端篇：探索 Deno Web 后端应用开发的方式；</li>\n<li>架构篇：深入到 Deno 底层读 V8，学架构；</li>\n<li>生态篇：介绍 Deno 生态的相关内容；</li>\n<li>翻译篇：翻译优质的、授权的英文一手博文。</li>\n<li>以及更多</li>\n</ul>\n<p>目前本仓库的文件结构如下。</p>\n<pre class="language-autoit"><code class="language-autoit"><span class="token punctuation">.</span>\n├── LICENSE\n├── README<span class="token punctuation">.</span>md\n├── articles # 分为多种章节\n├── demos # 收录各大优良 Demo，来源不止于官方\n│   ├── community # 社区 Demo\n│   ├── ningowood # 自研 Demo\n│   └── scattered # 零散 Demo\n└── translations # 收录自己或和小伙伴们一起翻译的优质文章\n</code></pre>\n<h2 id="%E6%96%87%E7%AB%A0">文章<a class="anchor" href="#%E6%96%87%E7%AB%A0">§</a></h2>\n<p>《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>发布时间</th>\n<th>所属章节</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/basic/install-and-hello-world.html">Hello, 从多样化安装到简单实战</a></td>\n<td>2020-05-13</td>\n<td>基础篇</td>\n<td>Deno v1.0 正式发布之日</td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/ecology/awesome-deno-cn.html">Awesome Deno 中文资源全图谱</a></td>\n<td>2020-05-22</td>\n<td>生态篇</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td>:heart: <a href="https://juejin.im/post/6857058738046861320">从 CLI 指令通读 Deno v1.x 全特性</a></td>\n<td>2020-08-04</td>\n<td>CLI 篇</td>\n<td>掘金征文</td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table></div>\n<p>这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>原文发布时间</th>\n<th>翻译发布时间</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/the-deno-handbook.html">Deno 入门手册：附大量 TypeScript 代码实例</a></td>\n<td>2020-05-12</td>\n<td>2020-05-18</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-chat-app.html">Deno + WebSockets 打造聊天室应用</a></td>\n<td>2020-05-10</td>\n<td>2020-05-25</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/from-node-to-deno.html">从 Node 到 Deno：探索各大主流库替代方案</a></td>\n<td>2020-05-17</td>\n<td>2020-06-04</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>004</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-oak-todo-api.html">Deno + Oak 构建酷炫的 Todo API</a></td>\n<td>2020-05-29</td>\n<td>2020-06-15</td>\n<td></td>\n</tr>\n<tr>\n<td>005</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/deno-oak-mysql.html">Deno + Oak 连接 MySQL 实战教程</a></td>\n<td>2020-06-07</td>\n<td>2020-07-06</td>\n<td></td>\n</tr>\n<tr>\n<td>006</td>\n<td><a href="https://deno-tutorial.js.org/articles/translations/why-deno-wrong.html">为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？</a></td>\n<td>2020-06-07</td>\n<td>2020-07-06</td>\n<td></td>\n</tr>\n<tr>\n<td>007</td>\n<td><a href="https://deno-tutorial.js.org/official/thoroughgoing-deno-in-2020.html">精读《Deno 2020 官方回顾及 2021 展望》</a></td>\n<td>2021-01-15</td>\n<td>2021-01-22</td>\n<td></td>\n</tr>\n<tr>\n<td>008</td>\n<td><a href="https://deno-tutorial.js.org/official/thoroughgoing-deno-1-8.html">精读《Deno v1.8 发布说明》</a></td>\n<td>2021-03-02</td>\n<td>2021-03-05</td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table></div>\n<p>同时更新在如下第三方平台：</p>\n<ul>\n<li><a href="https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ">微信</a>：公众号 @ningowood。</li>\n<li><a href="https://zhuanlan.zhihu.com/deno-tutorial">知乎</a>。</li>\n<li><a href="https://juejin.im/user/57e9fc052e958a0054509825/posts">掘金</a>。</li>\n<li><a href="https://www.yuque.com/ningowood/beginning/record">语雀</a>。</li>\n<li>...</li>\n</ul>\n<h2 id="%E6%9E%84%E5%BB%BA">构建<a class="anchor" href="#%E6%9E%84%E5%BB%BA">§</a></h2>\n<p>使用 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建：</p>\n<pre class="language-bash"><code class="language-bash">$ deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net -f --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n$ ~/.deno/bin/pagic build --serve --watch\n</code></pre>\n<h2 id="%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">贡献者 ✨<a class="anchor" href="#%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">§</a></h2>\n<p>感谢如下贡献者的贡献（按贡献顺序排名）(<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>):</p>\n<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<div class="table_wrapper"><table>\n  <tr>\n    <td align="center"><a href="https://github.com/hylerrix"><img src="https://avatars1.githubusercontent.com/u/19285461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hylerrix</b></sub></a><br /><a href="#ideas-hylerrix" title="Ideas, Planning, & Feedback">🤔</a></td>\n    <td align="center"><a href="https://www.twitter.com/imcoddy"><img src="https://avatars0.githubusercontent.com/u/622780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>imcoddy</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=imcoddy" title="Documentation">📖</a></td>\n    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#infra-xcatliu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://twitter.com/justjavac"><img src="https://avatars1.githubusercontent.com/u/359395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷渡</b></sub></a><br /><a href="#infra-justjavac" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://github.com/AlvinMi"><img src="https://avatars3.githubusercontent.com/u/21032217?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YuHui</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=AlvinMi" title="Documentation">📖</a></td>\n    <td align="center"><a href="http://ahabhgk.github.io"><img src="https://avatars.githubusercontent.com/u/42857895?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ahab</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=ahabhgk" title="Documentation">📖</a></td>\n  </tr>\n</table></div>\n<!-- markdownlint-restore -->\n<!-- prettier-ignore-end -->\n<!-- ALL-CONTRIBUTORS-LIST:END -->\n<p>本项目贡献者列表遵循 <a href="https://github.com/all-contributors/all-contributors">all-contributors</a> 规范。欢迎你的参与！</p>\n<h2 id="%E8%AE%A2%E9%98%85">订阅<a class="anchor" href="#%E8%AE%A2%E9%98%85">§</a></h2>\n<p>本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。</p>\n<blockquote>\n<p>打赏支持一下吧！<a href="http://qiniu.ningo.cloud/hylerrix/reward-alipay.png">传送门</a></p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/ningo/official-qrcode.png" alt=""></p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%9B%AE%E5%BD%95" }, "\u76EE\u5F55")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%96%87%E7%AB%A0" }, "\u6587\u7AE0")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%9E%84%E5%BB%BA" }, "\u6784\u5EFA")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8" }, "\u8D21\u732E\u8005 \u2728")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%AE%A2%E9%98%85" }, "\u8BA2\u9605")))),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-23T03:11:47.000Z",
    'updated': null,
    'excerpt': "Deno 钻研之术官方网站：https://deno-tutorial.js.org。基于 Pagic 构建。 号外：《Deno 钻研之术》的生态仓库请查收！ - deno-tutorial：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。 - deno-algorithm：...",
    'cover': "https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square",
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
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Deno \u94BB\u7814\u4E4B\u672F" })
};
