import { serve } from "https://deno.land/std/http/server.ts";
// 使用 importmap 时：import { serve } from "server"
const s = serve({ port: 8000 });
console.log("Welcome to Deno 🦕");
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
