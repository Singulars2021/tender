<template>
  <ion-card>
    <ion-card-header>
      <img :src="img" />
      <ion-icon :icon="createOutline"></ion-icon>
      <ion-card-title>{{ name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { createOutline } from "ionicons/icons";
import { IonCard, IonCardTitle, IonCardHeader, IonIcon } from "@ionic/vue";
export default {
  data() {
    return {
      createOutline,
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
  margin-top: 10px;
}
img {
  height: 40vh;
  object-fit: cover;
  display: block;
  width: 100vw;
}
ion-card-title{
  margin-top: 10px;
}
</style>