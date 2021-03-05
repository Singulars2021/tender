<template>
    <ion-button type="submit" expand="block" fill="solid">
        <slot></slot>
    </ion-button>
</template>

<script>
import {IonButton} from "@ionic/vue"

export default {
    components:{
        IonButton,
    },
  name: "CtaButtonSignin",
};
</script>

<style scoped>
ion-button{
    --background: var(--ion-color-secondary);
    --color:var(--ion-color-dark);
    --border-radius: 29.5px;
    font-weight:700;
    --padding-bottom:20px;
    --padding-top:20px; 
    position: fixed;
    bottom: 65px;
    margin: 0;
    left: 16px;
    right: 16px;
}
</style>

