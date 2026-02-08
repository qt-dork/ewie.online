import type { ParserPos, ParserState } from "./types.ts";

import { assert, assertEquals } from "jsr:@std/assert";

import {
  consumeCode,
  consumeMarker,
  consumeParagraph,
  deleteMarkers,
  parse,
  parseMetadata,
  parseMetadataContents,
} from "./parse.ts";

const DEFAULT_POS: ParserPos = {
  i: 0,
  row: 1,
  col: 1,
};

// Metadata parsing

Deno.test("block metadata parse", () => {
  const testString = `{ metadata_one: "value" }
::: reblog
content
:::`;
  let state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };
  const out = parseMetadata(state);
  assertEquals(out, ['{ metadata_one: "value" }']);
});

Deno.test("multi block metadata parse", () => {
  const testString = `{ metadata_one: value }
{ metadata_two: value }
::: reblog
content
:::`;
  let state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };
  const out = parseMetadata(state);
  assertEquals(out, ["{ metadata_one: value }", "{ metadata_two: value }"]);
});

Deno.test("long block metadata parse", () => {
  const testString = `{
  a: a
  b: b
  c: c
  d: d
}
::: reblog
content
:::`;
  let state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };
  const out = parseMetadata(state);
  assertEquals(out, [
    "{\n" +
    "  a: a\n" +
    "  b: b\n" +
    "  c: c\n" +
    "  d: d\n" +
    "}",
  ]);
});

Deno.test("block metadata parse should fail", () => {
  const testString = `{ metadata_one: "value" }
content
:::`;
  let state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };
  const out = parseMetadata(state);
  assertEquals(out, undefined);
});

Deno.test("parse metadata", () => {
  const test_1 = "{ a: a }";
  const test_2 = `{
  a: a
  b: "b"
  c: c
  d: true
}`;
  const test_3 = `{
  obj:
    one: one
    two: two
  list:
    - a
    - b
    - c
}`;

  const parsed_1 = parseMetadataContents(test_1);
  assertEquals(parsed_1, { a: "a" });
  const parsed_2 = parseMetadataContents(test_2);
  assertEquals(parsed_2, { a: "a", b: "b", c: "c", d: true });
  const parsed_3 = parseMetadataContents(test_3);
  assertEquals(parsed_3, {
    obj: { one: "one", two: "two" },
    list: ["a", "b", "c"],
  });
});

Deno.test("marker block", () => {
  const testString = `:::
testing
:::
`;
  const state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };

  const out = consumeMarker(state);
  assertEquals(out, {
    type: "marker",
    value: "testing\n",
    position: {
      start: { line: 0, column: 0 },
      end: { line: 4, column: 1, offset: 16 },
    },
  });
});

Deno.test("text block", () => {
  const testString =
    `And I’m glad they’re lies. Because the makers of AI aren’t damned by their failures, they’re damned by their goals. They want to build a genie to grant them wishes, and their wish is that nobody ever has to make art again. They want to create a new kind of mind, so they can force it into mindless servitude. Their dream is to invent new forms of life to enslave.

And to what end? In a kind of nihilistic symmetry, their dream of the perfect slave machine drains the life of those who use it as well as those who turn the gears. What is life but what we choose, who we know, what we experience? Incoherent empty men want to sell me the chance to stop reading and writing and thinking, to stop caring for my kids or talking to my parents, to stop choosing what I do or knowing why I do it. Blissful ignorance and total isolation, warm in the womb of the algorithm, nourished by hungry machines.`;

  let state: ParserState = {
    input: testString,
    pos: structuredClone(DEFAULT_POS),
  };
  const out = consumeParagraph(state);

  assertEquals(out, {
    type: "paragraph",
    children: [
      {
        type: "text",
        value:
          "And I’m glad they’re lies. Because the makers of AI aren’t damned by their failures, they’re damned by their goals. They want to build a genie to grant them wishes, and their wish is that nobody ever has to make art again. They want to create a new kind of mind, so they can force it into mindless servitude. Their dream is to invent new forms of life to enslave.\n",
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 2, column: 1, offset: 364 },
        },
      },
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 2, column: 1, offset: 364 },
    },
  });
});

Deno.test("code block", () => {
  const testString_1 = `\`\`\`
testing
\`\`\`
`;
  const testString_2 = `\`\`\`\`
testing
\`\`\`
`;
  const testString_3 = `\`\`\`
testing
\`\`\`\`
`;

  let state_1: ParserState = {
    input: testString_1,
    pos: structuredClone(DEFAULT_POS),
  };
  let state_2: ParserState = {
    input: testString_2,
    pos: structuredClone(DEFAULT_POS),
  };
  let state_3: ParserState = {
    input: testString_3,
    pos: structuredClone(DEFAULT_POS),
  };

  const out_1 = consumeCode(state_1);
  const out_2 = consumeCode(state_2);
  const out_3 = consumeCode(state_3);

  assertEquals(out_1, 16);
  assertEquals(out_2, undefined);
  assertEquals(out_3, undefined);
});

Deno.test("parse", () => {
  const out = parse(rawInput);
  assert(out.children.length > 0);
});

Deno.test("the whole dang thing", () => {
  const tree = parse(rawInput);
  const fixedString = deleteMarkers(rawInput, tree);
  console.log(tree);
  console.log(fixedString);
});

const rawInput: string = `---
title: Test reblog document
description: Testing reblog data
date: 2026-02-05T17:12:27Z
tags:
 - testing
 - reblogs
---

{ metadata_one: value }
{ metadata_two: value }
::: reblog
regular markdown post content in here
:::

{
  url: "https://anthonymoser.github.io/writing/ai/haterdom/2025/08/26/i-am-an-ai-hater.html"
  title: "I Am An AI Hater"
  date: "2025-08-26T17:14:27+00:00"
  author: "moser's frame shop"
  author_url: "https://anthonymoser.github.io/writing/"
  quote: true
  reply: true
}
::: reblog
And I’m glad they’re lies. Because the makers of AI aren’t damned by their failures, they’re damned by their goals. They want to build a genie to grant them wishes, and their wish is that nobody ever has to make art again. They want to create a new kind of mind, so they can force it into mindless servitude. Their dream is to invent new forms of life to enslave.

And to what end? In a kind of nihilistic symmetry, their dream of the perfect slave machine drains the life of those who use it as well as those who turn the gears. What is life but what we choose, who we know, what we experience? Incoherent empty men want to sell me the chance to stop reading and writing and thinking, to stop caring for my kids or talking to my parents, to stop choosing what I do or knowing why I do it. Blissful ignorance and total isolation, warm in the womb of the algorithm, nourished by hungry machines.
:::



Cases that should fail:

stuff :::

yeah

:::



test

\`\`\`
testing

:::
test
:::

testing
\`\`\`

test

Plans:

grab the [djot parser](https://github.com/jgm/djot.js/blob/main/src/block.ts) and rip out everything except code blocks, divs, and block attributes. Made it stop at ast creation, then “parse” it as json data. stick that on the post
`;
