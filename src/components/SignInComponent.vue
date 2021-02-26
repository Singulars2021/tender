<template>
    <div >
        <form class="ion-padding" @submit.prevent="userLogin">
            <h3>Sign In</h3>

            <ion-list>
              <!-- Email Item -->
              <ion-item class="form-group">
                  <ion-label>Email address</ion-label>
                  <ion-input type="email" class="form-control form-control-lg" v-model="user.email" required/>
              </ion-item>
              <!-- Password Item -->
              <ion-item class="form-group">
                  <ion-label>Password</ion-label>
                  <ion-input type="password" class="form-control form-control-lg" v-model="user.password" required/>
              </ion-item>
              <!-- Submit Button -->
              <ion-button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</ion-button>
            </ion-list>
            <!-- Forget Password Link --> 
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            <p class="not-account text-right mt-2 mb-4">
                <router-link to="/signup">Don't you have an account yet?</router-link>
            </p>
        </form>
    </div>
</template>


<script>
import {getStoragePassword, setStoragePassword} from '../utils/storePassword.js';

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  toastController
} from "@ionic/vue";

export default {
  data() {
    return {
      user: {   
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
    async openToast(msg) {
      const toast = await toastController.create({
        message: msg,
        duration: 3000,
        //For the time, only danger color has been considered, if more messages need to appear with dif colors, modify next line
        color: "danger",
      });
      return toast.present();
    },
    async userLogin() {
      const payload = {
        email: this.user.email,
        password: this.user.password
      }
      try{
        await this.$store.dispatch("signin", payload)
      }catch(error){
        this.openToast(error.message)
        return 
      }
      this.$router.replace("/animals/slider")
      setStoragePassword(payload)
      }

      // async setObject(data) {
      //   await Storage.set({
      //     key: 'user',
      //     value: JSON.stringify({
      //       email: data.email,
      //       password: data.password
      //     })
      //   });
      // },

      // async getObject() {
      //   const ret = await Storage.get({ key: 'user' });
      //   const user = JSON.parse(ret.value);

      //   return user;
      // }
  },
  async created(){
    if(await getStoragePassword()){
      this.$store.dispatch('signin', getStoragePassword())
    }
  }
}
</script>