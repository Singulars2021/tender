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
  name: "CtbButton",
};
</script>

<style scoped>
ion-button{
    --color:var(--ion-color-dark);
    --background: white;
    --border-radius: 29.5px;
    --border-color: var(--ion-color-secondary);
    --border-width: 2px;
    --border-style: solid;
    font-weight:700;
    --padding-bottom:20px;
    --padding-top:20px; 
    bottom: 30px;
    margin: 0;
    left: 16px;
    right: 16px;
}
</style>