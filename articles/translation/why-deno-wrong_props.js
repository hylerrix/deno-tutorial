import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "Deno + Oak 连接 MySQL 实战教程",
        "link": "articles/translation/deno-oak-mysql.html"
    },
    'next': {
        "text": "Rust 语言入门教程：从实战 To-Do App 开始",
        "link": "articles/rust/rust-tutorial-todo-app.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/translation/why-deno-wrong.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/translation/why-deno-wrong.html",
    'title': "为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>为什么我认为 Deno 是一个迈向错误方向的 JavaScript 运行时？</h1>\n<blockquote>\n<ul>\n<li>原文地址：<a href="https://www.freecodecamp.org/news/why-deno-is-a-wrong-step-in-the-future/">Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments</a></li>\n<li>原文作者：Mehul Mohan</li>\n<li>原文发布时间：2020-05-14</li>\n<li>译者：<a href="https://github.com/hylerrix">hylerrix</a></li>\n<li>备注：本文遵循 <a href="https://github.com/freeCodeCamp/news-translation">freeCodeCamp 翻译规范</a>，同时本文会收录在<a href="https://github.com/hylerrix/deno-tutorial">《Deno 钻研之术》</a>的翻译篇中。</li>\n<li>备注：非营利组织 <a href="http://freeCodeCamp.org">freeCodeCamp.org</a> 自 2014 年成立以来，以“帮助人们免费学习编程”为使命，创建了大量免费的编程教程，包括交互式课程、视频课程、文章等。线下开发者社区遍布 160 多个国家、2000 多个城市。FCC 正在帮助全球数百万人学习编程，希望让世界上每个人都有机会获得免费的优质的编程教育资源，成为开发者或者运用编程去解决问题。搜索关注微信公众号 “freeCodeCamp”，可了解更多信息。</li>\n</ul>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610538854285-bc5db817-2188-4013-ae19-a1ffe77923de.png#align=left&amp;display=inline&amp;height=497&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=1333&amp;originWidth=2000&amp;size=4783066&amp;status=done&amp;style=none&amp;width=746" alt=""></p>\n<h2 id="%E8%AF%91%E8%80%85%E5%BA%8F">译者序<a class="anchor" href="#%E8%AF%91%E8%80%85%E5%BA%8F">§</a></h2>\n<p>在为《<a href="https://github.com/hylerrix/deno-tutorial">Deno 钻研之术</a>》引入第一篇翻译文章的时候，就看到了这篇文章，那时还觉得驾驭不了，就重点先写了若干篇入门级别的 Deno 文章。</p>\n<p>转眼到 2021 年，从《<a href="https://github.com/hylerrix/deno-feedly">Deno 双周刊</a>》第一期继续开启新的一年的 Deno 之旅，于是就回想起了本文，觉得可以通过好好阅读本文及相关后，从另一个角度了解 Deno，翻译就开始了。</p>\n<p>相比前面对文章的直接翻译外，本文有很多想要记笔记的地方（甚至“大开眼界”的地方），因此独特地开辟本文的“译者序”篇章，来梳理一下原文及其相关视频到底针对 Deno 的另一面，都讲了什么。</p>\n<p>也正如原文所说，这注定是一篇有争议的文章，从文章中引入的两个视频中的点踩数都微微大于点赞数、其评论区都充满着“火热”的讨论就能看出多个观点的冲撞。原文也存在些过度批评的地方，但是不妨碍下方译文开始后一比一地还原原作者想要表达的观点！</p>\n<p>所以，原作者 Mehul 在原文以及两个视频中到底想要说 Deno 为什么没那么好？其观点大致梳理如下：</p>\n<blockquote>\n<p>注意：如果想先看原文的话可以跳过阅读并在之后来看这份简单的总结。</p>\n</blockquote>\n<ul>\n<li>Deno 和 Node 确实有<strong>竞争关系</strong>，因为你必须在你的下个项目中作出选择。</li>\n<li>Deno 现在所做的<strong>成果并不是很多</strong>，大多特性都可以在 Node 生态中较好地解决掉。</li>\n<li><strong>URL import</strong> 还是一场灾难。NPM 中已经有很多明星项目“竟然只有一行代码”、“暗中偷窃用户数据”、“注入挖矿代码”、“兼容性出现问题导致很多上游库受影响”等问题，URL import 本身并不能解决这些问题，更没有一个像 Node 一样强壮的社区来保证受人信任的依赖库，也就不会有更多的开发者愿意加入到 Deno 生态中。</li>\n<li>由于 <strong>TypeScript</strong> 是 JavaScript 的超集，完全可以选择跳过类型验证，此时推荐新手在 Deno 上直接使用 TypeScript 编程坑会很大，很可能会出现一堆 any 类型。在经常性的调试报错下，TypeScript 的学习成本也较高，很容易写出低质量代码。</li>\n<li><strong>TypeScript</strong> 并不是直接在 Deno 上跑的，其实还是变成了 JavaScript 来跑，何必一定要集成到 Deno 中呢？</li>\n<li><strong>安全</strong>是一个很难的事情，Deno 宣传自己的“安全沙箱”注定要承担很大的责任。Deno 安全沙箱也没有必要，完全可以用 Docker 等容器或虚拟化技术来支持。同时，真正想搞破坏的脚本也会找到自己的方式来规避安全问题。</li>\n<li>以当时版本下的 <code>deno --allow-run</code> 运行主进程从而开启的子进程能轻松突破安全沙箱的验证来获得更多权限为例，发现 Deno 的“<strong>安全沙箱</strong>”并没有所说的那么安全。</li>\n<li>Deno 没有必要<strong>集成太多工具链</strong>（代码格式化、测试工具、TypeScript 等等）于一体，让各种第三方工具链来一起共建生态的同时，保证 Deno 本身的专注性并提供更友好的插件支持会很好。</li>\n<li>Node 的异步模型<strong>并没有被淘汰</strong>，promise 和事件侦听器模型也没有套题，因此不确定 Deno 将如何解决这些没有被淘汰的问题。</li>\n<li>未来并不确定会有多少开发者愿意将 npm 中的成熟库逐渐<strong>迁移到 Deno 中</strong>。</li>\n</ul>\n<p>可以看出，无论你是 Node 开发者还是 Deno 爱好者，这些观点都有很多值得思考的地方。但也有有失偏颇的地方，比如文中将 Deno 说明为编程语言，也将 Deno 只发展了两年多的生态直接和建设了十年的 Node 生态作横向对比——Deno 注定会有自己独特的发展轨迹。</p>\n<p>最后，原文作者 Mehul 总结了他眼中的 Deno v1.0 的真实面貌：</p>\n<blockquote>\n<p>Deno = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + &lt;各种各样的小工具&gt; - NPM]</p>\n</blockquote>\n<h2 id="%E8%AF%91%E6%96%87%E5%BC%80%E5%A7%8B">译文开始<a class="anchor" href="#%E8%AF%91%E6%96%87%E5%BC%80%E5%A7%8B">§</a></h2>\n<p>目前，我还没有在 Youtube 上找到任何一个像 <a href="https://www.youtube.com/codedamn">codedamn</a> 一样的频道（超过 10 万名开发者订阅），其对 Deno v1 版本的发布并不感到兴奋。</p>\n<p>上周，我在我的频道上发布了一个视频，介绍了一些“为什么我认为我们不需要 Deno——另一个基于 V8 和 Node 的 JavaScript 运行时”的原因，这些原因对我来说都很简明扼要。</p>\n<p>同时通过本文，我可以在视频外拓展阐述更多的原因。但如果你想先看视频，可以看看这个：</p>\n<blockquote>\n<p><a href="https://www.youtube.com/watch?v=Uf1md0k6ATs">为什么 Deno 将会失败 —— Node.js v/s Deno 之我的观点</a></p>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610540346864-84d3dec6-0d44-4915-9909-3d16bcc1b75d.png#align=left&amp;display=inline&amp;height=469&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=469&amp;originWidth=836&amp;size=439776&amp;status=done&amp;style=none&amp;width=836" alt=""></p>\n<p>为了证明我总体上并不是反对 Deno 甚至 JavaScript 本身，我想声明一下：我喜欢 JavaScript 胜过于很多其它的编程技术。我的主要技术栈也只围绕着 JavaScript 展开——Node/React/MongoDB/React Native/NativeScript/Ionic/甚至你能想到的更多相关库。</p>\n<p>我也是主要用 JavaScript 这一门语言，就让我的 <a href="https://www.youtube.com/codedamn">Youtube 频道</a>及一个<a href="https://codedamn.com/">开发者平台</a>的订阅人数达到了 10 万多人。</p>\n<p>但重要的事情在于，保持公平客观的角度来看到一个事务的两面性很重要。Deno 当然有好的一面，但也有大多数人尚未看到/写文探讨的另一面。一起来看看吧！\n_\n<strong><em>注意：</em></strong><em>本文注定会是一个有争议性的文章。请先让我们保持礼貌的态度并控制好自己的情绪。如果你能仔细阅读全文直到结尾，然后再说说你的更多想法，那我会备受感激。</em>\n_\n<em>本文底部我会列出我的社交账号，也希望我们能在哪里针对此主题进行更多的良好探讨。</em></p>\n<h2 id="deno-vs-node%E5%90%8D%E5%89%AF%E5%85%B6%E5%AE%9E%E7%9A%84%E7%AB%9E%E4%BA%89%E5%85%B3%E7%B3%BB">Deno vs Node：名副其实的竞争关系<a class="anchor" href="#deno-vs-node%E5%90%8D%E5%89%AF%E5%85%B6%E5%AE%9E%E7%9A%84%E7%AB%9E%E4%BA%89%E5%85%B3%E7%B3%BB">§</a></h2>\n<p>有很多业内人士都在说：“Deno 和 Node 之间没有任何竞争关系，彼此之间可以学到很多东西”。</p>\n<p>在某种程度上，我同意这个看法，Node 和 Deno 确实可以互相学习。但是两者间真的没有竞争关系了吗？我完全不同意这关观点。</p>\n<p>让我们重新看一下 Deno 和 Node 的共同特征：</p>\n<ol>\n<li>它们都是 JavaScript 的运行时环境；</li>\n<li>它们都可以在可以运行 V8 的任何计算机上运行；</li>\n<li>它们都有 ECMAScript 标准支持；</li>\n<li>它们都在被积极的维护中。</li>\n</ol>\n<p>如果你这两年都是 Deno 的粉丝，这两年里不选择 Node 而直接用 Deno 作为新项目的技术选型是不可能的。</p>\n<p>同理，如果你以前从未使用过 TypeScript，并且认为自己想要尝试 Deno，此时你会很难同时用上 NPM 生态中的各种模块。</p>\n<p>所以：Deno 和 Node 的开发人员目前确实存在分歧——你必须做选择，我想说这是两者为竞争关系的一个很重要的例子。</p>\n<h2 id="deno-%E5%88%B0%E5%BA%95%E5%A5%BD%E5%9C%A8%E5%93%AA%E9%87%8C">Deno 到底好在哪里？<a class="anchor" href="#deno-%E5%88%B0%E5%BA%95%E5%A5%BD%E5%9C%A8%E5%93%AA%E9%87%8C">§</a></h2>\n<p>首先，我需要列举一下 Deno 对自己的宣传中的那些优势，Deno 为什么说自己是更好的运行时：</p>\n<ol>\n<li>它克服了 Node 的一些缺点；</li>\n<li>它在默认情况下是一个安全的运行时环境；</li>\n<li>它内置 TypeScript 支持；</li>\n<li>它将 Promise 的支持下放到底层；</li>\n<li>它基于 Rust 语言构建（对比与 C++ 之于 Node）。</li>\n</ol>\n<p>在接下来的章节中，我将一个一个针对上面的每一个属于 Deno 的优点，来看看 Node 可以从中学到什么。我也将会在必要之时探讨，为什么 Deno 还没有那么有意义。</p>\n<h2 id="deno-%E7%94%BB%E8%9B%87%E6%B7%BB%E8%B6%B3%E5%9C%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E5%9C%B0%E6%96%B9">Deno 画蛇添足在了哪些地方？<a class="anchor" href="#deno-%E7%94%BB%E8%9B%87%E6%B7%BB%E8%B6%B3%E5%9C%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E5%9C%B0%E6%96%B9">§</a></h2>\n<p>让我们开始拿起 Deno 的独特宣传点（USP，Unique Selling Proposition） 并将它们一一解析：</p>\n<h3 id="%E9%BB%98%E8%AE%A4%E5%AE%89%E5%85%A8%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83">默认安全的运行时环境<a class="anchor" href="#%E9%BB%98%E8%AE%A4%E5%AE%89%E5%85%A8%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83">§</a></h3>\n<p>这是 Deno 里很受欢迎的特性，我很惊喜。Deno 直接默认支持一个安全的沙箱环境，除非你明确的选择开启访问文件系统或访问网络等功能权限。</p>\n<p>Deno 这样做是因为它想更加地贴近浏览器。Deno 遵守 ECMAScript 标准这点很不错，但为什么如此热衷于率先贴近浏览器？</p>\n<p>或许答案是，Deno 想要保持在客户端和服务端上编写的代码之间有良好的兼容性。但 Deno 如此强烈的想要支持浏览器以至于我觉得方向有些偏失、甚至有些过头了。</p>\n<p>Node 虽不支持“安全的运行时”——但经过深思熟虑后，我觉得也有理由支持 Node：</p>\n<ol>\n<li>众所周知，你不应该在系统上运行不受信任的代码和可执行文件。这就是我们总是选择像 Express 库之于 Node 的原因（而不是随便找个声称自己速度比 Express 快 100 倍的库）。信任来自于社区的大量使用。</li>\n<li>我不知道有任何编程语言像 Deno 这样提供如此的沙箱环境。尽管这个功能可能不错，但似乎应该交由诸如 Docker 这类的容器环境来完成。我相信一个被良好配置的 Docker 环境，相比在沙箱化的 Deno 环境中运行不受信任的 Node 代码来说，能更好的处理不受信任文件的安全性问题。</li>\n<li>沙箱化并没那么容易——我虽然不是网络安全专家，但我觉得某些功能越多，攻击面就可能越大。Deno 承诺提供安全的运行时环境，但我想说安全很难实现。Deno 的承诺带来了巨大的安全责任。世界上最大的企业们为支持它们的安全白帽计划，需要每年为独立开发者和安全公司投入将近数亿美金。因此，Deno 到底会将它们的“安全环境”带向何方？时间会证明一切。</li>\n</ol>\n<p>所以，Node 可以从 Deno 中学到什么？我想说不会学到太多。Node 或许可以从竞争对手可以引入一些安全环境的标识，但是没有太多意义。如果你想在你的系统上随意运行一些未知代码，则最好克隆一个 C/C++ 仓库并运行 make 命令损害系统。</p>\n<blockquote>\n<p>译者注：上段最后一句话是“If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.”，有些难以翻译，也不容易看出为什么从 Node/Deno 突然跑到了 C/C++，欢迎交流。</p>\n</blockquote>\n<p>据我所知，你不能在像 C/C++ 这样的底层语言上来“沙盒化”文件系统或网络访问——这样效率并不高。</p>\n<p>注意：最近我发现启用 <code>--allow-run</code> 标志的 Deno 几乎可以完成任何操作。该视频详细介绍了相关内容：</p>\n<blockquote>\n<p><a href="https://www.youtube.com/watch?v=_lvas914dXI">突破 Deno 的安全沙箱——Deno 并不安全</a></p>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610546817704-834b27ab-b383-4544-98e8-5ef73d751f29.png#align=left&amp;display=inline&amp;height=468&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=468&amp;originWidth=832&amp;size=292518&amp;status=done&amp;style=none&amp;width=832" alt=""></p>\n<h3 id="%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81-typescript">内置支持 TypeScript<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81-typescript">§</a></h3>\n<p>为 TypeScript 现阶段的进展欢呼，我很高兴 Deno 开箱即用地支持 TypeScript。</p>\n<p><em><strong>注:</strong>  感谢 <a href="/lilasquared">@lilasquared </a>指出 Deno 也能开箱即用地运行 <code>.js</code> 文件。本文重点强调使用 <code>.ts</code> 文件编写代码。Deno 当然可以直接运行 .js 文件。</em></p>\n<p>但是，让我们退一步来说：你知道为什么 JavaScript 和 Node 在全球拥有数以万计的开发人员吗？因为进入这个领域的壁垒几乎为零。JavaScript 是灵活的，可以容许你的诸多错误。而 TypeScript 总会给你一些奇怪的错误。</p>\n<p>对于生产级的应用程序来说就糟糕了：生产环境上可不需要这些时髦的东西。同时对于学习者来说，JavaScript 是宽容的，纵使你可能会遇到一些 Bug，但也可以很轻松的改正，引用一句话，JavaScript 可以被快速编码并将事情搞定。</p>\n<p>对于初学者来说，我担心他们如果选择使用 Deno（并被要求使用 TypeScript），因为他们还不了解 TypeScript，想着快速在服务端上跑通代码，我们可能会看到很多这种的代码：</p>\n<pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> httpResponse<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getAPIResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> myParams <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n<span class="token keyword">const</span> someOtherVariable <span class="token operator">=</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span>\n<span class="token comment">// ...</span>\n<span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span>\n</code></pre>\n<p>TypeScript 是 JavaScript 的超集。你完全可以无意识间写一段质量很差的 TypeScript 代码，仅仅使用 TypeScript 并不会让你的项目无懈可击。</p>\n<p>直到你想起来本来就能在 Node 中写 TypeScript 之前，这种体验确实很有趣。我相信现在每个在生产环境中使用 Node 的大型公司都引入了 TypeScript 来编写项目——没有例外。当你处理诸多文件及其依赖关系、处理大量代码时，JavaScript 真的很难拓展。</p>\n<p>TypeScript 是 JavaScript 生态系统中革命性的工具包，更好地同时支持了静态和动态语言。</p>\n<p>因此 Deno 声明自己会内置 TypeScript 支持。但我想问为什么一定要这样？确实，如果不内置的话，可能需要额外引入 Babel 和 Webpack 来完成这项工作，但这不是一堆第三方工具链围绕身边来共建生态的重要意义吗？我们难道不想增强 DX 吗？</p>\n<blockquote>\n<p>译者注：DX，开发人员体验，是 Developer Experience 的简称。当软件或系统的用户是开发人员时，开发人员体验（DX）就相当于用户体验（UX, User experience design）。</p>\n</blockquote>\n<p>JavaScript 依然还会是 JavaScript，保持自身的风格。况且，如果 Deno 真的能直接运行 TypeScript（或类似于 TypeScript 的语言），我觉得没什么问题。但事实上，Deno 其实也只是将 TypeScript 代码转换为 JavaScript 代码，并运行它罢了。</p>\n<p>从这些角度能看出，Deno 似乎是一个 Node 下各种工具的的集成版本，Deno 将一个测试工具、一个代码格式化程序和 TypeScript 等一次性的包括进来。我更喜欢一个精简的编程语言并在合适的时候由我自己添加各种插件——当然，我不能代表所有开发人员，这也只是我的观点。</p>\n<p>为什么我会在已经有专注于代码格式化的 prettier 库的情况下，依然需要领一个内置的代码格式化工具？为什么要解决这种本身就做的不错的东西？</p>\n<p>单体架构确实集中起来提供了很多工具，但它也真的很庞大，一个更精简和专注的核心库才能更好的维护和拓展。</p>\n<h3 id="promise-%E7%9A%84%E6%94%AF%E6%8C%81%E4%B8%8B%E6%94%BE%E5%88%B0%E5%BA%95%E5%B1%82">Promise 的支持下放到底层<a class="anchor" href="#promise-%E7%9A%84%E6%94%AF%E6%8C%81%E4%B8%8B%E6%94%BE%E5%88%B0%E5%BA%95%E5%B1%82">§</a></h3>\n<p>和 Node 作为对比，Deno v1 的发布对我来说看不出太多的意义。我非常尊重 Node 和 Deno 的创建者，但是 Node 拥有一些 Deno 所没有的东西——世界各地众多经验丰富的开发人员的支持。</p>\n<p>Node 由近 3000 位开发者贡献力量，并且是异步 I/O 事件处理的引领者。Deno 确实建立在 Rust 之上，并公开了类似 Promise 的的抽象。但是 Node 有 C++，有 3000 名开发人员以及 10 年以上的开发和维护。</p>\n<p>Node 的异步模型并没有被淘汰，promise 和事件侦听器模型也没有被淘汰，因此我不确定 Deno 将如何解决这些并没被淘汰的问题。</p>\n<h3 id="%E5%86%8D%E8%A7%81%E4%BA%86npm">再见了，npm<a class="anchor" href="#%E5%86%8D%E8%A7%81%E4%BA%86npm">§</a></h3>\n<p>很重要的事情是：Deno 并不支持 NPM。Ryan（Node 和 Deno 的创建者）在为此推广 Go 语言的相关特性。让我想到一些包管理器：</p>\n<ol>\n<li>npm for JS (obviously)</li>\n<li>npm 之于 JS（真很明显）</li>\n<li>apt-get</li>\n<li>composer 之于 PHP</li>\n<li>brew 之于 macOS</li>\n<li>cargo 之于 Rust（Deno 正是基于 Rust 构建)</li>\n</ol>\n<p>我认为不使用包管理器来管理是很不好的一步。包管理器能做的太多了：标明版本、编写脚本、管理依赖关系等等。为什么 Deno 不使用 npm 呢？我并不清楚，但这些是我想到的：</p>\n<ol>\n<li>首先，因为 Deno 需要 TypeScript 生态，但是后者生态更多的是 JavaScript 的。更正：Deno 也能良好的运行 <code>.js</code> 文件。</li>\n<li>其次，大量 npm 模块需要要求使用到文件/网络甚至更多的条件，而这些 Deno 都很严格的默认不提供这些权限了。所以你需要在 package.json 里注入大量颇许冗余的“permissions”字段来提供更多权限。然而...Deno 无法和 npm 互相配合，因此也没有 package.json。接下来我们会来看看 Deno 到底如何处理模块系统的。</li>\n<li>NPM 模块数量及其庞大甚至臃肿，但这也是 Node 生态的强大生命力所在。想要找一个库来将 tar 文件内容提取到 stream 流中？你可以选择 tar-steram。想要一个数据格式验证库？你可以选择 joi。想要配合 JWT 协同使用？你可以选择 jsonwebtoken。我怀疑得有多久才能让开发者们将他们的各种库变得兼容 Deno 系统？</li>\n</ol>\n<p>Deno 对模块系统采用了一种完全不同的方法。但无论如何，Deno 在尝试以某种方式“修补”现有的 NPM 模块。那么除了尝试在 Docker 容器中“入侵”（hacking around）一个 TS + Node 项目外，我看不到太多使用 Deno 的意义。</p>\n<p>根据我目前所了解的有关 Deno 的一切，这是 Deno 现在的真实面貌：</p>\n<blockquote>\n<p><strong>Deno</strong> = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + &lt;各种各样的小工具&gt; - NPM]</p>\n</blockquote>\n<p>搞定！让我们冷静一下，然后听我一下的总结。</p>\n<h2 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h2>\n<p>我和其它人对 Deno 的出现一样感到兴奋。但当 Deno 准备完全重写 JavaScript 运行时时，我的期望便有所变动。</p>\n<p>Deno 的自动化 TypeScript 文档等诸多不错的特性我没有提到，是因为我希望这篇文章旨在展示 Deno 的另一面。因为 Deno 的优点几乎可以再任何其他 Deno 的文章中找到，所以我需要再次强调硬币的两面性。</p>\n<p>坦白来说，Deno 看起来为了一些很小的益处承担了巨大的责任和代价，包括转移现有的 NPM 模块和代码库的诸多债务。你同意还是不同意我的这些观点呢？我很期待你的想法。推特联系我 <a href="https://twitter.com/mehulmpt">@mehulmpt</a> 或 <a href="https://instagram.com/mehulmpt">Instagram</a> 也可以！</p>\n<p>祝好！</p>\n<blockquote>\n<p>全文译完，欢迎前往 <a href="https://github.com/hylerrix/deno-tutorial">@hylerrix/deno-tutorial</a> 仓库点个 star 或 watch。</p>\n<p>《Deno 钻研之术》生态现已支持四大方向的不同仓库，持续共建中...</p>\n<ul>\n<li><a href="https://github.com/hylerrix/deno-tutorial">deno-tutorial</a>：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。</li>\n<li><a href="https://github.com/hylerrix/deno-feedly">deno-feedly</a>：Deno 双周刊，中英双语每两周地汇总 Deno 动态，2021 开年之作。</li>\n<li><a href="https://github.com/hylerrix/deno-algorithm">deno-algorithm</a>：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。</li>\n<li><a href="https://github.com/hylerrix/awesome-deno-cn">awesome-deno-cn</a>：见名知意，中文社区下的 Deno 资源全图谱，求 PR。</li>\n</ul>\n<p>以及更多使用 Deno 生态库构建的电子书如 <a href="https://github.com/hylerrix/es-interview">es-interview</a> （《ECMAScript+ 面试宝典》）等，尽请 follow 好家伙：<a href="https://github.com/hylerrix">Github@hylerrix</a></p>\n</blockquote>\n<blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610637369018-c78fa688-01c1-416d-809b-34f6d0dfe1fe.png#align=left&amp;display=inline&amp;height=173&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=357&amp;originWidth=409&amp;size=238717&amp;status=done&amp;style=none&amp;width=198" alt=""></p>\n</blockquote>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4E3A\u4EC0\u4E48\u6211\u8BA4\u4E3A Deno \u662F\u4E00\u4E2A\u8FC8\u5411\u9519\u8BEF\u65B9\u5411\u7684 JavaScript \u8FD0\u884C\u65F6\uFF1F"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<ul>\n<li>原文地址：<a href="https://www.freecodecamp.org/news/why-deno-is-a-wrong-step-in-the-future/">Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments</a></li>\n<li>原文作者：Mehul Mohan</li>\n<li>原文发布时间：2020-05-14</li>\n<li>译者：<a href="https://github.com/hylerrix">hylerrix</a></li>\n<li>备注：本文遵循 <a href="https://github.com/freeCodeCamp/news-translation">freeCodeCamp 翻译规范</a>，同时本文会收录在<a href="https://github.com/hylerrix/deno-tutorial">《Deno 钻研之术》</a>的翻译篇中。</li>\n<li>备注：非营利组织 <a href="http://freeCodeCamp.org">freeCodeCamp.org</a> 自 2014 年成立以来，以“帮助人们免费学习编程”为使命，创建了大量免费的编程教程，包括交互式课程、视频课程、文章等。线下开发者社区遍布 160 多个国家、2000 多个城市。FCC 正在帮助全球数百万人学习编程，希望让世界上每个人都有机会获得免费的优质的编程教育资源，成为开发者或者运用编程去解决问题。搜索关注微信公众号 “freeCodeCamp”，可了解更多信息。</li>\n</ul>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610538854285-bc5db817-2188-4013-ae19-a1ffe77923de.png#align=left&amp;display=inline&amp;height=497&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=1333&amp;originWidth=2000&amp;size=4783066&amp;status=done&amp;style=none&amp;width=746" alt=""></p>\n<h2 id="%E8%AF%91%E8%80%85%E5%BA%8F">译者序<a class="anchor" href="#%E8%AF%91%E8%80%85%E5%BA%8F">§</a></h2>\n<p>在为《<a href="https://github.com/hylerrix/deno-tutorial">Deno 钻研之术</a>》引入第一篇翻译文章的时候，就看到了这篇文章，那时还觉得驾驭不了，就重点先写了若干篇入门级别的 Deno 文章。</p>\n<p>转眼到 2021 年，从《<a href="https://github.com/hylerrix/deno-feedly">Deno 双周刊</a>》第一期继续开启新的一年的 Deno 之旅，于是就回想起了本文，觉得可以通过好好阅读本文及相关后，从另一个角度了解 Deno，翻译就开始了。</p>\n<p>相比前面对文章的直接翻译外，本文有很多想要记笔记的地方（甚至“大开眼界”的地方），因此独特地开辟本文的“译者序”篇章，来梳理一下原文及其相关视频到底针对 Deno 的另一面，都讲了什么。</p>\n<p>也正如原文所说，这注定是一篇有争议的文章，从文章中引入的两个视频中的点踩数都微微大于点赞数、其评论区都充满着“火热”的讨论就能看出多个观点的冲撞。原文也存在些过度批评的地方，但是不妨碍下方译文开始后一比一地还原原作者想要表达的观点！</p>\n<p>所以，原作者 Mehul 在原文以及两个视频中到底想要说 Deno 为什么没那么好？其观点大致梳理如下：</p>\n<blockquote>\n<p>注意：如果想先看原文的话可以跳过阅读并在之后来看这份简单的总结。</p>\n</blockquote>\n<ul>\n<li>Deno 和 Node 确实有<strong>竞争关系</strong>，因为你必须在你的下个项目中作出选择。</li>\n<li>Deno 现在所做的<strong>成果并不是很多</strong>，大多特性都可以在 Node 生态中较好地解决掉。</li>\n<li><strong>URL import</strong> 还是一场灾难。NPM 中已经有很多明星项目“竟然只有一行代码”、“暗中偷窃用户数据”、“注入挖矿代码”、“兼容性出现问题导致很多上游库受影响”等问题，URL import 本身并不能解决这些问题，更没有一个像 Node 一样强壮的社区来保证受人信任的依赖库，也就不会有更多的开发者愿意加入到 Deno 生态中。</li>\n<li>由于 <strong>TypeScript</strong> 是 JavaScript 的超集，完全可以选择跳过类型验证，此时推荐新手在 Deno 上直接使用 TypeScript 编程坑会很大，很可能会出现一堆 any 类型。在经常性的调试报错下，TypeScript 的学习成本也较高，很容易写出低质量代码。</li>\n<li><strong>TypeScript</strong> 并不是直接在 Deno 上跑的，其实还是变成了 JavaScript 来跑，何必一定要集成到 Deno 中呢？</li>\n<li><strong>安全</strong>是一个很难的事情，Deno 宣传自己的“安全沙箱”注定要承担很大的责任。Deno 安全沙箱也没有必要，完全可以用 Docker 等容器或虚拟化技术来支持。同时，真正想搞破坏的脚本也会找到自己的方式来规避安全问题。</li>\n<li>以当时版本下的 <code>deno --allow-run</code> 运行主进程从而开启的子进程能轻松突破安全沙箱的验证来获得更多权限为例，发现 Deno 的“<strong>安全沙箱</strong>”并没有所说的那么安全。</li>\n<li>Deno 没有必要<strong>集成太多工具链</strong>（代码格式化、测试工具、TypeScript 等等）于一体，让各种第三方工具链来一起共建生态的同时，保证 Deno 本身的专注性并提供更友好的插件支持会很好。</li>\n<li>Node 的异步模型<strong>并没有被淘汰</strong>，promise 和事件侦听器模型也没有套题，因此不确定 Deno 将如何解决这些没有被淘汰的问题。</li>\n<li>未来并不确定会有多少开发者愿意将 npm 中的成熟库逐渐<strong>迁移到 Deno 中</strong>。</li>\n</ul>\n<p>可以看出，无论你是 Node 开发者还是 Deno 爱好者，这些观点都有很多值得思考的地方。但也有有失偏颇的地方，比如文中将 Deno 说明为编程语言，也将 Deno 只发展了两年多的生态直接和建设了十年的 Node 生态作横向对比——Deno 注定会有自己独特的发展轨迹。</p>\n<p>最后，原文作者 Mehul 总结了他眼中的 Deno v1.0 的真实面貌：</p>\n<blockquote>\n<p>Deno = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + &lt;各种各样的小工具&gt; - NPM]</p>\n</blockquote>\n<h2 id="%E8%AF%91%E6%96%87%E5%BC%80%E5%A7%8B">译文开始<a class="anchor" href="#%E8%AF%91%E6%96%87%E5%BC%80%E5%A7%8B">§</a></h2>\n<p>目前，我还没有在 Youtube 上找到任何一个像 <a href="https://www.youtube.com/codedamn">codedamn</a> 一样的频道（超过 10 万名开发者订阅），其对 Deno v1 版本的发布并不感到兴奋。</p>\n<p>上周，我在我的频道上发布了一个视频，介绍了一些“为什么我认为我们不需要 Deno——另一个基于 V8 和 Node 的 JavaScript 运行时”的原因，这些原因对我来说都很简明扼要。</p>\n<p>同时通过本文，我可以在视频外拓展阐述更多的原因。但如果你想先看视频，可以看看这个：</p>\n<blockquote>\n<p><a href="https://www.youtube.com/watch?v=Uf1md0k6ATs">为什么 Deno 将会失败 —— Node.js v/s Deno 之我的观点</a></p>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610540346864-84d3dec6-0d44-4915-9909-3d16bcc1b75d.png#align=left&amp;display=inline&amp;height=469&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=469&amp;originWidth=836&amp;size=439776&amp;status=done&amp;style=none&amp;width=836" alt=""></p>\n<p>为了证明我总体上并不是反对 Deno 甚至 JavaScript 本身，我想声明一下：我喜欢 JavaScript 胜过于很多其它的编程技术。我的主要技术栈也只围绕着 JavaScript 展开——Node/React/MongoDB/React Native/NativeScript/Ionic/甚至你能想到的更多相关库。</p>\n<p>我也是主要用 JavaScript 这一门语言，就让我的 <a href="https://www.youtube.com/codedamn">Youtube 频道</a>及一个<a href="https://codedamn.com/">开发者平台</a>的订阅人数达到了 10 万多人。</p>\n<p>但重要的事情在于，保持公平客观的角度来看到一个事务的两面性很重要。Deno 当然有好的一面，但也有大多数人尚未看到/写文探讨的另一面。一起来看看吧！\n_\n<strong><em>注意：</em></strong><em>本文注定会是一个有争议性的文章。请先让我们保持礼貌的态度并控制好自己的情绪。如果你能仔细阅读全文直到结尾，然后再说说你的更多想法，那我会备受感激。</em>\n_\n<em>本文底部我会列出我的社交账号，也希望我们能在哪里针对此主题进行更多的良好探讨。</em></p>\n<h2 id="deno-vs-node%E5%90%8D%E5%89%AF%E5%85%B6%E5%AE%9E%E7%9A%84%E7%AB%9E%E4%BA%89%E5%85%B3%E7%B3%BB">Deno vs Node：名副其实的竞争关系<a class="anchor" href="#deno-vs-node%E5%90%8D%E5%89%AF%E5%85%B6%E5%AE%9E%E7%9A%84%E7%AB%9E%E4%BA%89%E5%85%B3%E7%B3%BB">§</a></h2>\n<p>有很多业内人士都在说：“Deno 和 Node 之间没有任何竞争关系，彼此之间可以学到很多东西”。</p>\n<p>在某种程度上，我同意这个看法，Node 和 Deno 确实可以互相学习。但是两者间真的没有竞争关系了吗？我完全不同意这关观点。</p>\n<p>让我们重新看一下 Deno 和 Node 的共同特征：</p>\n<ol>\n<li>它们都是 JavaScript 的运行时环境；</li>\n<li>它们都可以在可以运行 V8 的任何计算机上运行；</li>\n<li>它们都有 ECMAScript 标准支持；</li>\n<li>它们都在被积极的维护中。</li>\n</ol>\n<p>如果你这两年都是 Deno 的粉丝，这两年里不选择 Node 而直接用 Deno 作为新项目的技术选型是不可能的。</p>\n<p>同理，如果你以前从未使用过 TypeScript，并且认为自己想要尝试 Deno，此时你会很难同时用上 NPM 生态中的各种模块。</p>\n<p>所以：Deno 和 Node 的开发人员目前确实存在分歧——你必须做选择，我想说这是两者为竞争关系的一个很重要的例子。</p>\n<h2 id="deno-%E5%88%B0%E5%BA%95%E5%A5%BD%E5%9C%A8%E5%93%AA%E9%87%8C">Deno 到底好在哪里？<a class="anchor" href="#deno-%E5%88%B0%E5%BA%95%E5%A5%BD%E5%9C%A8%E5%93%AA%E9%87%8C">§</a></h2>\n<p>首先，我需要列举一下 Deno 对自己的宣传中的那些优势，Deno 为什么说自己是更好的运行时：</p>\n<ol>\n<li>它克服了 Node 的一些缺点；</li>\n<li>它在默认情况下是一个安全的运行时环境；</li>\n<li>它内置 TypeScript 支持；</li>\n<li>它将 Promise 的支持下放到底层；</li>\n<li>它基于 Rust 语言构建（对比与 C++ 之于 Node）。</li>\n</ol>\n<p>在接下来的章节中，我将一个一个针对上面的每一个属于 Deno 的优点，来看看 Node 可以从中学到什么。我也将会在必要之时探讨，为什么 Deno 还没有那么有意义。</p>\n<h2 id="deno-%E7%94%BB%E8%9B%87%E6%B7%BB%E8%B6%B3%E5%9C%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E5%9C%B0%E6%96%B9">Deno 画蛇添足在了哪些地方？<a class="anchor" href="#deno-%E7%94%BB%E8%9B%87%E6%B7%BB%E8%B6%B3%E5%9C%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E5%9C%B0%E6%96%B9">§</a></h2>\n<p>让我们开始拿起 Deno 的独特宣传点（USP，Unique Selling Proposition） 并将它们一一解析：</p>\n<h3 id="%E9%BB%98%E8%AE%A4%E5%AE%89%E5%85%A8%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83">默认安全的运行时环境<a class="anchor" href="#%E9%BB%98%E8%AE%A4%E5%AE%89%E5%85%A8%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83">§</a></h3>\n<p>这是 Deno 里很受欢迎的特性，我很惊喜。Deno 直接默认支持一个安全的沙箱环境，除非你明确的选择开启访问文件系统或访问网络等功能权限。</p>\n<p>Deno 这样做是因为它想更加地贴近浏览器。Deno 遵守 ECMAScript 标准这点很不错，但为什么如此热衷于率先贴近浏览器？</p>\n<p>或许答案是，Deno 想要保持在客户端和服务端上编写的代码之间有良好的兼容性。但 Deno 如此强烈的想要支持浏览器以至于我觉得方向有些偏失、甚至有些过头了。</p>\n<p>Node 虽不支持“安全的运行时”——但经过深思熟虑后，我觉得也有理由支持 Node：</p>\n<ol>\n<li>众所周知，你不应该在系统上运行不受信任的代码和可执行文件。这就是我们总是选择像 Express 库之于 Node 的原因（而不是随便找个声称自己速度比 Express 快 100 倍的库）。信任来自于社区的大量使用。</li>\n<li>我不知道有任何编程语言像 Deno 这样提供如此的沙箱环境。尽管这个功能可能不错，但似乎应该交由诸如 Docker 这类的容器环境来完成。我相信一个被良好配置的 Docker 环境，相比在沙箱化的 Deno 环境中运行不受信任的 Node 代码来说，能更好的处理不受信任文件的安全性问题。</li>\n<li>沙箱化并没那么容易——我虽然不是网络安全专家，但我觉得某些功能越多，攻击面就可能越大。Deno 承诺提供安全的运行时环境，但我想说安全很难实现。Deno 的承诺带来了巨大的安全责任。世界上最大的企业们为支持它们的安全白帽计划，需要每年为独立开发者和安全公司投入将近数亿美金。因此，Deno 到底会将它们的“安全环境”带向何方？时间会证明一切。</li>\n</ol>\n<p>所以，Node 可以从 Deno 中学到什么？我想说不会学到太多。Node 或许可以从竞争对手可以引入一些安全环境的标识，但是没有太多意义。如果你想在你的系统上随意运行一些未知代码，则最好克隆一个 C/C++ 仓库并运行 make 命令损害系统。</p>\n<blockquote>\n<p>译者注：上段最后一句话是“If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.”，有些难以翻译，也不容易看出为什么从 Node/Deno 突然跑到了 C/C++，欢迎交流。</p>\n</blockquote>\n<p>据我所知，你不能在像 C/C++ 这样的底层语言上来“沙盒化”文件系统或网络访问——这样效率并不高。</p>\n<p>注意：最近我发现启用 <code>--allow-run</code> 标志的 Deno 几乎可以完成任何操作。该视频详细介绍了相关内容：</p>\n<blockquote>\n<p><a href="https://www.youtube.com/watch?v=_lvas914dXI">突破 Deno 的安全沙箱——Deno 并不安全</a></p>\n</blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610546817704-834b27ab-b383-4544-98e8-5ef73d751f29.png#align=left&amp;display=inline&amp;height=468&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=468&amp;originWidth=832&amp;size=292518&amp;status=done&amp;style=none&amp;width=832" alt=""></p>\n<h3 id="%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81-typescript">内置支持 TypeScript<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81-typescript">§</a></h3>\n<p>为 TypeScript 现阶段的进展欢呼，我很高兴 Deno 开箱即用地支持 TypeScript。</p>\n<p><em><strong>注:</strong>  感谢 <a href="/lilasquared">@lilasquared </a>指出 Deno 也能开箱即用地运行 <code>.js</code> 文件。本文重点强调使用 <code>.ts</code> 文件编写代码。Deno 当然可以直接运行 .js 文件。</em></p>\n<p>但是，让我们退一步来说：你知道为什么 JavaScript 和 Node 在全球拥有数以万计的开发人员吗？因为进入这个领域的壁垒几乎为零。JavaScript 是灵活的，可以容许你的诸多错误。而 TypeScript 总会给你一些奇怪的错误。</p>\n<p>对于生产级的应用程序来说就糟糕了：生产环境上可不需要这些时髦的东西。同时对于学习者来说，JavaScript 是宽容的，纵使你可能会遇到一些 Bug，但也可以很轻松的改正，引用一句话，JavaScript 可以被快速编码并将事情搞定。</p>\n<p>对于初学者来说，我担心他们如果选择使用 Deno（并被要求使用 TypeScript），因为他们还不了解 TypeScript，想着快速在服务端上跑通代码，我们可能会看到很多这种的代码：</p>\n<pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> httpResponse<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getAPIResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> myParams <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n<span class="token keyword">const</span> someOtherVariable <span class="token operator">=</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span>\n<span class="token comment">// ...</span>\n<span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span>\n</code></pre>\n<p>TypeScript 是 JavaScript 的超集。你完全可以无意识间写一段质量很差的 TypeScript 代码，仅仅使用 TypeScript 并不会让你的项目无懈可击。</p>\n<p>直到你想起来本来就能在 Node 中写 TypeScript 之前，这种体验确实很有趣。我相信现在每个在生产环境中使用 Node 的大型公司都引入了 TypeScript 来编写项目——没有例外。当你处理诸多文件及其依赖关系、处理大量代码时，JavaScript 真的很难拓展。</p>\n<p>TypeScript 是 JavaScript 生态系统中革命性的工具包，更好地同时支持了静态和动态语言。</p>\n<p>因此 Deno 声明自己会内置 TypeScript 支持。但我想问为什么一定要这样？确实，如果不内置的话，可能需要额外引入 Babel 和 Webpack 来完成这项工作，但这不是一堆第三方工具链围绕身边来共建生态的重要意义吗？我们难道不想增强 DX 吗？</p>\n<blockquote>\n<p>译者注：DX，开发人员体验，是 Developer Experience 的简称。当软件或系统的用户是开发人员时，开发人员体验（DX）就相当于用户体验（UX, User experience design）。</p>\n</blockquote>\n<p>JavaScript 依然还会是 JavaScript，保持自身的风格。况且，如果 Deno 真的能直接运行 TypeScript（或类似于 TypeScript 的语言），我觉得没什么问题。但事实上，Deno 其实也只是将 TypeScript 代码转换为 JavaScript 代码，并运行它罢了。</p>\n<p>从这些角度能看出，Deno 似乎是一个 Node 下各种工具的的集成版本，Deno 将一个测试工具、一个代码格式化程序和 TypeScript 等一次性的包括进来。我更喜欢一个精简的编程语言并在合适的时候由我自己添加各种插件——当然，我不能代表所有开发人员，这也只是我的观点。</p>\n<p>为什么我会在已经有专注于代码格式化的 prettier 库的情况下，依然需要领一个内置的代码格式化工具？为什么要解决这种本身就做的不错的东西？</p>\n<p>单体架构确实集中起来提供了很多工具，但它也真的很庞大，一个更精简和专注的核心库才能更好的维护和拓展。</p>\n<h3 id="promise-%E7%9A%84%E6%94%AF%E6%8C%81%E4%B8%8B%E6%94%BE%E5%88%B0%E5%BA%95%E5%B1%82">Promise 的支持下放到底层<a class="anchor" href="#promise-%E7%9A%84%E6%94%AF%E6%8C%81%E4%B8%8B%E6%94%BE%E5%88%B0%E5%BA%95%E5%B1%82">§</a></h3>\n<p>和 Node 作为对比，Deno v1 的发布对我来说看不出太多的意义。我非常尊重 Node 和 Deno 的创建者，但是 Node 拥有一些 Deno 所没有的东西——世界各地众多经验丰富的开发人员的支持。</p>\n<p>Node 由近 3000 位开发者贡献力量，并且是异步 I/O 事件处理的引领者。Deno 确实建立在 Rust 之上，并公开了类似 Promise 的的抽象。但是 Node 有 C++，有 3000 名开发人员以及 10 年以上的开发和维护。</p>\n<p>Node 的异步模型并没有被淘汰，promise 和事件侦听器模型也没有被淘汰，因此我不确定 Deno 将如何解决这些并没被淘汰的问题。</p>\n<h3 id="%E5%86%8D%E8%A7%81%E4%BA%86npm">再见了，npm<a class="anchor" href="#%E5%86%8D%E8%A7%81%E4%BA%86npm">§</a></h3>\n<p>很重要的事情是：Deno 并不支持 NPM。Ryan（Node 和 Deno 的创建者）在为此推广 Go 语言的相关特性。让我想到一些包管理器：</p>\n<ol>\n<li>npm for JS (obviously)</li>\n<li>npm 之于 JS（真很明显）</li>\n<li>apt-get</li>\n<li>composer 之于 PHP</li>\n<li>brew 之于 macOS</li>\n<li>cargo 之于 Rust（Deno 正是基于 Rust 构建)</li>\n</ol>\n<p>我认为不使用包管理器来管理是很不好的一步。包管理器能做的太多了：标明版本、编写脚本、管理依赖关系等等。为什么 Deno 不使用 npm 呢？我并不清楚，但这些是我想到的：</p>\n<ol>\n<li>首先，因为 Deno 需要 TypeScript 生态，但是后者生态更多的是 JavaScript 的。更正：Deno 也能良好的运行 <code>.js</code> 文件。</li>\n<li>其次，大量 npm 模块需要要求使用到文件/网络甚至更多的条件，而这些 Deno 都很严格的默认不提供这些权限了。所以你需要在 package.json 里注入大量颇许冗余的“permissions”字段来提供更多权限。然而...Deno 无法和 npm 互相配合，因此也没有 package.json。接下来我们会来看看 Deno 到底如何处理模块系统的。</li>\n<li>NPM 模块数量及其庞大甚至臃肿，但这也是 Node 生态的强大生命力所在。想要找一个库来将 tar 文件内容提取到 stream 流中？你可以选择 tar-steram。想要一个数据格式验证库？你可以选择 joi。想要配合 JWT 协同使用？你可以选择 jsonwebtoken。我怀疑得有多久才能让开发者们将他们的各种库变得兼容 Deno 系统？</li>\n</ol>\n<p>Deno 对模块系统采用了一种完全不同的方法。但无论如何，Deno 在尝试以某种方式“修补”现有的 NPM 模块。那么除了尝试在 Docker 容器中“入侵”（hacking around）一个 TS + Node 项目外，我看不到太多使用 Deno 的意义。</p>\n<p>根据我目前所了解的有关 Deno 的一切，这是 Deno 现在的真实面貌：</p>\n<blockquote>\n<p><strong>Deno</strong> = (大多数情况下)[TypeScript + Node + 正确配置的 Docker 容器 + 单一可执行程序 + &lt;各种各样的小工具&gt; - NPM]</p>\n</blockquote>\n<p>搞定！让我们冷静一下，然后听我一下的总结。</p>\n<h2 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h2>\n<p>我和其它人对 Deno 的出现一样感到兴奋。但当 Deno 准备完全重写 JavaScript 运行时时，我的期望便有所变动。</p>\n<p>Deno 的自动化 TypeScript 文档等诸多不错的特性我没有提到，是因为我希望这篇文章旨在展示 Deno 的另一面。因为 Deno 的优点几乎可以再任何其他 Deno 的文章中找到，所以我需要再次强调硬币的两面性。</p>\n<p>坦白来说，Deno 看起来为了一些很小的益处承担了巨大的责任和代价，包括转移现有的 NPM 模块和代码库的诸多债务。你同意还是不同意我的这些观点呢？我很期待你的想法。推特联系我 <a href="https://twitter.com/mehulmpt">@mehulmpt</a> 或 <a href="https://instagram.com/mehulmpt">Instagram</a> 也可以！</p>\n<p>祝好！</p>\n<blockquote>\n<p>全文译完，欢迎前往 <a href="https://github.com/hylerrix/deno-tutorial">@hylerrix/deno-tutorial</a> 仓库点个 star 或 watch。</p>\n<p>《Deno 钻研之术》生态现已支持四大方向的不同仓库，持续共建中...</p>\n<ul>\n<li><a href="https://github.com/hylerrix/deno-tutorial">deno-tutorial</a>：核心仓库，电子书集中地，围绕 Deno 全生态的各种原创/翻译文章。</li>\n<li><a href="https://github.com/hylerrix/deno-feedly">deno-feedly</a>：Deno 双周刊，中英双语每两周地汇总 Deno 动态，2021 开年之作。</li>\n<li><a href="https://github.com/hylerrix/deno-algorithm">deno-algorithm</a>：想在 Deno 上用 TypeScript 刷 LeetCode 算法？或许可以看看这个（才开源不久，刷一定的题后再宣传）。</li>\n<li><a href="https://github.com/hylerrix/awesome-deno-cn">awesome-deno-cn</a>：见名知意，中文社区下的 Deno 资源全图谱，求 PR。</li>\n</ul>\n<p>以及更多使用 Deno 生态库构建的电子书如 <a href="https://github.com/hylerrix/es-interview">es-interview</a> （《ECMAScript+ 面试宝典》）等，尽请 follow 好家伙：<a href="https://github.com/hylerrix">Github@hylerrix</a></p>\n</blockquote>\n<blockquote>\n<p><img src="https://cdn.nlark.com/yuque/0/2021/png/86548/1610637369018-c78fa688-01c1-416d-809b-34f6d0dfe1fe.png#align=left&amp;display=inline&amp;height=173&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=357&amp;originWidth=409&amp;size=238717&amp;status=done&amp;style=none&amp;width=198" alt=""></p>\n</blockquote>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E8%AF%91%E8%80%85%E5%BA%8F">译者序</a></li><li><a href="#%E8%AF%91%E6%96%87%E5%BC%80%E5%A7%8B">译文开始</a></li><li><a href="#deno-vs-node%E5%90%8D%E5%89%AF%E5%85%B6%E5%AE%9E%E7%9A%84%E7%AB%9E%E4%BA%89%E5%85%B3%E7%B3%BB">Deno vs Node：名副其实的竞争关系</a></li><li><a href="#deno-%E5%88%B0%E5%BA%95%E5%A5%BD%E5%9C%A8%E5%93%AA%E9%87%8C">Deno 到底好在哪里？</a></li><li><a href="#deno-%E7%94%BB%E8%9B%87%E6%B7%BB%E8%B6%B3%E5%9C%A8%E4%BA%86%E5%93%AA%E4%BA%9B%E5%9C%B0%E6%96%B9">Deno 画蛇添足在了哪些地方？</a><ol><li><a href="#%E9%BB%98%E8%AE%A4%E5%AE%89%E5%85%A8%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83">默认安全的运行时环境</a></li><li><a href="#%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81-typescript">内置支持 TypeScript</a></li><li><a href="#promise-%E7%9A%84%E6%94%AF%E6%8C%81%E4%B8%8B%E6%94%BE%E5%88%B0%E5%BA%95%E5%B1%82">Promise 的支持下放到底层</a></li><li><a href="#%E5%86%8D%E8%A7%81%E4%BA%86npm">再见了，npm</a></li></ol></li><li><a href="#%E6%80%BB%E7%BB%93">总结</a></li></ol></nav>'
        } }),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-09T09:47:13.000Z",
    'updated': null,
    'excerpt': "译者序 在为《Deno 钻研之术》引入第一篇翻译文章的时候，就看到了这篇文章，那时还觉得驾驭不了，就重点先写了若干篇入门级别的 Deno 文章。 转眼到 2021 年，从《Deno 双周刊》第一期继续开启新的一年的 Deno 之旅，于是就回...",
    'cover': "https://cdn.nlark.com/yuque/0/2021/png/86548/1610538854285-bc5db817-2188-4013-ae19-a1ffe77923de.png#align=left&display=inline&height=497&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1333&originWidth=2000&size=4783066&status=done&style=none&width=746",
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
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/translation/why-deno-wrong.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "\u4E3A\u4EC0\u4E48\u6211\u8BA4\u4E3A Deno \u662F\u4E00\u4E2A\u8FC8\u5411\u9519\u8BEF\u65B9\u5411\u7684 JavaScript \u8FD0\u884C\u65F6\uFF1F" })
};
