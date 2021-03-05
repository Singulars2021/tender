<template>
  <ion-list class="ion-padding">
    <ion-item>
      <ion-avatar slot="start">
        <ion-icon :icon="personOutline" class="forward" color="dark"></ion-icon>
      </ion-avatar>
      <ion-label>
        <ion-text><h2>Nombre</h2></ion-text>  
        <ion-text color="primary">{{user.name}}</ion-text>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-avatar slot="start">
        <ion-icon :icon="mailOutline" class="forward" color="dark"></ion-icon>
      </ion-avatar>
      <ion-label>
        <ion-text><h2>Correo Electrónico</h2></ion-text> 
        <router-link :to="'mailto:'+user.email">{{user.email}}</router-link>
      </ion-label>
    </ion-item>
    <ion-item v-if="user.phoneNumber">
      <ion-avatar slot="start">
        <ion-icon :icon="callOutline" class="forward" color="dark"></ion-icon>
      </ion-avatar>
      <ion-label>
        <ion-text><h2>Número de Teléfono</h2></ion-text> 
        <router-link :to="'tel:'+user.phoneNumber">{{user.phoneNumber}}</router-link>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonText,
  toastController,
} from "@ionic/vue";
import { personOutline, mailOutline, callOutline } from "ionicons/icons";

export default {
  props: ["user"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonAvatar,
    IonText,
  },
  data() {
    return {
      error: null,
      personOutline,
      mailOutline,
      callOutline
    };
  },
  methods: {
    async openToast(msg, response) {
      const toast = await toastController.create({
        message: msg,
        response: response,
        duration: 3000,
        color: response.ok ? "success" : "danger",
      });
      return toast.present();
    },
  },
};
</script>

<style scoped>
ion-avatar{
  display: flex;
  align-items: center;
  margin-right: 0;
}
.forward {
  width: 1.5rem;
  height: 1.5rem;
}
</style>