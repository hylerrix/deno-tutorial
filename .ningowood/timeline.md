# 开发日志

## 20200805

* 修复图片外链 403 问题 - 切换为七牛云图床

## 20200707

* 更新 Pagic 为最新版本并使用其最新功能
  * 每个文件夹填充 README.md 来介绍
  * 增加赞助功能
* 细化目录结构 -> 未来等 pagic 1.0 三级目录结构
* 引入 [Gittalk](https://github.com/gitalk/gitalk)

## 20200616

* 这两天合并了 [@justjavac](https://github.com/justjavac) 的若干个关于 Github Actions 的优化与更新：
  * 优化：部署方式；
  * 更新：根据不同环境分析不同 Google Analysis。

## 20200612

* 随着 Pagic 主题修复 Bug，增加 Google Analytics 分析。

## 20200611

* 向 [js.org](http://js.org/) 提交 PR 注册域名。
* 花费了一些时间来思考 Github Pages 为什么 404，同时显示 `http://hylerrix.github.io/deno-tutorial/`。
* 线上网站在 js.org 上部署成功：[deno-tutorial.js.org]( https://deno-tutorial.js.org)。

## 20200609

> 遇到问题不要慌，放好心态，逐步排查，然后搜重点，实在不行社区里问问题。

* 合并 (#4)[https://github.com/hylerrix/deno-tutorial/pull/4] PR。
* 三小时尝试构建 pagic，解决了如下安装时的问题：
  * 报错 `error: Uncaught Http: error sending request for url (https://raw.githubusercontent.com/pillarjs/path-to-regexp/v6.1.0/src/index.ts): error trying to connect: tcp connect error: Connection refused (os error 61)`：给 `/etc/hosts` 文件增加 `199.232.68.133 raw.githubusercontent.com` 即可。
  * 报错 `TS2345 [ERROR]: Argument of type '{ type: string; }' is not assignable to parameter of type 'string'.`：升级 Deno 版本到 v1.0.5 即可。

## 20200513~20200531

* 值 Deno v1.0 发布之际开源本电子书。
* 这段时间创作了两篇文章并授权翻译了三篇文章。