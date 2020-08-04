import { DenonConfig } from "https://deno.land/x/denon/mod.ts"
import { config as env } from "https://deno.land/x/dotenv/mod.ts"

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run main.ts",
      desc: "start from main.ts file",
      importmap: 'import_map.json',
      allow: [ "env", "net", "read", "write", "plugin" ],
      watch: false,
      unstable: true,
    },
  },
  logger: {
    debug: true,
  },
  watcher: {
    exts: ["ts", "json", "ini"],
    skip: ["super_duper_secret/*"],
  },
  env: env(),
}

export default config
