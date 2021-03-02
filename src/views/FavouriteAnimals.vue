<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-searchbar @ionChange="ionChange($event)"></ion-searchbar>
      <ion-text>Nuevos me gustas </ion-text>
      <ion-list lines="none" class="favorite-animals-list">
      <ion-item  v-for="animal in searchedAnimal" :key="animal.id">
        <div class="favorite-animals-item" @click="chat(animal.id,animal.userId)">
          <ion-avatar slot="start">
            <img :src="animal.pictures[0]"
            />
          </ion-avatar>
          <ion-label>
            <h2>{{ animal.name }}</h2>
          </ion-label>
        </div>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header>Mensajes
          <ion-badge>{{messageCount}}</ion-badge>
        </ion-list-header>
        <ion-item v-for="animal in searchedAnimal" :key="animal.id">
          <ion-avatar slot="start">
            <img
              :src="animal.pictures[0]"
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
import {
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonListHeader,
  IonAvatar,
  IonContent,
  IonBadge,
  IonText

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
    IonBadge,
    IonText

  },
  data() {
    return {
      searchedAnimal:[],
      messageCount:0,
    };
  },
created(){

  this.searchedAnimal= this.$store.getters.getFavoriteAnimals
  
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
    chat(animalId,userId){
      this.$router.push(`/chat/${animalId}`)
      console.log(userId)
    }
  },
  computed:{
    animalList(){
      return this.$store.getters.getFavoriteAnimals
    }
  }
};
</script>
<style scoped>
ion-icon {
  margin-left: 15px;
}
ion-list-header,ion-text {
  color: #ed576b;
  font-size: 18px;
  padding-left:0;
  font-weight: 700;
}

ion-badge{
  margin-left:0.5rem;
  background-color: #ed576b
}
.favorite-animals-list{
  display: flex;
  flex-direction: row;
  margin-top:0.5rem;
}
.favorite-animals-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>