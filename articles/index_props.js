import Gitalk from '/_gitalk.js';
import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'prev': null,
    'next': {
        "link": "articles/document/index.html",
        "text": "文档篇"
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Deno \u94BB\u7814\u4E4B\u672F" }),
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
    'pagePath': "articles/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/index.html",
    'title': "Deno 钻研之术",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Deno 钻研之术</h1>\n<!-- 以下内容粘贴自根目录的 README.md，记得及时同步一下，期待 Pagic 未来支持直接读取根目录 README.md -->\n<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->\n<p><a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square" alt="All Contributors"></a></p>\n<!-- ALL-CONTRIBUTORS-BADGE:END -->\n<blockquote>\n<p>:sauropod: 长期更新的《Deno 钻研之术》！循序渐进学 Deno &amp; 先易后难补 Node &amp; 面向未来的 Deno Web 应用开发。</p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/deno/deno-tutorial-background.png" alt=""></p>\n<blockquote>\n<p>《Deno 钻研之术》的配套仓库：<a href="https://github.com/hylerrix/awesome-deno-cn">独家 Awesome Deno 资源清单</a>，构造 Deno 资源全图谱。</p>\n</blockquote>\n<p>Deno 钻研之术官方网站：<a href="https://deno-tutorial.js.org">https://deno-tutorial.js.org</a>。基于 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建。</p>\n<h2 id="%E7%9B%AE%E5%BD%95">目录<a class="anchor" href="#%E7%9B%AE%E5%BD%95">§</a></h2>\n<p>目前规划的章节目录如下。</p>\n<ul>\n<li>基础篇：循序渐进学 Deno 基础知识；</li>\n<li>标准库篇：深入标准库的内部世界；</li>\n<li>CLI 篇：探索 CLI 命令行的知识；</li>\n<li>Web 篇：打造 Web 开发基石；</li>\n<li>Node 篇：先易后难补 Node 知识，探索与 Deno 的异与同；</li>\n<li>Rust 篇：探索 Deno 底层有关 Rust 的更多知识；</li>\n<li>前端篇：探索 Deno Web 前端应用开发的方式；</li>\n<li>后端篇：探索 Deno Web 后端应用开发的方式；</li>\n<li>架构篇：深入到 Deno 底层读 V8，学架构；</li>\n<li>生态篇：介绍 Deno 生态的相关内容；</li>\n<li>翻译篇：翻译优质的、授权的英文一手博文。</li>\n</ul>\n<p>目前本仓库的文件结构如下。</p>\n<pre class="language-autoit"><code class="language-autoit"><span class="token punctuation">.</span>\n├── LICENSE\n├── README<span class="token punctuation">.</span>md\n├── articles # 分为多种章节\n├── demos # 收录各大优良 Demo，来源不止于官方\n│   ├── community # 社区 Demo\n│   ├── ningowood # 自研 Demo\n│   └── scattered # 零散 Demo\n└── translations # 收录自己或和小伙伴们一起翻译的优质文章\n</code></pre>\n<p>本仓库工作流大致如下。</p>\n<ul>\n<li><code>main</code> 分支：作为核心提供稳定版本，我直接工作在这里；</li>\n<li><code>Github Flow</code>：有兴趣的开发者 fork 后一起来 PR；</li>\n<li><code>Git Flow</code>：开放权限给和我一起翻译、一起写作的小伙伴（其实没怎么用）；\n<ul>\n<li><code>develop</code> 分支：用来对整个子分支进行统一管理；</li>\n<li><code>trans/${name}-${user}</code> 分支：某 user 用来翻译某篇授权 name文章；</li>\n<li><code>write/${name}-${user}</code> 分支：某 user 用来某篇 name 文章的写作。</li>\n</ul>\n</li>\n</ul>\n<p>本仓库的<a href="./.ningowood/timeline.html">开发日志</a>。</p>\n<h2 id="%E6%96%87%E7%AB%A0">文章<a class="anchor" href="#%E6%96%87%E7%AB%A0">§</a></h2>\n<p>《Deno 钻研之术》文章内容重点维护在该项目中，以下列表内容根据发布时间排序。写作序号思路为：随心而动！</p>\n<table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>发布时间</th>\n<th>所属章节</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/basic/install-and-hello-world.html">Hello, 从多样化安装到简单实战</a></td>\n<td>2020-05-13</td>\n<td>基础篇</td>\n<td>Deno v1.0 正式发布之日</td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/ecology/awesome-deno-cn.html">Awesome Deno 中文资源全图谱</a></td>\n<td>2020-05-22</td>\n<td>生态篇</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td>:heart: <a href="https://juejin.im/post/6857058738046861320">从 CLI 指令通读 Deno v1.x 全特性</a></td>\n<td>2020-08-04</td>\n<td>CLI 篇</td>\n<td>掘金征文</td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table>\n<p>这里将 Node 篇抽离出来单独排序，记录在纯 Node 社区里的游玩过程（Deno 和 Node 同时提到的文章不会在这里）。</p>\n<table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>发布时间</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/articles/node/create-react-app-intro.html">深入浅出 Create React App</a></td>\n<td>2020-01-10</td>\n<td></td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/articles/node/javascript-toolchain-rome.html">欲取代绝大多 JavaScript 工具链？Rome 尝鲜</a></td>\n<td>2020-04-10</td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table>\n<p>这里将翻译篇抽离出来单独排序，争取得到更多的授权翻译，还有欢迎你 issues/群里 推荐高质量的文章甚至一起翻译！</p>\n<table>\n<thead>\n<tr>\n<th>序号</th>\n<th>文章名</th>\n<th>原文发布时间</th>\n<th>翻译发布时间</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>001</td>\n<td><a href="https://deno-tutorial.js.org/translations/the-deno-handbook.html">Deno 入门手册：附大量 TypeScript 代码实例</a></td>\n<td>2020-05-12</td>\n<td>2020-05-18</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>002</td>\n<td><a href="https://deno-tutorial.js.org/translations/deno-chat-app.html">Deno + WebSockets 打造聊天室应用</a></td>\n<td>2020-05-10</td>\n<td>2020-05-25</td>\n<td></td>\n</tr>\n<tr>\n<td>003</td>\n<td><a href="https://deno-tutorial.js.org/translations/from-node-to-deno.html">从 Node 到 Deno：探索各大主流库替代方案</a></td>\n<td>2020-05-17</td>\n<td>2020-06-04</td>\n<td>其它译者：<a href="http://github.com/yunkou">@YunKou</a></td>\n</tr>\n<tr>\n<td>004</td>\n<td><a href="https://deno-tutorial.js.org/translations/deno-oak-todo-api.html">Deno + Oak 构建酷炫的 Todo API</a></td>\n<td>2020-05-29</td>\n<td>2020-06-15</td>\n<td></td>\n</tr>\n<tr>\n<td>005</td>\n<td><a href="https://deno-tutorial.js.org/translations/deno-oak-mysql.html">Deno + Oak 连接 MySQL 实战教程</a></td>\n<td>2020-06-07</td>\n<td>2020-07-06</td>\n<td></td>\n</tr>\n<tr>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n<td>...</td>\n</tr>\n</tbody>\n</table>\n<p>同时更新在如下第三方平台：</p>\n<ul>\n<li><a href="https://mp.weixin.qq.com/s/Eg2atcxZPpIfgqdAd73imQ">微信</a>：公众号 @ningowood。</li>\n<li><a href="https://zhuanlan.zhihu.com/deno-tutorial">知乎</a>。</li>\n<li><a href="https://juejin.im/user/57e9fc052e958a0054509825/posts">掘金</a>。</li>\n<li><a href="https://www.yuque.com/ningowood/beginning/record">语雀</a>。</li>\n</ul>\n<h2 id="%E6%9E%84%E5%BB%BA">构建<a class="anchor" href="#%E6%9E%84%E5%BB%BA">§</a></h2>\n<p>使用 <a href="https://github.com/xcatliu/pagic">Pagic</a> 构建：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># Deno v1 之前的直接运行，Pagic v0.9.1 -> Deno v1.3.3</span>\n$ deno run --unstable --allow-read --allow-write --allow-net --allow-env <a class="token url-link" href="https://deno.land/x/pagic@v0.9.1/mod.ts">https://deno.land/x/pagic@v0.9.1/mod.ts</a> build --serve --watch\n<span class="token comment"># Deno v1 后的先安装再执行（暂时跑不通）</span>\n$ deno <span class="token function">install</span> --unstable --allow-read --allow-write --allow-net --name<span class="token operator">=</span>pagic <a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\n$ ~/.deno/bin/pagic build --serve --watch\n</code></pre>\n<h2 id="%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">贡献者 ✨<a class="anchor" href="#%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">§</a></h2>\n<p>感谢如下贡献者的贡献（按贡献顺序排名）(<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>):</p>\n<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<table>\n  <tr>\n    <td align="center"><a href="https://github.com/hylerrix"><img src="https://avatars1.githubusercontent.com/u/19285461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hylerrix</b></sub></a><br /><a href="#ideas-hylerrix" title="Ideas, Planning, & Feedback">🤔</a></td>\n    <td align="center"><a href="https://www.twitter.com/imcoddy"><img src="https://avatars0.githubusercontent.com/u/622780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>imcoddy</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=imcoddy" title="Documentation">📖</a></td>\n    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#infra-xcatliu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://twitter.com/justjavac"><img src="https://avatars1.githubusercontent.com/u/359395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷渡</b></sub></a><br /><a href="#infra-justjavac" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>\n    <td align="center"><a href="https://github.com/AlvinMi"><img src="https://avatars3.githubusercontent.com/u/21032217?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YuHui</b></sub></a><br /><a href="https://github.com/hylerrix/deno-tutorial/commits?author=AlvinMi" title="Documentation">📖</a></td>\n  </tr>\n</table>\n<!-- markdownlint-enable -->\n<!-- prettier-ignore-end -->\n<!-- ALL-CONTRIBUTORS-LIST:END -->\n<p>本项目贡献者列表遵循 <a href="https://github.com/all-contributors/all-contributors">all-contributors</a> 规范。欢迎你的参与！</p>\n<h2 id="%E8%AE%A2%E9%98%85">订阅<a class="anchor" href="#%E8%AE%A2%E9%98%85">§</a></h2>\n<p>本项目文档内容均采用 [CC-BY-SA-4.0] 协议进行共享，欢迎 Star, Watch 本仓库，或订阅下方微信公众号及时交流。</p>\n<blockquote>\n<p>打赏支持一下吧！<a href="http://qiniu.ningo.cloud/hylerrix/reward-alipay.png">传送门</a></p>\n</blockquote>\n<p><img src="http://qiniu.ningo.cloud/ningo/official-qrcode.png" alt=""></p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E7%9B%AE%E5%BD%95">目录</a></li><li><a href="#%E6%96%87%E7%AB%A0">文章</a></li><li><a href="#%E6%9E%84%E5%BB%BA">构建</a></li><li><a href="#%E8%B4%A1%E7%8C%AE%E8%80%85-%E2%9C%A8">贡献者 ✨</a></li><li><a href="#%E8%AE%A2%E9%98%85">订阅</a></li></ol></nav>'
        } })
};
