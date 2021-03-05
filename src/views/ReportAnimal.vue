<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <back-button href="/animals/slider"></back-button>
        <ion-title>Denunciar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <report-form :animalId="$route.params.id" ></report-form>
    </ion-content>
  </ion-page>
</template>

<script>
import ReportForm from "@/components/ReportForm.vue";
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar } from "@ionic/vue";
import BackButton from "../ui/BackButton.vue";

export default {
  name: "search-animal",
  components: {
    ReportForm,
    IonHeader,
    IonTitle,
    IonContent,
    IonPage,
    IonToolbar,
    BackButton
  },
  data() {
    return {};
  },
  ionViewWillEnter(){
    console.log(this.$route.params.id)
  }
};
</script>

<style scoped>
</style>