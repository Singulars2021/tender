<template>
  <ion-page>
    <ion-header>
      <ion-title size="large">Ajustes</ion-title>
    </ion-header>
    <ion-content>
        <search-settings></search-settings>
    </ion-content>
  </ion-page>
</template>

<script>
import SearchSettings from "@/components/SearchSettings.vue";
import { IonPage, IonHeader, IonTitle, IonContent } from "@ionic/vue";

export default {
  name: "search-animal",
  components: {
      SearchSettings,
    IonHeader,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>