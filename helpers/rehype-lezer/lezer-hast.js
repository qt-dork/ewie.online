/**
 * @import {ElementContent, Root} from 'npm:@types/hast@^3.0.0'
 * @import {Tree} from 'npm:@lezer/common@^1.0.0'
 */

import { classHighlighter, highlightTree } from "npm:@lezer/highlight@^1.0.0";

// NOTE: does not wrap spans in spans to make lines of text. there's no way to add line numbers yet.
/**
 * Convert a text block of code to a hast. Requires a string
 * of source code and a tree from Lezer. More info on Lezer trees
 * can be found at https://lezer.codemirror.net/docs/ref/#common.Tree
 *
 * @param {string} source
 * @param {Tree} tree
 * @returns {Root}
 */
export default function lezerHast(source, tree) {
  /** @type {Array<Element | Text>} */
  const children = [];

  let index = 0;

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    if (from > index) {
      children.push({ type: "text", value: source.slice(index, from) });
    }

    children.push({
      type: "element",
      tagName: "span",
      properties: { className: classes },
      children: [{ type: "text", value: source.slice(from, to) }],
    });

    index = to;
  });

  if (index < source.length) {
    children.push({ type: "text", value: source.slice(index) });
  }

  return { type: "root", children };
}
