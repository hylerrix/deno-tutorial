# 从命令行指令实战 Deno 全特性（v1.x 最新版）

玩法如下：

```
$ deno run --allow-net --log-level debug main.ts
$ deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts
$ deno run --allow-net main.ts --config tsconfig.json
$ deno run --inspect-brk --allow-read --allow-net https://deno.land/std/http/file_server.ts
$ deno run --v8-flags=--help main.ts
$ denon start
$ deno run --allow-net --cached-only not-cache.ts
$ deno run --allow-net --seed 1 main.ts
$ deno run --allow-net --reload main.ts
$ deno run --allow-net --lock lock.json main.ts
$ deno run --allow-net --no-check main.ts
$ deno run --allow-net --no-remote main.ts
$ deno run no-color.ts
```

```
$ openssl x509 -in certificate.pem -text -noout
```
