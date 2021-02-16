<template>
  <ion-slide>
    <animal-card :animal="animal"></animal-card>
  </ion-slide>
</template>

<script>
import AnimalCard from "./AnimalCard.vue";

import { IonSlide } from "@ionic/vue"

export default {
  components: {
    AnimalCard,
    IonSlide
  },
  props: ["animal"],
};
</script>