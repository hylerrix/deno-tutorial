import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

let request = new ServerRequest();
request.headers = new Headers();
request.headers.set("Cookie", "full=of; tasty=chocolate");

const cookies = getCookies(request);
console.log("cookies:", cookies);