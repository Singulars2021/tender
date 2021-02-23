<template>
<ion-page>
  <ion-content :fullscreen="true">
    <admin-animals></admin-animals>
  </ion-content>
</ion-page>
</template>

<script>
 import AdminAnimals from '../components/AdminAnimals.vue'
 import {
  IonContent,
  IonPage,
} from "@ionic/vue";

export default {

  components:{
    AdminAnimals,
    IonContent,
    IonPage
  }

}
</script>

<style>

</style>