import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import { createI18n } from 'vue-i18n'
import messages from  './languages.json'
import './assets/css/normalize.css'
import './assets/css/animate.min.css'
import './assets/css/app.scss'



const getBrowserLanguage = () => {

    if(navigator.language.search('es') > -1)
    {      
        return 'ESP_AR';

    }else if(navigator.language.search('en') > -1){

        return 'ENG_US';

    }
}

const i18n = createI18n({
    legacy: false,
    locale: getBrowserLanguage(), // set locale
    fallbackLocale: 'ENG_US', // set fallback locale
    messages, // set locale messages

})  

console.log('App init..');



createApp(App)
.use( store )
.use( router )
.use( i18n )
.mount('#app')
