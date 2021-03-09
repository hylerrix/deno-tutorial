import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/translation/original-articles/why-deno-wrong.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/translation/original-articles/why-deno-wrong.html",
    'title': "Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments</h1>\n<p><img src="https://images.unsplash.com/photo-1558519847-19fc2aa15a16?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=2000&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjExNzczfQ" alt="Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments"></p>\n<p>I haven\'t found any other developers on YouTube with a channel the size of  <a href="https://www.youtube.com/codedamn">codedamn</a>  (100K+ subscribers) who are not not &quot;super excited&quot; about the release of Deno.</p>\n<p>Last week, I released a video on my channel stating some reasons (that were pretty clear to me) why I believe we do not need Deno - another runtime environment for JavaScript built on the top of V8 and Node.</p>\n<p>With an article like this, I can add more thoughts and bundle them in a better way than a video. But anyway, if you\'re interested, here\'s what I posted:</p>\n<p>To just prove that I\'m not against &quot;Deno&quot; and JavaScript in general, I\'d like to state something. I love JavaScript more than anything. My primary tech stack involves nothing but JavaScript - Node / React / MongoDB / React Native / NativeScript / Ionic / you name it.</p>\n<p>I built a  <a href="https://www.youtube.com/codedamn">100K subscriber YouTube channel</a>  and a  <a href="https://codedamn.com/">developer platform</a>  mostly on a single programming language - JavaScript.</p>\n<p>But at the same time, it\'s important to stay practical and keep a clear head to see both sides of the coin. Deno has a good side, as well as a side which people aren\'t seeing/writing about yet. I\'m going to write my views on the second side. Let\'s go!</p>\n<p><em><strong>Note:</strong>  This is going to be a controversial article. Let\'s keep it civil and control our emotions. I\'d love it if you\'d read the full article till the end, and maybe then decide what you think.</em></p>\n<p><em>I have my social media links at the bottom of the article and would love to have a healthy discussion on this topic there.</em></p>\n<h2 id="deno-vs-node---there-is-actually-competition">Deno vs Node - there IS actually competition<a class="anchor" href="#deno-vs-node---there-is-actually-competition">§</a></h2>\n<p>A lot of people in the industry are saying &quot;oh well, there isn\'t any competition between Deno and Node, there is a lot both can learn from each other&quot;.</p>\n<p>To some extent, I agree, there\'s a lot Node and Deno can learn from each other. But there\'s no competition? I completely disagree with that.</p>\n<p>Let\'s look at common features of Deno and Node:</p>\n<ol>\n<li>They\'re both runtime environments for JavaScript</li>\n<li>They both run on any computer where you can run V8</li>\n<li>They both have ECMAScript standard support</li>\n<li>They\'re both actively maintained</li>\n</ol>\n<p>If you become a &quot;Deno&quot; fan 2 years down the road, you are never going to choose Node for your next project. It\'s just not possible.</p>\n<p>Similarly, if you\'ve never worked with TypeScript before, and you think you want to try Deno, but maybe you want to have some NPM modules, you wouldn\'t choose Deno.</p>\n<p>That\'s right: there is a division of developers across Deno and Node - I would say that\'s a very good example of a competitive space.</p>\n<h2 id="why-try-deno">Why try Deno?<a class="anchor" href="#why-try-deno">§</a></h2>\n<p>Firstly, I would like to list some advantages of Deno – what it is and why it pitches itself as a better runtime:</p>\n<ol>\n<li>It overcomes some shortcomings of Node</li>\n<li>It\'s a secure runtime environment by default</li>\n<li>It has TypeScript support baked in</li>\n<li>It uses promises all the way down</li>\n<li>It\'s built on Rust (vs C++ for Node)</li>\n</ol>\n<p>In the next section, I\'ll pick all of these points apart one by one and will mention what Node can learn from them. I\'ll also discuss, wherever necessary, why Deno doesn\'t make a lot of sense.</p>\n<h2 id="where-deno-overdid">Where Deno overdid?<a class="anchor" href="#where-deno-overdid">§</a></h2>\n<p>Let\'s pick up the USPs of Deno and break them down one by one:</p>\n<h3 id="secure-runtime-environment-by-default">Secure runtime environment by default<a class="anchor" href="#secure-runtime-environment-by-default">§</a></h3>\n<p>This is the most celebrated feature of Deno, and I\'m surprised by it. Deno runs your JavaScript code in a secure sandbox by default - preventing access to file system and network unless you explicitly opt-in.</p>\n<p>Deno does this because it wants to mimic the browser. But why? Why would you want to mimic the browser in the first place? Deno abides by the ECMAScript standard, which is great! But what\'s with the crazy love of browsers?</p>\n<p>I get it, you want to maintain compatibility between the code written on clients and servers. But it has been so strongly championed by Deno to the point where I believe Deno just went the wrong way with it.</p>\n<p>Node doesn\'t support &quot;secure runtime&quot; - and after much thinking, I believe there\'s little reason to support it, either.</p>\n<ol>\n<li>It\'s a known fact that you should not run untrusted code/executables on your systems. That is the whole point of always opting in for libraries like express for Node, instead of a shady npm module saying it works 100x faster than express. The trust comes from community usage.</li>\n<li>I don\'t know any programming language that supports such sandboxing at its core. While it may be fancy, it just seems like something which should be done by a container environment, like Docker. I would trust a good setup Docker configuration running untrusted Node code all day above running untrusted Node code in a sandboxed Deno environment. Why? Because Docker is a billion-dollar company built around only that one single purpose - sandboxing.</li>\n<li>Sandboxing is hard - I\'m no cybersecurity guru, but the more features something has, the bigger the attack surface area. Deno promises a secure runtime environment, and I would not say in any way that it could be compromised right away. But I\'m merely stating a fact here - Security is hard to implement right. Deno is taking a massive responsibility here. The biggest corporates in the world run their whitehat programs and flush out hundreds of millions of dollars every year to independent individuals and security firms. Where does Deno stand in terms of its truly secure environment? Time will tell.</li>\n</ol>\n<p>So, what can Node learn from Deno about this? I would say not a lot. Node *might* want to bring some secure environment flags from their competitors, but I just don\'t see a point. If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.</p>\n<p>As far as I know, you cannot &quot;sandbox&quot; filesystem or network access on such low-level languages like C/C++ – it\'s just not efficient.</p>\n<p>Note: Recently I discovered that you can pretty much do everything with Deno with the  <code>--allow-run</code>  flag enabled. This video dives in details:</p>\n<h3 id="typescript-support-baked-in">TypeScript support baked in<a class="anchor" href="#typescript-support-baked-in">§</a></h3>\n<p>Hurray for TypeScript. I\'m truly happy that Deno supports it out of the box.</p>\n<p><em><strong>NOTE:</strong>  Thank you @lilasquared for pointing out deno runs  <code>.js</code>  files out of the box too. Please read the further paragraphs keeping in mind we\'re coding in  <code>.ts</code>  files. Deno works fine with  <code>.js</code>  files too.</em></p>\n<p>But let\'s roll back a little. Do you know why JavaScript (and Node) has a trillion developers across the globe? Because the entry barrier is almost nil. JavaScript is flexible and forgives a lot of mistakes - while bringing in some of the weirdest behavior you\'d expect from a deterministic computer.</p>\n<p>This is super bad for production-level applications where you want no funky stuff going around. And for learners, it\'s forgiving - which might frustrate you with nasty bugs sometimes. But also lets people to get away with their mistakes initially. It allows them to &quot;move fast and break things&quot;, if I can quote.</p>\n<p>With beginners, I fear that if they opt-in for Deno (which mandates the use of TypeScript), we\'ll be seeing a lot of code like this because they don\'t understand TypeScript yet and just want to run JavaScript on the server:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> httpResponse<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getAPIResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> myParams <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n<span class="token keyword">const</span> someOtherVariable <span class="token operator">=</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span>\n<span class="token comment">// ...</span>\n<span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span>\n</code></pre>\n<p>TypeScript is a superset of JavaScript. You can write bad TypeScript code too – just using it doesn\'t make your JavaScript bulletproof.</p>\n<p>It\'s all fun and good until you realize you can write Node code in TypeScript. I\'m certain that every major company using Node in production is writing Node in TypeScript - zero exceptions. JavaScript just isn\'t scalable at a point when you\'re dealing with multiple files, multiple dependencies, and a plethora of code.</p>\n<p>TypeScript is a revolutionary toolkit in the JavaScript ecosystem and allows the use of the best of both worlds - static and dynamic language.</p>\n<p>To this end, Deno argues that TypeScript support should be built-in. I would ask why? Sure, you might need babel and webpack to do the job, but isn\'t that the whole point of having toolkits around? Don\'t we want to enhance the DX?</p>\n<p>JavaScript is going to remain JavaScript, and if Deno were to run TypeScript (or a language like a TypeScript) directly, I would have had no problem. But it isn\'t running TypeScript either, it converts your TypeScript code to JavaScript and then runs it.</p>\n<p>For this point, it seems like Deno is a monolithic version of Node that bundles a test toolkit, a code formatter, and TypeScript, all at once. I can\'t speak for all developers but I would like the core of my programming language to be lean and add other utilities if and when I want.</p>\n<p>Why would I need a built-in tool for code formatting when prettier exists and has the sole purpose of code formatting? Why solve things which are not broken?</p>\n<p>While it is true that monolithic architecture provides a lot of tooling at the same place, it is also true that it is bulky, and a lean core is much easier to maintain and scale.</p>\n<h3 id="promises-all-the-way-down">Promises all the way down<a class="anchor" href="#promises-all-the-way-down">§</a></h3>\n<p>This point from the Deno 1.0 release didn\'t really make much sense to me as a distinction. I have all the respect for the creators of Node and Deno. But Node has something which Deno doesn\'t - experience and backing from a huge variety of developers across the world.</p>\n<p>Node is contributed to by almost 3000 people and is the pioneer in asynchronous I/O handling. Sure, Deno is built on Rust and exposes a similar promise-like abstraction. But Node has got C++, and 3000 developers, and 10 years of work + experiment results.</p>\n<p>Node\'s asynchronous model is not broken, promises and event listener models are not broken, so I\'m unsure how Deno can fix what\'s not broken.</p>\n<h3 id="hasta-la-vista-npm">hasta la vista, npm<a class="anchor" href="#hasta-la-vista-npm">§</a></h3>\n<p>Huge thing. Deno doesn\'t support NPM. As much as Ryan, the creator or Node and Deno promotes &quot;Go&quot; language in this point, I\'d like to mention a few package managers:</p>\n<ol>\n<li>npm for JS (obviously)</li>\n<li>apt-get</li>\n<li>composer (PHP)</li>\n<li>brew (macOS)</li>\n<li>cargo (Rust! - The language in which Deno is coded in)</li>\n</ol>\n<p>I just believe it\'s a wrong move to not use a package manager. They do a lot of things - versioning, running scripts, managing dependency updates, etc. Why Deno won\'t use npm? I don\'t know. But here\'s what I can think about:</p>\n<ol>\n<li>Firstly, because they\'re JavaScript - and Deno needs TypeScript.  <strong>CORRECTION:</strong>  Deno  <strong>can</strong>  work with .js files as well.</li>\n<li>Next, a lot of these npm modules would require filesystem/networking/other permissions - which Deno restricts by default. So you need to mess around with some new &quot;permissions&quot; field in package.json. Oops, Deno doesn\'t work with npm, hence no package.json, let\'s see how it handles the module system then.</li>\n<li>NPM modules are bloated and there are a lot of them, but at the same time, that\'s the powerhouse of the Node ecosystem. Want a package to extract tar files into a stream? You got it (tar-stream). Want a data validation package? You got it (joi). Want to work with JWT? You got it (jsonwebtoken). I wonder how long it will take for developers to port their packages to a Deno-compatible system?</li>\n</ol>\n<p>Deno has a different approach to module systems altogether. If, in any case, it tries to &quot;patch-in&quot; existing NPM modules somehow, I do not see the point in using Deno apart from just hacking around a TS + Node project inside a Docker container anyway.</p>\n<p>According to what I\'ve learned about Deno so far, here\'s how it looks:</p>\n<blockquote>\n<p><strong>Deno</strong>  = (mostly) [TypeScript + Node + Correctly configured docker container + single executable binaries + <some more little tooling here and there> - NPM]</p>\n</blockquote>\n<p>Alright! Let\'s cool down things a little and let me conclude this article.</p>\n<h2 id="conclusion">Conclusion<a class="anchor" href="#conclusion">§</a></h2>\n<p>I\'m as excited about Deno as everyone else. But when there\'s a complete rewrite to the JavaScript runtime, I\'m expecting big changes.</p>\n<p>Deno includes a bunch of nice features like automatic TypeScript documentation, which I didn\'t mention because this post aims to show the other side of the coin. You\'ll find the advantages of Deno in almost every other article, but I believe this is something that needed to be said.</p>\n<p>To be honest, Deno seems like a big undertaking for a small benefit with a huge debt of transferring existing npm modules and codebases. Do you agree or disagree with me? I would like to know your opinions. Tweet/follow me:  <a href="https://twitter.com/mehulmpt"><strong>@mehulmpt</strong></a>  and on  <a href="https://instagram.com/mehulmpt"><strong>Instagram</strong></a>  too!</p>\n<p>Peace!</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><img src="https://images.unsplash.com/photo-1558519847-19fc2aa15a16?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=2000&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjExNzczfQ" alt="Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments"></p>\n<p>I haven\'t found any other developers on YouTube with a channel the size of  <a href="https://www.youtube.com/codedamn">codedamn</a>  (100K+ subscribers) who are not not &quot;super excited&quot; about the release of Deno.</p>\n<p>Last week, I released a video on my channel stating some reasons (that were pretty clear to me) why I believe we do not need Deno - another runtime environment for JavaScript built on the top of V8 and Node.</p>\n<p>With an article like this, I can add more thoughts and bundle them in a better way than a video. But anyway, if you\'re interested, here\'s what I posted:</p>\n<p>To just prove that I\'m not against &quot;Deno&quot; and JavaScript in general, I\'d like to state something. I love JavaScript more than anything. My primary tech stack involves nothing but JavaScript - Node / React / MongoDB / React Native / NativeScript / Ionic / you name it.</p>\n<p>I built a  <a href="https://www.youtube.com/codedamn">100K subscriber YouTube channel</a>  and a  <a href="https://codedamn.com/">developer platform</a>  mostly on a single programming language - JavaScript.</p>\n<p>But at the same time, it\'s important to stay practical and keep a clear head to see both sides of the coin. Deno has a good side, as well as a side which people aren\'t seeing/writing about yet. I\'m going to write my views on the second side. Let\'s go!</p>\n<p><em><strong>Note:</strong>  This is going to be a controversial article. Let\'s keep it civil and control our emotions. I\'d love it if you\'d read the full article till the end, and maybe then decide what you think.</em></p>\n<p><em>I have my social media links at the bottom of the article and would love to have a healthy discussion on this topic there.</em></p>\n<h2 id="deno-vs-node---there-is-actually-competition">Deno vs Node - there IS actually competition<a class="anchor" href="#deno-vs-node---there-is-actually-competition">§</a></h2>\n<p>A lot of people in the industry are saying &quot;oh well, there isn\'t any competition between Deno and Node, there is a lot both can learn from each other&quot;.</p>\n<p>To some extent, I agree, there\'s a lot Node and Deno can learn from each other. But there\'s no competition? I completely disagree with that.</p>\n<p>Let\'s look at common features of Deno and Node:</p>\n<ol>\n<li>They\'re both runtime environments for JavaScript</li>\n<li>They both run on any computer where you can run V8</li>\n<li>They both have ECMAScript standard support</li>\n<li>They\'re both actively maintained</li>\n</ol>\n<p>If you become a &quot;Deno&quot; fan 2 years down the road, you are never going to choose Node for your next project. It\'s just not possible.</p>\n<p>Similarly, if you\'ve never worked with TypeScript before, and you think you want to try Deno, but maybe you want to have some NPM modules, you wouldn\'t choose Deno.</p>\n<p>That\'s right: there is a division of developers across Deno and Node - I would say that\'s a very good example of a competitive space.</p>\n<h2 id="why-try-deno">Why try Deno?<a class="anchor" href="#why-try-deno">§</a></h2>\n<p>Firstly, I would like to list some advantages of Deno – what it is and why it pitches itself as a better runtime:</p>\n<ol>\n<li>It overcomes some shortcomings of Node</li>\n<li>It\'s a secure runtime environment by default</li>\n<li>It has TypeScript support baked in</li>\n<li>It uses promises all the way down</li>\n<li>It\'s built on Rust (vs C++ for Node)</li>\n</ol>\n<p>In the next section, I\'ll pick all of these points apart one by one and will mention what Node can learn from them. I\'ll also discuss, wherever necessary, why Deno doesn\'t make a lot of sense.</p>\n<h2 id="where-deno-overdid">Where Deno overdid?<a class="anchor" href="#where-deno-overdid">§</a></h2>\n<p>Let\'s pick up the USPs of Deno and break them down one by one:</p>\n<h3 id="secure-runtime-environment-by-default">Secure runtime environment by default<a class="anchor" href="#secure-runtime-environment-by-default">§</a></h3>\n<p>This is the most celebrated feature of Deno, and I\'m surprised by it. Deno runs your JavaScript code in a secure sandbox by default - preventing access to file system and network unless you explicitly opt-in.</p>\n<p>Deno does this because it wants to mimic the browser. But why? Why would you want to mimic the browser in the first place? Deno abides by the ECMAScript standard, which is great! But what\'s with the crazy love of browsers?</p>\n<p>I get it, you want to maintain compatibility between the code written on clients and servers. But it has been so strongly championed by Deno to the point where I believe Deno just went the wrong way with it.</p>\n<p>Node doesn\'t support &quot;secure runtime&quot; - and after much thinking, I believe there\'s little reason to support it, either.</p>\n<ol>\n<li>It\'s a known fact that you should not run untrusted code/executables on your systems. That is the whole point of always opting in for libraries like express for Node, instead of a shady npm module saying it works 100x faster than express. The trust comes from community usage.</li>\n<li>I don\'t know any programming language that supports such sandboxing at its core. While it may be fancy, it just seems like something which should be done by a container environment, like Docker. I would trust a good setup Docker configuration running untrusted Node code all day above running untrusted Node code in a sandboxed Deno environment. Why? Because Docker is a billion-dollar company built around only that one single purpose - sandboxing.</li>\n<li>Sandboxing is hard - I\'m no cybersecurity guru, but the more features something has, the bigger the attack surface area. Deno promises a secure runtime environment, and I would not say in any way that it could be compromised right away. But I\'m merely stating a fact here - Security is hard to implement right. Deno is taking a massive responsibility here. The biggest corporates in the world run their whitehat programs and flush out hundreds of millions of dollars every year to independent individuals and security firms. Where does Deno stand in terms of its truly secure environment? Time will tell.</li>\n</ol>\n<p>So, what can Node learn from Deno about this? I would say not a lot. Node *might* want to bring some secure environment flags from their competitors, but I just don\'t see a point. If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.</p>\n<p>As far as I know, you cannot &quot;sandbox&quot; filesystem or network access on such low-level languages like C/C++ – it\'s just not efficient.</p>\n<p>Note: Recently I discovered that you can pretty much do everything with Deno with the  <code>--allow-run</code>  flag enabled. This video dives in details:</p>\n<h3 id="typescript-support-baked-in">TypeScript support baked in<a class="anchor" href="#typescript-support-baked-in">§</a></h3>\n<p>Hurray for TypeScript. I\'m truly happy that Deno supports it out of the box.</p>\n<p><em><strong>NOTE:</strong>  Thank you @lilasquared for pointing out deno runs  <code>.js</code>  files out of the box too. Please read the further paragraphs keeping in mind we\'re coding in  <code>.ts</code>  files. Deno works fine with  <code>.js</code>  files too.</em></p>\n<p>But let\'s roll back a little. Do you know why JavaScript (and Node) has a trillion developers across the globe? Because the entry barrier is almost nil. JavaScript is flexible and forgives a lot of mistakes - while bringing in some of the weirdest behavior you\'d expect from a deterministic computer.</p>\n<p>This is super bad for production-level applications where you want no funky stuff going around. And for learners, it\'s forgiving - which might frustrate you with nasty bugs sometimes. But also lets people to get away with their mistakes initially. It allows them to &quot;move fast and break things&quot;, if I can quote.</p>\n<p>With beginners, I fear that if they opt-in for Deno (which mandates the use of TypeScript), we\'ll be seeing a lot of code like this because they don\'t understand TypeScript yet and just want to run JavaScript on the server:</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> httpResponse<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getAPIResponse</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> myParams <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// ...</span>\n<span class="token keyword">const</span> someOtherVariable <span class="token operator">=</span> <span class="token function">something</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span>\n<span class="token comment">// ...</span>\n<span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span>\n</code></pre>\n<p>TypeScript is a superset of JavaScript. You can write bad TypeScript code too – just using it doesn\'t make your JavaScript bulletproof.</p>\n<p>It\'s all fun and good until you realize you can write Node code in TypeScript. I\'m certain that every major company using Node in production is writing Node in TypeScript - zero exceptions. JavaScript just isn\'t scalable at a point when you\'re dealing with multiple files, multiple dependencies, and a plethora of code.</p>\n<p>TypeScript is a revolutionary toolkit in the JavaScript ecosystem and allows the use of the best of both worlds - static and dynamic language.</p>\n<p>To this end, Deno argues that TypeScript support should be built-in. I would ask why? Sure, you might need babel and webpack to do the job, but isn\'t that the whole point of having toolkits around? Don\'t we want to enhance the DX?</p>\n<p>JavaScript is going to remain JavaScript, and if Deno were to run TypeScript (or a language like a TypeScript) directly, I would have had no problem. But it isn\'t running TypeScript either, it converts your TypeScript code to JavaScript and then runs it.</p>\n<p>For this point, it seems like Deno is a monolithic version of Node that bundles a test toolkit, a code formatter, and TypeScript, all at once. I can\'t speak for all developers but I would like the core of my programming language to be lean and add other utilities if and when I want.</p>\n<p>Why would I need a built-in tool for code formatting when prettier exists and has the sole purpose of code formatting? Why solve things which are not broken?</p>\n<p>While it is true that monolithic architecture provides a lot of tooling at the same place, it is also true that it is bulky, and a lean core is much easier to maintain and scale.</p>\n<h3 id="promises-all-the-way-down">Promises all the way down<a class="anchor" href="#promises-all-the-way-down">§</a></h3>\n<p>This point from the Deno 1.0 release didn\'t really make much sense to me as a distinction. I have all the respect for the creators of Node and Deno. But Node has something which Deno doesn\'t - experience and backing from a huge variety of developers across the world.</p>\n<p>Node is contributed to by almost 3000 people and is the pioneer in asynchronous I/O handling. Sure, Deno is built on Rust and exposes a similar promise-like abstraction. But Node has got C++, and 3000 developers, and 10 years of work + experiment results.</p>\n<p>Node\'s asynchronous model is not broken, promises and event listener models are not broken, so I\'m unsure how Deno can fix what\'s not broken.</p>\n<h3 id="hasta-la-vista-npm">hasta la vista, npm<a class="anchor" href="#hasta-la-vista-npm">§</a></h3>\n<p>Huge thing. Deno doesn\'t support NPM. As much as Ryan, the creator or Node and Deno promotes &quot;Go&quot; language in this point, I\'d like to mention a few package managers:</p>\n<ol>\n<li>npm for JS (obviously)</li>\n<li>apt-get</li>\n<li>composer (PHP)</li>\n<li>brew (macOS)</li>\n<li>cargo (Rust! - The language in which Deno is coded in)</li>\n</ol>\n<p>I just believe it\'s a wrong move to not use a package manager. They do a lot of things - versioning, running scripts, managing dependency updates, etc. Why Deno won\'t use npm? I don\'t know. But here\'s what I can think about:</p>\n<ol>\n<li>Firstly, because they\'re JavaScript - and Deno needs TypeScript.  <strong>CORRECTION:</strong>  Deno  <strong>can</strong>  work with .js files as well.</li>\n<li>Next, a lot of these npm modules would require filesystem/networking/other permissions - which Deno restricts by default. So you need to mess around with some new &quot;permissions&quot; field in package.json. Oops, Deno doesn\'t work with npm, hence no package.json, let\'s see how it handles the module system then.</li>\n<li>NPM modules are bloated and there are a lot of them, but at the same time, that\'s the powerhouse of the Node ecosystem. Want a package to extract tar files into a stream? You got it (tar-stream). Want a data validation package? You got it (joi). Want to work with JWT? You got it (jsonwebtoken). I wonder how long it will take for developers to port their packages to a Deno-compatible system?</li>\n</ol>\n<p>Deno has a different approach to module systems altogether. If, in any case, it tries to &quot;patch-in&quot; existing NPM modules somehow, I do not see the point in using Deno apart from just hacking around a TS + Node project inside a Docker container anyway.</p>\n<p>According to what I\'ve learned about Deno so far, here\'s how it looks:</p>\n<blockquote>\n<p><strong>Deno</strong>  = (mostly) [TypeScript + Node + Correctly configured docker container + single executable binaries + <some more little tooling here and there> - NPM]</p>\n</blockquote>\n<p>Alright! Let\'s cool down things a little and let me conclude this article.</p>\n<h2 id="conclusion">Conclusion<a class="anchor" href="#conclusion">§</a></h2>\n<p>I\'m as excited about Deno as everyone else. But when there\'s a complete rewrite to the JavaScript runtime, I\'m expecting big changes.</p>\n<p>Deno includes a bunch of nice features like automatic TypeScript documentation, which I didn\'t mention because this post aims to show the other side of the coin. You\'ll find the advantages of Deno in almost every other article, but I believe this is something that needed to be said.</p>\n<p>To be honest, Deno seems like a big undertaking for a small benefit with a huge debt of transferring existing npm modules and codebases. Do you agree or disagree with me? I would like to know your opinions. Tweet/follow me:  <a href="https://twitter.com/mehulmpt"><strong>@mehulmpt</strong></a>  and on  <a href="https://instagram.com/mehulmpt"><strong>Instagram</strong></a>  too!</p>\n<p>Peace!</p>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#deno-vs-node---there-is-actually-competition">Deno vs Node - there IS actually competition</a></li><li><a href="#why-try-deno">Why try Deno?</a></li><li><a href="#where-deno-overdid">Where Deno overdid?</a><ol><li><a href="#secure-runtime-environment-by-default">Secure runtime environment by default</a></li><li><a href="#typescript-support-baked-in">TypeScript support baked in</a></li><li><a href="#promises-all-the-way-down">Promises all the way down</a></li><li><a href="#hasta-la-vista-npm">hasta la vista, npm</a></li></ol></li><li><a href="#conclusion">Conclusion</a></li></ol></nav>'
        } }),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-09T09:46:04.000Z",
    'updated': null,
    'excerpt': "I haven't found any other developers on YouTube with a channel the size of codedamn (100K+ subscribers) who are not not \"super excited\" about the release of Deno. Last week, I released a video on my channel sta...",
    'cover': "https://images.unsplash.com/photo-1558519847-19fc2aa15a16?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ",
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
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/translation/original-articles/why-deno-wrong.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments" })
};
