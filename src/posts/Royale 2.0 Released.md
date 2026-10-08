---
title: Royale 2.0 Released
date: 2026-10-07T22:20:00.000-05:00
tags: 
 - royale
 - pebble

---

![A screenshot of the watch face, showing all the new features.](https://cdn.ewie.online/pebble_screenshot_2026-10-07_21-56-27.png)

Version 2.0 of Royale has released. I'd really consider this more of a version 1.5 or something like that, but the Zig SDK seems to only support major and minor versions, and this is certainly not a minor version. This update addresses every single piece of feedback I've received. Here's what's changed:

- Added support for 24 hour time. You can find this setting in the pebble app. It's not a watch face setting and please do not try to find it there.
- Added support for MM/DD dates. This, along with 24 hour time, necessitated a complete rework of how the faded layers were handled, since they used to just be baked into the background image. Now they're dynamic.
- Fixed all issues with time zones. I now handle time zones the same way as Time Traveler Pebble app. Thanks to freakified for the help with this.
- Fixed a crash that only started happening on October 1st. Sorry for the delay to everyone that emailed me letting me know the watch face was crashing. I was in Montreal while this was happening, and couldn't get back to my computer until today.

I do not own a Pebble Time 2 and cannot test this update for any bugs or issues. I planned on simply winning one in the developer contest, which didn't happen. Please email me with any issues you may have, or post them in the [Github repo](https://github.com/qt-dork/zig-pebble-face). Since I do not have a physical watch to test with, continuing to update this watch face will be a low priority for me (since I can't even wear my own watch face). My next plan is to design and create a watch face for the Pebble Round 2, since that's the one I bought.

Thank you for using Royale. Please leave a comment or email me if you have any feedback.