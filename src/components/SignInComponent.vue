<template>
  <div>
    <form class="ion-padding" @submit.prevent="userLogin">
      <ion-list>
        <!-- Email Item -->
        <ion-item class="form-group">
          <ion-label position="floating">Email</ion-label>
          <ion-input
            type="email"
            class="form-control form-control-lg"
            v-model="user.email"
            required
          />
        </ion-item>
        <!-- Password Item -->
        <ion-item class="form-group">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input
            type="password"
            class="form-control form-control-lg"
            v-model="user.password"
            required
          />
        </ion-item>
        <p class="forgot-password">¿Olvidaste la contraseña?
        <router-link :to="{name: 'forgot-password'}">¿?</router-link>
      </p>
      </ion-list>
      <!-- Submit Button -->
      <cta-button-signin
          >INICIAR SESIÓN</cta-button-signin>
      <!-- Forget Password Link -->  
      <p class="no-account">¿No tienes cuenta?
        <router-link :to="{name: 'sign-up'}">Crear cuenta</router-link>
      </p>
    </form>
  </div>
</template>


<script>
// import {getStoragePassword, setStoragePassword} from '../utils/storePassword.js';

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  toastController,
} from "@ionic/vue";

import { getCurrentUser } from "../firebaseConfig.js";
import CtaButtonSignin from "../ui/CtaButtonSignin.vue";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    CtaButtonSignin,
  },
  async created() {
    const user = await getCurrentUser();
    if (user) {
      this.user.email = user.email;
      this.user.password = user.password;
      this.userLogin();
    }
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
        password: this.user.password,
      };
      try {
        await this.$store.dispatch("signin", payload);
      } catch (error) {
        this.openToast(error.message);
        return;
      }
      this.$router.push({ name: "slider", replace: true });
      // setStoragePassword(payload)
    },
  },
};
</script>

<style scoped>
p{
  font-size: 0.85rem;
}

a{
  text-decoration: none;
}

.forgot-password{
  float: right;
}

.no-account{
   --padding-bottom:20px;
    --padding-top:20px; 
    position: fixed;
    bottom: 35px;
    margin: 0;
    left: 16px;
    right: 16px;
    text-align: center;
}

</style>