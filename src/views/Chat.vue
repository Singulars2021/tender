<template>
  <ion-page>
    <h1>{{ $route.params.id }}</h1>
    <ion-content>
      <form @submit.prevent="send">
        <ion-input v-model="message" placeholder="Message" required />
        <ion-button type="submit">
          <ion-icon :icon="sendOutline"></ion-icon>
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useChat } from "@/firebaseConfig.js";
import { IonInput, IonButton, IonIcon, IonPage, IonContent } from "@ionic/vue";
import { sendOutline } from "ionicons/icons";
export default {
  compponents: {
    IonInput,
    IonButton,
    IonIcon,
    IonPage,
    IonContent,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { sendMessage } = useChat();

    const fromUserId = store.getters.getUserId;
    const animalId = route.params.id;

    const animal = store.getters.getFavoriteAnimals.find(
      (animal) => animal.id == animalId
    );

    const toUserId = animal.userId;

    const message = ref("");
    const send = () => {
      sendMessage(fromUserId, toUserId, animalId, message.value);
      message.value = "";
    };

    return { message, send, sendOutline };
  },
};
</script>