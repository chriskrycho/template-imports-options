import Component, { hbs } from "@glimmer/component";

class WeatherSummary extends Component {
  @tracked currentTemp;

  interval;

  getCurrentTemp = () => {
    this.currentTemp = Math.random() * 100;
  };

  constructor(owner, args) {
    super(owner, args);
    this.interval = setInterval(this.getCurrentTemp, 10_000);
  }

  willDestroy() {
    clearInterval(this.interval);
  }

  static template = hbs`<p>The temperature is {{this.currentTemp}}</p>`;
}
