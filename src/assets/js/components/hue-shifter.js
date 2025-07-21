import {html, css, LitElement} from 'npm:lit';
import 'https://cdn.jsdelivr.net/npm/range-slider-element@2/+esm';

export class HueShifter extends LitElement {
  static styles = css`
    .builder {
      --shift: l c calc(h - 135);
      --tone-one: light-dark(oklch(from var(--primary) var(--shift)),
    var(--primary));
      --tone-two: light-dark(var(--primary),
    oklch(from var(--primary) var(--shift)));
      --color: 0.5288 0.0438 h;

      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(4, 1fr);
      max-width: 100%;
      border-radius: var(--space-xs);
      overflow: clip;
    }

    .container {
      container-type: inline-size;
    }

    figure {
      margin: 0;
    }
    @container (400px <= width) {
      figure {
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
    value: {type: Number, reflect: true},
  };

  constructor() {
    super();
    this.value = 180;
  }

  render() {
    return html`
    <div class="container">
    <figure>
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
            @input="${(e) => (this.value = e.target.valueAsNumber)}"/>
        </div>
      </aside>
      <!-- lol here's some dogshit code -->
      <section class="builder" style=" --primary: oklch(from #fff l c ${this.value});">
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a0));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a1));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a2));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a3));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a4));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a5));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a6));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--a7));"></div>

        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b0));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b1));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b2));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b3));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b4));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b5));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b6));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-one) var(--b7));"></div>

        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c0));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c1));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c2));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c3));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c4));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c5));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c6));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--c7));"></div>

        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d0));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d1));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d2));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d3));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d4));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d5));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d6));"></div>
        <div style="aspect-ratio: 1; background-color: oklch(from var(--tone-two) var(--d7));"></div>
      </div>
    </figure>
  </div>
    `;
  }
}
customElements.define('hue-shifter', HueShifter);
