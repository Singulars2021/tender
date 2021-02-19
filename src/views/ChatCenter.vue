<template>
  <ion-page>
    <ion-header>
      <!-- <ion-toolbar>
        <ion-title>Add New Animal</ion-title>
      </ion-toolbar> -->
      <h1>hola</h1>
    </ion-header>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader } from "@ionic/vue";

export default {
  name: "add-new-animal",
  components: {
    IonHeader,
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