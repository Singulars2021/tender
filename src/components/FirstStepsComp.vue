<template>
  <form action="" class="ion-padding" @submit.prevent="redirectToPage">
    <ion-text class="ion-text-right">Para empezar quiero...</ion-text>
    <ion-list>
      <ion-item>
        <ion-radio-group v-model="option" @ionChange="redirectOptions($event)">
          <ion-item ionFocus="redirectOptions">
            <ion-label>adoptar</ion-label>
            <ion-radio slot="start" value="adoptar"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>dar en adopción</ion-label>
            <ion-radio slot="start" value="darAdopcion"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-item>
    </ion-list>

    <cta-button>Aceptar</cta-button>
  </form>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonText,
} from "@ionic/vue";
import CtaButton from "../ui/CtaButton.vue";

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonText,
    CtaButton,
  },
  data() {
    return {
      error: null,
      option: undefined,
      value: "",
    };
  },
  methods: {
    redirectOptions(e) {
      this.value = e.detail.value;
    },
    redirectToPage() {
      if (this.value == "adoptar") {
        this.$router.push({ name: "slider" });
      } else {
        this.$router.push({ name: "animal-form" });
      }
    },
  },
};
</script>

<style scoped>
form {
  font-family: "Quicksand", sans-serif;
  margin-top: 5em;
  margin-left: 1em;
}
ion-text {
  font-size: 3em;
}
ion-list {
  margin-top: 1.5em;
}
ion-item {
  --inner-border-width: 0;
}
</style>