import { classHighlighter, highlightTree } from "npm:@lezer/highlight@1.2.3";

import type { Tree } from "npm:@lezer/common@1.5.2";
import type { Element, Root, Text } from "npm:hast@1.0.0";

export { toHtml } from "npm:hast-util-to-html@9.0.5";

export function fromLezer(source: string, tree: Tree): Root {
  // deno-lint-ignore prefer-const -- children contents is modified
  let children: (Element | Text)[] = [];
  let index = 0;

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    if (from > index) {
      children.push({ type: "text", value: source.slice(index, from) });
    }

    children.push({
      type: "element",
      tagName: "span",
      properties: { className: classes.split(" ") },
      children: [{ type: "text", value: source.slice(from, to) }],
    });

    index = to;
  });

  if (index < source.length) {
    children.push({ type: "text", value: source.slice(index) });
  }

  return { type: "root", children };
}
