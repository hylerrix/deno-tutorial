import * as exp from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

const port = 3000;
const app = new exp.App();

app.use(exp.static_("./public"));
app.use(exp.bodyParser.json());

app.get("/api/todos", async (req, res) => {
  await res.json([{ name: "Buy some milk" }]);
});

const server = await app.listen(port);
console.log(`app listening on port ${server.port}`);