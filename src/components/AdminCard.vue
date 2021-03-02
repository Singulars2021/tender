<template>
  <ion-card>
    <ion-card-header>
      <img :src="img" />
      <ion-icon :icon="create"></ion-icon>
      <ion-card-title>{{ name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { create } from "ionicons/icons";
import { IonCard, IonCardTitle, IonCardHeader, IonIcon } from "@ionic/vue";
export default {
  data() {
    return {
      create,
    };
  },
  props: ["name", "img"],
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonIcon,
  },
  methods: {
    // editAnimal() {
    //   const objecto = "hola";
    //   this.$emit("edit-animal", objecto);
    // },
  },
};
</script>

<style scoped>
ion-card {
  position: relative;
}
ion-icon {
  position: absolute;
  right: 15px;
  font-size: 25px;
  color: #31a57e;
}
</style>