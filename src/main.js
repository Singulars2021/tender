import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import ContentContainer from './ui/ContentContainer.vue'

import { IonicVue } from '@ionic/vue';

import firebase from "firebase/app"




/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';
import './theme/typography.css';
import './theme/padding.css'
import './theme/customInterface.css'

// const app = createApp(App)
//   .use(IonicVue)
//   .use(router)
//   .use(store);

// app.component('content-container', ContentContainer);


// router.isReady().then(() => {
//   app.mount('#app');
// });




let app = '';


firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const payload = {
      id: user.uid,
      email: user.email,
      name: user.displayName
    }
    await store.dispatch("setLoggedUser", payload)

    await store.dispatch("loadUsers")
    await store.dispatch("getAnimals")

  }
  if (!app) {
    app = createApp(App)
      .use(IonicVue)
      .use(router)
      .use(store);
    app.component('content-container', ContentContainer);
    
    router.isReady().then(() => {
      app.mount('#app');
    })
  }
});


router.beforeEach(async (to, from, next) => {
  if (to.name == 'login' && await store.getters.getLoggedUser) next({ name: 'slider' })
  else next()
})
