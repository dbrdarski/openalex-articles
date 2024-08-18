import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import localStores from './modules/localStores'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(localStores)

app.mount('#app')
