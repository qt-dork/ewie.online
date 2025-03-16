import { Component, html, css, signal } from 'https://unpkg.com/minne';

class CardFrame extends Component {
	/** @type { "runner" | "corp" } */
	side = this.getAttribute("side");
	/** @type { string } */
	src = this.getAttribute("src");
	/** @type { number } */
	rating = this.getAttribute("stars");

  flipped = signal(false);
  xpos = signal(0);
  ypos = signal(0);

	static css = css`
		.disclaimer {
			display: flex;
			justify-content: center;

			width: 100%;

			font-size: smaller;
			font-style: italic;
			text-align: center;
		}

    .disclaimer, .flip-card {
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
      filter: drop-shadow(.125rem .25rem 4px rgba(0 0 0 / 25%));
      cursor: pointer;
    }

    .flip-card {
      perspective: 1000px;

      display: flex;
      justify-content: center;
    }

		.card, .card img {
			aspect-ratio: 0.718;
			width: 320px;
		}

    .back {
      transform: rotateY(0deg);
    }

    .front {
      transform: rotateY(180deg);
    }

    .flipped {
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
      font-size: 3.5em;

			.visible {
				animation: jumpin 0.9s linear(0, 0.03 1.5%, 0.121 3.2%, 0.851 13%, 0.99 16.4%, 1.063 20.2%, 1.076 22.3%, 1.075 24.8%, 1.013 35.9%, 0.995 43.4%, 1) backwards;
        animation-delay: .5s;
			}

      .hidden {
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
			animation-delay: .5s;
		}

		.star:nth-child(2) {
			animation-delay: .75s;
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
			color: #DFA50F;
		}

		.gray {
			color: #171A1E;
		}

		#card-name {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}
	`

  render() {
    return html`
		<span aria-hidden="true" class="disclaimer">(This card is interactive! Click or tap on it!)</span>
    <div aria-describedby="card-name" class="flip-card">
      <div class="wrapper" id="transformer">
        <div class="card ${this.flipped.value ? "flipped" : ""}" onclick=${() => this.flipped.value = !this.flipped.value}>
          <img class="side front" src="${this.src}"/>
          <img class="side back" src="https://cdn.ewie.online/nsg-${this.side}.png"/>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="stars">
			${[...Array(5).keys()].map((x => {
				return html`
				<div class="star ${x < this.rating ? "gold" : "gray"} ${this.flipped.value ? "visible" : "hidden"}">★</div>
				`
			}))}
		</div>
		<div id="card-name">
			<slot></slot>
		</div>
    `;
  }
}

CardFrame.define('card-frame');
