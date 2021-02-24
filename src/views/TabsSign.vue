<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="top">
        <ion-tab-button tab="sing-up" href="/sign/signup">
          <ion-icon :icon="settingsOutline" />
        </ion-tab-button>
        <ion-tab-button tab="sign-in" href="/sign/signin">
          <ion-icon :icon="layersOutline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import { settingsOutline, layersOutline } from "ionicons/icons";

export default {
  name: "TabsSign",
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      settingsOutline,
      layersOutline,
    };
  },
};
</script>