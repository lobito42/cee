import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';

const wurzel = document.getElementById('app');
if (wurzel) {
  wurzel.dataset.muster = 'Arbeitsflaeche';
}
document.documentElement.dataset.bereit = '1';
