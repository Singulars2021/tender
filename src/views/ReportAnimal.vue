<template>
  <ion-page>
    <ion-header>
      <ion-title size="large">Report Animal</ion-title>
    </ion-header>
    <ion-content>
        <report-form :animalId="$route.params.id" ></report-form>
    </ion-content>
  </ion-page>
</template>

<script>
import ReportForm from "@/components/ReportForm.vue";
import { IonPage, IonHeader, IonTitle, IonContent } from "@ionic/vue";

export default {
  name: "search-animal",
  components: {
    ReportForm,
    IonHeader,
    IonTitle,
    IonContent,
    IonPage,
  }
};
</script>

<style scoped>
</style>