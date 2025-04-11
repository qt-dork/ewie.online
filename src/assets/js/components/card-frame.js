import { css, html, LitElement } from "npm:lit";
import { signal, watch } from "npm:@lit-labs/preact-signals";

export class CardFrame extends LitElement {
  static properties = {
    name: { type: String },
    src: { type: String },
    stars: { type: Number },
    side: { type: String },
    flipped: {},
  };

  flipped = signal(false);

  constructor() {
    super();
    this.stars = 0;
  }

  static styles = css`
    .disclaimer {
      display: flex;
      justify-content: center;

      width: 100%;

      font-size: smaller;
      font-style: italic;
      text-align: center;
    }

    .disclaimer,
    .flip-card {
      margin-block-end: 1em;
      margin-block-start: 1em;
    }

    .stars {
      margin-block-start: 1rem;
      margin-block-start: 1rem;
    }

    .card {
      display: grid;
      transition-duration: 0.6s;
      transition-timing-function: ease-in-out;
      transform-style: preserve-3d;
    }

    .wrapper {
      filter: drop-shadow(0.125rem 0.25rem 4px var(--color-shadow));
      /* filter: drop-shadow(
          0.3px 0.5px 0.7px oklch(from var(--color-shadow) l c h / 0.36)
        )
        drop-shadow(
          0.8px 1.6px 2px -0.8px oklch(from var(--color-shadow) l c h / 0.36)
        )
        drop-shadow(
          2.1px 4.1px 5.2px -1.7px oklch(from var(--color-shadow) l c h / 0.36)
        )
        drop-shadow(
          5px 10px 12.6px -2.5px oklch(from var(--color-shadow) l c h / 0.36)
        ); */
      cursor: pointer;
    }

    .flip-card {
      perspective: 1000px;

      display: flex;
      justify-content: center;
    }

    .card,
    .card img {
      aspect-ratio: 0.718;
      border-radius: 4.55% / 3.5%;
      width: 320px;
    }

    .back {
      transform: rotateY(0deg);
    }

    .front {
      transform: rotateY(180deg);
    }

    .flipped-true {
      transform: rotateY(180deg);
    }

    .side {
      grid-row: 1/2;
      grid-column: 1/2;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .stars {
      display: flex;
      justify-content: center;
      font-size: 3em;

      .visible-true {
        animation: jumpin 0.9s
          linear(
            0,
            0.03 1.5%,
            0.121 3.2%,
            0.851 13%,
            0.99 16.4%,
            1.063 20.2%,
            1.076 22.3%,
            1.075 24.8%,
            1.013 35.9%,
            0.995 43.4%,
            1
          )
          backwards;
        animation-delay: 0.5s;
      }

      .visible-false {
        opacity: 0;
      }
    }

    @keyframes jumpin {
      0% {
        opacity: 0;
        transform: scale(0.4);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .star {
      text-box-trim: trim-both;
    }

    .star:nth-child() {
      animation-delay: 0.5s;
    }

    .star:nth-child(2) {
      animation-delay: 0.75s;
    }

    .star:nth-child(3) {
      animation-delay: 1s;
    }

    .star:nth-child(4) {
      animation-delay: 1.25s;
    }

    .star:nth-child(5) {
      animation-delay: 1.5s;
    }

    .gold {
      color: #dfa50f;
    }

    .gray {
      color: #171a1e;
    }

    .visually-hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  `;

  render() {
    return html`
      <span aria-hidden="true" class="disclaimer"
        >(This card is interactive! Click or tap on it!)</span
      >
      <div aria-describedby="card-name-${this.name}" class="flip-card">
        <div class="wrapper" id="transformer">
          <div class="card flipped-${watch(this.flipped)}" @click=${this._flip}>
            <img class="side front" src="${this.src}" />
            <img
              class="side back"
              src="https://cdn.ewie.online/nsg-${this.side}.png"
            />
          </div>
        </div>
      </div>
      <div aria-hidden="true" class="stars">
        ${[...Array(5).keys()].map((x) => {
          return html`
            <div
              class="star ${x < this.stars ? "gold" : "gray"} visible-${watch(
                this.flipped
              )}"
            >
              ★
            </div>
          `;
        })}
      </div>
      <!-- <div class="visually-hidden" id="card-name"> -->
      <slot></slot>
      <!-- </div> -->
    `;
  }

  _flip(_e) {
    this.flipped.value = !this.flipped.value;
  }
}

customElements.define("card-frame", CardFrame);
