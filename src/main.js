import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import ContentContainer from './ui/ContentContainer.vue'

import { IonicVue } from '@ionic/vue';

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

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

app.component('content-container', ContentContainer);

//import { Vue } from "vue";
import * as Sentry from "@sentry/vue";
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
//  Vue,
  dsn: "https://cf0cdab317fa45d1b4223b39de247440@o538047.ingest.sentry.io/5657631",
  integrations: [new VueIntegration({ Vue: app })],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});


router.isReady().then(() => {
  app.mount('#app');
});