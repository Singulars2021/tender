<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Sign Up</ion-title>
        </ion-toolbar>
      </ion-header>
      <sign-up></sign-up>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/vue";

import SignUp from "@/components/SignUp.vue";

export default {
  name: "sing-up",
  components: {
    SignUp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
};
</script>