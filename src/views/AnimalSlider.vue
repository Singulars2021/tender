<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="spinner-container" v-if="animals.length == 0">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <div v-else>
        <ion-slides :options="animalSliderOptions">
          <transition-group name="swiper">
            <animal-slide
              v-for="animal in animals"
              :key="animal.id"
              :animal="animal"
              :id="animal.id"
              :animation-duration="animationDuration"
              class="animate"
              @favorite-selected="onFavoriteSelected"
              @remove-selected="onRemoveSelected"
            >
            </animal-slide>
          </transition-group>
        </ion-slides>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import AnimalSlide from "@/components/AnimalSlide.vue";
import {
  IonSlides,
  IonPage,
  IonContent,
  IonSpinner,
  createAnimation,
} from "@ionic/vue";

export default {
  name: "animal-slider",
  components: {
    AnimalSlide,
    IonSlides,
    IonContent,
    IonPage,
    IonSpinner,
  },
  created() {
    // Example about how to update app's state
   // this.$store.dispatch("getAnimals");
    console.log("created");
  },
  methods: {
    onFavoriteSelected(animalId) {
      const slides = document.querySelectorAll(".animate");
      let indexToAnimate;

      for (const slide in slides) {
        if (slides[slide].id == animalId) {
          indexToAnimate = slide;
        }
      }

      console.log("index", indexToAnimate);

      const slide = slides[indexToAnimate].children[1];

      const likedAnimation = createAnimation()
        .addElement(slide)
        .duration(this.animationDuration)
        .keyframes([
          { offset: 0, transform: "scale(1)", opacity: "1" },
          { offset: 0.15, transform: "scale(0.90) translateY(0)", opacity: "0.3" },
          {
            offset: 0.25,
            transform: "scale(0.90) translateY(-100px)",
          },
          {
            offset: 1,
            transform: "scale(0.90) translateY(-1000px)",
          },
        ]);

      likedAnimation.play();
    },
    onRemoveSelected(animalId) {
      const slides = document.querySelectorAll(".animate");
      let indexToAnimate;

      for (const slide in slides) {
        if (slides[slide].id == animalId) {
          indexToAnimate = slide;
        }
      }

      console.log("index", indexToAnimate);

      const slide = slides[indexToAnimate].children[1];

      const likedAnimation = createAnimation()
        .addElement(slide)
        .duration(this.animationDuration)
        .keyframes([
          { offset: 0, transform: "scale(1)", opacity: "1" },
          { offset: 0.15, transform: "scale(0.90) translateY(0)",opacity:0.3 },
          {
            offset: 0.25,
            transform: "scale(0.90) translateY(100px)",
          },
          {
            offset: 1,
            transform: "scale(0.90) translateY(1000px)",
          },
        ]);

      likedAnimation.play();
    },
  },
  // Ionic hook executed everytime the user changes to this view
  async ionViewWillEnter() {
    console.log("ionViewWillEnter");
    // this.animals = this.$store.getters.getAllAnimals;

    // Just a try to check if DB is working. It would be a good idea if this getters fills a computed property for the animal slider, for example
  },
  computed: {
    animals() {
      return this.$store.getters.getAllAnimals;
    },
  },
  data() {
    return {
      animationDuration: 800,
      animalSliderOptions: {
        loop: false,
        initialSlide: 0,
        pager: false,
      },
    };
  }
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* animal-card.swiper-leave-from {
  transform: scale(1.2);
}

animal-card.swiper-leave-to {
  transform: translateY(150px);
  opacity: 0.8;

}

animal-card.swiper-leave-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
} */
</style>