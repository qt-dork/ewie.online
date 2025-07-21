---
title: I shoved syntax highlighting onto my site and now I'm gonna force you to learn how I did it
description:
date: 2025-07-19T04:42:18Z
tags:
 - meta
 - article
 - explainer
 - blogging about blogging
---

## Why I added syntax highlighting

There's a well-known graph about how many blog posts you make about your blog vs. how many blog posts you make about real stuff. What I've noticed is that my blog is supposed to be on the far right of the graph, but instead I'm spending all my time posting about [netrunner](https://ewie.online/tags/netrunner/) and [going outside](https://ewie.online/posts/20250503-i-got-to-go-on-a-sho/). Perhaps I did too good of a job making it easy to post and now I'm not writing about the real shit: overly arcane posts about how I did one really specific thing that I made overly hard for myself for no reason. Today I'm looking to correct that.

![](https://rakhim.org/images/honestly-undefined/blogging.jpg)

## How I built my own syntax highlighting plugin which I made overly hard for no reason

There's a number of syntax highlighting solutions out there. In fact, here's a table of all of them:

<div style="overflow:scroll;">

|                                        | [Prism](https://github.com/PrismJS/prism) | [Highlight.js](https://github.com/highlightjs/highlight.js) | [Shiki](https://github.com/shikijs/shiki) | [starry-night](https://github.com/wooorm/starry-night) | [tree-sitter](https://tree-sitter.github.io/tree-sitter/) | [lezer](https://lezer.codemirror.net/) |
| -------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- | -------------------------------------- |
| Fast?                                  | ✅                                         | ✅                                                           | ❌                                         | ❌                                                      | ✅                                                         | ✅                                      |
| Light?                                 | ✅                                         | ✅                                                           | ❌                                         | ❌                                                      | ?                                                         | sorta                                  |
| Lots of languages?                     | ✅                                         | ✅                                                           | ✅                                         | ✅                                                      | ✅                                                         | sorta                                  |
| Good parser?                           | ❌                                         | ❌                                                           | ✅[^1]<br>                                 | ❌[^2]                                                  | ✅                                                         | ✅                                      |
| Easy to use?                           | ✅                                         | ✅                                                           | sorta                                     | prolly                                                 | ❌[^3]                                                     | ❌[^4]                                  |
| Feature filled?                        | ✅                                         | ✅                                                           | ✅                                         | ✅                                                      | ❌[^3]                                                     | ❌[^4]                                  |
| Satisfies my need to be a weird freak? | ❌                                         | ❌                                                           | ❌                                         | ❌                                                      | ❌                                                         | ✅                                      |
| Miscellaneous                          | Kinda weird?[^1]                          | Really basic                                                |                                           | [^2]                                                   | Would need to be WASM                                     |                                        |

</div>

You’ll generally see a lot of Prism[^6], Shiki[^7], and Highlight.js[^8], which is great! They’re all good options for syntax highlighting, but they all have their flaws (notably, they all run on RegEx). I wanted something without those flaws. Something that had other flaws that would result in me having to put in a ton of work to get the bare minimum instead of installing a basic plugin.

So obviously, I picked Lezer. Lezer is actually really great. It’s the syntax highlighter used for CodeMirror, which is the code editor that powers basically every code editor you’ve ever seen used in a browser that doesn’t obviously look like VSCode. [Lezer is based on tree-sitter](https://marijnhaverbeke.nl/blog/lezer.html), which is basically the gold standard in syntax highlighting right now, and it works similarly to it (with some consolations made for it to run performantly when running in js). There's just one catch: There isn't a plugin for Lezer. Prism and Highlight.js are super easy to use, they have [built-in plugins](https://lume.land/plugins/code_highlight/) for Lume, but Lezer I'd have to hook in myself. But that’s okay. How hard can it be?

## It was hard

### Part 1: The not actually that hard part

My site uses [Remark](https://github.com/remarkjs/remark-rehype)[^9]<sup>,</sup>[^10] to handle Markdown. This is in contrast to [Marked.js](https://marked.js.org/), which basically every other 11ty and Lume blog will use. Like Lezer, I picked Remark to satisfy my need to be a weird freak, but also for practical reasons. %% weird vibes here %%

Remark works by converting Markdown from text into an abstract syntax tree (AST)[^11]. ASTs are, essentially, an “abstract” representation of a language in a data format that is much easier to work with in code. For example (this example is taken [straight from the repo](https://github.com/syntax-tree/mdast?tab=readme-ov-file#emphasis)), Remark converts this:

```md
*alpha* _bravo_
```

To this:

```js
{
  type: 'paragraph',
  children: [
    {
      type: 'emphasis',
      children: [{type: 'text', value: 'alpha'}]
    },
    {type: 'text', value: ' '},
    {
      type: 'emphasis',
      children: [{type: 'text', value: 'bravo'}]
    }
  ]
}
```

While we as people might be able to implicitly understand that asterisks means that the text is *italicized* for *emphasis*, working with the data in this format is significantly easier for computers. %% Weird vibes here %%

After you convert Markdown to [MDAST](https://github.com/syntax-tree/mdast) (Markdown Abstract Syntax Tree), it’s much easier to convert the AST to an abstract syntax tree for HTML ([HAST](https://github.com/syntax-tree/hast)), which Remark does using [Rehype](https://github.com/rehypejs/rehype). After all, the syntax tree shown above looks like it could also communicate the syntax of HTML with no real changes.

The real magic comes when you want to add plugins. It’s exceptionally easy[^12] to write plugins that can get involved between each and every step of the process. You can add more syntax when Remark is converting text to an MDAST, or change the HAST partway through the process[^13], which affects the outputted HTML, and it’s all quite easy[^12]. This is idea for adding syntax highlighting, since I don’t have to get my hands dirty during the markdown stage. I can wait until it’s already a HAST and all I’d have to do is search for any part of the tree related to code blocks and then highlight them.

Gratefully, the [only other person on the internet](https://joelgustafson.com/posts/2022-05-31/syntax-highlighting-on-the-web) who uses Lezer for syntax highlighting has a 30 line-of-code library to update the tree with a bunch of `<span>{:html}` elements that have classes that I can color with CSS. Afterwards, he just… puts it into a React component directly… and that’s that. Alright, as a bona fide [React hater](https://www.zachleat.com/web/react-criticism/), I can’t do that[^14]. So I’m just gonna hook it in myself.

### Part 2: The hard part

HASTs are hard folks. It's genuinely really difficult to learn how to program a plugin when you don't know how the data model works, and you can't find any good guides on how to do it. I was able to find documentation, but was a bit too dense for my tiny designer brain, and I learn better by trying things until I figure it out along with looking at other codebases and taking apart their complete solution until I can see how each part works, then using that knowledge to make my own code work.[^15] In the hopes of sparing you the suffering I went through, I'm going to include a very basic and stripped down version of what I built, and try to explain how that works, but first I want you to look at the HAST for a `<pre>{:html}` tag with a `<code>{:html}` tag inside of it.

```js
{
  type: 'element',
  tagName: 'pre',
  properties: {},
  children: [{
    type: 'element',
    tagName: 'code',
    properties: {className: ['language-js']},
    children: [
      {type: 'text', value: 'let theCodeInside = toString(node);'}
    ]
  }]
}
```

This is what Remark will spit out and what the plugin will be searching for to do our highlighting to. Our goal will be to find a `<code>{:html}` element inside of the `<pre>{:html}` element, grab the text inside of the code element, and shove it all into the library I stole in the last section, which gives us a dummy "Root" element with syntax highlighted text. After that, we replace the code element's children with our new and improved syntax highlighted children, and flag to Remark that we're done with our work and that we don't need to update this element ever again. Here's a simplified function that does that below.

```js
// This is the plugin. It's what you tell rehype to call.
function rehypeLezer(options) {
	// This is the visit function from rehype.
	// It traverses the whole tree, making modifications and stuff.
	visit(tree, "element", function (node, _, parent) {	  
		if ( parent.tagName !== "pre" || node.tagName !== "code" ) {
			return;
		}
		
		// This isn't the regular toString function. 
		// It's also from Rehype.
		let theCodeInside = toString(node);
		
		/** @type {Root} */
		let fragment;
		
		try {
			// Parses with Lezer
			const parsedTree = javascriptParser.parse(theCodeInside);
			// Highlights contents based on what Lezer spits out.
			// This is the code I stole from the easy part.
			fragment = lezerHast(theCodeInside, parsedTree);
		} catch (error) {
			throw error;
		}
		
		node.children =
			/** @type {Array<ElementContent>} */ (fragment.children);
		
		return "skip";
	});
}
```

This basic function has a bunch of limitations. It assumes everything is javascript, doesn't highlight inline code, has no additional features, and almost certainly has edge cases, but the point of a basic prototype is to figure that stuff out later. Before I do that, I now have a new problem. I've tagged all the text to get colored by CSS, but I don't even have any colors for that text in the first place.

## Whoops I made my own themes

If you haven't noticed already, the [menu page](https://ewie.online/menu/) of my site has multiple color themes. We've got gray, clay, red, aqua, eggplant, and green. They all work in light mode and dark mode. I didn't hand-code all those themes. I use a bunch of color math[^16]<sup>,</sup>[^17] to take the one color you select and spit out a bunch of variations on that color. These 6 color themes are then composed into a light and dark version, which results in a total of 12 themes.

<div class="color-list-wrapper">
<style>
  .color-list-wrapper {
    container-type: inline-size;
  }
  .color-list {
    display: grid;
    grid-template-columns: repeat(30,1fr);
    & > div {
      aspect-ratio: 1;
      display: grid;
      place-content: center;
      /* padding: calc(1ch/2); */
      &:nth-child(-1n + 6) {
        grid-column: span 5;
      }
      &:nth-last-child(-1n + 5) {
        grid-row-start: 2;
        grid-column: span 6;
      }
    }
  }
  @container (400px <= width) {
    .color-list {
      grid-template-columns: repeat(11,1fr);
      & > div {
        &:nth-child(-1n + 6) {
          grid-column: span 1;
        }
        &:nth-last-child(-1n + 5) {
          grid-row-start: auto;
          grid-column: span 1;
        }
      }
    }
  }
</style>

<div class="color-list" style=" border-radius: var(--space-xs); overflow:clip;">
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--0)); color: oklch(from var(--primary) var(--800));">0</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--50)); color: oklch(from var(--primary) var(--800));">50</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--100)); color: oklch(from var(--primary) var(--800));">100</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--200)); color: oklch(from var(--primary) var(--800));">200</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--300)); color: oklch(from var(--primary) var(--800));">300</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--400)); color: oklch(from var(--primary) var(--800));">400</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--500)); color: oklch(from var(--primary) var(--100));">500</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--600)); color: oklch(from var(--primary) var(--100));">600</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--700)); color: oklch(from var(--primary) var(--100));">700</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--800)); color: oklch(from var(--primary) var(--100));">800</div>
  <div style="aspect-ratio: 1; background-color: oklch(from var(--primary) var(--900)); color: oklch(from var(--primary) var(--100));">900</div>
</div>
</div>


Code snippets need a color theme, and 12 themes is a lot. I was not going to dig around on the internet for 12 color themes that just so happened to look similar to the colors on my site. I could do better. I could build the themes myself.

![](https://cdn.ewie.online/Screenshot%202025-07-20%20at%205.15.25%20PM.jpeg)

Enter Duotone. Duotone was a code theme for Atom[^18]. Its defining trait was that it used only two base colors and uses those two base colors to build out a whole theme that <q>highlights only the <strong>important</strong> [parts]</q>. Two *is* more than one,<sup>[<a href="https://en.wikipedia.org/wiki/Citation_needed">citation needed</a>]</sup> but unlike themes that use a half dozen colors, this was something I could work with. All I needed to do was find a second color based on my first color (which I do by rotating the hue), and then I can dynamically generate 16 colors for the primary and secondary hue. Each of these 16 colors are hand-picked based on sampling a handful of [newer duotone themes](https://base2t.one).

<script type="module" src="/assets/js/components/hue-shifter.js"></script>
<hue-shifter value="180"></hue-shifter>

%% I need a paragraph here probably %%

## Conclusion

Honestly, I thought this project was a lot of fun. It felt right on the edge of my skill area in a way that was fun and not always frustrating, and I always enjoy getting to do stuff with CSS. This is one of those features I've always wanted to have in my site, and I'm really pleased to not only have my cake but eat it too. A real "Why does Evie get 12 code themes?" situation. Stay tuned for my next explainer article: *I had to come up with more clever solutions to annoying problems when building this article and now I'm gonna use those clever solutions to force you to learn them.



[^1]: It's based on TextMate grammars, which are used by VS Code, but also look like [this](https://joelgustafson.com/typescript-texmate.png) and aren't the most performant. Shiki also uses heavy intensive WASM to do syntax highlighting.

[^2]: Github has since moved to `tree-sitter` for new language support. If I wanted to use those new languages, I'd have to move to tree-sitter or not have syntax highlighting for them. I also don’t like the vibes of having my syntax highlighting be based on Github’s?

[^3]: See: [^4]

[^4]: I'd have to build it myself.

[^5]: Prism is really old. It's got a 2.0 version in the works that hasn't really been moving for about 3 years now? Also I feel like there's better options now.

[^6]: Used on [Smashing Magazine](https://www.smashingmagazine.com/), [CSS Tricks](https://css-tricks.com/), and probably [MDN](https://developer.mozilla.org/en-US/)?

[^7]: most notably used on [Josh W. Comeau’s site](https://www.joshwcomeau.com/).

[^8]: if your blog has syntax highlighting and you didn’t put any work into adding it, it’s probably Highlight.js

[^9]: I know this is starting to feel like a “How I built my blog” post, but I can assure you that the “How I built my blog” post is coming later.

[^10]: Also used by cohost! In fact, I use Remark on the server to support Markdown in comments! It’s almost exactly the same stack as what cohost comments use, but with a few extra features and no emotes (sorry).

[^11]: To be pedantic, it’s specifically Micromark that does this, which is a part of Remark. There is no importance to the distinction really, but just in case I get comments about it.

[^12]: Ignoring the learning curve, which is hard.

[^13]: This is actually how my read more cuts off text without breaking any of the HTML. I use a plugin that counts real characters in the HAST until I hit the limit. The text gets truncated there and the rest of the tree is trimmed off, and that’s what’s shown on the blog!

[^14]: Also it just doesn’t work with my existing workflow, where all my blog posts are written in Markdown and converted into plain HTML using Remark+Rehype. His libraries feature no on-ramp or off-ramp for Lume to hook into. The react integration is specifically written for his site which fundamentally handles code blocks differently every step of the way except the one I stole code from (thanks btw).

[^15]: Thanks to [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus), [rehype-shiki](https://github.com/shikijs/shiki/tree/main/packages/rehype), and [rehype-highlight](https://github.com/rehypejs/rehype-highlight) for being good codebases I could steal ideas from to make a barely functional codebase.

[^16]: You can find the code for this on [the repo for the blog](https://github.com/qt-dork/ewie.online/blob/379ea5b0a68c90e65c667bcf50ad402823d7471e/src/_includes/css/globals.css#L17)

[^17]: It's all in [OKLCH](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) if you're wondering. The math isn't super complicated and I have experience making color themes before. For example, I led the redesign of [SIBR](https://sibr.dev/blog/), which I think looks really nice.

[^18]: Before Microsoft killed Atom for seemingly no reason. The Atom guys are now trying to cram AI into code editors, like seemingly every other code editor on the market.

