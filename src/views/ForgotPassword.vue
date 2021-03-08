<template>
  <ion-page>
    <ion-item>
      <img src="../../public/assets/logo_horitzontal.svg" alt="tender logo" />
    </ion-item>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
          <ion-title size="large">Forgot Password</ion-title>
      </ion-header>
      <forgot-component></forgot-component>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTitle,
  IonContent,
} from "@ionic/vue";


import ForgotComponent from "@/components/ForgotComponent.vue";



export default {
  name: "forgot-password",
  components: {
    IonTitle,
    IonContent,
    IonPage,
    ForgotComponent
  },
};
</script>

<style scoped>
ion-item>img{
  width: 11rem;
  padding-top: 3rem;
  margin: auto;
}

ion-item{
  margin-top: 10px;
   --inner-border-width:0;
}
</style>