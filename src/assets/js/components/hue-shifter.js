import { css, html, LitElement } from "npm:lit@^3.0.0";
import "https://cdn.jsdelivr.net/npm/range-slider-element@2/+esm";

export class HueShifter extends LitElement {
  static styles = css`
    .builder {
      --shift: l c calc(h - 135);
      --tone-one: light-dark(
        oklch(from var(--primary) var(--shift)),
        var(--primary)
      );
      --tone-two: light-dark(
        var(--primary),
        oklch(from var(--primary) var(--shift))
      );
      --color: 0.5288 0.0438 h;

      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(4, 1fr);
      max-width: 100%;
      border-radius: var(--space-xs);
      overflow: clip;
    }

    .builder > div {
      display: grid;
      place-content: center;
      aspect-ratio: 1;
    }

    .container {
      container-type: inline-size;
    }

    .grid {
      margin: 0;
    }
    @container (400px <= width) {
      .grid {
        display: grid;
        grid-template-columns: 3em 1fr;
        grid-template-areas: "picker" "graph";
      }
    }

    @container (400px <= width) {
      .inputs {
        transform-origin: top right;
        transform: translate(-100%) rotate(-90deg);
        /* width: calc(100vmin - 12vw); */
        height: 100%;
        aspect-ratio: 1;
      }
    }

    #hue {
      width: 100%;
    }
    .value {
      float: right;
    }
  `;

  static properties = {
    value: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.value = 180;
  }

  render() {
    return html`
      <div class="container">
        <div class="grid">
          <aside id="range">
            <div class="inputs">
              <label for="hue">Hue</label>
              <span class="value">${this.value}</span>
              <input
                type="range"
                id="hue"
                name="hue"
                min="0"
                max="360"
                .value="${this.value}"
                @change="${(e) => (this.value = e.target.valueAsNumber)}"
                @input="${(e) => (this.value = e.target.valueAsNumber)}"
              />
            </div>
          </aside>
          <!-- lol here's some dogshit code -->
          <section
            class="builder"
            style="--primary: oklch(from #fff l c ${this.value});"
          >
            <div
              style="background-color: oklch(from var(--tone-one) var(--a0)); color: oklch(from var(--tone-two) var(--50));"
            >
              a0
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a1)); color: oklch(from var(--tone-two) var(--50));"
            >
              a1
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a2)); color: oklch(from var(--tone-two) var(--50));"
            >
              a2
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a3)); color: oklch(from var(--tone-two) var(--50));"
            >
              a3
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a4)); oklch(from var(--tone-two) var(--800));"
            >
              a4
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a5)); oklch(from var(--tone-two) var(--800));"
            >
              a5
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a6)); oklch(from var(--tone-two) var(--800));"
            >
              a6
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--a7)); oklch(from var(--tone-two) var(--800));"
            >
              a7
            </div>

            <div
              style="background-color: oklch(from var(--tone-one) var(--b0)); color: oklch(from var(--tone-two) var(--50));"
            >
              b0
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b1)); color: oklch(from var(--tone-two) var(--50));"
            >
              b1
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b2)); color: oklch(from var(--tone-two) var(--50));"
            >
              b2
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b3)); color: oklch(from var(--tone-two) var(--50));"
            >
              b3
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b4)); color: oklch(from var(--tone-two) var(--800));"
            >
              b4
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b5)); color: oklch(from var(--tone-two) var(--800));"
            >
              b5
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b6)); color: oklch(from var(--tone-two) var(--800));"
            >
              b6
            </div>
            <div
              style="background-color: oklch(from var(--tone-one) var(--b7)); color: oklch(from var(--tone-two) var(--800));"
            >
              b7
            </div>

            <div
              style="background-color: oklch(from var(--tone-two) var(--c0)); color: oklch(from var(--tone-one) var(--50));"
            >
              c0
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c1)); color: oklch(from var(--tone-one) var(--50));"
            >
              c1
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c2)); color: oklch(from var(--tone-one) var(--50));"
            >
              c2
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c3)); color: oklch(from var(--tone-one) var(--50));"
            >
              c3
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c4)); color: oklch(from var(--tone-one) var(--800));"
            >
              c4
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c5)); color: oklch(from var(--tone-one) var(--800));"
            >
              c5
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c6)); color: oklch(from var(--tone-one) var(--800));"
            >
              c6
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--c7)); color: oklch(from var(--tone-one) var(--800));"
            >
              c7
            </div>

            <div
              style="background-color: oklch(from var(--tone-two) var(--d0)); color: oklch(from var(--tone-one) var(--50));"
            >
              d0
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d1)); color: oklch(from var(--tone-one) var(--50));"
            >
              d1
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d2)); color: oklch(from var(--tone-one) var(--50));"
            >
              d2
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d3)); color: oklch(from var(--tone-one) var(--50));"
            >
              d3
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d4)); color: oklch(from var(--tone-one) var(--800));"
            >
              d4
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d5)); color: oklch(from var(--tone-one) var(--800));"
            >
              d5
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d6)); color: oklch(from var(--tone-one) var(--800));"
            >
              d6
            </div>
            <div
              style="background-color: oklch(from var(--tone-two) var(--d7)); color: oklch(from var(--tone-one) var(--800));"
            >
              d7
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
customElements.define("hue-shifter", HueShifter);
