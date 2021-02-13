<template>
  <ion-card>
    <ion-slides :options="animalPicturesSliderOptions" pager="true">
      <ion-slide v-for="picture in animal.pictures" :key="picture">
        <img :src="picture" />
      </ion-slide>
    </ion-slides>
    <ion-card-header>
      <ion-chip outline color="primary">
        <ion-icon :icon="maleFemaleOutline"></ion-icon>
        <ion-label>{{ animal.sex }}</ion-label>
      </ion-chip>
      <ion-chip outline color="primary">
        <ion-icon :icon="pawOutline"></ion-icon>
        <ion-label>{{ animal.species }}</ion-label>
      </ion-chip>
      <ion-card-title> {{ animal.name }} </ion-card-title>
      <ion-card-subtitle color="tertiary">
        <ion-icon :icon="locationOutline"></ion-icon>
        {{ animal.location }}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis est
      sed minima vero voluptates enim tempore, libero illo molestias repellat
      facere. In odit qui sint vitae esse amet quos iure...
    </ion-card-content>
    <div>
      <ion-chip outline color="secondary" id="footer-chip">
        <ion-icon :icon="hourglassOutline"></ion-icon>
        <ion-label>{{ animal.adoptionType }}</ion-label>
      </ion-chip>
      <ion-button @click="openPopover" fill="clear" size="large">
        <ion-icon :icon="ellipsisHorizontal"></ion-icon>
      </ion-button>
      <ion-popover :is-open="isPopoverOpen">
        <ion-list>
          <ion-item><ion-text color="danger">Denunciar</ion-text> </ion-item>
          <ion-item>Copiar enlace</ion-item>
          <ion-item>Compartir en...</ion-item>
          <ion-item>
            <ion-button @click="closePopover" fill="clear" expand="full">
              Cancelar
            </ion-button>
          </ion-item>
        </ion-list>
      </ion-popover>
    </div>
  </ion-card>
</template>

<script>
import {
  IonSlides,
  IonSlide,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonChip,
  IonLabel,
  IonPopover,
  IonList,
  IonItem,
} from "@ionic/vue";
import {
  heartOutline,
  removeOutline,
  maleFemaleOutline,
  pawOutline,
  locationOutline,
  hourglassOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
export default {
  components: {
    IonSlides,
    IonSlide,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonChip,
    IonLabel,
    IonPopover,
    IonList,
    IonItem,
  },
  props: ["animal"],
  methods: {
    openPopover() {
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.isPopoverOpen = false;
    },
  },
  data() {
    return {
      isPopoverOpen: false,
      heartOutline,
      removeOutline,
      maleFemaleOutline,
      pawOutline,
      locationOutline,
      hourglassOutline,
      ellipsisHorizontal,
      animalPicturesSliderOptions: {
        loop: true,
      },
    };
  },
};
</script>

<style scoped>
ion-card-content {
  text-align: justify;
}
img {
  max-height: 40vh;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>