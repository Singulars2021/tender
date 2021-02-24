<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <admin-your-animals
        v-for="animal in animalsCreated"
        :key="animal.name"
        :src="animal.img"
        :name="animal.name"
      ></admin-your-animals>
    </ion-content>
  </ion-page>
</template>

<script>
import AdminYourAnimals from "../components/AdminYourAnimals.vue";
import { IonContent, IonPage } from "@ionic/vue";

export default {
  data() {
    return {
      animalsCreated: [
        {
          img:
            "https://images.unsplash.com/photo-1601758003839-512c0f4159e5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Marcos",
        },
        {
          img:
            "https://images.unsplash.com/photo-1536910467852-a6fded0c5c47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Roberta",
        },
        {
          img:
            "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          name: "Simba",
        },
        {
          img:
            "https://images.unsplash.com/photo-1579833098880-e52055f43cad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=800",
          name: "Margarita",
        },
      ],
    };
  },
  components: {
    AdminYourAnimals,
    IonContent,
    IonPage,
  },
};
</script>
