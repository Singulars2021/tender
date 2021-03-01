<template>
  <ion-slide>
    <animal-card :animal="animal"></animal-card>
    <!-- It'd be interesting to put a loading spinner here using the v-else -->
        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button @click="onRemove(animal.id)">
            <ion-icon :icon="removeOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="onFavorite(animal.id)">
            <ion-icon :icon="heartOutline" ></ion-icon>
          </ion-fab-button>
        </ion-fab>
  </ion-slide>
</template>

<script>
import AnimalCard from "./AnimalCard.vue";
import { 
  IonSlide,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/vue"
import { heartOutline, removeOutline } from "ionicons/icons";
export default {
  components: {
    AnimalCard,
    IonSlide,
    IonFab,
    IonFabButton,
    IonIcon
  },
  props: ["animal"],
  data(){
    return{
      heartOutline,
      removeOutline,
    }
  },
  methods:{
    onFavorite(animalId){
      this.$store.dispatch("addFavoriteAnimal", animalId)
    },
    onRemove(animalId){
      this.$store.dispatch("addRemovedAnimal", animalId)
      this.$store.dispatch("updateAnimals", animalId)
    }
  },
};
</script>
<style scoped>
ion-fab {
  margin: 1rem 3rem;
}
</style>