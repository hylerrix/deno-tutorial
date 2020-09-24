# Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments

![Why I Believe Deno is a Step in the Wrong Direction for JavaScript Runtime Environments](https://images.unsplash.com/photo-1558519847-19fc2aa15a16?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

I haven't found any other developers on YouTube with a channel the size of  [codedamn][1]  (100K+ subscribers) who are not not "super excited" about the release of Deno.

Last week, I released a video on my channel stating some reasons (that were pretty clear to me) why I believe we do not need Deno - another runtime environment for JavaScript built on the top of V8 and Node.

With an article like this, I can add more thoughts and bundle them in a better way than a video. But anyway, if you're interested, here's what I posted:

To just prove that I'm not against "Deno" and JavaScript in general, I'd like to state something. I love JavaScript more than anything. My primary tech stack involves nothing but JavaScript - Node / React / MongoDB / React Native / NativeScript / Ionic / you name it.

I built a  [100K subscriber YouTube channel][2]  and a  [developer platform][3]  mostly on a single programming language - JavaScript.

But at the same time, it's important to stay practical and keep a clear head to see both sides of the coin. Deno has a good side, as well as a side which people aren't seeing/writing about yet. I'm going to write my views on the second side. Let's go!

_**Note:**  This is going to be a controversial article. Let's keep it civil and control our emotions. I'd love it if you'd read the full article till the end, and maybe then decide what you think._  
  
_I have my social media links at the bottom of the article and would love to have a healthy discussion on this topic there._

## Deno vs Node - there IS actually competition

A lot of people in the industry are saying "oh well, there isn't any competition between Deno and Node, there is a lot both can learn from each other".

To some extent, I agree, there's a lot Node and Deno can learn from each other. But there's no competition? I completely disagree with that.

Let's look at common features of Deno and Node:

1.  They're both runtime environments for JavaScript
2.  They both run on any computer where you can run V8
3.  They both have ECMAScript standard support
4.  They're both actively maintained

If you become a "Deno" fan 2 years down the road, you are never going to choose Node for your next project. It's just not possible.

Similarly, if you've never worked with TypeScript before, and you think you want to try Deno, but maybe you want to have some NPM modules, you wouldn't choose Deno.

That's right: there is a division of developers across Deno and Node - I would say that's a very good example of a competitive space.

## Why try Deno?

Firstly, I would like to list some advantages of Deno – what it is and why it pitches itself as a better runtime:

1.  It overcomes some shortcomings of Node
2.  It's a secure runtime environment by default
3.  It has TypeScript support baked in
4.  It uses promises all the way down
5.  It's built on Rust (vs C++ for Node)

In the next section, I'll pick all of these points apart one by one and will mention what Node can learn from them. I'll also discuss, wherever necessary, why Deno doesn't make a lot of sense.

## Where Deno overdid?

Let's pick up the USPs of Deno and break them down one by one:

### Secure runtime environment by default

This is the most celebrated feature of Deno, and I'm surprised by it. Deno runs your JavaScript code in a secure sandbox by default - preventing access to file system and network unless you explicitly opt-in.

Deno does this because it wants to mimic the browser. But why? Why would you want to mimic the browser in the first place? Deno abides by the ECMAScript standard, which is great! But what's with the crazy love of browsers?

I get it, you want to maintain compatibility between the code written on clients and servers. But it has been so strongly championed by Deno to the point where I believe Deno just went the wrong way with it.

Node doesn't support "secure runtime" - and after much thinking, I believe there's little reason to support it, either.

1.  It's a known fact that you should not run untrusted code/executables on your systems. That is the whole point of always opting in for libraries like express for Node, instead of a shady npm module saying it works 100x faster than express. The trust comes from community usage.
2.  I don't know any programming language that supports such sandboxing at its core. While it may be fancy, it just seems like something which should be done by a container environment, like Docker. I would trust a good setup Docker configuration running untrusted Node code all day above running untrusted Node code in a sandboxed Deno environment. Why? Because Docker is a billion-dollar company built around only that one single purpose - sandboxing.
3.  Sandboxing is hard - I'm no cybersecurity guru, but the more features something has, the bigger the attack surface area. Deno promises a secure runtime environment, and I would not say in any way that it could be compromised right away. But I'm merely stating a fact here - Security is hard to implement right. Deno is taking a massive responsibility here. The biggest corporates in the world run their whitehat programs and flush out hundreds of millions of dollars every year to independent individuals and security firms. Where does Deno stand in terms of its truly secure environment? Time will tell.

So, what can Node learn from Deno about this? I would say not a lot. Node \*might\* want to bring some secure environment flags from their competitors, but I just don't see a point. If you randomly run arbitrary code on your systems, you might as well clone a C/C++ repo and run a make command over it and get your whole system compromised.

As far as I know, you cannot "sandbox" filesystem or network access on such low-level languages like C/C++ – it's just not efficient.

Note: Recently I discovered that you can pretty much do everything with Deno with the  `--allow-run`  flag enabled. This video dives in details:

### TypeScript support baked in

Hurray for TypeScript. I'm truly happy that Deno supports it out of the box.

_**NOTE:**  Thank you @lilasquared for pointing out deno runs  `.js`  files out of the box too. Please read the further paragraphs keeping in mind we're coding in  `.ts`  files. Deno works fine with  `.js`  files too._

But let's roll back a little. Do you know why JavaScript (and Node) has a trillion developers across the globe? Because the entry barrier is almost nil. JavaScript is flexible and forgives a lot of mistakes - while bringing in some of the weirdest behavior you'd expect from a deterministic computer.

This is super bad for production-level applications where you want no funky stuff going around. And for learners, it's forgiving - which might frustrate you with nasty bugs sometimes. But also lets people to get away with their mistakes initially. It allows them to "move fast and break things", if I can quote.

With beginners, I fear that if they opt-in for Deno (which mandates the use of TypeScript), we'll be seeing a lot of code like this because they don't understand TypeScript yet and just want to run JavaScript on the server:

```ts
const httpResponse: any = await getAPIResponse<any>({ myParams })
// ...
const someOtherVariable = something() as any
// ...
any, any, any
```

TypeScript is a superset of JavaScript. You can write bad TypeScript code too – just using it doesn't make your JavaScript bulletproof.

It's all fun and good until you realize you can write Node code in TypeScript. I'm certain that every major company using Node in production is writing Node in TypeScript - zero exceptions. JavaScript just isn't scalable at a point when you're dealing with multiple files, multiple dependencies, and a plethora of code.

TypeScript is a revolutionary toolkit in the JavaScript ecosystem and allows the use of the best of both worlds - static and dynamic language.

To this end, Deno argues that TypeScript support should be built-in. I would ask why? Sure, you might need babel and webpack to do the job, but isn't that the whole point of having toolkits around? Don't we want to enhance the DX?

JavaScript is going to remain JavaScript, and if Deno were to run TypeScript (or a language like a TypeScript) directly, I would have had no problem. But it isn't running TypeScript either, it converts your TypeScript code to JavaScript and then runs it.

For this point, it seems like Deno is a monolithic version of Node that bundles a test toolkit, a code formatter, and TypeScript, all at once. I can't speak for all developers but I would like the core of my programming language to be lean and add other utilities if and when I want.

Why would I need a built-in tool for code formatting when prettier exists and has the sole purpose of code formatting? Why solve things which are not broken?

While it is true that monolithic architecture provides a lot of tooling at the same place, it is also true that it is bulky, and a lean core is much easier to maintain and scale.

### Promises all the way down

This point from the Deno 1.0 release didn't really make much sense to me as a distinction. I have all the respect for the creators of Node and Deno. But Node has something which Deno doesn't - experience and backing from a huge variety of developers across the world.

Node is contributed to by almost 3000 people and is the pioneer in asynchronous I/O handling. Sure, Deno is built on Rust and exposes a similar promise-like abstraction. But Node has got C++, and 3000 developers, and 10 years of work + experiment results.

Node's asynchronous model is not broken, promises and event listener models are not broken, so I'm unsure how Deno can fix what's not broken.

### hasta la vista, npm

Huge thing. Deno doesn't support NPM. As much as Ryan, the creator or Node and Deno promotes "Go" language in this point, I'd like to mention a few package managers:

1.  npm for JS (obviously)
2.  apt-get
3.  composer (PHP)
4.  brew (macOS)
5.  cargo (Rust! - The language in which Deno is coded in)

I just believe it's a wrong move to not use a package manager. They do a lot of things - versioning, running scripts, managing dependency updates, etc. Why Deno won't use npm? I don't know. But here's what I can think about:

1.  Firstly, because they're JavaScript - and Deno needs TypeScript.  **CORRECTION:**  Deno  **can**  work with .js files as well.
2.  Next, a lot of these npm modules would require filesystem/networking/other permissions - which Deno restricts by default. So you need to mess around with some new "permissions" field in package.json. Oops, Deno doesn't work with npm, hence no package.json, let's see how it handles the module system then.
3.  NPM modules are bloated and there are a lot of them, but at the same time, that's the powerhouse of the Node ecosystem. Want a package to extract tar files into a stream? You got it (tar-stream). Want a data validation package? You got it (joi). Want to work with JWT? You got it (jsonwebtoken). I wonder how long it will take for developers to port their packages to a Deno-compatible system?

Deno has a different approach to module systems altogether. If, in any case, it tries to "patch-in" existing NPM modules somehow, I do not see the point in using Deno apart from just hacking around a TS + Node project inside a Docker container anyway.

According to what I've learned about Deno so far, here's how it looks:

> **Deno**  \= (mostly) \[TypeScript + Node + Correctly configured docker container + single executable binaries + <some more little tooling here and there> - NPM\]

Alright! Let's cool down things a little and let me conclude this article.

## Conclusion

I'm as excited about Deno as everyone else. But when there's a complete rewrite to the JavaScript runtime, I'm expecting big changes.

Deno includes a bunch of nice features like automatic TypeScript documentation, which I didn't mention because this post aims to show the other side of the coin. You'll find the advantages of Deno in almost every other article, but I believe this is something that needed to be said.

To be honest, Deno seems like a big undertaking for a small benefit with a huge debt of transferring existing npm modules and codebases. Do you agree or disagree with me? I would like to know your opinions. Tweet/follow me:  [**@mehulmpt**][4]  and on  [**Instagram**][5]  too!

Peace!

[1]: https://www.youtube.com/codedamn
[2]: https://www.youtube.com/codedamn
[3]: https://codedamn.com/
[4]: https://twitter.com/mehulmpt
[5]: https://instagram.com/mehulmpt
