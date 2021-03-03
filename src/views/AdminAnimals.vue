<template>
  <ion-page>
     <ion-header>
      <ion-toolbar>
        <back-button href="/animals/slider"></back-button>
        <ion-title>Mi perfil</ion-title>
      </ion-toolbar>      
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="header">
        <!-- <img class="logo" src="/assets/tender.png" /> -->
      
        <ion-item>
          <div class="flexcontent">
          <div class="myname">
          <ion-avatar slot="start">
            <img src="/assets/avatar.png" />
          </ion-avatar>
          <ion-label class="perfil">
            <h1>{{ user.name }}</h1>
            <p>Editar mi perfil</p>
          </ion-label>
          </div>
          <div >
          <router-link to="/profile">            
              <ion-icon color="dark" name="chevron-forward"  class="forward"></ion-icon>
              <!-- <ion-icon :icon="chevronForwardOutline" /> -->            
          </router-link>
          </div>
          </div>
        </ion-item> 
         <router-link to="/filters"> 
          <ctb-button>AJUSTES BÚSQUEDA</ctb-button>
        
      <ion-item-divider></ion-item-divider>
        </router-link>
      </div>      
      <div class="animals-list">
        <h3>Tus animales</h3>
        <!-- <ion-button>
          <ion-icon :icon="chevronForwardOutline" />
        </ion-button> -->
      </div>
      <!--Your animals list -->
      <admin-your-animals
        :animalsCreated="animals"
        @edit-animal="editAnimal"
      ></admin-your-animals>
    </ion-content>
    <router-link to="/animals/add">
      <ion-fab-button color="secondary">
        <ion-icon :icon="addOutline"> </ion-icon>
      </ion-fab-button>
    </router-link>
  </ion-page>
</template>

<script>
import AdminYourAnimals from "../components/AdminYourAnimals.vue";
import { chevronForwardOutline, addOutline } from "ionicons/icons";
import { IonPage, IonHeader, IonTitle, IonContent } from "@ionic/vue";
import BackButton from '../ui/BackButton.vue';

import {
  IonFabButton,
  IonIcon,
  //IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonToolbar,
} from "@ionic/vue";
import CtbButton from '../ui/CtbButton.vue';

export default {
  created() {
    this.$store.dispatch("getAnimals");
  },
  computed: {
    animals() {
      return this.$store.getters.getMyAnimals;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    },
  },
  data() {
    return {
      chevronForwardOutline,
      addOutline,
    };
  },
  methods: {
    editAnimal(id) {
      this.$router.push({ name: "EditAnimal", params: { id: id } });
      console.log("Este es el ID del animal clickado", id);
    },
  },
  components: {
    IonFabButton,
    IonPage,
    IonIcon,
    //IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonContent,
    IonToolbar,
    AdminYourAnimals,
    BackButton,
    IonHeader,
    IonTitle,
    CtbButton
  },
};
</script>


<style scoped>

ion-button {
  width: fit-content;
  margin: 1rem;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
a {
  text-decoration: none;
}

p {
  
  font-size: 1.2rem;
}
.md h3 {
     margin: 15px 18.5px 0px 18.5px;
}
.ios h3{
     margin: 15px 25.8px -15px 25.8px;
}
.animals-list {
  width: 95%;
  margin: auto;
}

.logo {
  display: flex;
  align-self: start;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  width: 40px;
  height: 40px;
}
ion-fab-button {
  margin: 42%;
  margin-bottom: 15%;
  
}
.perfil {
  margin-left: 1rem;
  margin-right: 0.5rem;
  
}

ion-avatar {
  margin: 0px;
  width: 3rem;
  height: 3rem;
}
ion-card {
  margin: 0px;
}
ion-item-divider {
  margin-top: 0px;
  min-height: 0.70rem;
}

ion-item {
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100vw;

}
.myname {
  display: flex;
  align-items: center;
}
.flexcontent {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  margin-bottom: 20px;
}
.forward {
  width: 1.5rem;
  height: 1.5rem;
}
</style>