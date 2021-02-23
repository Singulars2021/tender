<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="header">
        <ion-item>
          <ion-avatar slot="start">
            <img src="/assets/avatar.png" />
          </ion-avatar>
          <ion-label>
            <h2>Tu nombre</h2>
            <p>Ver mi perfil</p>
          </ion-label>
          <ion-button>
            <ion-icon :icon="chevronForwardOutline" />
          </ion-button>
        </ion-item>
        <ion-button type="submit" expand="block" fill="solid"
          >Ajustes búsqueda</ion-button
        >
      </div>

      <div class="animals-list">
        <h1>Tus animales</h1>
        <ion-button>
          <ion-icon :icon="chevronForwardOutline" />
        </ion-button>
      </div>
      <div class="animals-grid">
        <ion-card v-for="animal in animalsCreated" :key="animal.name">
          <ion-card-header>
            <img :src="animal.img" />
            <ion-card-title>{{ animal.name }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
    </ion-content>
    <ion-fab-button href="/animals/add">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </ion-fab-button>
  </ion-page>
</template>

<script>
import { chevronForwardOutline, addCircleOutline } from "ionicons/icons";
import {
  IonPage,
  IonIcon,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonContent,
  IonFabButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/vue";
export default {
  data() {
    return {
      animalsCreated: [
        {
          img:
            "https://images.unsplash.com/photo-1601758003839-512c0f4159e5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Marcos",
        },
        {
          img:
            "https://images.unsplash.com/photo-1536910467852-a6fded0c5c47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Roberta",
        },
        {
          img:
            "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Simba",
        },
        {
          img:
            "https://images.unsplash.com/photo-1579833098880-e52055f43cad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=800",
          name: "Margarita",
        },
      ],
      chevronForwardOutline,
      addCircleOutline,
    };
  },
  name: "admin-animals",
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonFabButton,
    IonCard,
    IonCardTitle,
    IonCardHeader,
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
ion-button {
  width: fit-content;
  margin: 1.25rem;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2,
p {
  margin-left: 1.3rem;
  margin-right: 1.3rem;
  font-size: 1.35rem;
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
.animals-grid {
  display: grid;
  grid-template-columns: 140px 140px;
  gap: 10px;
  justify-content: center;
  margin-top: 1rem;
}
/* .animal {
  background-color: blue;
  height: 150px;
  width: 140px;
  border: 3px solid black;
} */
ion-fab-button {
  margin: 4rem 8rem;
}
</style>