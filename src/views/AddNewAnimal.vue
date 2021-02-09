<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add New Animal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add New Animal</ion-title>
        </ion-toolbar>
      </ion-header>
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

export default {
  name: "add-new-animal",
  components: {
    AnimalForm,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
};
</script>