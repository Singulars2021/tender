<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="spinner-container" v-if="animals.length == 0">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <div v-else>
        <ion-slides :options="animalSliderOptions">
          <animal-slide
            v-for="animal in animals"
            :key="animal.id"
            :animal="animal"
          >
          </animal-slide>
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
    this.$store.dispatch("getAnimals");
    console.log("created");
  },
  // Ionic hook executed everytime the user changes to this view
  ionViewWillEnter() {
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
      animalSliderOptions: {
        loop: false,
        initialSlide: 0,
        pager: false,
      },
    };
  },
};
</script>

<style scoped>

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>