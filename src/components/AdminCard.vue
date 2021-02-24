<template>
  <ion-card>
    <ion-card-header>
      <img :src="img" />
      <ion-card-title>{{ name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { IonCard, IonCardTitle, IonCardHeader } from "@ionic/vue";
export default {
  props: ["name", "img"],
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
  },
};
</script>