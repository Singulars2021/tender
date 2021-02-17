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
      <log-in></log-in>
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

import LogIn from "@/components/LogInComponent.vue";

export default {
  name: "sign-in",
  components: {
    LogIn,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
};
</script>