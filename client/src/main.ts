import { greeting } from './app';

const root = document.getElementById('app');
if (root) {
  root.textContent = greeting();
}
