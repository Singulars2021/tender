<template>
  <span>
    <form action="" class="ion-padding" @submit.prevent="addAnimal">
      <ion-list>
        <!-- Image item -->
        <ion-item v-if="imagesList.length == 0">
          <div class="image">
            <!-- <ion-icon :icon="imagesOutline" size="large" @click="takePicture"></ion-icon> -->
            <img
              src="../../public/assets/add-image-icon.svg"
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
                <div>
                  <img class="image-preview" :src="imageToPreview" />
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
          <ion-input
            v-model="name"
            type="text"
            @ionBlur="onFormEdit"
          ></ion-input>
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
        <!-- Age item -->
        <ion-item>
          <ion-label>Edad</ion-label>
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

        <!-- Size item -->
        <ion-item>
          <ion-label>Tamaño</ion-label>
          <ion-select
            v-model="size"
            okText="Aceptar"
            cancelText="Cancelar"
            @ionChange="onFormEdit"
            :interface-options="options"
          >
            <ion-select-option
              v-for="size in sizeLabels"
              :key="size.value"
              :value="size.value"
              >{{ size.label }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <!-- Adoption Type Item -->
        <ion-item>
          <ion-label>Tipo de adopción</ion-label>
          <ion-select
            v-model="adoptionType"
            okText="Aceptar"
            cancelText="Cancelar"
            @ionChange="onFormEdit"
            :interface-options="options"
          >
            <ion-select-option
              v-for="adoptionType in adoptionTypeLabels"
              :key="adoptionType.value"
              :value="adoptionType.value"
              >{{ adoptionType.label }}</ion-select-option
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
      <div v-if="!animal">
        <cta-button>GUARDAR</cta-button>
      </div>
      <div v-else>
        <cta-button class="change">Modificar datos</cta-button>
      </div>
    </form>
    <div v-if="animal">
      <cta-button @click="eliminar" class="delete">Eliminar</cta-button>
    </div>
  </span>
</template>

<script>
import {
  provinces,
  sex,
  species,
  age,
  adoptionType,
  size,
} from "../utils/labels";

import {
  IonList,
  IonText,
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
import CtaButton from "../ui/CtaButton.vue";
import { alertController } from "@ionic/vue";

const { Camera } = Plugins;

export default {
  props: ["animal"],
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
    IonText,
    IonFabButton,
  },

  data() {
    return {
      id: undefined,
      name: "",
      age: undefined,
      sex: undefined,
      species: undefined,
      location: undefined,
      adoptionType: undefined,
      size: undefined,
      description: "",
      images,
      imageOutline,
      trash,
      imagesList: [],
      oldImgId: [],
      error: null,
      isOpen: false,
      imageToPreview: undefined,
      imageToDelete: undefined,
      speciesLabels: species,
      sizeLabels: size,
      ageLabels: age,
      sexLabels: sex,
      provincesLabels: provinces,
      adoptionTypeLabels: adoptionType,
      userId: undefined,
      isFormValid: true,
      options: {
        cssClass: "my-custom-interface",
      },
    };
  },
  beforeUpdate() {
    if (this.animal) {
      this.id = this.animal.id;
      this.name = this.animal.name;
      this.age = this.animal.age;
      this.sex = this.animal.sex;
      this.species = this.animal.species;
      this.size = this.animal.size;
      this.adoptionType = this.animal.adoptionType;
      this.location = this.animal.location;
      this.description = this.animal.description;

      for (var i = 0; i < this.animal.pictures.length; i++) {
        this.imagesList.push({
          id: this.animal.pictures[i].id,
          preview: this.animal.pictures[i].image,
        });
        this.oldImgId.push(this.animal.pictures[i].id);
      }
    }
  },
  methods: {
    async eliminar() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Alert",
        subHeader: "Eliminar",
        message: "Estas seguro que quieres elimnar?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Eliminar",
            handler: async () => {
              await this.$store.dispatch("removeAnimal", this.animal.id);
              this.$router.push({ name: "admin-animals" });
            },
          },
        ],
      });
      return alert.present();
    },

    onFormEdit() {
      this.isFormValid = true;
    },
    addAnimal(e) {
      console.log(e);
      this.isFormValid = true;
      if (
        this.name.trim == "" ||
        typeof this.age != "number" ||
        typeof this.location != "number" ||
        typeof this.sex != "number" ||
        typeof this.species != "number" ||
        typeof this.size != "number" ||
        typeof this.adoptionType != "number" ||
        this.description.trim == "" ||
        this.imagesList.length == 0
      ) {
        this.isFormValid = false;
        return;
      }

      const animal = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        species: this.species,
        size: this.size,
        adoptionType: this.adoptionType,
        location: this.location,
        description: this.description,
        creationDate: null,
        disableDate: null,
        disable: false,
        updateDate: null
      };

      if (!this.animal) {
        animal.creationDate = new Date();
        this.$store.dispatch("insertNewAnimal", {
          animalFields: animal,
          animalPhotos: this.imagesList,
        });
      } else {
        animal.creationDate = this.animal.creationDate;
        console.log(this.imagesList);
        this.$store.dispatch("updateAnimal", {
          animalFields: animal,
          animalPhotos: this.imagesList,
          oldImgId: this.oldImgId,
          animalId: this.id,
        });
      }
      this.clearForm();
      //this.$store.dispatch("getAnimals");
      this.$router.push({ name: "admin-animals" });
      // this.$store.dispatch("", {
      //   animalFields: animal,
      // });
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
    clearForm() {
      (this.id = undefined),
        (this.name = ""),
        (this.age = undefined),
        (this.location = undefined),
        (this.sex = undefined),
        (this.species = undefined),
        (this.description = undefined),
        (this.imagesList = []),
        (this.adoptionType = undefined),
        (this.size = undefined);
      this.oldImgId = [];
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 80px;
}

ion-label {
  font-weight: 700;
  color: var(--ion-color-dark) !important;
}
ion-select::part(icon) {
  display: none;
}

ion-select::part(text) {
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
ion-input:part(native) {
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
  min-width: 15vw;
}
ion-icon {
  color: var(--ion-color-medium);
}

.icon-trash {
  color: white;
}

.delete {
  bottom: 60px;
  --background: var(--ion-color-danger-tint);
  --color: var(--ion-color-dark);
}

.change {
  bottom: 10px;
}

</style>