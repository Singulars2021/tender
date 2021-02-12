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
      <ion-slides pager="false" :options="slideOpts" @ionSlideDidChange="changeSlide">
        <ion-slide :key="animal.id" v-for="animal in animals">
          <ion-card>
            <div @click="changePicture(animal.pictures)">
              <img :src="animal.pictures[i]">
            </div>
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
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,

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
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,

  },
  methods:{
    // importAnimalList(){
    //   fetch('https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app/animalsList.json').then(response => response.json()).then(data => console.log(data))
      
    // }
    changeSlide(){
      this.i=0
    },
    changePicture(picture){
      let pictureLength=picture.length
      console.log("hola")
      if(this.i<pictureLength-1){
        this.i++
      }
      else{
        this.i=0
      }
    }
  },
  //created(){
    //this.importAnimalList()
  //},
  data() {
    return {
      slideOpts: {
        loop: true,
        initialSlide:1
      },
      heartOutline,
      removeOutline,
      i:0,
      animals: [{
          id: '0',
          species: 'Perro',
          name: 'Marcos',
          sex: 'Macho',
          age: 'Joven',
          pictures: ['https://images.unsplash.com/photo-1601758003839-512c0f4159e5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1588022274210-7aab7c55c631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'],
          location: 'MatarÃ³'
        },
        {
          id: '1',
          species: 'Perro',
          name: 'Roberta',
          sex: 'Hembra',
          age: 'Adulta',
          pictures: ['https://images.unsplash.com/photo-1536910467852-a6fded0c5c47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80'],
          location: 'Garraf'
        },        
        {
          id: '2',
          species: 'Gato',
          name: 'Simba',
          sex: 'Macho',
          age: 'Joven',
          pictures: ['https://images.unsplash.com/photo-1610121172299-5f3c7c55bccd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1532934066-274478b07d25?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'],
          location: 'Vilassar'
        },],
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
/* ion-img{
  max-height: 25vh;
} */
</style>