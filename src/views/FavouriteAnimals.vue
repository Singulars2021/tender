<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-searchbar @ionChange="ionChange($event)"></ion-searchbar>
      <ion-list>
        <ion-icon :icon="heart" />
        <ion-list-header>Favoritos</ion-list-header>
        <ion-item v-for="animal in searchedAnimal" :key="animal.id">
          <ion-avatar slot="start">
            <img
              src="https://images.unsplash.com/photo-1579833098880-e52055f43cad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=800"
            />
          </ion-avatar>
          <ion-label>
            <h2>{{ animal.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { heart } from "ionicons/icons";

import {
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonListHeader,
  IonAvatar,
  IonContent,
  IonIcon,
} from "@ionic/vue";

export default {
  name: "chat-center",
  components: {
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonListHeader,
    IonAvatar,
    IonContent,
    IonIcon,
  },
  setup() {
    return {
      heart,
    };
  },
  data() {
    return {
      animalsList: [
        { id: "0", name: "Linn" },
        { id: "1", name: "Gata" },
        { id: "2", name: "Linda" },
        { id: "3", name: "Max" },
        { id: "4", name: "Gato" },
        { id: "5", name: "Tortuga" },
        { id: "6", name: "Desi" },
      ],
      searchedAnimal: [],
    };
  },
created(){
  this.searchedAnimal= [...this.animalsList ]
},
  methods: {
    ionChange(event) {
      const searchedInput = event.target.value;

      if (searchedInput.trim() !== "") {
        this.searchedAnimal = this.animalsList.filter((animal) => {
          return animal.name
            .toLowerCase()
            .startsWith(searchedInput.toLowerCase());
        });
        
      }
      else{
          this.searchedAnimal = this.animalsList
        }
    },
  },
};
</script>
<style scoped>
ion-icon {
  margin-left: 15px;
}
</style>