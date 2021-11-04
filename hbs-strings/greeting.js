import { hbs } from "@glimmer/component";

const GREETING = "Hello";

export default hbs`<p>${GREETING}, {{@name}}</p>`;
