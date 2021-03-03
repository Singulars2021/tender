<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Forgot password</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Forgot Password</ion-title>
        </ion-toolbar>
      </ion-header>
      <forgot-component></forgot-component>
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


import ForgotComponent from "@/components/ForgotComponent.vue";



export default {
  name: "forgot-password",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    ForgotComponent
  },
};
</script>