---
title: The funniest stat in Blaseball
description: >
  If you remember when iceberg memes were the big trend on youtube, I was working on breaking down an iceberg meme for the game Blaseball, which I was really into for basically its entire runtime. The iceberg meme was specifically about the part of the Blaseball fandom that cared about sports statistics...
date: 2025-08-07T08:19:36Z
tags:
 - Blaseball
---
If you remember when iceberg memes were the big trend on youtube, I was working on breaking down an iceberg meme for the game Blaseball, which I was really into for basically its entire runtime. The iceberg meme was specifically about the part of the Blaseball fandom that cared about sports statistics.[^1] While it never saw the light of day, partially because work on it started after the game Blaseball finished, I think it would be fun to share some of the stories in it that I enjoyed writing, such as the story of the fake Blaseball statistic WhAT.

WhAT is the Blaseball version of a sabermetric[^2] statistic called [wins above replacement](https://en.wikipedia.org/wiki/Wins_above_replacement) (WAR). While I am not a baseball expert, I think the concept behind WAR is relatively simple, it’s meant to be a “meta-statistic”[^3] of how many more games of baseball you have won having a specific player on your team compared to a hypothetical baseline incredibly fungible baseball player. If a player has a very high WAR, you could assume that if they got fired, the team they were on would lose significantly more games than they did before.

This concept, while intuitive, is a lot harder to translate to a game like Blaseball. Due to lack of popularity, stats were not tracked for the first season and most of the second season of the game, meaning there was no baseline for player quality, and players are only “replaced” if they die in the game through some form or another, in which case the game will roll a new player to replace them.[^4] In other words, there’s no baseline. 

## Blaseball finally gets a baseline

At the end of [season 10](https://www.blaseball.wiki/w/Beta/Season_10) of Blaseball,[^5] the [Baltimore Crabs](https://www.blaseball.wiki/w/Baltimore_Crabs) won the Internet Series championship. With that win, they would be the first team to have 3 championship wins, which means they would “ascend” to somewhere, be removed from the game, and get replaced with a brand new team who would occupy their place, the [Tokyo Lift](https://www.blaseball.wiki/w/Tokyo_Lift).[^6] This was a freshly rolled team, and their performance on the following season would get used as the baseline for what a hypothetical replacement-level team would do in Blaseball. The Tokyo Lift would [proceed to finish season 11](https://before.sibr.dev/_before/jump?redirect=%2Foffseason&season=11&time=2020-10-25T19%3A15%3A00Z) with a record of 28 wins and 61 losses, being both the worst team in their division and the worst team in the whole game.

While their record was unfortunate, it helped stats nerds create a WAR-like statistic to figure out approximately how good a player was by comparing how many wins that player would give you compared to the historic winrate of the season 11 Tokyo Lift. This stat would be christened the name, “Wins (historical) Above Tokyo Lift” or [WhAT](https://www.blaseball.wiki/w/SIBR:Sibrmetrics). This name was also a reference to the catchphrase of the official Blaseball Twitter account[^7], “what”.[^8]

![](https://cdn.ewie.online/20250807082126-IMG_1986.jpeg)

<details><summary>Alt text:</summary>

From Sproutella in January 29, 2021:

I have also done some work on developing a couple new statistics. One is WhAT or Wins (historical)\* above Tokyo. Using the number of unweathered wins acquired by the Tokyo Lift in season 11 as a value for replacement level wins and the league wide run environment, we can calculate a players value in wins from Runs from batting, runs from stealing bases, and runs from avoiding double plays. This gives the mostly comprehensive counting statistic WhAT.  This graph shows the top 10 WhAT accumulators in s11. \*credit to Cuttlefishman agrīoeconomiae

Attached is a graph showing the 10 players with the highest WhAT, with first place belonging to Aldon Cashmoney, with a WhAT of 9, and in 10th place is Basilio Mason, with a WhAT of 4.

</details>

I think WhAT is an exceptionally funny stat. It checks all the boxes: it has a funny background, a funny name, it’s somehow actually useful, yet I have only found it get used by people to argue for the case that certain players are good enough to belong in a fan-run hall of fame. While you won’t get sentences like “Michelle Sportsman finished season 22 with an ERA of -0.35”, I find it just as funny to see people yelling about how their favorite blorbo has a WhAT of 22 or something.

![](https://cdn.ewie.online/20250807082228-IMG_1988.jpeg)

<details><summary>Alt text:</summary>

May: 
theyre historical. thats, like. not now. live int he present

Erin from March 22nd, 2022: 
All wins are historical. Wins don’t happen in the present.

</details>

Years later, the stats nerd at the Society for Internet Blaseball Research ([SIBR](https://sibr.dev/)) have mostly finished their “Nominative Determinism” project, which aimed to reverse-engineer the engine behind Blaseball.[^9] Now that they know how teams are generated and how the game itself works in code, it would be possible to generate an infinite number of replacement-level teams, simulate them all against real players, and determine a precise metric of exactly how many wins a player would have above its replacement.

While this would be neat, I have been told that it would not actually be that much more valuable than WhAT as a stat. Somehow, the Lift was about as average as you could get.


[^1]: Which, in true Evie fashion, I also helped make.

[^2]: Fancy word referring to a baseball statistics organization, and is used as a catch-all for a specific vibe of baseball statistics.

[^3]: Like, a stat derived from other stats used to give a big picture sense of how good a player is.

[^4]: Although you would probably be able to figure out that player’s WAR by seeing how many fewer games the team won after that player died. A little too late I guess.

[^5]: Among other things.

[^6]: It’s actually really relevant that they were the first to do it, since the “Book of Blaseball” only stated that a team with 3 championship titles would ascend, and did not actually say what ascending would mean. Blaseball had a lot of saying ominous things without ever explaining what it was, and this sort of Welcome to Night Vale-esque humor was a big part of the appeal of the game.

[^7]: This account was run by the fictional Blaseball commissioner, Prime Minister Parker MacMillan III, who was recently promoted at the start of season 11 from “intern-interim-commissioner” to “Chief Executive Officer”.

[^8]: This phrase would be deployed whenever the commissioner would be confused by any interaction with a fan-account or the events of the game itself, which was frequently.

[^9]: Which is a story for another day.
