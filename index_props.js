import Gitalk from '/_gitalk.js';
import projectConfig from '/pagic.config.js';
import IndexPage from './index_content.js';
var _a, _b;
export default {
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'gitalk': React.createElement(Gitalk, { admin: [
            'hylerrix'
        ], clientID: "60180eea2c09238f8998", clientSecret: "e9ea0ff6555185eda28eff4dfd4b755b1764abf3", id: "index.html", owner: "hylerrix", pagerDirection: "first", repo: "deno-tutorial", title: "" }),
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['undefined'] },
    'pagePath': "index.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "",
    'content': React.createElement(IndexPage, null),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
