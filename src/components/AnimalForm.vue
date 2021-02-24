<template>
  <form action="" class="ion-padding" @submit.prevent="addAnimal">
    <ion-list>
      <!-- Image item -->
      <ion-item v-if="imagesList.length == 0">
        <div class="image">
          <!-- <ion-icon :icon="imagesOutline" size="large" @click="takePicture"></ion-icon> -->
          <img src="../../public/assets/add-image-icon.svg" alt="svg add image" width="100" height="100" @click="takePicture">
        </div>
      </ion-item>
      <ion-item v-else>
        <div class="image">
          <ion-grid>
            <ion-row>
              <ion-col v-for="index in 5" :key="index">
                <ion-icon
                  :icon="imageOutline"
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
              <div >
              <img  class="image-preview" :src="imageToPreview" />
              </div>
              <ion-fab vertical="bottom" horizontal="center">
                <ion-fab-button color="danger">
                  <ion-icon
                    class="icon-trash"
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
        <ion-label position="fixed">Nombre</ion-label>
        <ion-input v-model="name" type="text" required></ion-input>
      </ion-item>
      <!-- Age item -->
      <ion-item>
        <ion-label>Edad</ion-label>
        <ion-select v-model="age" okText="Aceptar" cancelText="Cancelar" required>
          <ion-select-option value="c">Cria</ion-select-option>
          <ion-select-option value="j">Joven</ion-select-option>
          <ion-select-option value="a">Adulto</ion-select-option>
          <ion-select-option value="s">Senior</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Sex item -->
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select v-model="sex" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option value="h">Hembra</ion-select-option>
          <ion-select-option value="m">Macho</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Species Item -->
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select v-model="species" okText="Aceptar" cancelText="Cancelar">
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
        <ion-label
        >Localización</ion-label>
        <ion-select
          v-model="location"
          interface="action-sheet"
          cancelText="Cancelar"
          :interface-options="options"
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
        <ion-label position="fixed">Descripción</ion-label>
        <ion-textarea v-model="description" rows="1" auto-grow></ion-textarea>
      </ion-item>
    </ion-list>
   <cta-button>GUARDAR</cta-button>
  </form>
</template>

<script>
import { sex, species, provinces, age } from "../utils/labels";

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
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
import { images, imageOutline, trash } from "ionicons/icons";
import { Plugins, CameraResultType } from "@capacitor/core";
import CtaButton from "../ui/CtaButton.vue"

const { Camera } = Plugins;

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    CtaButton,
    // IonFab,
    // IonFabButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonModal,
    IonFab,
    IonFabButton,
  },

  data() {
    return {
      name: undefined,
      age: undefined,
      sex: undefined,
      species: undefined,
      location: undefined,
      description: undefined,
      images: images,
      imageOutline: imageOutline,
      trash: trash,
      imagesList: [],
      error: null,
      isOpen: false,
      imageToPreview: undefined,
      imageToDelete: undefined,
      options: {
      cssClass: 'my-custom-interface'}
    };
  },
  methods: {
    addAnimal() {
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
form{
  margin-bottom: 80px;
}

ion-label {
  font-weight: 700;
  color:var(--ion-color-dark)!important
}
ion-select::part(icon){
  display: none;
}

ion-select::part(text){
  background-image: url("/chevron-forward-outline.svg");
  background-position: right;
  background-repeat: no-repeat; 
  height: 19px;
}

ion-select {
  max-width: 100%;
  width: 35%;
  right: auto;
  direction: ltr;
  padding-left: 0;
}
ion-input:part(native){
  max-width: 30%;
  width: 70%;
  right: auto;
  direction: ltr;
  padding-left: 0;
}


div.image {
  margin: 20px auto 50px auto;
  
}
ion-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-col img {
  border-radius: 10px;
  height: 9vh; 
  object-fit: cover;
  min-width:15vw
  
}
ion-icon{
  color:var(--ion-color-medium);
}

.icon-trash{
  color:white;
}
</style>