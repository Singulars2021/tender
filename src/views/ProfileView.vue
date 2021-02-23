<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile Page</ion-title>
        </ion-toolbar>
      </ion-header>
      <profile-component></profile-component>
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

import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
  name: "profile-page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    ProfileComponent
  },
};


</script>