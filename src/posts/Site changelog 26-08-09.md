---
title: Site update changelog 26-08-09 - Big update!
description:
date: 2026-08-09T21:22:00.000-05:00
tags:
 - meta
 - evie on-line meta
 - changelog
---

{
title: "Boring site update changelog 25-09-18"
url: https://ewie.online/posts/20250918-boring-site-update-c/
author:
  displayName: Evie Finch
  username: ewie
  avatar: "https://cdn.ewie.online/ewie-pfp.png"
date: 2025-09-18T21:30:08.270+00:00
}
:::
[...]

## Stuff I still need to do
- <mark>Support reblogging.</mark> I don't grab posts using h-entry or anything, and my post templates don't support shared posts yet. I had to design some systems for handling post sharing with my tweet component, so I will probably use similar ideas once I add real posts.
- Improve accessibility. I have some quick wins I can and should do. Don't neglect accessibility y'all.
- Add a like button. Don't add a like count.
:::

> Note: The site has had major changes and may look incorrect unless you clear your cache.

So I have a major update, and I'd like to write a brief changelog talking about what's changed.

## Big Stuff!

### Reblogs added!

A post can now be a "reblog" of another post. Reblogs get all the same metadata that regular posts get, and reblogs can be chained. This means, in theory, I could reblog nex3's reblog and I could show the original post, nex3's response, and then my own response. I really can't think of any other features this design could have. It's got basically everything I could ever want.

#### How it works

This feature is technically fake. It works similarly to the type of reblogs you see on [nex3's site](https://nex-3.com/blog/ai-mania-is-eviscerating-global-decision-making/). In her blog, [a reblog is a shortcode](https://github.com/nex3/nex3.github.io/blob/main/source/blog/327-ai-mania-is-eviscerating-global-decision-making.md?plain=1) which renders into a template, and a pile of metadata which is used in that template. She also has a helper function which will fetch the data for her. I don't.[^1]

However, my version of this feature has a ton of really cool stuff going for it! I have a special markdown-compatible syntax which my blog will see and turn into a reblog. In a blog post, it looks something like this:

```md
{
  title: Post title
  url: https://link.to/post/
  date: 1970-01-01T00:00:00.000Z
  author:
    displayName: Author Name
    username: handle
    avatar: https://link.to/profile-pic.jpg
}
:::
Post **content** of reblog post.
:::
```

My blog has a dedicated preprocessing step that parses every single blog post with a simple (and probably poorly programmed) parser I wrote that scans for any reblogs, extracts them out of a blog post, and attaches them to that post's metadata under the `reblogs` section. the content is treated like regular markdown, which is really nice. If you're interested in reading the source code for this feature, perhaps so you can implement something like it on your own blog, you can find the [parser](https://github.com/qt-dork/ewie.online/blob/main/helpers/parse_markers/parse.ts) and the [post component](https://github.com/qt-dork/ewie.online/blob/main/src/_components/reblog_post/index.vto) on Github.

I'm incredibly proud of how I implemented reblogs. As far as I can tell, it's completely unique in the world of blogs. However, please steal it if you're interested! This feature is just one part of my crusade to [reinvent a fourth website piecemeal and from first principles](https://azhdarchid.com/indieweb-things-that-should-exist/).[^2]

### Read more overhauled

To keep posts from taking up too much space in the main timeline, they'd get trimmed down to a certain length. Before, this would be handled on build by deleting the rest of the post after a certain point on the timeline pages and inserting a "read more" link afterwards. Now, this is all handled client-side, so you can get the full experience without ever leaving the timeline. I don't really know how I feel about it being a bit more social media-esque, but this does fix almost every bug the previous read more system had, and there were many. I had multiple occasions where I'd upload a blog post only to find that the read more mangled it somehow. Never again.

This feature was directly inspired by cohost, and to make the cohost resemblence even greater, the version 2 of read more is a near-blatant copy of the cohost button.[^3]

## Small stuff

- Fixed RSS issues (after an update broke RSS). ([ref](https://github.com/qt-dork/ewie.online/pull/13))
- Fixed URL issues (after that same update broke URLs). ([ref](https://github.com/qt-dork/ewie.online/pull/14))
- Added URL regression testing to prevent future URL issues. ([ref](https://github.com/qt-dork/ewie.online/pull/14))
- Rehype syntax highlighting plugin is no longer used. Moved to a regular syntax highlighting plugin.[^4] ([Some info on motivations here.](https://ewie.online/posts/20260214-arborium-is-ai-slopw/)) This is part of an effort to genericize the blog's internals into an easy to use template. ([ref](https://github.com/qt-dork/ewie.online/pull/10))
- Cleaned up `_config.ts`. Split some of its functionality into a new `plugins.ts`. This is part of an effort to genericize the blog's internals into an easy to use template. ([ref](https://github.com/qt-dork/ewie.online/pull/9))
- Added support for [the Octothorpes protocol](https://octothorp.es). ([ref](https://github.com/qt-dork/ewie.online/commit/363a86f1b78e24cddd9c590efbd3a76ca3179991))
- Quote-back component created. ([ref](https://github.com/qt-dork/ewie.online/commit/d0c8727676c973d6e554533e477eba9c2f946c18))

## Stuff I still need to do/Known issues

- In the timeline, if the same footnote number is used in two posts, clicking on the footnote link will always take you to that footnote number on the newer post.
- Comments 2.0! I have a whole thing written out to wholly improve comments and support replies! I just need to finish it.
- Set up [Webmentions](https://nex-3.com/blog/a-non-technical-intro-to-webmentions/).
- Move away from Github.
- Fully self-host the site.
- Backfill the rest of my old cohost posts.
- Finish building the missing links in my menu page.
- Improve accessibility.

As per usual, if you notice any issues with the site, please feel free to [email me](mailto:evie@ewie.online) or file an issue on [github](https://github.com/qt-dork/ewie.online)!

[^1]: I'd like to build this helper function down the line! It seems really cool! However it's not a priority right now.

[^2]: I have a lot of opinions on this post actually but I'll save that for another time.

[^3]: I didn't steal cohost's implementation. I mean, I probably would if I could, but the site code is hard to understand.

[^4]: This is technically a downgrade. The regular plugin has fewer features than the Rehype plugin. It currently can't highlight inline code, at least until I get to building that, and it has worse performance than the Rehype plugin due to a difference in how Lume handles processing vs post-processing plugins. However, the regular plugin could, down the line, get turned into something anyone could use in their site.
