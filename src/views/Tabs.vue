<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="animal-slider" href="/animals/slider">
          <ion-icon size="large" src="../../assets/cat.svg"/>
          <ion-label>Animal Slider</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="add-new-animal" href="/animals/add">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>Add New Animal</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { ellipse, square, triangle, addCircleOutline } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      addCircleOutline
    };
  },
};
</script>