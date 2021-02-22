<template>
  <ion-card>
    <ion-slides :options="animalPicturesSliderOptions" pager="true">
      <ion-slide v-for="picture in animal.pictures" :key="picture">
        <img :src="picture" />
      </ion-slide>
    </ion-slides>
    <ion-card-header>
      <ion-chip outline color="medium">
        <ion-icon :icon="maleFemaleOutline"></ion-icon>
        <ion-label>{{ animal.sex }}</ion-label>
      </ion-chip>
      <ion-chip outline color="medium">
        <ion-icon :icon="pawOutline"></ion-icon>
        <ion-label>{{ animal.species }}</ion-label>
      </ion-chip>
      <div class="header-info">
        <div class="header-name-location">
          <ion-card-title> {{ animal.name }} </ion-card-title>
          <ion-card-subtitle color="tertiary">
          {{ animal.location }}
          </ion-card-subtitle>
        </div>
        <ion-button @click="openPopover" fill="clear" size="large" class="button-native">
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
    </ion-card-header>
    <ion-card-content>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis est
      sed minima vero voluptates enim tempore, libero illo molestias repellat
      facere. In odit qui sint vitae esse amet quos iure...
    </ion-card-content>
    <div>
      <ion-chip  color="dark" id="footer-chip" class="adoption-type-chip">
        <ion-label>{{ animal.adoptionType }}</ion-label>
      </ion-chip>
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
  IonText,
  IonButton,
  IonItem,
} from "@ionic/vue";
import {
  heartOutline,
  removeOutline,
  maleFemaleOutline,
  pawOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
export default {
  components: {
    IonSlides,
    IonSlide,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonText,
    IonButton,
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
      ellipsisHorizontal,
      animalPicturesSliderOptions: {
        loop: true,
      },
    };
  },
};
</script>

<style scoped>
ion-card{
  margin-bottom:100px
}

ion-card-content {
  text-align: justify;
}

.header-info{
  display:flex;
  flex-direction:row;
  justify-content: space-between;
}
img {
  height: 40vh; 
  object-fit: cover;
  display: block;
  width:100vw;
  
}
.header-name-location{
  align-items: flex-start;
}
 ion-card-subtitle{
  color:var(--ion-color-dark);
  padding-top: 5px;
  text-align: start;
}
ion-card-title{
  text-align: start;
  color: var(--ion-color-dark)
}
ion-chip{
  margin-top: 0px;
  margin-bottom: 15px;
}
.adoption-type-chip{
  align-self:start;
  margin-left:20px
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
ion-button::part(native){
padding-inline-end:0px;
height:30px
}
</style>