import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { glitch } from './directives/glitch.js';

const app = createApp(App);

app.directive('glitch', glitch);


// app.directive('glitch', {
//     beforeMount(el) {
//         el.addEventListener('mouseover', () => {
//             el.classList.add('glitch');
//             // el.setAttribute('data-text', el.textContent);
//         });

//         el.addEventListener('mouseout', () => {
//             el.classList.remove('glitch');
//         });
//     }
// });

app.mount('#app')