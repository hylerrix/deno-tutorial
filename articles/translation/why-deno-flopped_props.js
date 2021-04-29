import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？",
        "link": "articles/translation/why-deno-wrong.html"
    },
    'next': {
        "text": "如何在 Deno 中构建一个 URL 短链生成器",
        "link": "articles/translation/deno-url-shortener.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/translation/why-deno-flopped.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/translation/why-deno-flopped.html",
    'title': "为什么 Deno 没有众望所归？超越 Node.js 还要做些什么？",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>为什么 Deno 没有众望所归？超越 Node.js 还要做些什么？</h1>\n<blockquote>\n<ul>\n<li>原文地址：<a href="https://medium.com/swlh/heres-actually-why-deno-flopped-ec115caa2b6d">Here’s Why Deno Didn’t Take Off: And what Deno needs to do to overtake Node.js.</a></li>\n<li>原文作者：Spencer, Founder of <a href="https://skiwise-app.com/">Skiwise</a> and <a href="https://notionintegrations.com/">NotionIntegrations</a></li>\n<li>译者：<a href="https://github.com/hylerrix">@hylerrix</a></li>\n<li>原文发布时间/翻译时间：20200928/20210429</li>\n<li>本文属于《<a href="https://github.com/hylerrix/deno-tutorial">Deno 钻研之术</a>》系列，原文翻译已获得作者翻译授权。</li>\n</ul>\n</blockquote>\n<h2 id="%E8%AF%91%E8%80%85%E5%BA%8F">译者序<a class="anchor" href="#%E8%AF%91%E8%80%85%E5%BA%8F">§</a></h2>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1619618596082-54ed430d-164c-4fca-b587-0ae95408ecfe.png#height=618&amp;id=y17xf&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=2048&amp;originWidth=2732&amp;originalType=binary&amp;size=1043288&amp;status=done&amp;style=none&amp;width=825" alt=""></p>\n<h2 id="%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B">正文开始<a class="anchor" href="#%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B">§</a></h2>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610623575420-26942dca-dd3d-4092-a45e-8061be1b01a5.png#height=350&amp;id=O4CWT&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=350&amp;originWidth=700&amp;originalType=binary&amp;size=353843&amp;status=done&amp;style=none&amp;width=700" alt=""></p>\n<p>Deno 是一个旨在改进甚至替代 Node 的 JavaScript / TypeScript 运行时。它拥有众多的功能和广泛的关注度，截止目前在 Github 上已经有 68k 个 Star（译者注：2021-04 月底已 75k star）：</p>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610623589078-e188c9f5-dade-4190-be69-88057ab18268.png#height=128&amp;id=fEGOW&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=128&amp;originWidth=338&amp;originalType=binary&amp;size=7081&amp;status=done&amp;style=none&amp;width=338" alt=""></p>\n<p><a href="https://github.com/denoland/deno">https://github.com/denoland/deno</a></p>\n<p>在如此多强大功能的加持下，有个很重要的问题值得反思：</p>\n<blockquote>\n<p>为什么 Deno 在 1.0 正式版本发布之后没有众望所归，得到广泛使用？</p>\n</blockquote>\n<p>本文将尝试探讨该问题...</p>\n<h2 id="%E6%89%80%E4%BB%A5deno-%E6%98%AF%E4%BB%80%E4%B9%88">所以，Deno 是什么？<a class="anchor" href="#%E6%89%80%E4%BB%A5deno-%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<p>Deno 是一个安全的 JavaScript 和 TypeScript 运行时，作者是 Ryan Dahl（也是 Node.js 的原作者）。Deno 的诞生之初是为了<a href="https://www.youtube.com/watch?v=M3BM9TB-8yA">解决 2009 年首次设计 Node.js 时的一些疏忽</a>。我认为这种改造动机很有道理，因为<strong>我相信每个程序员都希望有机会能重写他们已有 10 年历史的代码。</strong></p>\n<p>基于此，Deno 在 Node.js 已经发展至今的情况下，引入了很多新功能：</p>\n<ul>\n<li>Deno 有默认安全的机制。访问文件系统，网络或运行环境需要被授权；</li>\n<li>Deno 对 TypeScript 的支持度是开箱即用的；</li>\n<li>外部文件由 URL 明确引用。没有 package.json。</li>\n<li>import 语句需要包括文件后缀（.ts，.tsx，.js，.json）</li>\n<li>内置依赖检查器和文件格式化工具库</li>\n<li><a href="https://deno.land/">以及更多...</a></li>\n</ul>\n<p>凭借这些功能以及大量开发者的积极推进，Deno 于 2020 年 5 月正式发布了 1.0 版本。</p>\n<p>然后...</p>\n<p>蹦...</p>\n<h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88-deno-%E6%B2%A1%E6%9C%89%E4%BC%97%E6%9C%9B%E6%89%80%E5%BD%92">为什么 Deno 没有众望所归？<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88-deno-%E6%B2%A1%E6%9C%89%E4%BC%97%E6%9C%9B%E6%89%80%E5%BD%92">§</a></h2>\n<p>Deno 看起来拥有成功的所有要素：大量的关注者、诸多的功能、经验丰富的创始人和开发者等等，但并没有真正实现所有人期望的增长。这是为什么？</p>\n<p>我认为最好从业务的角度来分析。我们大多数人可能都忘记了，<strong>构建开源软件与为用户构建软件确实没有什么不同。供需关系的标准经济原则仍然发挥着重要的作用。</strong></p>\n<p>当创建一个新的开源项目时，他们通常会与已经存在的东西“竞争”。考虑到这一点的话，你不仅需要考虑你的新项目是否足够出色，还需要考虑与现有项目相比有什么真正的优势。</p>\n<p>定律来到 Deno 下时，需要关注到的就是已经存在的 Node.js。尽管 Node.js 可能有其缺陷，但它仍然有能力完成好自己的本分工作。<strong>如果 Deno 真的推出了 Node.js 无法复制的强大功能，就可能会改变游戏规则——但事实并未发生。</strong></p>\n<p>**从用户的角度来看，Deno 仅真正具有一些“次要功能”：一个更简洁的代码库、一个更新的最佳实践方案、一个更好的安全性支持，但是这些东西实际上对用户来说仅仅是“功能特性”而非一个成熟的产品。**你可以开发一个像 Gmail 一样的电子邮件客户端，拥有更好的安全性和 50% 的速度改进，即使收藏你的客户端到一个新书签只需要很少的时间，但也不会有太多用户愿意切换过来的。</p>\n<p>因此，这是 Deno 需要招架的第一招：Deno 具有许多不错的功能，但是没有什么能激发用户从 Node.js 切换过来的杰出之处。</p>\n<p>Deno 需要招架的第二大地方在于其不支持 NPM 软件包。如果 Deno 能够支持 NPM 包，那么也能改变游戏规则。Deno 支持 NPM 包的话，将会让其更像一个针对已有的邮件客户端的更好的容器，而不是一个“独立的邮件客户端”。</p>\n<p>支持 NPM 软件包将大大减少进入门槛。这会成为用户将其项目和库迁移到 Deno 时的一个很好的垫脚石。</p>\n<p>可以将 Deno 对 NPM 支持的重要意义同比于 TypeScript 的“严格模式”。对于拥有大量 JavaScript 代码库的用户，直接进行纯 TypeScript 改造，将使你在解决各种错误消息时的工作效率降低数周。但由于 TypeScript 具有禁用严格模式的支持，可以让其成为用户缓慢迁移到纯 TypeScript 的垫脚石。这为用户提供了更低的进入门槛，并且反过来又<a href="http://pypl.github.io/PYPL.html">帮助 TypeScript 近年来夺走很多 JavaScript 的市场份额</a>。</p>\n<h2 id="%E9%82%A3%E4%B9%88%E4%BB%A3%E4%BB%B7%E6%98%AF%E4%BB%80%E4%B9%88%E5%91%A2">那么，代价是什么呢？<a class="anchor" href="#%E9%82%A3%E4%B9%88%E4%BB%A3%E4%BB%B7%E6%98%AF%E4%BB%80%E4%B9%88%E5%91%A2">§</a></h2>\n<p>我认为这是一个能印证业务方法的有趣案例。重点在于，<strong>如果你需要像市场发布一个新产品，你必须确保它的优势很大，以至于能克服人们从现状转变到新方式的阻力。</strong></p>\n<p>对于 Deno 来说，最初有很多独特的魅力，但回首总结 Deno 时，会发现 Deno 实际上是以失去 Node.js 下的整个 NPM 生态系统为代价的情况下的一些小“修复”。</p>\n<h2 id="deno-%E5%B0%86%E4%BC%9A%E5%8E%BB%E5%BE%80%E4%BD%95%E6%96%B9">Deno 将会去往何方？<a class="anchor" href="#deno-%E5%B0%86%E4%BC%9A%E5%8E%BB%E5%BE%80%E4%BD%95%E6%96%B9">§</a></h2>\n<p>Deno 团队有一个决定需要做。他们可以努力添加对 Node.js 的向后兼容性，或者增加更多能诱使用户迁移过来的更多吸引力。我个人认为对 Node.js 的向后兼容是接下来要走的路，如果增加了更多的兼容性，也会极大地改变项目的未来。</p>\n<p>无论如何，以最好的祝福送给 Deno 团队，我也希望更好的技术能最终更有市场。希望你喜欢这篇文章，感谢阅读。</p>\n<blockquote>\n<p>© <a href="https://github.com/hylerrix/deno-tutorial">https://github.com/hylerrix/deno-tutorial</a> 2020~2021</p>\n</blockquote>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4E3A\u4EC0\u4E48 Deno \u6CA1\u6709\u4F17\u671B\u6240\u5F52\uFF1F\u8D85\u8D8A Node.js \u8FD8\u8981\u505A\u4E9B\u4EC0\u4E48\uFF1F"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<ul>\n<li>原文地址：<a href="https://medium.com/swlh/heres-actually-why-deno-flopped-ec115caa2b6d">Here’s Why Deno Didn’t Take Off: And what Deno needs to do to overtake Node.js.</a></li>\n<li>原文作者：Spencer, Founder of <a href="https://skiwise-app.com/">Skiwise</a> and <a href="https://notionintegrations.com/">NotionIntegrations</a></li>\n<li>译者：<a href="https://github.com/hylerrix">@hylerrix</a></li>\n<li>原文发布时间/翻译时间：20200928/20210429</li>\n<li>本文属于《<a href="https://github.com/hylerrix/deno-tutorial">Deno 钻研之术</a>》系列，原文翻译已获得作者翻译授权。</li>\n</ul>\n</blockquote>\n<h2 id="%E8%AF%91%E8%80%85%E5%BA%8F">译者序<a class="anchor" href="#%E8%AF%91%E8%80%85%E5%BA%8F">§</a></h2>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1619618596082-54ed430d-164c-4fca-b587-0ae95408ecfe.png#height=618&amp;id=y17xf&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=2048&amp;originWidth=2732&amp;originalType=binary&amp;size=1043288&amp;status=done&amp;style=none&amp;width=825" alt=""></p>\n<h2 id="%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B">正文开始<a class="anchor" href="#%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B">§</a></h2>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610623575420-26942dca-dd3d-4092-a45e-8061be1b01a5.png#height=350&amp;id=O4CWT&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=350&amp;originWidth=700&amp;originalType=binary&amp;size=353843&amp;status=done&amp;style=none&amp;width=700" alt=""></p>\n<p>Deno 是一个旨在改进甚至替代 Node 的 JavaScript / TypeScript 运行时。它拥有众多的功能和广泛的关注度，截止目前在 Github 上已经有 68k 个 Star（译者注：2021-04 月底已 75k star）：</p>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610623589078-e188c9f5-dade-4190-be69-88057ab18268.png#height=128&amp;id=fEGOW&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=128&amp;originWidth=338&amp;originalType=binary&amp;size=7081&amp;status=done&amp;style=none&amp;width=338" alt=""></p>\n<p><a href="https://github.com/denoland/deno">https://github.com/denoland/deno</a></p>\n<p>在如此多强大功能的加持下，有个很重要的问题值得反思：</p>\n<blockquote>\n<p>为什么 Deno 在 1.0 正式版本发布之后没有众望所归，得到广泛使用？</p>\n</blockquote>\n<p>本文将尝试探讨该问题...</p>\n<h2 id="%E6%89%80%E4%BB%A5deno-%E6%98%AF%E4%BB%80%E4%B9%88">所以，Deno 是什么？<a class="anchor" href="#%E6%89%80%E4%BB%A5deno-%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<p>Deno 是一个安全的 JavaScript 和 TypeScript 运行时，作者是 Ryan Dahl（也是 Node.js 的原作者）。Deno 的诞生之初是为了<a href="https://www.youtube.com/watch?v=M3BM9TB-8yA">解决 2009 年首次设计 Node.js 时的一些疏忽</a>。我认为这种改造动机很有道理，因为<strong>我相信每个程序员都希望有机会能重写他们已有 10 年历史的代码。</strong></p>\n<p>基于此，Deno 在 Node.js 已经发展至今的情况下，引入了很多新功能：</p>\n<ul>\n<li>Deno 有默认安全的机制。访问文件系统，网络或运行环境需要被授权；</li>\n<li>Deno 对 TypeScript 的支持度是开箱即用的；</li>\n<li>外部文件由 URL 明确引用。没有 package.json。</li>\n<li>import 语句需要包括文件后缀（.ts，.tsx，.js，.json）</li>\n<li>内置依赖检查器和文件格式化工具库</li>\n<li><a href="https://deno.land/">以及更多...</a></li>\n</ul>\n<p>凭借这些功能以及大量开发者的积极推进，Deno 于 2020 年 5 月正式发布了 1.0 版本。</p>\n<p>然后...</p>\n<p>蹦...</p>\n<h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88-deno-%E6%B2%A1%E6%9C%89%E4%BC%97%E6%9C%9B%E6%89%80%E5%BD%92">为什么 Deno 没有众望所归？<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88-deno-%E6%B2%A1%E6%9C%89%E4%BC%97%E6%9C%9B%E6%89%80%E5%BD%92">§</a></h2>\n<p>Deno 看起来拥有成功的所有要素：大量的关注者、诸多的功能、经验丰富的创始人和开发者等等，但并没有真正实现所有人期望的增长。这是为什么？</p>\n<p>我认为最好从业务的角度来分析。我们大多数人可能都忘记了，<strong>构建开源软件与为用户构建软件确实没有什么不同。供需关系的标准经济原则仍然发挥着重要的作用。</strong></p>\n<p>当创建一个新的开源项目时，他们通常会与已经存在的东西“竞争”。考虑到这一点的话，你不仅需要考虑你的新项目是否足够出色，还需要考虑与现有项目相比有什么真正的优势。</p>\n<p>定律来到 Deno 下时，需要关注到的就是已经存在的 Node.js。尽管 Node.js 可能有其缺陷，但它仍然有能力完成好自己的本分工作。<strong>如果 Deno 真的推出了 Node.js 无法复制的强大功能，就可能会改变游戏规则——但事实并未发生。</strong></p>\n<p>**从用户的角度来看，Deno 仅真正具有一些“次要功能”：一个更简洁的代码库、一个更新的最佳实践方案、一个更好的安全性支持，但是这些东西实际上对用户来说仅仅是“功能特性”而非一个成熟的产品。**你可以开发一个像 Gmail 一样的电子邮件客户端，拥有更好的安全性和 50% 的速度改进，即使收藏你的客户端到一个新书签只需要很少的时间，但也不会有太多用户愿意切换过来的。</p>\n<p>因此，这是 Deno 需要招架的第一招：Deno 具有许多不错的功能，但是没有什么能激发用户从 Node.js 切换过来的杰出之处。</p>\n<p>Deno 需要招架的第二大地方在于其不支持 NPM 软件包。如果 Deno 能够支持 NPM 包，那么也能改变游戏规则。Deno 支持 NPM 包的话，将会让其更像一个针对已有的邮件客户端的更好的容器，而不是一个“独立的邮件客户端”。</p>\n<p>支持 NPM 软件包将大大减少进入门槛。这会成为用户将其项目和库迁移到 Deno 时的一个很好的垫脚石。</p>\n<p>可以将 Deno 对 NPM 支持的重要意义同比于 TypeScript 的“严格模式”。对于拥有大量 JavaScript 代码库的用户，直接进行纯 TypeScript 改造，将使你在解决各种错误消息时的工作效率降低数周。但由于 TypeScript 具有禁用严格模式的支持，可以让其成为用户缓慢迁移到纯 TypeScript 的垫脚石。这为用户提供了更低的进入门槛，并且反过来又<a href="http://pypl.github.io/PYPL.html">帮助 TypeScript 近年来夺走很多 JavaScript 的市场份额</a>。</p>\n<h2 id="%E9%82%A3%E4%B9%88%E4%BB%A3%E4%BB%B7%E6%98%AF%E4%BB%80%E4%B9%88%E5%91%A2">那么，代价是什么呢？<a class="anchor" href="#%E9%82%A3%E4%B9%88%E4%BB%A3%E4%BB%B7%E6%98%AF%E4%BB%80%E4%B9%88%E5%91%A2">§</a></h2>\n<p>我认为这是一个能印证业务方法的有趣案例。重点在于，<strong>如果你需要像市场发布一个新产品，你必须确保它的优势很大，以至于能克服人们从现状转变到新方式的阻力。</strong></p>\n<p>对于 Deno 来说，最初有很多独特的魅力，但回首总结 Deno 时，会发现 Deno 实际上是以失去 Node.js 下的整个 NPM 生态系统为代价的情况下的一些小“修复”。</p>\n<h2 id="deno-%E5%B0%86%E4%BC%9A%E5%8E%BB%E5%BE%80%E4%BD%95%E6%96%B9">Deno 将会去往何方？<a class="anchor" href="#deno-%E5%B0%86%E4%BC%9A%E5%8E%BB%E5%BE%80%E4%BD%95%E6%96%B9">§</a></h2>\n<p>Deno 团队有一个决定需要做。他们可以努力添加对 Node.js 的向后兼容性，或者增加更多能诱使用户迁移过来的更多吸引力。我个人认为对 Node.js 的向后兼容是接下来要走的路，如果增加了更多的兼容性，也会极大地改变项目的未来。</p>\n<p>无论如何，以最好的祝福送给 Deno 团队，我也希望更好的技术能最终更有市场。希望你喜欢这篇文章，感谢阅读。</p>\n<blockquote>\n<p>© <a href="https://github.com/hylerrix/deno-tutorial">https://github.com/hylerrix/deno-tutorial</a> 2020~2021</p>\n</blockquote>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%AF%91%E8%80%85%E5%BA%8F" }, "\u8BD1\u8005\u5E8F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%AD%A3%E6%96%87%E5%BC%80%E5%A7%8B" }, "\u6B63\u6587\u5F00\u59CB")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%89%80%E4%BB%A5deno-%E6%98%AF%E4%BB%80%E4%B9%88" }, "\u6240\u4EE5\uFF0CDeno \u662F\u4EC0\u4E48\uFF1F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%B8%BA%E4%BB%80%E4%B9%88-deno-%E6%B2%A1%E6%9C%89%E4%BC%97%E6%9C%9B%E6%89%80%E5%BD%92" }, "\u4E3A\u4EC0\u4E48 Deno \u6CA1\u6709\u4F17\u671B\u6240\u5F52\uFF1F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E9%82%A3%E4%B9%88%E4%BB%A3%E4%BB%B7%E6%98%AF%E4%BB%80%E4%B9%88%E5%91%A2" }, "\u90A3\u4E48\uFF0C\u4EE3\u4EF7\u662F\u4EC0\u4E48\u5462\uFF1F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#deno-%E5%B0%86%E4%BC%9A%E5%8E%BB%E5%BE%80%E4%BD%95%E6%96%B9" }, "Deno \u5C06\u4F1A\u53BB\u5F80\u4F55\u65B9\uFF1F")))),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-23T03:11:47.000Z",
    'updated': null,
    'excerpt': "译者序 正文开始 Deno 是一个旨在改进甚至替代 Node 的 JavaScript / TypeScript 运行时。它拥有众多的功能和广泛的关注度，截止目前在 Github 上已经有 68k 个 Star（译者注：2021-04 月底已 75k star）： https://github.com...",
    'cover': "https://cdn.nlark.com/yuque/0/2021/png/86548/1619618596082-54ed430d-164c-4fca-b587-0ae95408ecfe.png#height=618&id=y17xf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=2048&originWidth=2732&originalType=binary&size=1043288&status=done&style=none&width=825",
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
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/translation/why-deno-flopped.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "\u4E3A\u4EC0\u4E48 Deno \u6CA1\u6709\u4F17\u671B\u6240\u5F52\uFF1F\u8D85\u8D8A Node.js \u8FD8\u8981\u505A\u4E9B\u4EC0\u4E48\uFF1F" })
};
