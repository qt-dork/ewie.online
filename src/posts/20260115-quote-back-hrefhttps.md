---

description: |
  To give a way to automate adding a section to a personal website which links to the websites of your friends and allies, and which does so via the medium of 83x11 badges. Ideally you'd have a list of websites in whatever tooling you use to generate your site, and when you push the button it goes off and finds the buttons and downloads them, and then it puts them in a nice little display, each pointing to the canonical url for that site with the proper alt text.
date: 2026-01-15T04:17:00.133Z
tags: 
 - 88x31
 - specs

---
<quote-back href="https://blog.vbuckenham.com/the-88x31-button-spec/">

To give a way to automate adding a section to a personal website which links to the websites of your friends and allies, and which does so via the medium of 83x11 badges. Ideally you'd have a list of websites in whatever tooling you use to generate your site, and when you push the button it goes off and finds the buttons and downloads them, and then it puts them in a nice little display, each pointing to the canonical url for that site with the proper alt text.

<span slot="author">v buckenham</span>
<span slot="title">The 88x31 button spec</span>
</quote-back>

<script type="module" src="/assets/js/components/quote-back.js"></script>

good news! the `well-known/button` spec already exists, just in a different form. you can find it here: https://codeberg.org/LunarEclipse/well-known-button. i know about this because [beeps](https://beeps.website) uses it, and because it's currently (partially) implemented on the 3.0-ish[^1] branch of my site.

there is a practical difference between v's spec and the well known spec, which is the well known spec uses json while v's spec uses meta tags. i have no idea id that makes a real difference though, lol.

[^1]: 2.5?
