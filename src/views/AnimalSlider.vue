<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Animals</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Animals</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-slides pager="false" :options="slideOpts">
        <ion-slide :key="animal.id" v-for="animal in animals">
          <ion-card>
            <img :src="animal.pictures[0]">
            <ion-card-header>
              <ion-card-title> {{animal.name}} </ion-card-title>
              <ion-card-subtitle> {{animal.species}} </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
             <ul>
               <li>{{animal.age}}</li>
               <li>{{animal.location}}</li>
               <li>{{animal.sex}}</li>
               <li>Descripcion</li>
             </ul>
            </ion-card-content>
          </ion-card>
        </ion-slide>
      </ion-slides>
      <!-- fab placed to the bottom start -->
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!-- fab placed to the bottom end -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonFab,
  IonFabButton,
  IonSlides,
  IonSlide,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { heartOutline, removeOutline } from "ionicons/icons";
export default {
  name: "animal-slider",
  components: {
    IonFab,
    IonFabButton,
    IonSlides,
    IonSlide,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  methods:{
    importAnimalList(){
      fetch('https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app/animalsList.json').then(response => response.json()).then(data => console.log(data))
      
    }
  },
  created(){
    this.importAnimalList()
  },
  data() {
    return {
      slideOpts: {
        loop: true,
      },
      heartOutline,
      removeOutline,
      animals: [],
    };
  },
};
</script>

<style scoped>
ion-fab-button {
  margin: 1rem;
}
ion-card{
  min-width: 80%;
}
img{
  max-height: 25vh;
}
</style>