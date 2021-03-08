<template>
  <ion-card>
    <ion-slides :options="animalPicturesSliderOptions" pager="true">
      <ion-slide v-for="picture in animal.pictures" :key="picture">
        <img :src="picture.image" />
      </ion-slide>
    </ion-slides>
    <ion-card-header>
      <ion-chip outline color="medium">
        <ion-icon :icon="maleFemaleOutline"></ion-icon>
        <ion-label>{{ getSexLabel(animal.sex) }}</ion-label>
      </ion-chip>
      <ion-chip outline color="medium">
        <ion-icon :icon="pawOutline"></ion-icon>
        <ion-label>{{ getSpeciesLabel(animal.species) }}</ion-label>
      </ion-chip>
      <div class="header-info">
        <div class="header-name-location">
          <ion-card-title> {{ animal.name }} </ion-card-title>
          <ion-card-subtitle color="tertiary">
            {{ getProvinceLabel(animal.location) }}
          </ion-card-subtitle>
        </div>
        <ion-button
          @click="presentActionSheet(animal.id)"
          fill="clear"
          size="large"
          class="button-native"
        >
          <ion-icon :icon="ellipsisHorizontal"></ion-icon>
        </ion-button>
      </div>
    </ion-card-header>
    <ion-card-content>
      {{ animal.description }}
    </ion-card-content>
    <div>
      <ion-chip color="dark" id="footer-chip" class="adoption-type-chip">
        <ion-label>{{ getAdoptionTypeLabel(animal.adoptionType) }}</ion-label>
      </ion-chip>
    </div>
  </ion-card>
</template>

<script>
import { provinces, sex, age, species, adoptionType } from "../utils/labels.js";
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
  IonButton,
  actionSheetController,
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
    IonButton,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonChip,
    IonLabel,
  },
  props: ["animal", "user"],
  methods: {
    openPopover() {
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.isPopoverOpen = false;
    },
    getSexLabel(value) {
      return this.sexLabels[value].label;
    },
    getSpeciesLabel(value) {
      return this.speciesLabels[value].label;
    },
    getAdoptionTypeLabel(value) {
      return this.adoptionTypeLabels[value].label;
    },
    getAgeLabel(value) {
      return this.ageLabels[value].label;
    },
    getProvinceLabel(value) {
      return this.provincesLabels[value - 1].label;
    },
    async presentActionSheet(id) {
      const actionSheet = await actionSheetController.create({
        cssClass: "action-sheet-style",
        buttons: [
          {
            text: "Denunciar",
            role: "destructive",
            handler: () => {
              this.$router.push({ name: "report-animal", params: {id: id} });
            },
          },
          {
            text: "Contactar",
            handler: () => {
              this.$router.push({
                name:"contact-info",
                params:{idUser: this.animal.userId} 
              })
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      });
      return actionSheet.present();
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
      sexLabels: sex,
      speciesLabels: species,
      provincesLabels: provinces,
      ageLabels: age,
      adoptionTypeLabels: adoptionType,
    };
  },
};
</script>

<style scoped>
ion-card {
  margin-bottom: 15vh;
}

ion-card-content {
  text-align: justify;
}

.header-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
img {
  height: 40vh;
  object-fit: cover;
  display: block;
  width: 100vw;
}
.header-name-location {
  align-items: flex-start;
}
ion-card-subtitle {
  color: var(--ion-color-dark);
  padding-top: 5px;
  text-align: start;
}
ion-card-title {
  text-align: start;
  color: var(--ion-color-dark);
}
.md ion-card-title {
  font-size: 28px;
  font-weight: 700;
}
.md ion-card-subtitle {
  font-size: 14px;
  font-weight: 700;
}
ion-chip {
  margin-top: 0px;
  margin-bottom: 15px;
}
.adoption-type-chip {
  align-self: start;
  margin-left: 20px;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
ion-button::part(native) {
  padding-inline-end: 0px;
  height: 30px;
}
ion-text {
  padding-left: 18px;
}
item-inner {
  padding-left: 18px;
}
ion-button {
  font-size: 18px;
}
</style>