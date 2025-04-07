class ThemePicker extends HTMLElement {
  constructor() {
    super();
    let initialAppearance = globalThis.theme.appearance.get();
    document
      .querySelector(`input[name=appearance][value=${initialAppearance}]`)
      ?.setAttribute("checked", "");

    let initialColor = globalThis.theme.color.get();
    document
      .querySelector(`input[name=color][value=${initialColor}]`)
      ?.setAttribute("checked", "");
  }

  connectedCallback() {
    // Handle expanding/collapsing the color picker through the <form>
    this.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.name === "color") {
        const value = e.target.value;
        if (value !== globalThis.theme.color.get()) {
          globalThis.theme.color.set(value);
        }
      }

      if (e.target.name === "appearance") {
        const value = e.target.value;
        if (value !== globalThis.theme.appearance.get()) {
          globalThis.theme.appearance.set(value);
        }
      }
    });
  }
}
customElements.define("theme-picker", ThemePicker);
