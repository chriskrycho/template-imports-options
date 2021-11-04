import Component, { hbs } from "@glimmer/component";

const Greeting = hbs`<p>Hello, {{@name}}</p>`;

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

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    now.getDate() === dateOfBirth.getDate() &&
    now.getMonth() === dateOfBirth.getMonth()
  );
}

const Summary = hbs`
  <Greeting @name={{@user.name}} />
  {{#if (isBirthday @user.dob)}}
    <p>Happy birthday!</p>
  {{/if}}
  <WeatherSummary />
`;

export default Summary;
