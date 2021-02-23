<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <admin-your-animals></admin-your-animals>
    </ion-content>
  </ion-page>
</template>

<script>
import AdminYourAnimals from "../components/AdminYourAnimals.vue";
import { IonContent, IonPage } from "@ionic/vue";

export default {
  components: {
    AdminYourAnimals,
    IonContent,
    IonPage,
  },
};
</script>

<style>
</style>