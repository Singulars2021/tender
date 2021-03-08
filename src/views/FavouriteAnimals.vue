<template v-slot:start>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- <ion-searchbar @ionChange="ionChange($event)"></ion-searchbar> -->
      <ion-text>Me gustas </ion-text>
      <div class="favorite-animals-list scroll" scrollX="true">
        <div v-for="animal in animalList" :key="animal.id">
          <div
            class="favorite-animals-item"
            @click="chat(animal.id, animal.userId)"
          >
            <ion-avatar>
              <img :src="animal.pictures[0].image" />
            </ion-avatar>
            <ion-label>
              <h4>{{ animal.name }}</h4>
            </ion-label>
          </div>
        </div>
      </div>
      <ion-list>
        <ion-list-header
          >Mensajes
          <ion-badge>{{ messageCount }}</ion-badge>
        </ion-list-header>
        <ion-item
          class="chat-separated"
          v-for="animal in animalList"
          :key="animal.id"
        >
          <ion-avatar>
            <img :src="animal.pictures[0].image" />
          </ion-avatar>
          <ion-label>
            <div class="info-chat">
              <h2>{{ animal.name }}</h2>
              <ion-icon :icon="ellipse"></ion-icon>
            </div>
            <p>Último mensaje recibido</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { ellipse } from "ionicons/icons";
import {
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  // IonSearchbar,
  IonListHeader,
  IonAvatar,
  IonContent,
  IonBadge,
  IonText,
  IonIcon,
} from "@ionic/vue";

export default {
  name: "chat-center",
  components: {
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    // IonSearchbar,
    IonListHeader,
    IonAvatar,
    IonContent,
    IonBadge,
    IonText,
    IonIcon,
  },
  data() {
    return {
      messageCount: 0,
      ellipse,
    };
  },

  methods: {
    ionChange(event) {
      const searchedInput = event.target.value;

      if (searchedInput.trim() !== "") {
        this.searchedAnimal = this.animalsList.filter((animal) => {
          return animal.name
            .toLowerCase()
            .startsWith(searchedInput.toLowerCase());
        });
      } else {
        this.searchedAnimal = this.animalsList;
      }
    },
    chat(animalId, userId) {
      this.$router.push({
        name: "contact-info",
        params: {
          idUser: userId,
        },
      });
    },
  },
  computed: {
    animalList() {
      return this.$store.getters.getFavoriteAnimals;
    },
  },
};
</script>
<style scoped>
h2,
h4 {
  color: #27303b;
}
ion-avatar {
  width: 85px !important;
  height: 85px !important;
  max-width: 85px !important;
  max-height: 985px !important;
  margin-bottom: 10px;
  margin-top: 10px;
}
.chat-separated {
  margin-bottom: 0.9rem;
}
ion-icon {
  margin-left: 15px;
}
ion-list-header,
ion-text {
  color: #ed576b;
  font-size: 18px;
  padding-left: 0;
  font-weight: 700;
}

ion-badge {
  margin-left: 0.5rem;
  background-color: #ed576b;
}
.favorite-animals-list {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
}
.favorite-animals-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0.8rem;
  margin-top: 0.3rem;
}
.scroll {
  overflow: auto;
}
ion-icon {
  color: #ed576b;
  font-size: 10px;
  margin: 0;
  margin-left: 5px;
  padding: 0;
}
.info-chat {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>