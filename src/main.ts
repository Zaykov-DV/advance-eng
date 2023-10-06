import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";

import router from './router'

const pinia = createPinia()

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCheck, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add([faCheck, faTrashCan, faXmark])


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(pinia).use(router).mount('#app')
