<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <back-button href="/animals/slider"></back-button>
        <ion-title>Ajustes búsqueda</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <search-settings></search-settings>
    </ion-content>
  </ion-page>
</template>

<script>
import SearchSettings from "@/components/SearchSettings.vue";
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar } from "@ionic/vue";
import BackButton from '../ui/BackButton.vue';

export default {
  name: "search-animal",
  components: {
      SearchSettings,
    IonHeader,
    IonTitle,
    IonContent,
    IonPage,
    BackButton,
    IonToolbar
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>