<template>
  <ion-searchbar></ion-searchbar>
  <ion-slide> </ion-slide>
  <animal-avatar></animal-avatar>
</template>

<script>
import { AnimalAvatar } from "./AnimalAvatar.vue";
import { IonSearchbar } from "@ionic/vue";
import { IonAvatar } from "@ionic/vue";
import { IonSlide } from "@ionic/vue";
export default {
  components: [IonSearchbar, IonAvatar, IonSlide, AnimalAvatar],
};
</script>

<style scoped>
</style>