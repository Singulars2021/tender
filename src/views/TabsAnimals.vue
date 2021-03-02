<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="top">
        <ion-tab-button tab="add-new-animal" href="/animals/add">
          <ion-icon :icon="settingsOutline" />
        </ion-tab-button>
        <ion-tab-button tab="animal-slider" href="/animals/slider">
          <ion-icon :icon="layersOutline" />
        </ion-tab-button>
        <ion-tab-button tab="chat-center" href="/animals/liked-animals">
          <img src="../../public/assets/cat.svg" alt=""/>
        </ion-tab-button>
        <!-- <ion-tab-button tab="admin-animals" href="/animals/adminAnimals">
          <ion-icon :icon="ellipsisVerticalOutline" />
        </ion-tab-button> -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import {
  settingsOutline,
  layersOutline,
  ellipsisVerticalOutline,
} from "ionicons/icons";

export default {
  name: "TabsAnimals",
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      settingsOutline,
      layersOutline,
      ellipsisVerticalOutline,
    };
  },
};
</script>
