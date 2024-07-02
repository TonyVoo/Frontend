import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

store.actions.initialize();
store.actions.logout();

app.use(router).mount('#app')
