---
title: Test reblog document
description: Testing reblog data
date: 2026-02-05T17:12:27Z
tags:
 - testing
 - reblogs
---

{ metadataOne: value }
{ metadataTwo: value }
::: reblog
regular markdown post content in here
:::

{ 
  url: "https://anthonymoser.github.io/writing/ai/haterdom/2025/08/26/i-am-an-ai-hater.html"
  title: "I Am An AI Hater"
  date: "2025-08-26T17:14:27+00:00"
  author: "moser's frame shop"
  authorUrli: "https://anthonymoser.github.io/writing/"
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

```
testing

:::
test
:::

testing
```

test
