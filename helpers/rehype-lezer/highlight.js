import lezerHast from "./lezer-hast.js";

import { visit } from "npm:unist-util-visit@^5.0.0";
import { toText } from "npm:hast-util-to-text@^3.0.0";
// import { toString } from "npm:hast-util-to-string";
// using js manually cos fuck it

/**
 * @typedef ParserList
 *   Parsers for languages.
 * @property {string} lang
 *   The language name. Needs to match what is input in the code block.
 * @property {Parser} parser
 *   Parser used to parse the code block.
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {ReadonlyArray<string> | null | undefined} [plainText=[]]
 *   List of language names to not highlight (optional);
 *   note you can also add `no-highlight` classes.
 * @property {ReadonlyArray<ParserList>} [parsers=[]]
 * @property {string | undefined} [prefix]
 * @property {boolean | string | undefined} [inline=false]
 */

/** @type {ReadOnly<Options>} */
const emptyOptions = {};
/** @type {ReadonlyArray<never>} */
const emptyPlainText = [];

const languagePrefix = "language-";

/**
 * Apply syntax highlighting
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export function rehypeLezer(options) {
  const settings = options || emptyOptions;
  const plainText = settings.plainText || emptyPlainText;
  const parsers = parsersToMap(settings.parsers);
  const prefix = settings.prefix || languagePrefix;
  const inline = true;

  // let name = 'lezer';
  // just to be sure there's a prefix, it
  // also checks the options for a prefix

  const name = "lezer";

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, "element", function (node, _, parent) {
      let parsed;

      if (node.tagName === "pre") {
        parsed = preHandler(node, prefix);
      } else if (
        node.tagName === "code" && parent.tageName !== "pre" && inline
      ) {
        parsed = inlineHandler(node);
      }

      if (
        parsed === undefined ||
        (parsed.lang && plainText && plainText.includes(parsed.lang))
      ) {
        return;
      }

      if (!Array.isArray(node.properties.className)) {
        node.properties.className = [];
      }

      if (!node.properties.className.includes(name)) {
        node.properties.className.unshift(name);
      }

      if (parsers.get(parsed.lang) === undefined) {
        return;
      }
      const parser = parsers.get(parsed.lang);

      /** @type {Root} */
      let fragment;

      try {
        const parsedTree = parser.parse(parsed.code);
        fragment = lezerHast(parsed.code, parsedTree);
      } catch (error) {
        const cause = /** @type {Error} */ (error);
        throw cause;
      }

      if (!parsed.lang && fragment.data && fragment.data.language) {
        node.properties.className.push("language-" + fragment.data.language);
      }

      if (parsed.type === "inline") {
        node.children =
          /** @type {Array<ElementContent>} */ (fragment.children);
      } else if (fragment.children.length > 0) {
        node.children[0].children =
          /** @type {Array<ElementContent>} */ (fragment.children);
      }
      return "skip";
    });
  };
}

/**
 * Get the programming language of an inline `node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {false | string | undefined}
 *   Language or `undefined`, or `false` when an explicit `no-highlight` class
 *   is used.
 */
function inlineHandler(node) {
  const raw = toText(node);
  const match = raw.match(/(.+)\{:([\w-]+)\}$/);
  if (!match) {
    return;
  }

  return {
    type: "inline",
    code: match[1] ?? raw,
    lang: match.at(2),
  };
}

/**
 * Get the programming language of `node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {false | string | undefined}
 *   Language or `undefined`, or `false` when an explicit `no-highlight` class
 *   is used.
 */
function preHandler(node, prefix) {
  const head = node.children[0];

  if (
    !head ||
    head.type !== "element" ||
    head.tagName !== "code" ||
    !head.properties
  ) {
    return;
  }

  const classes = head.properties.className;
  const languageClass = Array.isArray(classes)
    ? classes.find(
      (d) => typeof d === "string" && d.startsWith(prefix),
    )
    : undefined;

  return {
    type: "pre",
    lang: typeof languageClass === "string"
      ? languageClass.slice(prefix.length)
      : undefined,
    code: toText(node, { whitespace: "pre" }),
    meta: head.data?.meta ?? head.properties.metastring?.toString() ?? "",
  };
}

/**
 * Get the programming language of `node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {false | string | undefined}
 *   Language or `undefined`, or `false` when an explicit `no-highlight` class
 *   is used.
 */
// function language(node) {
//   const list = node.properties.className;
//   let index = -1;

//   if (!Array.isArray(list)) {
//     return;
//   }

//   /** @type {string | undefined} */
//   let name;

//   while (++index < list.length) {
//     const value = String(list[index]);

//     if (value === "no-highlight" || value === "nohighlight") {
//       return false;
//     }

//     if (!name && value.slice(0, 5) === "lang-") {
//       name = value.slice(5);
//     }

//     if (!name && value.slice(0, 9) === "language-") {
//       name = value.slice(9);
//     }
//   }

//   return name;
// }

/**
 * @param {ReadonlyArray<ParserList>} parsers
 * @returns {Map<string, Parser>}
 */
function parsersToMap(parsers) {
  if (!Array.isArray(parsers)) {
    return new Map();
  }

  const map = new Map();
  for (const parser of parsers) {
    map.set(parser.lang, parser.parser);
  }
  return map;
}
