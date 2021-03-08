<template>
  <ion-page>
    <ion-item>
      <img src="../../public/assets/logo_horitzontal.svg" alt="tender logo" />
    </ion-item>
     <!-- <ion-item>
       <ion-title>Crear cuenta</ion-title>
     </ion-item> -->
    <ion-content :fullscreen="true">
      <sign-up></sign-up>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";

import SignUp from "@/components/SignUp.vue";

export default {
  name: "sing-up",
  components: {
    SignUp,
    IonContent,
    IonPage,
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