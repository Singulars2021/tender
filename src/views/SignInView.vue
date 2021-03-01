<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Sign In</ion-title>
        </ion-toolbar>
      </ion-header>
      <sign-in-component></sign-in-component>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

import SignInComponent from "@/components/SignInComponent.vue";
import {getCurrentUser} from '../firebaseConfig.js';
import store from '../store/index.js';


export default {
  data(){
    return {
      user: undefined
    }
  },
  name: "sign-in",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    SignInComponent
  },
  async created(){
    this.user = await getCurrentUser();
  },
  async beforeRouteEnter (to, from, next){
      const user = await store.dispatch("getUser")
      if (to.name == 'login' && user) next({ name: 'slider' });
      else next();
  }
};
</script>