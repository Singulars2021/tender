<template>
  <form action="" class="ion-padding" @submit.prevent="addAnimal">
    <ion-list>
      <!-- Image item -->
      <ion-item v-if="imagesList.length == 0">
        <div class="image">
          <!-- <ion-icon :icon="imagesOutline" size="large" @click="takePicture"></ion-icon> -->
          <img src="../../public/assets/images-outline.svg" alt="svg add image" width="100" height="100" @click="takePicture">
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
        <ion-label position="fixed">Nombre</ion-label>
        <ion-input v-model="name" type="text" required></ion-input>
      </ion-item>
      <!-- Age item -->
      <ion-item>
        <ion-label position="fixed">Edad</ion-label>
        <ion-input v-model="age" type="text" required></ion-input>
      </ion-item>
      <!-- Sex item -->
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select v-model="sex" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option value="f">Femenino</ion-select-option>
          <ion-select-option value="m">Masculino</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Species Item -->
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select v-model="species" okText="Aceptar" cancelText="Cancelar">
          <ion-select-option value="0">Gato</ion-select-option>
          <ion-select-option value="1">Perro</ion-select-option>
          <ion-select-option value="2">Tortuga</ion-select-option>
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
          <ion-select-option clas="red-option" value="alava">Álava</ion-select-option>
          <ion-select-option value="albacete">Albacete</ion-select-option>
          <ion-select-option value="alicante"
            >Alicante/Alacant</ion-select-option
          >
          <ion-select-option value="almeria">Almería</ion-select-option>
          <ion-select-option value="asturias">Asturias</ion-select-option>
          <ion-select-option value="avila">Ávila</ion-select-option>
          <ion-select-option value="badajoz">Badajoz</ion-select-option>
          <ion-select-option value="barcelona">Barcelona</ion-select-option>
          <ion-select-option value="burgos">Burgos</ion-select-option>
          <ion-select-option value="caceres">Cáceres</ion-select-option>
          <ion-select-option value="cadiz">Cádiz</ion-select-option>
          <ion-select-option value="cantabria">Cantabria</ion-select-option>
          <ion-select-option value="castellon"
            >Castellón/Castelló</ion-select-option
          >
          <ion-select-option value="ceuta">Ceuta</ion-select-option>
          <ion-select-option value="ciudadreal">Ciudad Real</ion-select-option>
          <ion-select-option value="cordoba">Córdoba</ion-select-option>
          <ion-select-option value="cuenca">Cuenca</ion-select-option>
          <ion-select-option value="girona">Girona</ion-select-option>
          <ion-select-option value="laspalmas">Las Palmas</ion-select-option>
          <ion-select-option value="granada">Granada</ion-select-option>
          <ion-select-option value="guadalajara">Guadalajara</ion-select-option>
          <ion-select-option value="guipuzcoa">Guipúzcoa</ion-select-option>
          <ion-select-option value="huelva">Huelva</ion-select-option>
          <ion-select-option value="huesca">Huesca</ion-select-option>
          <ion-select-option value="illesbalears"
            >Illes Balears</ion-select-option
          >
          <ion-select-option value="jaen">Jaén</ion-select-option>
          <ion-select-option value="acoruña">A Coruña</ion-select-option>
          <ion-select-option value="larioja">La Rioja</ion-select-option>
          <ion-select-option value="leon">León</ion-select-option>
          <ion-select-option value="lleida">Lleida</ion-select-option>
          <ion-select-option value="lugo">Lugo</ion-select-option>
          <ion-select-option value="madrid">Madrid</ion-select-option>
          <ion-select-option value="malaga">Málaga</ion-select-option>
          <ion-select-option value="melilla">Melilla</ion-select-option>
          <ion-select-option value="murcia">Murcia</ion-select-option>
          <ion-select-option value="navarra">Navarra</ion-select-option>
          <ion-select-option value="ourense">Ourense</ion-select-option>
          <ion-select-option value="palencia">Palencia</ion-select-option>
          <ion-select-option value="pontevedra">Pontevedra</ion-select-option>
          <ion-select-option value="salamanca">Salamanca</ion-select-option>
          <ion-select-option value="segovia">Segovia</ion-select-option>
          <ion-select-option value="sevilla">Sevilla</ion-select-option>
          <ion-select-option value="soria">Soria</ion-select-option>
          <ion-select-option value="tarragona">Tarragona</ion-select-option>
          <ion-select-option value="santacruztenerife"
            >Santa Cruz de Tenerife</ion-select-option
          >
          <ion-select-option value="teruel">Teruel</ion-select-option>
          <ion-select-option value="toledo">Toledo</ion-select-option>
          <ion-select-option value="valencia"
            >Valencia/Valéncia</ion-select-option
          >
          <ion-select-option value="valladolid">Valladolid</ion-select-option>
          <ion-select-option value="vizcaya">Vizcaya</ion-select-option>
          <ion-select-option value="zamora">Zamora</ion-select-option>
          <ion-select-option value="zaragoza">Zaragoza</ion-select-option>
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
import { images, imagesOutline, trash } from "ionicons/icons";
import { Plugins, CameraResultType } from "@capacitor/core";
import CtaButton from "../ui/CtaButton.vue"

const { Camera } = Plugins;

/*function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}*/

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
  setup() {
    const options={
      cssClass: 'my-custom-interface'
    };

    return { options }
  },
  data() {
    return {
      name: undefined,
      age: undefined,
      sex: undefined,
      species: undefined,
      location: undefined,
      image: undefined,
      description: undefined,
      images: images,
      imagesOutline: imagesOutline,
      trash: trash,
      imagesList: [],
      error: null,
      isOpen: false,
      imageToPreview: undefined,
      imageToDelete: undefined,
    };
  },
  methods: {
    addAnimal() {
      let url =
        "https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app/animalsList.json";
      const newAnimal = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        species: this.species,
        location: this.location,
        image: this.image,
        description: this.description,
      };

      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
      };
      //this.uploadPhotos()
      fetch(url, postOptions)
        .then((response) => {
          if (response.ok) {
            this.openToast("El animal se ha añadido correctamente", response);
          }
        })
        .catch((response) => {
          if (!response.ok) {
            this.openToast("Ha ocurrido un error", response);
          }
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
      this.imageToDelete = index - 1 
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
.my-custom-interface .red-option{
  --color:red !important;
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