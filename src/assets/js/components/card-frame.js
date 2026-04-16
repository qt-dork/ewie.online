import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

export default class CardFrame extends Elena(HTMLElement) {
  static tagName = "card-frame";
  static props = ["name", "src", "stars", "side", "back", "flipped"];
  name = "";
  src = "";
  stars = 0;
  /** @property @type {"corp" | "runner"} */
  side = "corp";
  back = "";
  flipped = false;

  firstUpdated() {
    this.querySelector("#flipper").addEventListener("click", () => {
      this.flipped = !this.flipped;
    });
  }

  render() {
    return html`
      <nr-disclaim-interactivity aria-hidden="true">
        (This card is interactive! Click or tap it!)
      </nr-disclaim-interactivity>
      <nr-card-flipper aria-describedby="card-name-${this.name}">
        <nr-card-wrapper id="transformer">
          <button ${this.flipped ? "flipped" : ""} id="flipper">
            <img class="side front" src="${this.src}" />
            <img class="side back" src="${this.back === ""
              ? `https://cdn.ewie.online/nsg-${this.side}.png`
              : this.back}" />
          </button>
        </nr-card-wrapper>
      </nr-card-flipper>
      <nr-star-counter>
        ${[...Array(5).keys()].map((x) => {
          return html`
            <nr-star ${x < this.stars ? "accented" : ""} ${this.flipped
              ? "visible"
              : ""} style="--delay: ${0.5 + (x * 0.25)}s">
              ★
            </nr-star>
          `;
        })}
      </nr-star-counter>
      <slot></slot>
    `;
  }
}

CardFrame.define();
