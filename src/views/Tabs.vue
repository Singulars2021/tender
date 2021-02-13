<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="top">
        <ion-tab-button tab="add-new-animal" href="/animals/add">
          <ion-icon :icon="settingsOutline" />
        </ion-tab-button>
        <ion-tab-button tab="animal-slider" href="/animals/slider">
          <ion-icon :icon="layersOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="chat" href="/chat">
          <ion-icon size="large" src="../../assets/cat.svg" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import { settingsOutline, layersOutline } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      settingsOutline,
      layersOutline,
    };
  },
};
</script>
