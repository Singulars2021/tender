<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides :options="animalSliderOptions">
        <animal-slide
          v-for="animal in animals"
          :key="animal.id"
          :animal="animal"
        >
        </animal-slide>
      </ion-slides>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import AnimalSlide from "@/components/AnimalSlide.vue";
import {
  IonSlides,
  IonPage,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import { heartOutline, removeOutline } from "ionicons/icons";
export default {
  name: "animal-slider",
  components: {
    AnimalSlide,
    IonSlides,
    IonContent,
    IonPage,
    IonIcon,
    IonFab,
    IonFabButton,
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
      heartOutline,
      removeOutline,
    };
  },
};
</script>

<style scoped>
ion-fab {
  margin: 1rem 3rem;
}
</style>