<template>
  <ion-page>
    <ion-header>
    </ion-header>
    <ion-content>
      <first-steps-comp></first-steps-comp>
    </ion-content>
  </ion-page>
</template>

<script>
import FirstStepsComp from "@/components/FirstStepsComp.vue";
import { IonPage, IonHeader, IonContent } from "@ionic/vue";

export default {
  name: "search-animal",
  components: {
    FirstStepsComp,
    IonHeader,
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