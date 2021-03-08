<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <back-button href="" @click="goBack"></back-button>
        <ion-title>Editar Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item class="profile-image">
      <img src="/assets/user.svg" />
    </ion-item>
    <ion-content class="ion-padding" :fullscreen="true">
      <form @submit.prevent="updateUserInfo">
        <ion-list>
          <ion-item>
            <ion-label position="fixed">Nombre</ion-label>
            <ion-input
              class="secondary-label"
              type="text"
              v-model="newName"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Bio</ion-label>
            <ion-textarea
              class="secondary-label"
              v-model="newBio"
              rows="1"
              auto-grow
            ></ion-textarea>
          </ion-item>
          <!-- Province selection -->
          <ion-item>
            <ion-label>Localización</ion-label>
            <ion-select
              interface="action-sheet"
              cancelText="Cancelar"
              v-model="newLocation"
              class="select-text"
              :interface-options="options"
            >
              <ion-select-option
                v-for="province in provincesLabels"
                :key="province.value"
                :value="province.value"
                >{{ province.label }}
              </ion-select-option>
              <ion-select-option value=""></ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item class="phone">
            <ion-label position="fixed"
              >Teléfono</ion-label
            >
            <ion-input
              class="secondary-label"
              type="text"
              pattern="(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}"
              v-model="newPhone"
            ></ion-input>
          </ion-item>
        </ion-list>
        <!-- <ion-button class="btn" type="submit" expand="block" fill="solid">GUARDAR</ion-button> -->
          <cta-button>GUARDAR</cta-button>
      </form>
      <ion-item-divider ></ion-item-divider>
      <ion-list class="list">
        <ion-item @click="toFavoriteAnimals">
          <ion-label class="fav-list">Lista de Mis <i class="fas fa-heart"></i></ion-label>
          <ion-icon name="chevron-forward" class="fav-icon"></ion-icon>
        </ion-item>
        <!-- <ion-item @click="someClick">
                <ion-label>Notificaciones</ion-label>
                <ion-icon name="chevron-forward" end></ion-icon>
            </ion-item>
            <ion-item @click="someClick">
                <ion-label>Cambiar Contraseña</ion-label>
                <ion-icon name="chevron-forward" end></ion-icon>
            </ion-item> -->
      </ion-list>
      <div class="log-out-options">
      <a href="" @click="logOutUser">Cerrar sesión</a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { provinces } from "../utils/labels";
import { chevronBackOutline, heart } from "ionicons/icons";
import BackButton from "../ui/BackButton.vue";
import CtaButton from "../ui/CtaButton.vue";
import { clearStorage } from "../utils/storePassword.js";
// import {getCurrentUser} from '../firebaseConfig.js';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  // IonButton,
  // IonButtons,
  IonIcon,
  toastController,
  IonItemDivider
} from "@ionic/vue";

export default {
  name: "edit-profile",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    // IonButton,
    // IonButtons,
    IonIcon,
    BackButton,
    CtaButton,
      IonItemDivider

  },
  data() {
    return {
      newPhone: "",
      newName: undefined,
      newLocation: "",
      newBio: "",
      chevronBackOutline,
      heart,
      provincesLabels: provinces,
            options: {
        cssClass: "my-custom-interface",
      },
    };
  },
  async ionViewWillEnter() {
    const userLogged = this.$store.getters.getLoggedUserInfo;
    if (!userLogged) {
      return;
    }
    this.newName = userLogged.name;
    this.newBio = userLogged.description || "";
    this.newPhone = userLogged.phoneNumber || "";
    this.newLocation = userLogged.location || "";

    this.newName = userLogged.name;
    this.newBio = userLogged.description;
    this.newPhone = userLogged.phoneNumber;
    this.newLocation = userLogged.location;
    console.log("UserLogged.uid: ", userLogged.uid);
    console.log("getter getUserId: ", this.$store.getters.getUserId);
  },
  methods: {
    toFavoriteAnimals() {
      this.$router.push({ name: "liked-animals" });
    },
    async logOutUser() {
      try {
        this.$store.dispatch("logOutUser");
      } catch (error) {
        console.log(error);
      }
      clearStorage();
    },
    async updateUserInfo() {
      const newInfo = {
        name: this.newName,
        description: this.newBio,
        phoneNumber: this.newPhone,
        location: this.newLocation,
      };

      const toast = await toastController.create({
        color: "success",
        duration: 2000,
        message: "Profile Saved Succesfully!",
        showCloseButton: true,
        // position: 'top',
      });

      // TODO: Esperar que se actualice la info del user. Mostrar un toast danger si existe un error (try catch)
      try {
        this.$store.dispatch("updateUser", newInfo);
        await toast.present();
      } catch (error) {
        toast.message = error
        toast.color = "danger"
        console.log("Error edit profile: ", error);
      }
    },
    goBack() {
      //This makes us go back
      this.$router.push({ name: "admin-animals", replace: true }); //Esto debería ir a adminAnimals
    },
  },
};
</script>

<style scoped>
.log-out-options {
    position: fixed;
    bottom: 100px;
    margin: 0;
    left: 16px;
    right: 16px;
}
ion-item-divider {
  margin-top: 0px;
  min-height: 1.5rem;
  width: 110vw;
  padding: 0;
  margin-left: -2rem
}

.md ion-list{
  padding-bottom: 0;
}

.md ion-item-divider{ 
  background-color:var(--ion-color-light);
  --inner-border-width:0;
  border: 0;
}

.profile-image{
  width: 6.5rem;
  --inner-border-width:0;
  margin:2rem auto 0 auto;
}

ion-label {
  font-weight: 700;
  color: var(--ion-color-dark) !important;
}

.fa-heart {
  color: var(--ion-color-secondary);
}

a{
  text-decoration: none;
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

.fav-list{
  font-weight: 500;
}

.phone{
 --inner-border-width:0; 
}

.fav-icon {
    font-size: 1.2rem;
    color: var(--ion-color-dark);
    padding-right: 0.5rem;
}

</style>

