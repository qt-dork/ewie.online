---
title: "I feel really bad for saying this, but you kind of missed with this one David Gerard"
description: >
  Hey David Gerard, long time follower second time caller. (Here's the first time.)
date: 2025-09-01T07:29:07Z
templateEngine: [vto, md]
tags:
 - so-called "AI"
 - "petty drama"
---

Hey David Gerard, long time follower second time caller. (Here's the first time.)

![A screenshot of a portion of my previous email conversation with David Gerard. It was asking about recommendations for research on Rationalists, which was inspired by a cohost post noticing some similarities between Harry Potter and the Methods of Rationality and isekai manga.](https://cdn.ewie.online/20250901060838-Image.jpeg)

So I recently saw a post of yours—attached below—about a post from a lead developer of the "Julia language" trying out Claude Code (which I will call "Clode" for the rest of the post for no particular reason except it saves me keystrokes and is funny) and finding it "not very good".

---

{{> const date = (timestamp) => (new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' })) }}
{{> const dateTime = (timestamp) => (new Date(timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Los_Angeles' })) }}

{{ comp social_embed }}
  <social-main-post>
    <img slot="avatar" src="https://cdn.ewie.online/20250901015851-Image.jpeg" >
    <span slot="name">David Gerard</span>
    <span slot="handle">@davidgerard@circumstances.run</span>
    <time slot="time" datetime="2025-08-29T19:11:05.000Z">{{ dateTime("2025-08-29T19:11:05.000Z") }}</time>
    <a slot="icon" href="https://circumstances.run/@davidgerard/115113634383702124" data-source="mastodon">Link to post</a>
<div class="stack" style="--stack-space: var(--space-xs);">
    
the extremely bottlenecked project lead for the Julia language tries out Claude Code. you'll be shocked to hear it's not very good. 

<a href="https://discourse.julialang.org/t/the-use-of-claude-code-in-sciml-repos/131009/8"><span class="invisible">https://</span><span class="ellipsis">discourse.julialang.org/t/the-</span><span class="invisible">use-of-claude-code-in-sciml-repos/131009/8</span></a>
    
"Claude can only solve simple problems that a first year undergrad can do, it can’t do anything more, it’s pretty bad."

</div>

<social-link-card href="https://discourse.julialang.org/t/the-use-of-claude-code-in-sciml-repos/131009/8">
  <img src="https://cdn.ewie.online/20250901021140-Image.jpeg" width="662" height="348" loading="lazy" slot="img" />
  <span slot="domain">discourse.julialang.org</span>
  <time slot="time" datetime="2025-07-25T04:06:10.000Z" title="7/24/2025, 11:06:10 PM">{{ date("2025-07-25T04:06:10.000Z") }}</time>
  <p slot="title" title="The use of Claude Code in SciML repos">The use of Claude Code in SciML repos</p>
  <p slot="description" title="So it’s pretty public that for about a month now I’ve had 32 processes setup on one of the 64 core 128gb RAM servers to just ssh in, tmux to a window, and tell it to slam on some things non-stop. And it has been really successful!.. with the right definition of success. Let me explain.   I think the first will answer the others. Basically, Claude is really not smart at all. There is no extensive algorithm implementation that has come from AI. I know some GSoCers and SciML Small Grants applicants...">So it’s pretty public that for about a month now I’ve had 32 processes setup on one of the 64 core 128gb RAM servers to just ssh in, tmux to a window, and tell it to slam on some things non-stop. And it has been really successful!.. with the right definition of success. Let me explain.   I think the first will answer the others. Basically, Claude is really not smart at all. There is no extensive algorithm implementation that has come from AI. I know some GSoCers and SciML Small Grants applicants...</p>
</social-link-card>

  </social-main-post>
{{ /comp }}

I came into the post imagining from your description, perhaps, an overworked lead developer for the Julia programming language. Lead developers of open source projects are famously overworked and under-appreciated. In my mind, this lead developer, swamped with issues and feeling the crunch, opts to try using Clode to see if it lives up to the hype and if it could make his life easier. This developer finds it to be less than useless, and then writes a scathing critique of it on the Julia language forums. In my opinion, this is how the post is framed. However, it is not that.

The forum post is actually from Chris Rackauckas, a lead developer of [SciML](https://sciml.ai), which is an organization that's all about scientific machine learning.[^1] While he seems to be part of the Github organization for the Julia language, he has only made 9 commits to the language itself, 6 of which were for the README. Since this Rakauckas is a lead developer of an organization that focuses on machine learning, it's unsurprising that he would be at least a bit AI curious.[^2] In the forum post, Rackauckas states that, while he finds Clode useless for anything advanced, he still felt as though there was a niche that could save him time.

> So from this one principle arose:
> 
> This claude thing is pretty dumb, but I had a ton of issues open that require a brainless solution.

Rackauckas continues on to say that Clode allows him to no longer have to spend 12 hours each week working on trivial Github issues. He solves this now by throwing "32 instances of claude at the problem for 8 hours."

> I have had to spend like 4am-10am every morning Sunday through Saturday for the last 10 years on this stuff before the day gets started just to keep up on the "simple stuff" for the hundreds of repos I maintain. And this neverending chunk of "meh" stuff is exactly what it seems fit to do. So now I just let the 32 bots run wild on it and get straight to the real work, and it's a gamechanger.

I was planning on ending this post by saying that, despite everything, I didn't consider this post a win for AI boosters. I initially considered it to still have enough caveats to maybe not be an entirely positive spin for the groups of people who are personally or financially invested in the success of AI, but that was before I found Rackauckas' blog. As of time of writing, his most recent blog post is titled [A Guide to Gen AI / LLM Vibecoding for Expert Programmers](https://www.stochasticlifestyle.com/a-guide-to-gen-ai-llm-vibecoding-for-expert-programmers/), written about a month after the forum post. In the blog post, he promotes the idea that you can treat AI as a cheap army of junior developers,[^5] he claims that expert programmers are the only people who should be vibe coding, that he pays for a $200/month Clode Max subscription, and that in one month he used enough tokens for $5,200 of compute. On top of all this, I was able to find out that he has a major role at [two](https://pumas.ai/company#OurTeam) [different](https://juliahub.com/company/about-us) AI companies. We are no longer talking about just some lead developer on an open source project. This guy is someone whose behavior can be explained through the lens of financial motivation. Boosting AI and keeping the bubble going means he will continue to get paid. Which perhaps matters since I still have no idea how he's paying for the [64-core 128gb RAM servers](https://discourse.julialang.org/t/the-use-of-claude-code-in-sciml-repos/131009/7#:~:text=I’ve%20had%2032%20processes%20setup%20on%20one%20of%20the%2064%20core%20128gb%20RAM%20servers)[^3] he is running all his instances of Clode off of. At this point, the only possible dunk on AI remaining is the potential own-goal of *only* saying that AI could save him 12 hours a week of trivial work, given how much financial stake he has in the success of AI.

Despite everything, there yet remains some hope. Rackauckas has submitted his own post to [the Orange Site](https://news.ycombinator.com/item?id=44985207),[^4] and the reception seems to be... mixed. Negative comments include "this appears to me to be a surprisingly low-effort article" [from polotics](https://news.ycombinator.com/item?id=44989188), "this may be the most 2025 blog post ever written" [from ppqqrr](https://news.ycombinator.com/item?id=44987216), and "I've got a TONNE of low-hanging fruit that I can't give to an intern, but could easily sick a tool as capable as an intern on. This was not that." [from jpollock](https://news.ycombinator.com/item?id=44988599) While the comments section of an Orange Site post doesn't make for the most interesting reading, it still would've made for a more factual basis for a post than what you've written.

Thanks for reading,
Evie Finch

(Pretend I have a really cool email signature here. Like the Paul Allen's business card of signatures. Trust me, it's really cool.)

[^1]: Surprisingly—or unsurprisingly—enough, funded by Microsoft and the Chan-Zuckerberg initiative.

[^2]: SciML has got a .ai domain for gods' sake.

[^3]: I checked how much a comparable model of computer would cost to rent on Hetzner, and it was roughly €200/month. Perhaps he's getting access to these servers through one of the [two](https://pumas.ai/company#OurTeam) [different](https://juliahub.com/company/about-us) AI companies he's a major part of, through MIT since he instructs there, or maybe he's paying for it out of pocket. Who knows.

[^4]: I think submitting your own post is a bit of a HackerNews faux pas? Can anyone in the comments let me know if I'm right or not? 

[^5]: Which is a common talking point for AI boosters, who say, “Well it may not be the *smartest*, but it’s like a cheap version of paying for junior developers”, when they’re not saying that it’s a frighteningly smart super genius that will take over the world.
