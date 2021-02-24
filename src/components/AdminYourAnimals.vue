<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="header">
        <img class="logo" src="/assets/tender.png" />
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
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <img src="{{img}}" />
                <ion-card-title>{{ name }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-router-link href="/animals/add">
      <ion-fab-button>
        <ion-icon :icon="addCircleOutline"> </ion-icon>
      </ion-fab-button>
    </ion-router-link>
  </ion-page>
</template>

<script>
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
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
export default {
  props: ["name", "img"],
  data() {
    return {
      chevronForwardOutline,
      addCircleOutline,
    };
  },
  components: {
    IonFabButton,
    IonPage,
    IonContent,
    IonIcon,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
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
  margin: 1rem;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
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