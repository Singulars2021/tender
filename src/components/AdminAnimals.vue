<template>
  <ion-page>
    <ion-header>
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
            </ion-header>
            <ion-content :fullscreen="true">
        
          <div class="animals-list">
            <h1>Tus animales</h1>
            <ion-button>
              <ion-icon :icon="chevronForwardOutline" />
            </ion-button>
          </div>
    </ion-content>
      <div class="foo">
        <ion-fab-button >
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-fab-button>
      </div>
  </ion-page>
</template>

<script>
import { chevronForwardOutline, addCircleOutline } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonIcon,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonContent,
} from "@ionic/vue";
export default {
  data() {
    return {
      chevronForwardOutline,
      addCircleOutline,
    };
  },
  name: "admin-animals",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonIcon,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
  },
};
</script>

<style scoped>

*{
  text-align: center;
}
ion-button{
  width:fit-content;
  margin: 1.25rem;
  text-align: center;
}

ion-header{
display: flex;
flex-direction: column;
align-items: center;
}

h2,p{
margin-left:1.30rem;
margin-right:1.30rem;
font-size: 1.35rem;
}
.animals-list{
display: flex;
text-align: center;
justify-content: center;
align-items: center;
}

.animals-list{
display: flex;
flex-direction: row;
justify-content: center;
align-content: center;
}

ion-fab-button {
margin: 1.5rem 10.5rem;
}
</style>