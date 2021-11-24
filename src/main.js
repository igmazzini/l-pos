import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'

import './assets/css/normalize.css'
import './assets/css/app.scss'


createApp(App)
.use( store )
.use( router )
.mount('#app')
