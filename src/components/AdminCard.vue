<template>
<div class="cards">
  <ion-card>
    <ion-card-header>
      <img :src="img" />
      <div class="animalname">
        <ion-card-title>{{ name }}</ion-card-title>
        <ion-icon :icon="createOutline"></ion-icon>
      </div>
    </ion-card-header>
  </ion-card>
</div>
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
ion-icon {
  font-size: 25px;
  color: var(--ion-color-primary);
}
img {
  height: 30vh;
  object-fit: cover;
  display: block;
  width: 100vw;
}
ion-card-header {
  padding: 0;
}
.animalname {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 15px;
}
.cards {
 width: 95%;
 margin:auto ;

}
ion-card {
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>