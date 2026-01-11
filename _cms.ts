import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

const user = Deno.env.get("CMS_USER") ?? "admin";
const pass = Deno.env.get("CMS_PASSWORD") ?? "";

cms.auth({
  [user]: pass,
});

cms.git();

cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "content: markdown",
]);

export default cms;
