<template>
    <div class="vue-tempalte">
        <form class="ion-padding" @submit.prevent="userRegistration">
            <h3>Sign Up</h3>

            <ion-list>
                <ion-item class="form-group">
                    <ion-label>Name</ion-label>
                    <ion-input type="text" class="form-control form-control-lg" v-model="user.name" />
                </ion-item>
                <ion-item class="form-group">
                    <ion-label>Email</ion-label>
                    <ion-input type="email" class="form-control form-control-lg" v-model="user.email" />
                </ion-item>
                <ion-item class="form-group">
                    <ion-label>Password</ion-label>
                    <ion-input type="password" class="form-control form-control-lg" v-model="user.password" />
                </ion-item>
            </ion-list>

            <ion-button type="submit" class="btn btn-dark btn-lg btn-block">
               Sign Up
            </ion-button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in</router-link>
            </p>
        </form>
    </div>
</template>


<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from "@ionic/vue";

import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push('/signin')
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  }
};
</script>