import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "Deno 版本历史概览",
        "link": "articles/document/deno-version-handbook.html"
    },
    'next': {
        "text": "Deno 专业术语翻译手册",
        "link": "articles/document/deno-translation-dictionary.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "articles/document/deno-cli-handbook.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/document/deno-cli-handbook.html",
    'title': "Deno CLI 通用手册",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Deno CLI 通用手册</h1>\n<blockquote>\n<p>更新到了 v1.22.2</p>\n</blockquote>\n<h2 id="%E9%80%9A%E8%AF%BB%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF">通读命令行基本信息<a class="anchor" href="#%E9%80%9A%E8%AF%BB%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF">§</a></h2>\n<h3 id="deno---help-help">deno --help, help<a class="anchor" href="#deno---help-help">§</a></h3>\n<p>了解一个命令的最快速实用的方法就是直接阅读其帮助文档，每行帮助信息都是简短且关键的介绍，不难理解和翻译。终端输入如下命令（help 或 --help 用来打印全局帮助信息或给定子命令的帮助信息）：</p>\n<pre class="language-bash"><code class="language-bash">$ deno --help\n</code></pre>\n<p>从而获得 Deno 的基本帮助信息：</p>\n<ul>\n<li>deno 1.2.2（2020-08-01 发布）</li>\n<li>一个安全的 JavaScript 和 TypeScript 运行时</li>\n<li>文档：<a href="https://deno.land/manual">https://deno.land/manual</a></li>\n<li>模块：<a href="https://deno.land/std/">https://deno.land/std/</a> <a href="https://deno.land/x/">https://deno.land/x/</a></li>\n<li>Bugs：<a href="https://github.com/denoland/deno/issues">https://github.com/denoland/deno/issues</a></li>\n<li>使用方式：deno [选项] [子命令]</li>\n</ul>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># 以 REPL 模式启动：</span>\n$ deno\n<span class="token comment"># 执行一个脚本：</span>\n$ deno run <a class="token url-link" href="https://deno.land/std/examples/welcome.ts">https://deno.land/std/examples/welcome.ts</a>\n<span class="token comment"># 在 Shell 中执行一段代码：</span>\n$ deno <span class="token builtin class-name">eval</span> <span class="token string">"console.log(30933 + 404)"</span>\n</code></pre>\n<h3 id="%E6%B1%87%E6%80%BB-26-%E4%B8%AA%E9%80%9A%E7%94%A8%E6%8C%87%E4%BB%A4">汇总 26 个通用指令<a class="anchor" href="#%E6%B1%87%E6%80%BB-26-%E4%B8%AA%E9%80%9A%E7%94%A8%E6%8C%87%E4%BB%A4">§</a></h3>\n<p>结合 deno --help 中出现的选项以及通常也会在 14 个内置工具包的帮助信息中看到的选项，将通用指令整理在这里做一个通览（只要某指令被使用两次及以上便视为通用指令，几乎涵盖了所有）：</p>\n<ul>\n<li>P.S：在纠结到底称为“参数”还是“选项”还是“指令”的时候，差点选了“参数”，最后选择了“指令”。</li>\n</ul>\n<blockquote>\n<p>注：以下表格整理了好几小时，如果能帮到你，别忘记多多点赞哟。挖个坑：以后可以绘制出一个思维导图来。同时，如果哪里有差错，欢迎在评论区 Github 仓库 issues 里留言哈。</p>\n</blockquote>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>选项</th>\n<th>哪些工具可以使用？</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>-h, --help</td>\n<td>全部</td>\n<td>打印帮助信息</td>\n</tr>\n<tr>\n<td>02</td>\n<td>-L, --log-level <log-level></td>\n<td>全部</td>\n<td>设置日志级别 [可能的值: debug, info]</td>\n</tr>\n<tr>\n<td>03</td>\n<td>-q, --quiet</td>\n<td>全部</td>\n<td>禁止诊断输出；默认情况下，子命令会将可读性友好的诊断消息打印到 stderr；如果设置了这个标志，则将这些消息限制为 errors</td>\n</tr>\n<tr>\n<td>04</td>\n<td>-A, --allow-all</td>\n<td>run, install, test</td>\n<td>允许所有权限，这将禁用所有安全限制</td>\n</tr>\n<tr>\n<td>05</td>\n<td>--allow-env</td>\n<td>run, install, test</td>\n<td>允许环境访问，例如读取和设置环境变量</td>\n</tr>\n<tr>\n<td>06</td>\n<td>--allow-hrtime</td>\n<td>run, install, test</td>\n<td>允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用</td>\n</tr>\n<tr>\n<td>07</td>\n<td>--allow-net=<allow-net></td>\n<td>run, install, test</td>\n<td>允许网络访问。可以指定一系列用逗号分隔的域名，来提供域名白名单</td>\n</tr>\n<tr>\n<td>08</td>\n<td>--allow-plugin</td>\n<td>run, install, test</td>\n<td>允许加载插件。请注意：这目前是一个不稳定功能</td>\n</tr>\n<tr>\n<td>09</td>\n<td>--allow-read=<allow-read></td>\n<td>run, install, test</td>\n<td>允许读取文件系统。可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。</td>\n</tr>\n<tr>\n<td>10</td>\n<td>--allow-run</td>\n<td>run, install, test</td>\n<td>允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用</td>\n</tr>\n<tr>\n<td>11</td>\n<td>--allow-write=<allow-write></td>\n<td>run, install, test</td>\n<td>允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单</td>\n</tr>\n<tr>\n<td>12</td>\n<td>--cert <FILE></td>\n<td>run, install, bundle, chche, eval, info, test, upgrade, repl</td>\n<td>从 PEM 编码的文件中加载证书颁发机构</td>\n</tr>\n<tr>\n<td>13</td>\n<td>-c, --config <FILE></td>\n<td>run, install, budle, cache, test</td>\n<td>读取 tsconfig.json 配置文件</td>\n</tr>\n<tr>\n<td>14</td>\n<td>--unstable</td>\n<td>run, install, bundle, cache, doc, eval, fmt, info, lint, test, types, repl</td>\n<td>开启不稳定的 APIs 支持</td>\n</tr>\n<tr>\n<td>15</td>\n<td>--inspect=<a href="HOST:PORT">HOST:PORT</a></td>\n<td>run, eval, test, repl</td>\n<td>激活监听器 主机:端口 (默认: 127.0.0.1:9229)</td>\n</tr>\n<tr>\n<td>16</td>\n<td>--inspect-brk=<a href="HOST:PORT">HOST:PORT</a></td>\n<td>run, eval, test, repl</td>\n<td>在 主机:端口 上激活监听器，并在用户脚本启动时中断</td>\n</tr>\n<tr>\n<td>17</td>\n<td>--v8-flags=<v8-flags></td>\n<td>run, eval, test, repl</td>\n<td>设置 V8 命令行选项。帮助： --v8-flags=--help</td>\n</tr>\n<tr>\n<td>18</td>\n<td>--cached-only</td>\n<td>run, test</td>\n<td>要求远程依赖项已经被缓存</td>\n</tr>\n<tr>\n<td>19</td>\n<td>-r, --reload=&lt;CACHE_BLOCKLIST&gt;</td>\n<td>run, cache, doc, test</td>\n<td>重新加载源代码缓存（重新编译TypeScript）。重新加载全部/仅标准模块/特定模块</td>\n</tr>\n<tr>\n<td>20</td>\n<td>--lock <FILE></td>\n<td>run, bundle, cache, test</td>\n<td>检查指定的锁文件</td>\n</tr>\n<tr>\n<td>21</td>\n<td>--lock-write</td>\n<td>run, bundle, cache, test</td>\n<td>写入锁文件，和 --lock 一起使用</td>\n</tr>\n<tr>\n<td>22</td>\n<td>--no-check</td>\n<td>run, cache, info, test</td>\n<td>禁用 TypeScript 的类型检查，这会大大减少程序的启动时间</td>\n</tr>\n<tr>\n<td>23</td>\n<td>--no-remote</td>\n<td>run, cache, test</td>\n<td>不解析远程模块</td>\n</tr>\n<tr>\n<td>24</td>\n<td>--seed <NUMBER></td>\n<td>run, test</td>\n<td>Math.random() 种子</td>\n</tr>\n<tr>\n<td>25</td>\n<td>--importmap <FILE></td>\n<td>run, install, bundle, test</td>\n<td>不稳定：读取 import map 文件</td>\n</tr>\n<tr>\n<td>26</td>\n<td>--json</td>\n<td>doc, info</td>\n<td>以 JSON 格式输出文档</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体通用指令会在“通读 Deno 通用指令”章节进行深入了解。</p>\n<h3 id="%E6%B1%87%E6%80%BB-14-%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8C%85">汇总 14 个内置工具包<a class="anchor" href="#%E6%B1%87%E6%80%BB-14-%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8C%85">§</a></h3>\n<p>帮助信息中初步介绍了这 14 个内置工具（为了强调每个工具的独立性，这些工具暂时都翻译为“xx 器”）：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>名称</th>\n<th>命令</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>运行器</td>\n<td>deno run</td>\n<td>运行指定文件名或 URL 程序。 使用“-”作为文件名从标准输入中读取</td>\n</tr>\n<tr>\n<td>02</td>\n<td>脚本安装器</td>\n<td>deno install</td>\n<td>将脚本安装为可执行文件</td>\n</tr>\n<tr>\n<td>03</td>\n<td>打包器</td>\n<td>deno bundle</td>\n<td>将模块和依赖项打包到单个文件中</td>\n</tr>\n<tr>\n<td>04</td>\n<td>缓存器</td>\n<td>deno cache</td>\n<td>缓存依赖</td>\n</tr>\n<tr>\n<td>05</td>\n<td>文档生成器</td>\n<td>deno doc</td>\n<td>显示某模块的文档</td>\n</tr>\n<tr>\n<td>06</td>\n<td>执行器</td>\n<td>deno eval</td>\n<td>执行一段脚本</td>\n</tr>\n<tr>\n<td>07</td>\n<td>格式化器</td>\n<td>deno fmt</td>\n<td>格式化源文件</td>\n</tr>\n<tr>\n<td>08</td>\n<td>依赖检查器</td>\n<td>deno info</td>\n<td>显示有关缓存的信息或与源文件相关的信息</td>\n</tr>\n<tr>\n<td>09</td>\n<td>规范器</td>\n<td>deno lint</td>\n<td>规范化源文件</td>\n</tr>\n<tr>\n<td>10</td>\n<td>测试器</td>\n<td>deno test</td>\n<td>执行测试</td>\n</tr>\n<tr>\n<td>11</td>\n<td>类型器</td>\n<td>deno types</td>\n<td>打印运行时 TypeScript 声明</td>\n</tr>\n<tr>\n<td>12</td>\n<td>补全器</td>\n<td>deno completions</td>\n<td>生成 Shell 补全信息</td>\n</tr>\n<tr>\n<td>13</td>\n<td>升级器</td>\n<td>deno upgrade</td>\n<td>将 Deno 可执行文件升级到给定版本</td>\n</tr>\n<tr>\n<td>14</td>\n<td>REPL 器</td>\n<td>deno repl</td>\n<td>读取/执行/打印/循环</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体工具会在“通读 Deno 内置工具包”章节进行深入了解。</p>\n<h3 id="%E6%B1%87%E6%80%BB-6-%E4%B8%AA%E5%9F%BA%E6%9C%AC%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">汇总 6 个基本环境变量<a class="anchor" href="#%E6%B1%87%E6%80%BB-6-%E4%B8%AA%E5%9F%BA%E6%9C%AC%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">§</a></h3>\n<p>帮助信息里初步介绍了这 6 个环境变量：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>变量名</th>\n<th>用途</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>DENO_DIR</td>\n<td>设置缓存目录</td>\n<td></td>\n</tr>\n<tr>\n<td>02</td>\n<td>DENO_INSTALL_ROOT</td>\n<td>设置 Deno 安装的软件包输入目录</td>\n<td>默认为 $HOME/.deno/bin</td>\n</tr>\n<tr>\n<td>03</td>\n<td>NO_COLOR</td>\n<td>设置禁止使用颜色</td>\n<td></td>\n</tr>\n<tr>\n<td>04</td>\n<td>DENO_CERT</td>\n<td>从 PEM 编码的文件加载证书颁发机构</td>\n<td></td>\n</tr>\n<tr>\n<td>05</td>\n<td>HTTP_PROXY</td>\n<td>HTTP 请求的代理地址</td>\n<td>模块 downloads 和 fetch</td>\n</tr>\n<tr>\n<td>06</td>\n<td>HTTPS_PROXY</td>\n<td>HTTPS 请求的代理地址</td>\n<td>模块 downloads 和 fetch</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体基本环境变量会在“通读 Deno 环境变量”章节进行深入了解。</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-169223577-1" }),
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Deno CLI \u901A\u7528\u624B\u518C"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>更新到了 v1.22.2</p>\n</blockquote>\n<h2 id="%E9%80%9A%E8%AF%BB%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF">通读命令行基本信息<a class="anchor" href="#%E9%80%9A%E8%AF%BB%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF">§</a></h2>\n<h3 id="deno---help-help">deno --help, help<a class="anchor" href="#deno---help-help">§</a></h3>\n<p>了解一个命令的最快速实用的方法就是直接阅读其帮助文档，每行帮助信息都是简短且关键的介绍，不难理解和翻译。终端输入如下命令（help 或 --help 用来打印全局帮助信息或给定子命令的帮助信息）：</p>\n<pre class="language-bash"><code class="language-bash">$ deno --help\n</code></pre>\n<p>从而获得 Deno 的基本帮助信息：</p>\n<ul>\n<li>deno 1.2.2（2020-08-01 发布）</li>\n<li>一个安全的 JavaScript 和 TypeScript 运行时</li>\n<li>文档：<a href="https://deno.land/manual">https://deno.land/manual</a></li>\n<li>模块：<a href="https://deno.land/std/">https://deno.land/std/</a> <a href="https://deno.land/x/">https://deno.land/x/</a></li>\n<li>Bugs：<a href="https://github.com/denoland/deno/issues">https://github.com/denoland/deno/issues</a></li>\n<li>使用方式：deno [选项] [子命令]</li>\n</ul>\n<pre class="language-bash"><code class="language-bash"><span class="token comment"># 以 REPL 模式启动：</span>\n$ deno\n<span class="token comment"># 执行一个脚本：</span>\n$ deno run <a class="token url-link" href="https://deno.land/std/examples/welcome.ts">https://deno.land/std/examples/welcome.ts</a>\n<span class="token comment"># 在 Shell 中执行一段代码：</span>\n$ deno <span class="token builtin class-name">eval</span> <span class="token string">"console.log(30933 + 404)"</span>\n</code></pre>\n<h3 id="%E6%B1%87%E6%80%BB-26-%E4%B8%AA%E9%80%9A%E7%94%A8%E6%8C%87%E4%BB%A4">汇总 26 个通用指令<a class="anchor" href="#%E6%B1%87%E6%80%BB-26-%E4%B8%AA%E9%80%9A%E7%94%A8%E6%8C%87%E4%BB%A4">§</a></h3>\n<p>结合 deno --help 中出现的选项以及通常也会在 14 个内置工具包的帮助信息中看到的选项，将通用指令整理在这里做一个通览（只要某指令被使用两次及以上便视为通用指令，几乎涵盖了所有）：</p>\n<ul>\n<li>P.S：在纠结到底称为“参数”还是“选项”还是“指令”的时候，差点选了“参数”，最后选择了“指令”。</li>\n</ul>\n<blockquote>\n<p>注：以下表格整理了好几小时，如果能帮到你，别忘记多多点赞哟。挖个坑：以后可以绘制出一个思维导图来。同时，如果哪里有差错，欢迎在评论区 Github 仓库 issues 里留言哈。</p>\n</blockquote>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>选项</th>\n<th>哪些工具可以使用？</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>-h, --help</td>\n<td>全部</td>\n<td>打印帮助信息</td>\n</tr>\n<tr>\n<td>02</td>\n<td>-L, --log-level <log-level></td>\n<td>全部</td>\n<td>设置日志级别 [可能的值: debug, info]</td>\n</tr>\n<tr>\n<td>03</td>\n<td>-q, --quiet</td>\n<td>全部</td>\n<td>禁止诊断输出；默认情况下，子命令会将可读性友好的诊断消息打印到 stderr；如果设置了这个标志，则将这些消息限制为 errors</td>\n</tr>\n<tr>\n<td>04</td>\n<td>-A, --allow-all</td>\n<td>run, install, test</td>\n<td>允许所有权限，这将禁用所有安全限制</td>\n</tr>\n<tr>\n<td>05</td>\n<td>--allow-env</td>\n<td>run, install, test</td>\n<td>允许环境访问，例如读取和设置环境变量</td>\n</tr>\n<tr>\n<td>06</td>\n<td>--allow-hrtime</td>\n<td>run, install, test</td>\n<td>允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用</td>\n</tr>\n<tr>\n<td>07</td>\n<td>--allow-net=<allow-net></td>\n<td>run, install, test</td>\n<td>允许网络访问。可以指定一系列用逗号分隔的域名，来提供域名白名单</td>\n</tr>\n<tr>\n<td>08</td>\n<td>--allow-plugin</td>\n<td>run, install, test</td>\n<td>允许加载插件。请注意：这目前是一个不稳定功能</td>\n</tr>\n<tr>\n<td>09</td>\n<td>--allow-read=<allow-read></td>\n<td>run, install, test</td>\n<td>允许读取文件系统。可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。</td>\n</tr>\n<tr>\n<td>10</td>\n<td>--allow-run</td>\n<td>run, install, test</td>\n<td>允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用</td>\n</tr>\n<tr>\n<td>11</td>\n<td>--allow-write=<allow-write></td>\n<td>run, install, test</td>\n<td>允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单</td>\n</tr>\n<tr>\n<td>12</td>\n<td>--cert <FILE></td>\n<td>run, install, bundle, chche, eval, info, test, upgrade, repl</td>\n<td>从 PEM 编码的文件中加载证书颁发机构</td>\n</tr>\n<tr>\n<td>13</td>\n<td>-c, --config <FILE></td>\n<td>run, install, budle, cache, test</td>\n<td>读取 tsconfig.json 配置文件</td>\n</tr>\n<tr>\n<td>14</td>\n<td>--unstable</td>\n<td>run, install, bundle, cache, doc, eval, fmt, info, lint, test, types, repl</td>\n<td>开启不稳定的 APIs 支持</td>\n</tr>\n<tr>\n<td>15</td>\n<td>--inspect=<a href="HOST:PORT">HOST:PORT</a></td>\n<td>run, eval, test, repl</td>\n<td>激活监听器 主机:端口 (默认: 127.0.0.1:9229)</td>\n</tr>\n<tr>\n<td>16</td>\n<td>--inspect-brk=<a href="HOST:PORT">HOST:PORT</a></td>\n<td>run, eval, test, repl</td>\n<td>在 主机:端口 上激活监听器，并在用户脚本启动时中断</td>\n</tr>\n<tr>\n<td>17</td>\n<td>--v8-flags=<v8-flags></td>\n<td>run, eval, test, repl</td>\n<td>设置 V8 命令行选项。帮助： --v8-flags=--help</td>\n</tr>\n<tr>\n<td>18</td>\n<td>--cached-only</td>\n<td>run, test</td>\n<td>要求远程依赖项已经被缓存</td>\n</tr>\n<tr>\n<td>19</td>\n<td>-r, --reload=&lt;CACHE_BLOCKLIST&gt;</td>\n<td>run, cache, doc, test</td>\n<td>重新加载源代码缓存（重新编译TypeScript）。重新加载全部/仅标准模块/特定模块</td>\n</tr>\n<tr>\n<td>20</td>\n<td>--lock <FILE></td>\n<td>run, bundle, cache, test</td>\n<td>检查指定的锁文件</td>\n</tr>\n<tr>\n<td>21</td>\n<td>--lock-write</td>\n<td>run, bundle, cache, test</td>\n<td>写入锁文件，和 --lock 一起使用</td>\n</tr>\n<tr>\n<td>22</td>\n<td>--no-check</td>\n<td>run, cache, info, test</td>\n<td>禁用 TypeScript 的类型检查，这会大大减少程序的启动时间</td>\n</tr>\n<tr>\n<td>23</td>\n<td>--no-remote</td>\n<td>run, cache, test</td>\n<td>不解析远程模块</td>\n</tr>\n<tr>\n<td>24</td>\n<td>--seed <NUMBER></td>\n<td>run, test</td>\n<td>Math.random() 种子</td>\n</tr>\n<tr>\n<td>25</td>\n<td>--importmap <FILE></td>\n<td>run, install, bundle, test</td>\n<td>不稳定：读取 import map 文件</td>\n</tr>\n<tr>\n<td>26</td>\n<td>--json</td>\n<td>doc, info</td>\n<td>以 JSON 格式输出文档</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体通用指令会在“通读 Deno 通用指令”章节进行深入了解。</p>\n<h3 id="%E6%B1%87%E6%80%BB-14-%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8C%85">汇总 14 个内置工具包<a class="anchor" href="#%E6%B1%87%E6%80%BB-14-%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8C%85">§</a></h3>\n<p>帮助信息中初步介绍了这 14 个内置工具（为了强调每个工具的独立性，这些工具暂时都翻译为“xx 器”）：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>名称</th>\n<th>命令</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>运行器</td>\n<td>deno run</td>\n<td>运行指定文件名或 URL 程序。 使用“-”作为文件名从标准输入中读取</td>\n</tr>\n<tr>\n<td>02</td>\n<td>脚本安装器</td>\n<td>deno install</td>\n<td>将脚本安装为可执行文件</td>\n</tr>\n<tr>\n<td>03</td>\n<td>打包器</td>\n<td>deno bundle</td>\n<td>将模块和依赖项打包到单个文件中</td>\n</tr>\n<tr>\n<td>04</td>\n<td>缓存器</td>\n<td>deno cache</td>\n<td>缓存依赖</td>\n</tr>\n<tr>\n<td>05</td>\n<td>文档生成器</td>\n<td>deno doc</td>\n<td>显示某模块的文档</td>\n</tr>\n<tr>\n<td>06</td>\n<td>执行器</td>\n<td>deno eval</td>\n<td>执行一段脚本</td>\n</tr>\n<tr>\n<td>07</td>\n<td>格式化器</td>\n<td>deno fmt</td>\n<td>格式化源文件</td>\n</tr>\n<tr>\n<td>08</td>\n<td>依赖检查器</td>\n<td>deno info</td>\n<td>显示有关缓存的信息或与源文件相关的信息</td>\n</tr>\n<tr>\n<td>09</td>\n<td>规范器</td>\n<td>deno lint</td>\n<td>规范化源文件</td>\n</tr>\n<tr>\n<td>10</td>\n<td>测试器</td>\n<td>deno test</td>\n<td>执行测试</td>\n</tr>\n<tr>\n<td>11</td>\n<td>类型器</td>\n<td>deno types</td>\n<td>打印运行时 TypeScript 声明</td>\n</tr>\n<tr>\n<td>12</td>\n<td>补全器</td>\n<td>deno completions</td>\n<td>生成 Shell 补全信息</td>\n</tr>\n<tr>\n<td>13</td>\n<td>升级器</td>\n<td>deno upgrade</td>\n<td>将 Deno 可执行文件升级到给定版本</td>\n</tr>\n<tr>\n<td>14</td>\n<td>REPL 器</td>\n<td>deno repl</td>\n<td>读取/执行/打印/循环</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体工具会在“通读 Deno 内置工具包”章节进行深入了解。</p>\n<h3 id="%E6%B1%87%E6%80%BB-6-%E4%B8%AA%E5%9F%BA%E6%9C%AC%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">汇总 6 个基本环境变量<a class="anchor" href="#%E6%B1%87%E6%80%BB-6-%E4%B8%AA%E5%9F%BA%E6%9C%AC%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">§</a></h3>\n<p>帮助信息里初步介绍了这 6 个环境变量：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>序号</th>\n<th>变量名</th>\n<th>用途</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>01</td>\n<td>DENO_DIR</td>\n<td>设置缓存目录</td>\n<td></td>\n</tr>\n<tr>\n<td>02</td>\n<td>DENO_INSTALL_ROOT</td>\n<td>设置 Deno 安装的软件包输入目录</td>\n<td>默认为 $HOME/.deno/bin</td>\n</tr>\n<tr>\n<td>03</td>\n<td>NO_COLOR</td>\n<td>设置禁止使用颜色</td>\n<td></td>\n</tr>\n<tr>\n<td>04</td>\n<td>DENO_CERT</td>\n<td>从 PEM 编码的文件加载证书颁发机构</td>\n<td></td>\n</tr>\n<tr>\n<td>05</td>\n<td>HTTP_PROXY</td>\n<td>HTTP 请求的代理地址</td>\n<td>模块 downloads 和 fetch</td>\n</tr>\n<tr>\n<td>06</td>\n<td>HTTPS_PROXY</td>\n<td>HTTPS 请求的代理地址</td>\n<td>模块 downloads 和 fetch</td>\n</tr>\n</tbody>\n</table></div>\n<p>具体基本环境变量会在“通读 Deno 环境变量”章节进行深入了解。</p>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E9%80%9A%E8%AF%BB%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF">通读命令行基本信息</a><ol><li><a href="#deno---help-help">deno --help, help</a></li><li><a href="#%E6%B1%87%E6%80%BB-26-%E4%B8%AA%E9%80%9A%E7%94%A8%E6%8C%87%E4%BB%A4">汇总 26 个通用指令</a></li><li><a href="#%E6%B1%87%E6%80%BB-14-%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8C%85">汇总 14 个内置工具包</a></li><li><a href="#%E6%B1%87%E6%80%BB-6-%E4%B8%AA%E5%9F%BA%E6%9C%AC%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">汇总 6 个基本环境变量</a></li></ol></li></ol></nav>'
        } }),
    'author': "hylerrix",
    'contributors': [
        "hylerrix"
    ],
    'date': "2021-03-09T09:46:04.000Z",
    'updated': null,
    'excerpt': "通读命令行基本信息 deno --help, help 了解一个命令的最快速实用的方法就是直接阅读其帮助文档，每行帮助信息都是简短且关键的介绍，不难理解和翻译。终端输入如下命令（help 或 --help 用来打印全局帮助信息或给定子命令的帮...",
    'cover': undefined,
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
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/document/deno-cli-handbook.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Deno CLI \u901A\u7528\u624B\u518C" })
};
