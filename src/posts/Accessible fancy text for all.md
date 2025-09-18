---
title: Accessible fancy text for all
description: |
    I'm gonna be honest, I'm not a particularly huge fan of people doing fancy text like this
    Oooh look at this fancy text aren't I so fancy
    Or some, like, homestuck typing quirk-ass text like this
    GC Objection!!!

date: 2022-11-08T08:50:00.104+00:00

tags:
 - accessibility
 - html
 - css crimes
 - The Cohost Global Feed
 - cohost archive
---

I'm gonna be honest, I'm not a particularly huge fan of people doing fancy text like this:

<p aria-describedby="user-content-fancy-tip">
<span aria-hidden="true">𝒪𝑜𝑜𝒽 𝓁𝑜𝑜𝓀 𝒶𝓉 𝓉𝒽𝒾𝓈 𝒻𝒶𝓃𝒸𝓎 𝓉𝑒𝓍𝓉 𝒶𝓇𝑒𝓃'𝓉 𝐼 𝓈𝑜 𝒻𝒶𝓃𝒸𝓎</span>
<span id="user-content-fancy-tip" style="clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;">Oooh look at this fancy text aren't I so fancy</span>
</p>

Or some, like, homestuck typing quirk-ass text like this:

<p aria-describedby="user-content-homestuck-tip">
<span aria-hidden="true" style="font-family: courier-std, courier, monospace; color: rgb(0, 130, 130);">GC: OBJ3CT1ON!!!</span>
<span id="user-content-homestuck-tip" style="clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;">GC: Objection!!!</span>
</p>

I think it's hard to read, it's hard to make sense of, and honestly I think it's also kinda annoying. But, I understand that for some people, it's how they want to (or need to) express themselves. And as someone who's a bit of a big fan of accessibility, I'd like to give people the choice to do what they want, but in a way that's not going to completely heck over people using screen readers.

So, I'd like introduce Accessible fancy text 🎉!!!

Below is a snippet you can use in your cohost posts (chosts) to make sure that if you use fancy text (which I wouldn't recommend using in general but still), it'll still be readable to screen readers. Below the fold is a writeup about it that goes into more detail.

## The Snippet

```html
<!-- use div, p, span, whatever works here -->
<div aria-describedby="user-content-id-name">
	<span aria-hidden="true"> <!-- Put your stuff here! --> </span>
	<span id="id-name" style="clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;">Rewrite the stuff but in human-readable text</span>
</div>
```

It also works <span aria-describedby="user-content-id-name">
<span aria-hidden="true">𝓲𝓷𝓵𝓲𝓷𝓮</span>
<span id="user-content-id-name" style="clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;">inline</span>
</span> too!

---

## Alright, so how does it work?

So, the main magic bullet here is `aria-describedby`. All it basically does is say to the screen reader, "hey, this chunk of html has another element describing it." Sort of in the same way that adding alt text to an image works I guess. There is a catch, though. Unlike alt text, `aria-describedby` doesn't actually hide (to the screen reader) what it's describing, which is fine. I can't really think of any reasons off the top of my head not to hide it, but I'm certain there's some good reasons. In practice, we can use `aria-describedby` like this (graciously stolen from [this writeup](https://web.archive.org/web/20250107095122mp_/https://cohost.org/thricedotted/post/43242-oh-interesting-tot) by **[@thrice-totted](https://entangled.one)**):

- Put the description in an element with `id="{something}"` on it
- Set `aria-describedby="user-content-{something}"` on the element it's describing. (We stick it on a wrapper around both elements instead. I'm not certain if it's better, but I've had less issues with this over having them side by side when I did some testing.)

The reason we need to stick "user-content" in front of the id we want to use for our element is because cohost actually lets us use custom ids in our posts, but it'll prepend them with "user-content" to make sure they never interfere with any actual ids used by the website.

Since `aria-describedby` doesn't hide our fancy text from the screen reader, we'll want to manually hide it ourselves, or else the screen reader user could end up having to sit through [this entertaining listening experience](https://share.cleanshot.com/4KxTuc). So what we'll want to do is make sure to wrap the actual element with the fancy text in it with `aria-hidden="true"`, which ensures that screen readers just assume it doesn't exist.

After that, we stick some css on the `aria-describedby` element to make it invisible so people who can see don't end up getting double text. (I'd rather prefer to have a little tooltip that shows the text, so that way you could hover over or tap the fancy text and read what it actually means, but I couldn't find anything accessible that doesn't use javascript. If anyone in the comments can figure it out, then please let me know and I'll update the post.)

```css
clip: rect(0 0 0 0); 
clip-path: inset(50%);
height: 1px;
overflow: hidden;
position: absolute;
white-space: nowrap; 
width: 1px;
```

(For convenience's sake, here's how you'd put it in an html element)

```html
style="clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;"
```

Just as one last thing, I'll add that just like the accessible css crime pioneers before me, I don't rely on accessibility tools myself. I made sure to test all this stuff with Voiceover on my computer before putting it out there, but I don't use it on a daily basis. I'm just a weird nerd that saw the incredibly minor drama about fancy text on cohost earlier today (as well as the post resolving it), and thought "Oh there's gotta be a really simple solution". And there was! So that's good. Glad we got that sorted out and we're able to use the power of html to make our text accessible. [It'd be awful if there was a social media website where people had to just constantly complain about how people should never use fancy text while other people ignored the wishes of people just seeking to improve accessibility.](https://twitter.com)

## I think I've got it, so I should just use this willy nilly now that I can guarantee my stuff'll be accessible?

I mean, no??? No matter what, using plain text should always be preferred over fancy text, since that's accessible by default. I mostly put this out there since I know that no matter what, there'll be some people who have some reason to not use plain text, and so they should, at the very least, make it accessible. But as a rule of thumb, you should always prefer to have your text look like this

![Plain text reading "Ooh look at this fancy text aren't I so fancy"](https://cdn.ewie.online/20250903043052-Image.jpeg)

Over this

![An accessible fancy text block that reads "Ooh look at this fancy text aren't I so fancy". It is harder to read at a glance than the plain text.](https://cdn.ewie.online/20250903043118-Image.jpeg)

At the very least, it'll be easier for you to read when you're writing the post.