import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "content: markdown",
]);

export default cms;
