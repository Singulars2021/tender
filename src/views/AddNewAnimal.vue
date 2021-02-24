<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <back-button href="/animals/slider"></back-button>
        <ion-title>Tu mascota</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <animal-form></animal-form>
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

import AnimalForm from "@/components/AnimalForm.vue";
import BackButton from '../ui/BackButton.vue';

export default {
  name: "add-new-animal",
  components: {
    AnimalForm,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    BackButton,
  },
}
</script>

<style scoped>

</style>
