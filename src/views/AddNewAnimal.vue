<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
       <ion-buttons slot="start">
          <ion-button>
            <ion-icon :icon="chevronBackOutline" ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Tu mascota</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon :icon="chevronBackOutline" ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-toolbar>
          <ion-title size="large">Tu mascota</ion-title>
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
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/vue";

import AnimalForm from "@/components/AnimalForm.vue";

import { chevronBackOutline } from "ionicons/icons";

export default {
  name: "add-new-animal",
  components: {
    AnimalForm,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonButton,
    IonIcon
  },
  data() {
    return {
     chevronBackOutline,
    }
  }
}
</script>
<style scoped>

</style>
