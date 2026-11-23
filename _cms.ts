import createCms from "@lumeland/cms";
const cms = createCms();

try {
  process.loadEnvFile();
} catch {

}

const user = process.env.CMS_USER ?? "admin";
const pass = process.env.CMS_PASSWORD ?? "";

cms.auth({
  [user]: pass,
});

cms.git();

cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "content: markdown",
]);

export default cms;
