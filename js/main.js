import { createGreeting } from './components/greeting.js';

const app = document.getElementById('app');
if (app) {
  app.appendChild(createGreeting('Hello'));
}
