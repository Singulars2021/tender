<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-buttons slot="start">
          <ion-button  class="btn-back" @click="goBack">
            <ion-icon :icon="chevronBackOutline" ></ion-icon>
          </ion-button>
        </ion-buttons> -->
        <back-button href="" @click="goBack"></back-button>
        <ion-title>Editar Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" :fullscreen="true">
      <form @submit.prevent="updateUserInfo">
        <ion-list>
          <ion-item>
            <ion-label class="primary-label" position="stacked">Nombre</ion-label>
            <ion-input class="secondary-label" type="text" v-model="newName"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label class="primary-label" position="stacked">Bio</ion-label>
            <ion-textarea class="secondary-label" v-model="newBio"></ion-textarea>
          </ion-item>
          <!-- Province selection -->
          <ion-item>
            <ion-label class="primary-label">Localización</ion-label>
            <ion-select interface="action-sheet" cancelText="Cancelar"  v-model="newLocation" class="select-text">
              <ion-select-option
                  v-for="province in provincesLabels"
                  :key="province.value"
                  :value="province.value"
                >{{ province.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label class="primary-label">Teléfono</ion-label>
            <ion-input class="secondary-label" type="text" pattern="(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}" v-model="newPhone"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button class="btn" type="submit" expand="block" fill="solid">GUARDAR</ion-button>
      </form>
       <ion-list class="list">
            <ion-item @click="someClick">
                <ion-label>Lista de Mis <i class="fas fa-heart"></i></ion-label>
                <ion-icon name="chevron-forward" end></ion-icon>
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
        <a href="" @click="logOutUser">Log out</a>
    </ion-content>
  </ion-page>
</template>

<script>
import { provinces } from "../utils/labels";
import { chevronBackOutline, heart } from "ionicons/icons";
import BackButton from '../ui/BackButton.vue';

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
  IonButton,
  // IonButtons,
  IonIcon,
  toastController,
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
    IonButton,
    // IonButtons,
    IonIcon,
    BackButton
  },
  data(){
      return {
          newPhone: undefined,
          newName: undefined,
          newLocation: undefined,
          newBio: undefined,
          chevronBackOutline,
          heart,
          provincesLabels: provinces
      }
  },
  ionViewWillEnter(){
      const userLogged = this.$store.getters.getLoggedUser

      this.newName = userLogged.name
      this.newBio = userLogged.description
      this.newPhone = userLogged.phoneNumber
      this.newLocation = userLogged.location
  },
  methods: {
      someClick(){
          console.log('Works');
      },
      async logOutUser(){
        try{
          this.$store.dispatch('logOutUser')
        }catch(error){
          console.log(error)
        }
        localStorage.clear()
      },
      async updateUserInfo(){
          const newInfo = {
              name: this.newName,
              description: this.newBio,
              phoneNumber: this.newPhone,
              location: this.newLocation
          };

          const toast = await toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Profile Saved Succesfully!',
            showCloseButton: true,
            // position: 'top',
          });

          await toast.present();

          this.$store.dispatch('updateUser', newInfo);
      },
      goBack(){
        //This makes us go back
        history.back();
      }
  }
};
</script>

<style scoped>
.btn {
    width: 60%;
    margin: 0 auto;
    padding-top: 10%;
    padding-bottom: 25%;
}

.primary-label{
    font-size: 1rem;
    font-weight: bold;
}

.secondary-label {
    font-size: 1.125rem;
}

.list {
  padding-bottom: 5%;
}

.btn-back{
  background: var(--ion-color-primary);
}

.fa-heart{
  color: var(--ion-color-secondary)
}
</style>

