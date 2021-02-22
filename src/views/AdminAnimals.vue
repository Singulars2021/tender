<template>
  <ion-page>
    <ion-header>
      <ion-item>
        <ion-avatar slot="start">
          <img src="/assets/avatar.png" />
        </ion-avatar>
        <ion-label>
          <h2>Tu nombre</h2>
          <p>Ver mi perfil</p>
        </ion-label>
        <ion-button>
          <ion-icon :icon="chevronForwardOutline" />
        </ion-button>
      </ion-item>
      <ion-button type="submit" expand="block" fill="solid"
        >Ajustes búsqueda</ion-button
      >
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Tus animales</h1>
      <ion-button>
        <ion-icon :icon="chevronForwardOutline" />
      </ion-button>
    </ion-content>
    <ion-button>
      <ion-icon :icon="addCircleOutline" />
    </ion-button>
  </ion-page>
</template>

<script>
import { chevronForwardOutline, addCircleOutline } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonIcon,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonContent,
} from "@ionic/vue";
export default {
  data() {
    return {
      chevronForwardOutline,
      addCircleOutline,
    };
  },
  name: "admin-animals",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonIcon,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
  },
};
</script>

<style scoped>
</style>