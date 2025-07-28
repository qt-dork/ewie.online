---
title: "A brief overview of three of my site's dependencies"
description: |
  They say “great artists steal”, and I wanted to showcase how I’ve solved some problems I’ve run into
date: 2025-07-28T15:26:01.964Z
tags: 
 - dev
 - blogging about blogging
 - meta

---

They say “great artists steal”, and I wanted to showcase how I’ve solved some problems I’ve run into on my site by showing some niche dependencies I’ve picked up. Note that these are mostly files that have originated from other sources that I’ve copied in by hand as opposed to imported.

## [HAST util from Lezer](https://github.com/joeltg/hast-util-from-lezer)

I will go more into depth on this on a future article on how syntax highlighting on my blog works, but to summarize: I use a tool called Lezer to handle syntax highlighting. This library is part of the pipeline my blog uses for adding that syntax highlighting. This was written by Joel Gustafson and mentioned in an incredible [blog post](https://joelgustafson.com/posts/2022-05-31/syntax-highlighting-on-the-web) going into some of the history around syntax highlighting. I copied it into my site basically wholesale, and you can find it [in my codebase here](https://github.com/qt-dork/ewie.online/blob/main/helpers/rehype-lezer/lezer-hast.js) (converted to javascript from typescript for some reason). I generally prefer copying code in over importing it, because it helps me understand what the code does, and it allows me to tune the code to better fit the needs of my shitty blog.

## [Theme Picker](https://github.com/jimniels/blog/blob/main/src/server/ThemePicker.js)

My fancy theme picker was taken from [the blog of Jim Nielsen](https://blog.jim-nielsen.com/menu/). I thought the concept was pretty solid, and it wasn’t the hardest to bring it over to my site basically wholesale. You can find some more details in his post [Building Websites With LLMs](https://blog.jim-nielsen.com/2025/lots-of-little-html-pages/). It really checks all the boxes and I think that’s really great. You can also find the code in my [blog repo](https://github.com/qt-dork/ewie.online/blob/main/src/_components/theme_picker/script.js).

## [rehype-truncate](https://github.com/luk707/rehype-truncate)

If I am evaluating a dependency and see that it’s last been updated about 5 years ago, that’s a sure sign that I need to add it in by hand to make sure I understand what it’s doing, because if I run into any issues when using it, I don’t think the developer will ever respond to fix my issue, and I’ll have to fix it myself. If I recall correctly, that happened with rehype-truncate, which powers my read more feature. Like cohost (my beloved), my site tries to truncate my posts after seeing a line break or after reaching some sort of arbitrary word limit. This library does that truncation while avoiding breaking any html tags. You can find it [in my codebase here](https://github.com/qt-dork/ewie.online/blob/main/helpers/truncate_html.ts) (converted to typescript for some reason???)
