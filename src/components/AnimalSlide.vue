<template>
  <ion-slide>
    <div class="overdrop" v-show="displayLogo">
      <img class="logo" src="../../public/assets/tender.png" alt="" />
    </div>
    <animal-card :animal="animal"></animal-card>

    <!-- It'd be interesting to put a loading spinner here using the v-else -->
    <div>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click="onRemove(animal.id)">
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="onFavorite(animal.id)">
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </div>
  </ion-slide>
</template>

<script>
import AnimalCard from "./AnimalCard.vue";
import {
  IonSlide,
  IonFab,
  IonFabButton,
  IonIcon,
  createAnimation,
} from "@ionic/vue";
import { heartOutline, removeOutline } from "ionicons/icons";
export default {
  components: {
    AnimalCard,
    IonSlide,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  props: ["animal", "animationDuration"],
  emits: ["favoriteSelected", "removeSelected"],
  data() {
    return {
      heartOutline,
      removeOutline,
      logoAnimationDuration: 0.25 * this.animationDuration,
      displayLogo: false,
    };
  },
  methods: {
    onFavorite(animalId) {
      this.displayLogo = true;
      const logo = document.querySelector("img.logo");
      console.log(logo)
      const logoAnimation = createAnimation()
        .addElement(logo)
        .duration(this.logoAnimationDuration)
        .keyframes([
          { offset: 0, transform: "scale(1)", opacity: "0" },
          { offset: 0.25, opacity: "1" },
          {
            offset: 1,
            opacity: "0",
          },
        ]);

      logoAnimation.play();

      this.$emit("favoriteSelected", animalId);

      const that = this;

      setTimeout(function () {
        that.$store.dispatch("addFavoriteAnimal", animalId);
        that.$store.dispatch("updateAnimals", animalId);
      }, that.animationDuration);
    },
    onRemove(animalId) {
      this.$emit("removeSelected", animalId);

      const that = this;

      setTimeout(function () {
        that.$store.dispatch("addRemovedAnimal", animalId);
        that.$store.dispatch("updateAnimals", animalId);
      }, that.animationDuration);
    },
  },
};
</script>
<style scoped>
ion-fab {
  margin: 1rem 3rem;
}

img {
  width: 20%;
}

.overdrop {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>