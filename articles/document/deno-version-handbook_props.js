import Gitalk from '/_gitalk.js';
import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'prev': {
        "link": "articles/document/index.html",
        "text": "文档篇"
    },
    'next': {
        "text": "Deno CLI 通用手册",
        "link": "articles/document/deno-cli-handbook.html"
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "articles/document/deno-version-handbook.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "Deno \u7248\u672C\u5386\u53F2\u6982\u89C8" }),
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
    'pagePath': "articles/document/deno-version-handbook.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/document/deno-version-handbook.html",
    'title': "Deno 版本历史概览",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Deno 版本历史概览</h1>\n<h2 id="v0.x">v0.x<a class="anchor" href="#v0.x">§</a></h2>\n<table>\n<thead>\n<tr>\n<th>序号</th>\n<th>发布日期</th>\n<th>Deno</th>\n<th>标准库</th>\n<th>关键字</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0001</td>\n<td>2018-08-18</td>\n<td>v0.0.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0002</td>\n<td>2018-08-21</td>\n<td>v0.0.2</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0003</td>\n<td>2018-08-23</td>\n<td>v0.0.3</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0004</td>\n<td>2018-08-23</td>\n<td>v0.1.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0005</td>\n<td>2018-08-28</td>\n<td>v0.1.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0006</td>\n<td>2018-08-31</td>\n<td>v0.1.2</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0007</td>\n<td>2018-09-06</td>\n<td>v0.1.3</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0008</td>\n<td>2018-09-13</td>\n<td>v0.1.4</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0009</td>\n<td>2018-09-22</td>\n<td>v0.1.5</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0010</td>\n<td>2018-09-30</td>\n<td>v0.1.6</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0011</td>\n<td>2018-10-04</td>\n<td>v0.1.7</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0012</td>\n<td>2018-10-13</td>\n<td>v0.1.8</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0013</td>\n<td>2018-10-21</td>\n<td>v0.1.9</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0014</td>\n<td>2018-10-27</td>\n<td>v0.1.10</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0015</td>\n<td>2018-11-06</td>\n<td>v0.1.11</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0016</td>\n<td>2018-11-13</td>\n<td>v0.1.12</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0017</td>\n<td>2018-11-16</td>\n<td>v0.2.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0018</td>\n<td>2018-12-01</td>\n<td>v0.2.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0019</td>\n<td>2018-12-08</td>\n<td>v0.2.2</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0020</td>\n<td>2018-12-15</td>\n<td>v0.2.3</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0021</td>\n<td>2018-12-24</td>\n<td>v0.2.4</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0022</td>\n<td>2019-01-02</td>\n<td>v0.2.5</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0023</td>\n<td>2019-01-08</td>\n<td>v0.2.6</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0024</td>\n<td>2019-01-15</td>\n<td>v0.2.7</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0025</td>\n<td>2019-01-20</td>\n<td>v0.2.8</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0026</td>\n<td>2019-01-30</td>\n<td>v0.2.9</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0027</td>\n<td>2019-02-03</td>\n<td>v0.2.10</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0028</td>\n<td>2019-02-09</td>\n<td>v0.2.11</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0029</td>\n<td>2019-02-19</td>\n<td>v0.3.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0030</td>\n<td>2019-02-28</td>\n<td>v0.3.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0031</td>\n<td>2019-03-07</td>\n<td>v0.3.2</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0032</td>\n<td>2019-03-14</td>\n<td>v0.3.3</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0033</td>\n<td>2019-03-21</td>\n<td>v0.3.4</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0034</td>\n<td>2019-03-29</td>\n<td>v0.3.5</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0035</td>\n<td>2019-04-04</td>\n<td>v0.3.6</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0036</td>\n<td>2019-04-12</td>\n<td>v0.3.7</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0037</td>\n<td>2019-04-19</td>\n<td>v0.3.8</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0038</td>\n<td>2019-04-25</td>\n<td>v0.3.9</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0039</td>\n<td>2019-04-26</td>\n<td>v0.3.10</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0040</td>\n<td>2019-05-04</td>\n<td>v0.3.11</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0041</td>\n<td>2019-05-04</td>\n<td>v0.4.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0042</td>\n<td>2019-05-12</td>\n<td>v0.5.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0043</td>\n<td>2019-05-21</td>\n<td>v0.6.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0044</td>\n<td>2019-05-30</td>\n<td>v0.7.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0045</td>\n<td>2019-06-09</td>\n<td>v0.8.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0046</td>\n<td>2019-06-16</td>\n<td>v0.9.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0047</td>\n<td>2019-06-25</td>\n<td>v0.10.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0048</td>\n<td>2019-07-08</td>\n<td>v0.11.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0049</td>\n<td>2019-07-17</td>\n<td>v0.12.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0050</td>\n<td>2019-08-01</td>\n<td>v0.13.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0051</td>\n<td>2019-08-09</td>\n<td>v0.14.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0052</td>\n<td>2019-08-14</td>\n<td>v0.15.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0053</td>\n<td>2019-08-23</td>\n<td>v0.16.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0054</td>\n<td>2019-09-05</td>\n<td>v0.17.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0055</td>\n<td>2019-09-14</td>\n<td>v0.18.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0056</td>\n<td>2019-09-25</td>\n<td>v0.19.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0057</td>\n<td>2019-10-08</td>\n<td>v0.20.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0058</td>\n<td>2019-10-20</td>\n<td>v0.21.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0059</td>\n<td>2019-10-29</td>\n<td>v0.22.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0060</td>\n<td>2019-11-05</td>\n<td>v0.23.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0061</td>\n<td>2019-11-15</td>\n<td>v0.24.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0062</td>\n<td>2019-11-27</td>\n<td>v0.25.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0063</td>\n<td>2019-12-06</td>\n<td>v0.26.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0064</td>\n<td>2019-12-19</td>\n<td>v0.27.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0065</td>\n<td>2020-01-02</td>\n<td>v0.28.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0066</td>\n<td>2020-01-03</td>\n<td>v0.28.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0067</td>\n<td>2020-01-10</td>\n<td>v0.29.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0068</td>\n<td>2020-01-18</td>\n<td>v0.30.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0069</td>\n<td>2020-01-22</td>\n<td>v0.30.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0070</td>\n<td>2020-01-25</td>\n<td>v0.31.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0071</td>\n<td>2020-02-03</td>\n<td>v0.32.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0072</td>\n<td>2020-02-14</td>\n<td>v0.33.0</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0073</td>\n<td>2020-02-20</td>\n<td>v0.34.0</td>\n<td>v0.34.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0074</td>\n<td>2020-02-29</td>\n<td>v0.35.0</td>\n<td>v0.35.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0075</td>\n<td>2020-03-12</td>\n<td>v0.36.0</td>\n<td>v0.36.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0076</td>\n<td>2020-03-24</td>\n<td>v0.37.0</td>\n<td>v0.37.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0077</td>\n<td>2020-03-24</td>\n<td>v0.37.1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0078</td>\n<td>2020-03-29</td>\n<td>v0.38.0</td>\n<td>v0.38.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0079</td>\n<td>2020-04-04</td>\n<td>v0.39.0</td>\n<td>v0.39.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0080</td>\n<td>2020-04-09</td>\n<td>v0.40.0</td>\n<td>v0.40.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0081</td>\n<td>2020-04-16</td>\n<td>v0.41.0</td>\n<td>v0.41.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0082</td>\n<td>2020-04-30</td>\n<td>v0.42.0</td>\n<td>v0.42.0</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h2 id="v1.x">v1.x<a class="anchor" href="#v1.x">§</a></h2>\n<table>\n<thead>\n<tr>\n<th>序号</th>\n<th>发布日期</th>\n<th>Deno</th>\n<th>标准库</th>\n<th>关键字</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0101</td>\n<td>2020-05-05</td>\n<td>v1.0.0-rc1</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0102</td>\n<td>2020-05-09</td>\n<td></td>\n<td>0.50.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0103</td>\n<td>2020-05-10</td>\n<td>v1.0.0-rc2</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0104</td>\n<td>2020-05-12</td>\n<td>v1.0.0-rc3</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>0105</td>\n<td>2020-05-14</td>\n<td>v1.0.0</td>\n<td>v0.51.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0106</td>\n<td>2020-05-21</td>\n<td>v1.0.1</td>\n<td>v0.52.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0107</td>\n<td>2020-05-23</td>\n<td>v1.0.2</td>\n<td>v0.53.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0108</td>\n<td>2020-05-30</td>\n<td>v1.0.3</td>\n<td>v0.54.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0109</td>\n<td>2020-06-02</td>\n<td>v1.0.4</td>\n<td>v0.55.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0110</td>\n<td>2020-06-04</td>\n<td>v1.0.5</td>\n<td>v0.56.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0111</td>\n<td>2020-06-13</td>\n<td>v1.1.0</td>\n<td>v0.57.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0112</td>\n<td>2020-06-20</td>\n<td>v1.1.1</td>\n<td>v0.58.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0113</td>\n<td>2020-06-27</td>\n<td>v1.1.2</td>\n<td>v0.59.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0114</td>\n<td>2020-07-04</td>\n<td>v1.1.3</td>\n<td>v0.60.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0115</td>\n<td>2020-07-13</td>\n<td>v1.2.0</td>\n<td>v0.61.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0116</td>\n<td>2020-07-24</td>\n<td>v1.2.1</td>\n<td>v0.62.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0117</td>\n<td>2020-08-01</td>\n<td>v1.2.2</td>\n<td>v0.63.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0118</td>\n<td>2020-08-09</td>\n<td>v1.2.3</td>\n<td>v0.64.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0119</td>\n<td>2020-08-14</td>\n<td>v1.3.0</td>\n<td>v0.65.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0120</td>\n<td>2020-08-21</td>\n<td>v1.3.1</td>\n<td>v0.66.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0121</td>\n<td>2020-08-29</td>\n<td>v1.3.2</td>\n<td>v0.67.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0122</td>\n<td>2020-09-04</td>\n<td>v1.3.3</td>\n<td>v0.68.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0123</td>\n<td>2020-09-13</td>\n<td>v1.4.0</td>\n<td>v0.69.0</td>\n<td></td>\n</tr>\n<tr>\n<td>0124</td>\n<td>2020-09-19</td>\n<td>v1.4.1</td>\n<td>0.70.0</td>\n<td></td>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#v0.x">v0.x</a></li><li><a href="#v1.x">v1.x</a></li></ol></nav>'
        } })
};
