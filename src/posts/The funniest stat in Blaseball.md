---
title: The funniest stat in Blaseball
description: >
  Years ago, I worked on a concept for a video breaking down an iceberg meme for Blaseball, a roguelike incremental management horror game with creative story prompting elements that I was deep into for basically its entire runtime. While this project never saw the light of day, I think it'd be fun to share some of the stories from it that I enjoyed writing. This is one of those stories.
date: 2025-08-08T06:56:57Z
tags:
 - Blaseball
---

![A screenshot of an archive of the Blaseball home page as of season 11](https://cdn.ewie.online/SCR-20250807-schd.jpeg)

Years ago, I worked on a concept for a video breaking down an iceberg meme[^1] for Blaseball,[^10] a roguelike[^11] incremental[^11] management[^11] horror[^11] game with creative story prompting elements[^11] that I was deep into for basically its entire runtime. While this project never saw the light of day, I think it'd be fun to share some of the stories from it that I enjoyed writing. This is one of those stories.

## WhAT

WhAT is the Blaseball version of a sabermetric[^2] statistic called [wins above replacement](https://www.baseball-reference.com/about/war_explained.shtml) (WAR). While I am not a baseball expert, the concept behind WAR is simple: it’s a “meta-statistic”[^3] of how many more games of baseball you have won having a specific player on your team compared to a hypothetical ultra-fungible average baseball player. If a player has a high WAR, you could make the assumption that firing that player would result in the team they were on losing significantly more games, and if a player has a low WAR, then replacing them would have negligible impact on the team’s overall performance

This concept is a lot harder to translate to a game like Blaseball. Nobody tracked stats during the first season and most of the second season of the game. This made it impossible to figure out what “replacement-level” player would be like in the game. The only situation where a player would be “replaced” is if they die in the game through some form or another, which would result in the game will rolling a new player to replace them.[^4] This is not ideal, and for many seasons, the stats nerds at the Society for Blaseball Research would not be able to find a way to recreate WAR due to lacking any sort of substantial data on the performance of baseline replacement-level players.

## Blaseball finally gets a baseline

At the end of [season 10](https://www.blaseball.wiki/w/Beta/Season_10) of Blaseball, the [Baltimore Crabs](https://www.blaseball.wiki/w/Baltimore_Crabs) won the Internet Series championship.[^5] With that win, they would be the first team to have 3 championship wins, which means they would “ascend” to somewhere, be removed from the game, and get replaced with a brand new team who would occupy their place, the [Tokyo Lift](https://www.blaseball.wiki/w/Tokyo_Lift).[^6] This was a freshly rolled team, and their performance on the following season would get used as the baseline for what a hypothetical replacement-level team would do in Blaseball. The Tokyo Lift would [proceed to finish season 11](https://before.sibr.dev/_before/jump?redirect=%2Foffseason&season=11&time=2020-10-25T19%3A15%3A00Z) with a record of 28 wins and 61 losses, being both the worst team in their division and the worst team in the whole game.

While their record was unfortunate, it helped stats nerds create a WAR-like statistic to figure out approximately how good a player was by comparing how many wins that player would give you compared to the historic winrate of the season 11 Tokyo Lift. This stat would be christened the name, “Wins (historical) Above Tokyo Lift” or [WhAT](https://www.blaseball.wiki/w/SIBR:Sibrmetrics). This name was also a reference to the catchphrase of the official Blaseball Twitter account[^7], “what”.[^8]

![](https://cdn.ewie.online/20250807082126-IMG_1986.jpeg)

<details><summary>Alt text:</summary>

From Sproutella on January 29, 2021:

I have also done some work on developing a couple new statistics. One is WhAT or Wins (historical)\* above Tokyo. Using the number of unweathered wins acquired by the Tokyo Lift in season 11 as a value for replacement level wins and the league wide run environment, we can calculate a players value in wins from Runs from batting, runs from stealing bases, and runs from avoiding double plays. This gives the mostly comprehensive counting statistic WhAT.  This graph shows the top 10 WhAT accumulators in s11. \*credit to Cuttlefishman agrīoeconomiae

Attached is a graph showing the 10 players with the highest WhAT, with first place belonging to Aldon Cashmoney, with a WhAT of 9, and in 10th place is Basilio Mason, with a WhAT of 4.

</details>

I think WhAT is an exceptionally funny stat. It checks all the boxes: it has a funny background, a funny name, it’s somehow actually useful, yet I have not seen extensive use of it across discussion of players, outside of arguments over which player is best and miscellaneous factoids. This is not a negative quality to me.

![](https://cdn.ewie.online/20250808065444-SCR-20250808-bnyx.jpeg)

<details><summary>Alt text:</summary>

From deafhobbit on April 18th, 2022: 
oh my god

Lowe Forbes’ WHaT during their two underhanded seasons was 11.6 in s24 and 4.8 in s23

their next best season ever was s12x with a WHaT of 0.8

Their career pitching WHaT up til the point they became underhanded was -18.4

</details>

As a bonus little tidbit, years later, the stats nerd at SIBR have mostly finished their “Nominative Determinism” project, which aimed to comprehensively reverse-engineer the simulation running Blaseball.[^9] Now that they know how teams are generated and how the game itself works in code, it would be possible to generate an infinite number of replacement-level teams, simulate them all against real players, and determine a precise metric of exactly how many wins a player would have above its replacement.

While this would be exceptionally funny, I have been told that it would not actually be that much more valuable than WhAT as a stat. Somehow, the Lift was about as average as you could get.

![](https://cdn.ewie.online/20250807082228-IMG_1988.jpeg)

<details><summary>Alt text:</summary>

From May: 
theyre historical. thats, like. not now. live int he present

From Erin on March 22nd, 2022: 
All wins are historical. Wins don’t happen in the present.

</details>


[^1]: Which, in true Evie fashion, I also helped make.

[^2]: Fancy word referring to a baseball statistics organization, and is used as a catch-all for a specific vibe of baseball statistics.

[^3]: Like, a stat derived from other stats used to give a big picture sense of how good a player is.

[^4]: In theory, this would let you figure out a player’s WAR just by seeing how much more the team lost after that player died. A little too late though.

[^5]: Among other things.

[^6]: It’s actually really relevant that they were the first to do it, since the “Book of Blaseball” only stated that a team with 3 championship titles would ascend, and did not actually say what ascending would mean. Blaseball had a lot of saying ominous things without ever explaining what it was, and this sort of Welcome to Night Vale-esque humor was a big part of the appeal of the game.

[^7]: This account was run by the fictional Blaseball commissioner, Prime Minister Parker MacMillan III, who was recently promoted at the start of season 11 from “intern-interim-commissioner” to “Chief Executive Officer”.

[^8]: This phrase would be deployed whenever the commissioner would be confused by any interaction with a fan-account or the events of the game itself, which was often.

[^9]: This is a story for another day.

[^10]: Specifically for the [Society of Internet Blaseball Research](https://sibr.dev/), or SIBR for short. This was a community of very dedicated fans devoted to unraveling the mysteries behind the game.

[^11]: In a sense.