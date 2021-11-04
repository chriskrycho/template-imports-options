import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import Component from "@glimmer/component";
import { templateOnly } from "@ember/component/template-only";
import { tracked } from "@glimmer/tracking";

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
}

setComponentTemplate(
  precompileTemplate(`
    <p>The temperature is {{this.currentTemp}}</p>
  `),
  WeatherSummary
);

const Greeting = setComponentTemplate(
  precompileTemplate(`<p>Hello, {{@name}}</p>`),
  templateOnly()
);

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    now.getDate() === dateOfBirth.getDate() &&
    now.getMonth() === dateOfBirth.getMonth()
  );
}

const Summary = setComponentTemplate(
  precompileTemplate(
    `
    <Greeting @name={{@user.name}} />
    {{#if (isBirthday @user.dob)}}
      <p>Happy birthday!</p>
    {{/if}}
    <WeatherSummary />
  `,
    { scope: { Greeting, WeatherSummary, isBirthday } }
  ),
  templateOnly()
);

export default Summary;
