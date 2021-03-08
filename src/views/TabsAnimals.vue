<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="top">
        <ion-tab-button tab="add-new-animal" href="/adminanimals">
          <ion-icon :icon="settingsSharp" />
        </ion-tab-button>
        <ion-tab-button tab="animal-slider" href="/animals/slider">
          <ion-icon class="logo-tender" src="../../assets/logo_tender_hearts.svg" />
        </ion-tab-button>
        <ion-tab-button tab="chat-center" href="/animals/chat">
          <ion-icon :icon="heartSharp" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import {
  settingsSharp,
  heartSharp,
  //ellipsisVerticalOutline,
} from "ionicons/icons";

export default {
  name: "TabsAnimals",
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      settingsSharp,
      heartSharp,
      //ellipsisVerticalOutline,
    };
  },
};
</script>

<style scoped>
ion-icon{
  font-size: 1.6rem;
}
</style>
