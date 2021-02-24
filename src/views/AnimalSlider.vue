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
        <!-- It'd be interesting to put a loading spinner here using the v-else -->
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
  IonIcon,
  IonFab,
  IonFabButton,
  IonSpinner,
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

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>