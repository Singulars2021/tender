<template>
  <ion-slide>
    <animal-card :animal="animal"></animal-card>
  </ion-slide>
</template>

<script>
import AnimalCard from "./AnimalCard.vue";

export default {
  components: {
    AnimalCard,
  },
  props: ["animal"],
};
</script>