<template>
  <ion-page>
    <ion-content scroll-x="true">
      <ion-list>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
        <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       <fav-animals></fav-animals>
       </ion-list>
      </ion-content>
  </ion-page>
</template>

<script>
import FavAnimals from '@/components/FavAnimals.vue';
import {
  IonList,
  IonContent,
  IonPage,
} from "@ionic/vue";
export default {
  name: "chat-center",
  components: {
    FavAnimals,
    IonList,
    IonContent,
    IonPage,
  },
};
</script>

<style scoped>
ion-list {
  display: flex;
  flex-direction: row;
}
</style>