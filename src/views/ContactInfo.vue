<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <back-button href="/animals/slider"></back-button>
        <ion-title>Contacto</ion-title>
      </ion-toolbar> 
    </ion-header>
    <ion-content>
        <contact-info-component :user="$store.getters.getUserById($route.params.idUser)"></contact-info-component>
    </ion-content>
  </ion-page>
</template>

<script>
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar } from "@ionic/vue";
import BackButton from '../ui/BackButton.vue';

export default {
  name: "search-animal",
  components: {
    ContactInfoComponent,
    IonHeader,
    IonTitle,
    IonContent,
    IonPage,
    BackButton,
    IonToolbar,
  },
  data() {
    return {};
  },
  ionViewWillEnter(){
    console.log("user:", this.$route.params)
  }
};
</script>

<style scoped>
</style>