<template>
  <ion-page>
        <ion-item>
             <img
              src="../../public/assets/logo_horitzontal.svg"
              alt="tender logo"
            />
        </ion-item>
    <ion-content :fullscreen="true">
      <sign-in-component></sign-in-component>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonItem
} from "@ionic/vue";

import SignInComponent from "@/components/SignInComponent.vue";
// import { getCurrentUser } from '../firebaseConfig';


export default {
  data(){
    return {
      user: undefined
    }
  },
  name: "sign-in",
  components: {
    IonContent,
    IonPage,
    SignInComponent,
    IonItem
  }
};
</script>

<style scoped>
ion-item{
  margin: 100px auto 100px auto;
  padding-top: 20px;
  --inner-border-width:0;
  width: 17rem;
}

</style>