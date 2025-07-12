---
title: testing
description:
date: 2025-06-23T05:48:56Z
tags:
 - code
---

before

```html
<button popovertarget="my-popover"> Open Popover </button>

<div id="my-popover" popover>
  <p>I am a popover with more information. Hit <kbd>esc</kbd> or click away to close me.</p>
</div>
```

```css
:root {
  color-scheme: light dark;

    &[data-theme-appearance="light"] {
      color-scheme: light;
    }

    &[data-theme-appearance="dark"] {
      color-scheme: dark;
    }

    interpolate-size: allow-keywords;

    /* tints & shades */
    --0: 100% 0 h;
    --50: 99% calc(c / 8) h;
    --100: 94% calc(c / 4) h;
    --200: 88% calc(c / 2) h;
    --300: 70% c h;
    --300: 70% c h;
    --400: 60% c h;
    --500: 50% c h;
    --600: 40% c h;
    --700: 30% c h;
    --800: 20% calc(c / 2) h;
    --900: 15% calc(c / 4) h;
}

button {
  font-size: 100%;
  padding: 0.75rem;
  background: white;
  transition-duration: 0.5s;
  border: 4px solid plum;
  background: lavenderblush;
  border-radius: 1rem;

  &:hover,
  &:focus {
    background: plum;
    color: white;
  }
}

[popover] {
  background: black;
  color: white;
  font-weight: 400;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  max-width: 20ch;
  line-height: 1.4;
  top: 2rem;
  margin: 0 auto;
}

body {
  background: #fcf9fb;
  display: grid;
  font-size: 1.5rem;
  font-family: system-ui, sans-serif;
  place-items: center;
  height: 100dvh;
}

/* Animating the popover in */

/*   IS-OPEN STATE   */
[popover]:popover-open {
  translate: 0 0;
}

/*   EXIT STATE   */
[popover] {
  transition: translate 0.7s ease-out, display 0.7s ease-out allow-discrete, overlay 0.7s ease-out allow-discrete;
  translate: 0 -22rem;
}

/*   0. BEFORE-OPEN STATE   */
@starting-style {
  [popover]:popover-open {
    translate: 0 -22rem;
  }
}
```

```js
fetch('./api/some.json')
  .then(response => {
    if (response.status !== 200) {
      console.log(`Looks like there was a problem. Status Code: ${response.status}`);

      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      console.log(data);
    });
  })
  .catch(err => {
    console.log('Fetch Error :-S', err);
  });
```

after

and testing inline `const evie = 4{:js}` code here
