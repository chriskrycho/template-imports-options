import Component from "@glimmer/component";

const Greeting = <Template>
  <p>Hello, {{@name}}</p>
</Template>;

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

  getMeSomeDynamicTemplate() {
    return this.someCondition? hbs`...` : hbs`...`;
  }

  <template>
    <p>The temperature is {{this.currentTemp}}</p>
  </template>
}

const NestedTemplates = <Template>
  <template>
    <p>WHEEEEE</p>
  </template>
</Template>

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    now.getDate() === dateOfBirth.getDate() &&
    now.getMonth() === dateOfBirth.getMonth()
  );
}

const Summary = <Template lang='sveltebars'>
  <Greeting @name={@user.name} />

  {#if isBirthday(@user.dob)}
    <p>Happy birthday!</p>
  {/if}

  <WeatherSummary />
</Template>

export default Summary;
