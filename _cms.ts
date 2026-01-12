import lumeCMS from "lume/cms/mod.ts";
import { load } from "jsr:@std/dotenv";
const cms = lumeCMS();

const env = await load();

const user = env.CMS_USER ?? "admin";
const pass = env.CMS_PASSWORD ?? "";

cms.auth({
  [user]: pass,
});

cms.git();

cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "content: markdown",
]);

export default cms;
