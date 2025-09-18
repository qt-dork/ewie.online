---
title: "Boring site update changelog 25-09-18"
description: |
  I figured I should write some of these to kinda show in open that I actually write a decent amount o
date: 2025-09-18T21:30:08.270Z
tags: 
 - evie on-line meta
 - changelog

---

I figured I should write some of these to kinda show in open that I actually write a decent amount of code for this site.

## Big stuff!

### Relative time added.

If you look at the timestamp on each post, it now says how long ago it's been since the post went up as opposed to the absolute time it came out. This is helpful for a couple reasons, but a big one is that all my timestamps are in UTC ([Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)), which meant you could not get a sense for what time I was uploading posts anyways. I'd fire something off at dinner and then it'd seem like I was doing crazed 1am posting.

### Part of my Cohost archive has been reuploaded!

You can now see old cohost posts reuploaded to my blog at the [#cohost archive](https://ewie.online/tags/cohost-archive/) tag. I am missing most of my posts because I have to import these by hand. Any posts that rebugged other posts or my own posts are not uploaded (see: [Stuff I still need to do](#stuff-i-still-need-to-do)).

## Small stuff

- Fixed the leave a comment box not having a shadow.
- Minor improvements to syntax highlighting
- General CSS improvements.
- Demo web components made for a secret blog post I may or may not make down the line

## Stuff I still need to do

- Support reblogging. I don't [grab posts using h-entry](https://nex-3.com/blog/reblogging-posts-with-h-entry/) or anything, and my post templates don't support shared posts yet. I had to design some systems for handling post sharing with my [tweet component](https://ewie.online/posts/20250826-go-up-or-climb/), so I will probably use similar ideas once I add real posts.
- Improve accessibility. I have some quick wins I can and should do. Don't neglect accessibility y'all.
- Add a like button. Don't add a like count.
