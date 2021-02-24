<template>
  <ion-buttons slot="start">
    <ion-back-button
      :default-href="href"
      :icon="buttonIcon"
    >
    </ion-back-button>
  </ion-buttons>
</template>

<script>
import {IonButtons, IonBackButton} from "@ionic/vue"
import { chevronBackOutline } from "ionicons/icons";

export default {
  props:{
    href:{
      type: String,
      required: true,
    }
  },
  name: "BackButton",
  components:{
    IonButtons,
    IonBackButton
  },
  data(){
    return{
      buttonIcon : chevronBackOutline
    }
  }  
}
</script>

