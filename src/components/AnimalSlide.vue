<template>
  <ion-slide>
    <div class="overdrop" v-show="displayLogo">
      <img class="logo" :src="imageAnimation" alt="" />
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
        <ion-fab-button @click="onFavorite(animal)">
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
      logoAnimationDuration: this.animationDuration,
      displayLogo: false,
      imageAnimation:null,
    };
  },
  methods: {
    onFavorite(animal) {
      this.imageAnimation="../assets/heart_green.svg"
      this.displayLogo = true;
      const logo = document.querySelector("img.logo");
      console.log(this.imageAnimation)
      const logoAnimation = createAnimation()
        .addElement(logo)
        .duration(this.logoAnimationDuration)
        .keyframes([
          { offset: 0, transform: "scale(0)", opacity: "1" },
          { offset: 0.10, transform: "scale(1)"},
          { offset: 0.15, transform: "scale(0.90) translateY(0)" },
          {
            offset: 0.25,
            transform: "scale(0.90) translateY(-100px)",
          },
          {
            offset: 1,
            transform: "scale(0.90) translateY(-1000px)",
          },
        ]);

      logoAnimation.play();

      this.$emit("favoriteSelected", animal.id);
      console.log('favoriteSelected, payload animal: ', animal)

      const that = this;

      setTimeout(function () {
        that.$store.dispatch("addFavoriteAnimal", animal);
        that.$store.dispatch("updateAnimals", animal.id);
      }, that.animationDuration);
    },
    onRemove(animalId) {
      this.displayLogo = true;
      this.imageAnimation="../assets/heart_grey.svg"
      const logo = document.querySelector("img.logo");
      const that = this;
      const logoAnimation = createAnimation()
        .addElement(logo)
        .duration(this.logoAnimationDuration)
        .keyframes([
          { offset: 0, transform: "scale(0)", opacity: "1" },
          { offset: 0.10, transform: "scale(1)"},
          { offset: 0.15, transform: "scale(0.90) translateY(0)" },
          {
            offset: 0.25,
            transform: "scale(0.90) translateY(100px)",
          },
          {
            offset: 1,
            transform: "scale(0.90) translateY(1000px)",
          },
        ]);

      logoAnimation.play();
      this.$emit("removeSelected", animalId);
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