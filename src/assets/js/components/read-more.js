const readMoreValues = ["none", "overflow", "break"];
/** @typedef {"none" | "overflow" | "break"} ReadMoreValues */

export default class ReadMore extends HTMLElement {
  static tagName = "read-more";
  /** @type boolean */ #expanded;

  get readMore() {
    const strVal = readMoreValues.includes(this.dataset.readMore)
      ? this.dataset.readMore
      : "none";
    return strVal;
  }

  set readMore(value) {
    this.dataset.readMore = value;
  }

  get expanded() {
    return this.#expanded;
  }
  set expanded(value) {
    console.log(value);
    this.#expanded = value;
    this.dataset.expanded = value;
    console.log(this.dataset);
  }

  static get observedAttributes() {
    return ["data-read-more", "data-expanded"];
  }

  constructor() {
    super();
    this.#expanded = false;
  }

  connectedCallback() {
    const prose = this.querySelector("post-body");
    const readMoreButton = this.querySelector("read-more-button button");
    if (this.readMore === "none") {
      console.log(this.expanded);
      const observer = new ResizeObserver(() => {
        const postHeight = this.offsetHeight;
        const prevState = this.readMore;
        const shouldCollapse = postHeight > window.innerHeight * 2;
        if (shouldCollapse && prevState === "none") {
          this.readMore = "overflow";
          this.expanded = false;
        } else if (shouldCollapse === false && prevState === "overflow") {
          this.readMore = "none";
        }
      });
      observer.observe(prose);
    }
    readMoreButton.addEventListener("click", () => {
      if (this.expanded === true) {
        const buttonFromTop = readMoreButton.getBoundingClientRect().top;
        this.expanded = false;
        readMoreButton.textContent = "read more";

        const newButtonPos = window.scrollY +
          readMoreButton.getBoundingClientRect().top;
        window.scrollTo({ top: newButtonPos - buttonFromTop });
      } else {
        this.expanded = true;
        readMoreButton.textContent = "read less";
      }
    });
  }
}

if ("customElements" in window) {
  window.customElements.define(ReadMore.tagName, ReadMore);
}
