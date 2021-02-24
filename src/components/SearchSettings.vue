<template>
  <form action="" class="ion-padding" @submit.prevent="updateFilters">
    <ion-title class="sub-title">AJUSTES DE BÚSQUEDA</ion-title>
    <ion-list>
      <ion-item>
        <ion-label>Localización</ion-label>
        <ion-select
          v-model="location"
          interface="action-sheet"
          cancelText="Cancelar"
        >
          <ion-select-option
            v-for="province in provincesLabels"
            :key="province.value"
            :value="province.value"
            >{{ province.label }}</ion-select-option
          >
          <ion-select-option value="">Cualquiera</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <!-- <ion-item>
      <ion-label position="floating">Distáncia máxima</ion-label>
      <ion-range min="1" max="100" pin color="secondary">
        <ion-label slot="start">1km</ion-label>
        <ion-label slot="end">100km</ion-label>
        <ion-icon slot="start" size="small" name="contrast"></ion-icon>
        <ion-icon slot="end" name="contrast"></ion-icon>
      </ion-range>
    </ion-item> -->
    <ion-title class="sub-title">AJUSTES DE PERFIL</ion-title>
    <ion-list>
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select v-model="species" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option
            v-for="specie in speciesLabels"
            :key="specie.value"
            :value="specie.value"
            >{{ specie.label }}</ion-select-option
          >
          <ion-select-option value="">Cualquiera</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select v-model="sex" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option
            v-for="sex in sexLabels"
            :key="sex.value"
            :value="sex.value"
            >{{ sex.label }}</ion-select-option
          >
          <ion-select-option value="">Cualquiera</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Edad</ion-label>
        <ion-select v-model="age" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option
            v-for="age in ageLabels"
            :key="age.value"
            :value="age.value"
            >{{ age.label }}</ion-select-option
          >
          <ion-select-option value="">Cualquiera</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Tipo de adopcion</ion-label>
        <ion-select v-model="adoptionType"  okText="Aceptar" cancelText="Cancelar">
          <ion-select-option 
            v-for="adoptionType in adoptionTypeLabels"
            :key="adoptionType.value"
            :value="adoptionType.value">{{adoptionType.label}}</ion-select-option>
          <ion-select-option value="">Cualquiera</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block" fill="solid">Buscar</ion-button>
  </form>
</template>

<script>
import { sex, species, provinces, age, adoptionType } from "../utils/labels";
import {
  IonTitle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonButton,
  IonItem,
  //IonIcon,
  //IonRange,
  toastController,
} from "@ionic/vue";

export default {
  components: {
    IonList,
    IonTitle,
    IonItem,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    //IonIcon,
    //IonRange,
  },
  data() {
    return {
      age: undefined,
      sex: undefined,
      species: undefined,
      location: undefined,
      error: null,
      speciesLabels: species,
      ageLabels: age,
      sexLabels: sex,
      provincesLabels: provinces,
      adoptionTypeLabels: adoptionType,
      userId: undefined,
      adoptionType: undefined,
    };
  },
  methods: {
    updateFilters() {
      const filter = {
        age: this.age,
        sex: this.sex,
        species: this.species,
        location: this.location,
        adoptionType: this.adoptionType,
      };
 
      this.$store.dispatch("updateFilters", {
        filterFields: filter,
      });

      console.log(this.$store.getters.getFilters)
    },
    async openToast(msg, response) {
      const toast = await toastController.create({
        message: msg,
        response: response,
        duration: 3000,
        color: response.ok ? "success" : "danger",
      });
      return toast.present();
    },
  },
};
</script>

<style scoped>
.sub-title {
  font-size: small;
}
</style>