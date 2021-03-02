<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="header">
        <!-- <img class="logo" src="/assets/tender.png" /> -->
        <ion-item>
          <ion-avatar slot="start">
            <img src="/assets/avatar.png" />
          </ion-avatar>
          <ion-label>
            <h2>Tu nombre</h2>
            <p>Ver mi perfil</p>
          </ion-label>
          <router-link to="/profile">
            <ion-button>
              <ion-icon :icon="chevronForwardOutline" />
            </ion-button>
          </router-link>
        </ion-item>
        <!-- <router-link to="/fitlers"> -->
        <ion-button type="" expand="block" fill="solid"
          >Ajustes búsqueda</ion-button
        >
        <!-- </router-link> -->
      </div>
      <div class="animals-list">
        <h1>Tus animales</h1>
        <ion-button>
          <ion-icon :icon="chevronForwardOutline" />
        </ion-button>
      </div>
      <!--Your animals list -->
      <admin-your-animals
        :animalsCreated="animals"
        @edit-animal="editAnimal"
      ></admin-your-animals>
    </ion-content>
    <router-link to="/animals/add">
      <ion-fab-button>
        <ion-icon :icon="addCircleOutline"> </ion-icon>
      </ion-fab-button>
    </router-link>
  </ion-page>
</template>

<script>
import AdminYourAnimals from "../components/AdminYourAnimals.vue";
import { chevronForwardOutline, addCircleOutline } from "ionicons/icons";
import {
  IonFabButton,
  IonPage,
  IonIcon,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonContent,
} from "@ionic/vue";

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
      addCircleOutline,
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
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonContent,
    AdminYourAnimals,
  },
};
</script>


<style scoped>
* {
  text-align: center;
}
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
h2,
p {
  margin-left: 1rem;
  margin-right: 0.5rem;
  font-size: 1.2rem;
}
.animals-list {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.animals-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
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
  margin: 4rem 8rem;
}
ion-label {
  margin-left: 0px;
}
ion-avatar {
  margin: 0px;
}
ion-card {
  margin: 0px;
}
</style>