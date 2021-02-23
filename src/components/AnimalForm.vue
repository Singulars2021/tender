<template>
  <form action="" class="ion-padding" @submit.prevent="addAnimal">
    <ion-list>
      <!-- Image item -->
      <ion-item v-if="imagesList.length == 0">
        <div class="image">
          <!-- <ion-icon :icon="imagesOutline" size="large" @click="takePicture"></ion-icon> -->
          <img
            src="../../public/assets/images-outline.svg"
            alt="svg add image"
            width="100"
            height="100"
            @click="takePicture"
          />
        </div>
      </ion-item>
      <ion-item v-else>
        <div class="image">
          <ion-grid>
            <ion-row>
              <ion-col v-for="index in 5" :key="index">
                <ion-icon
                  :icon="imagesOutline"
                  size="large"
                  @click="takePicture"
                  v-if="index > imagesList.length"
                ></ion-icon>
                <div class="preview" v-else>
                  <img
                    :src="imagesList[index - 1].preview"
                    @click="setOpen(index)"
                  />
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-modal
            :is-open="isOpen"
            @onDidDismiss="setClose"
            css-class="image-modal"
          >
            <div>
              <img :src="imageToPreview" />
              <ion-fab vertical="bottom" horizontal="center">
                <ion-fab-button color="danger">
                  <ion-icon
                    :icon="trash"
                    size="large"
                    @click="deleteImage()"
                  ></ion-icon>
                </ion-fab-button>
              </ion-fab>
            </div>
          </ion-modal>
        </div>
        <p v-if="error">{{ error }}</p>
      </ion-item>

      <!-- Name item -->
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input v-model="name" type="text" @ionBlur="onFormEdit"></ion-input>
      </ion-item>
      <!-- Age item -->
      <ion-item>
        <ion-label position="floating">Edad</ion-label>
        <ion-select
          v-model="age"
          okText="Aceptar"
          cancelText="Cancelar"
          @ionChange="onFormEdit"
        >
          <ion-select-option
            v-for="age in ageLabels"
            :key="age.value"
            :value="age.value"
            >{{ age.label }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <!-- Sex item -->
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select
          v-model="sex"
          okText="Aceptar"
          cancelText="Cancelar"
          @ionChange="onFormEdit"
        >
          <ion-select-option
            v-for="sex in sexLabels"
            :key="sex.value"
            :value="sex.value"
            >{{ sex.label }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <!-- Species Item -->
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select
          v-model="species"
          okText="Aceptar"
          cancelText="Cancelar"
          @ionChange="onFormEdit"
        >
          <ion-select-option
            v-for="specie in speciesLabels"
            :key="specie.value"
            :value="specie.value"
            >{{ specie.label }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <!-- Location Item -->
      <ion-item>
        <ion-label>Localización</ion-label>
        <ion-select
          v-model="location"
          interface="action-sheet"
          cancelText="Cancelar"
          @ionChange="onFormEdit"
        >
          <ion-select-option
            v-for="province in provincesLabels"
            :key="province.value"
            :value="province.value"
            >{{ province.label }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <!-- Description Item -->
      <ion-item>
        <ion-label position="floating">Descripción</ion-label>
        <ion-textarea
          v-model="description"
          rows="1"
          auto-grow
          @ionBlur="onFormEdit"
        ></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-text v-if="!isFormValid" color="danger">
      <h4>Por favor, rellena todos los campos antes de guardar.</h4>
    </ion-text>
    <ion-button type="submit" expand="block" fill="solid">Guardar</ion-button>
  </form>
</template>

<script>
import { sex, species, provinces, age } from "../utils/labels";

import {
  IonList,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  toastController,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonModal,
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import { images, imagesOutline, trash } from "ionicons/icons";
import { Plugins, CameraResultType } from "@capacitor/core";

const { Camera } = Plugins;

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonModal,
    IonFab,
    IonText,
    IonFabButton,
  },
  data() {
    return {
      name: "",
      age: "",
      sex: "",
      species: "",
      location: "",
      description: "",
      images,
      imagesOutline,
      trash,
      imagesList: [],
      error: null,
      isOpen: false,
      imageToPreview: undefined,
      imageToDelete: undefined,
      speciesLabels: species,
      ageLabels: age,
      sexLabels: sex,
      provincesLabels: provinces,
      userId: undefined,
      isFormValid: true,
      // isNameValid: true,
      // isAgeValid: true,
      // isLocationValid: true,
      // isSpeciesValid: true,
      // isDescriptionValid: true,
      // isSexValid: true,
    };
  },
  methods: {
    onFormEdit() {
      this.isFormValid = true;
    },
    // nameValidation() {
    //   const regex = new RegExp('[a-zA-ZÀÁÈÉÍÒÓÚàáèéíóòú]{3, 20}');
    //   if()
    // },

    // ageValidation() {},

    // formValidation() {

    // },

    addAnimal() {
      this.isFormValid = true;
      if (
        this.name.length > 0 &&
        this.age.length > 0 &&
        this.location.length > 0 &&
        (this.sex.length > 0) & (this.species.length > 0) &&
        this.description.length > 0 &&
        this.imagesList.length > 0
      ) {
        const animal = {
          name: this.name,
          age: this.age,
          sex: this.sex,
          species: this.species,
          location: this.location,
          description: this.description,
        };

        this.$store.dispatch("insertNewAnimal", {
          animalFields: animal,
          animalPhotos: this.imagesList,
        });
      } else {
        this.isFormValid = false;
      }
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
    async takePicture() {
      if (this.imagesList.length < 5) {
        const image = await Camera.getPhoto({
          quality: 60,
          resultType: CameraResultType.Base64,
        });

        this.imagesList.push({
          ...image,
          id: new Date().toISOString,
          preview: "data:image/jpeg;base64," + image.base64String,
        });
      } else {
        this.error = "You can only upload 5 pictures!";
      }
    },
    setOpen(index) {
      this.isOpen = true;
      this.imageToPreview = this.imagesList[index - 1].preview;
      this.imageToDelete = index - 1;
    },
    setClose() {
      this.isOpen = false;
    },
    deleteImage() {
      this.imagesList.splice(this.imageToDelete, 1);
      this.isOpen = false;
    },
    /*async uploadPhotos() {
      for (let i = 0; i < this.imagesList.length; i++) {
        await this.uploadPhoto(i);
      }
    },
    async uploadPhoto(index) {
      const user = auth.currentUser;
      const guid = uuidv4();
      const filePath = `${user?.uid}/images/${guid}.${this.imagesList[index].format}`;
      const storageRef = storage.ref();

      await storageRef
        .child(filePath)
        .putString(this.imagesList[index].base64String, "base64");
      const url = await storageRef.child(filePath).getDownloadURL();

      await db.collection("users").doc(user?.uid).collection("images").add({
        image: url,
      });
    },*/
  },
};
</script>

<style scoped>
ion-label {
  font-weight: 700;
}
div.image {
  margin: 0 auto;
}
ion-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-col img {
  border-radius: 10px;
}
</style>