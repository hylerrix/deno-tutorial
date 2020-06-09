export default {
  srcDir: '.',
  ignore: [/\/demos\//, /\/public\//, /\/\./, /\/LICENSE/, /\/original-articles\//, /\/work-in-progress\//],
  plugins: ['sidebar', 'script'],
  title: 'Deno 钻研之术',
  sidebar: [
    'README.md',
    {
      link: 'articles/README.md',
      children: [
        'articles/001-install-and-hello-world.md',
        'articles/002-awesome-deno-cn.md'
      ]
    },
    {
      link: 'translations/README.md',
      children: [
        'translations/001-the-deno-handbook.md',
        'translations/002-deno-chat-app.md',
        'translations/003-from-node-to-deno.md'
      ]
    }
  ]
};
