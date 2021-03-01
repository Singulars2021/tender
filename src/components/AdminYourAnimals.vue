<template>
  <!--animals grid-->
  <ion-grid>
    <ion-row>
      <ion-col>
        <admin-card
          @click="$emit('edit-animal', animal.id)"
          v-for="animal in animalsCreated"
          :key="animal.name"
          :img="animal.pictures[0]"
          :name="animal.name"
          :id="animal.id"
        ></admin-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import AdminCard from "./AdminCard.vue";
import { chevronForwardOutline, addCircleOutline } from "ionicons/icons";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
export default {
  emits: ["edit-animal"],
  props: ["animalsCreated"],
  data() {
    return {
      chevronForwardOutline,
      addCircleOutline,
    };
  },
  methods: {
    editAnimal() {
      console.log("funciona el emit", "este es el componente");
    },
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    AdminCard,
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
ion-button {
  width: fit-content;
  margin: 1rem;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2,
p {
  margin-left: 1rem;
  margin-right: 0.5rem;
  font-size: 1.2rem;
}
.animals-list {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.animals-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.logo {
  display: flex;
  align-self: start;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  width: 40px;
  height: 40px;
}
ion-fab-button {
  margin: 4rem 8rem;
}
ion-label {
  margin-left: 0px;
}
ion-avatar {
  margin: 0px;
}
ion-card {
  margin: 0px;
}
</style>