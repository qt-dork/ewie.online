/**
 * Copied from https://github.com/chrisburnell/relative-time
 *
 * MIT License
 *
 * Copyright (c) 2024 Chris Burnell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export default class RelativeTime extends HTMLElement {
  static define(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "relative-time", RelativeTime);
    }
  }

  static observedAttributes = [
    "lang",
    "update",
    "division",
    "max-division",
    "format-numeric",
    "numeric-format",
    "format-style",
    "style-format",
  ];

  connectedCallback() {
    if (this.timeElements.length === 0) {
      return;
    }

    this.lastUpdate = 0;
    this.updateLoop;

    this.setString();

    if (this.enableUpdates && typeof requestAnimationFrame === "function") {
      this.beginUpdateLoop();
      const { signal } = (this.controller = new AbortController());
      window.addEventListener(
        "focus",
        () => {
          this.windowFocusHandler();
        },
        { signal },
      );
      window.addEventListener(
        "blur",
        () => {
          this.windowBlurHandler();
        },
        { signal },
      );
    }

    if (typeof MutationObserver === "function") {
      this.observer = new MutationObserver(
        this.handleMutations.bind(this),
      );
      this.observeDateTimes();
    }
  }

  attributeChangedCallback() {
    this.setString();
  }

  disconnectedCallback() {
    if (this.controller) {
      this.controller.abort();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  observeDateTimes() {
    this.timeElements.forEach((timeElement) => {
      this.observer.observe(timeElement, {
        attributes: true,
        attributeFilter: ["datetime"],
      });
    });
  }

  handleMutations() {
    this.setString();
  }

  getRelativeTime(datetime, division) {
    let difference = (datetime.getTime() - Date.now()) / 1000;

    if (division) {
      return this.rtf.format(Math.trunc(difference), division);
    }

    for (const division of RelativeTime.divisions) {
      if (
        this.maxDivision &&
        division.name === this.maxDivision.replace(/s$/, "")
      ) {
        return this.rtf.format(Math.trunc(difference), division.name);
      }
      if (Math.floor(Math.abs(difference)) < division.amount) {
        return this.rtf.format(Math.trunc(difference), division.name);
      }
      difference /= division.amount;
    }
  }

  getDateTime(dateString) {
    const datetime = new Date(dateString);
    return !isNaN(datetime) ? datetime : null;
  }

  setString() {
    this.timeElements.forEach((element) => {
      const datetime = this.getDateTime(element.getAttribute("datetime"));
      if (!datetime) {
        return;
      }
      element.innerHTML = this.getRelativeTime(datetime, this.division);
      const title = datetime.toLocaleString(undefined, {
        timeZoneName: "short",
      });
      if (element.title !== title) {
        element.title = title;
      }
    });
  }

  beginUpdateLoop() {
    const updateLoop = (currentTime) => {
      this.updateLoop = requestAnimationFrame(updateLoop);
      if (currentTime - this.lastUpdate >= this.update * 1000) {
        this.setString();
        this.lastUpdate = currentTime;
      }
    };
    this.updateLoop = requestAnimationFrame(updateLoop);
  }

  stopUpdateLoop() {
    this.lastUpdate = 0;
    cancelAnimationFrame(this.updateLoop);
  }

  windowFocusHandler() {
    this.setString();
    this.beginUpdateLoop();
  }

  windowBlurHandler() {
    this.stopUpdateLoop();
  }

  static divisions = [
    {
      amount: 60,
      name: "second",
    },
    {
      amount: 60,
      name: "minute",
    },
    {
      amount: 24,
      name: "hour",
    },
    {
      amount: 7,
      name: "day",
    },
    {
      amount: 4.34524,
      name: "week",
    },
    {
      amount: 12,
      name: "month",
    },
    {
      amount: Number.POSITIVE_INFINITY,
      name: "year",
    },
  ];

  static numericFormats = ["always", "auto"];

  static styleFormats = ["long", "short", "narrow"];

  get locale() {
    return (
      this.getAttribute("lang") ||
      this.closest("[lang]")?.getAttribute("lang") ||
      undefined
    );
  }

  get rtf() {
    return new Intl.RelativeTimeFormat(this.locale, {
      localeMatcher: "best fit",
      numeric: this.formatNumeric,
      style: this.formatStyle,
    });
  }

  get timeElements() {
    return this.querySelectorAll("time[datetime]");
  }

  get division() {
    return this.getAttribute("division");
  }

  get maxDivision() {
    return this.getAttribute("max-division");
  }

  get formatNumeric() {
    // default = "auto"
    const numericFormat = this.getAttribute("format-numeric") ||
      this.getAttribute("numeric-format");
    if (
      numericFormat &&
      RelativeTime.numericFormats.includes(numericFormat)
    ) {
      return numericFormat;
    } else if (this.division || this.maxDivision) {
      return "always";
    }
    return "auto";
  }

  get formatStyle() {
    // default = "long"
    const styleFormat = this.getAttribute("format-style") ||
      this.getAttribute("style-format");
    if (styleFormat && RelativeTime.styleFormats.includes(styleFormat)) {
      return styleFormat;
    }
    return "long";
  }

  get update() {
    // default = 600 seconds = 10 minutes
    return this.hasAttribute("update")
      ? Number(this.getAttribute("update"))
      : 600;
  }

  get enableUpdates() {
    return this.getAttribute("update") !== "false";
  }
}

if (!new URL(import.meta.url).searchParams.has("nodefine")) {
  RelativeTime.define();
}
