<template>
  <div>
    <form class="ion-padding" @submit.prevent="userRegistration">
      <ion-title>Crear cuenta</ion-title>
      <ion-list>
        <!-- Name Item -->
        <ion-item class="form-group">
          <ion-label position="floating">Nombre</ion-label>
          <ion-input
            type="text"
            class="form-control form-control-lg"
            v-model="user.name"
            required
          />
          <!-- Email Item -->
        </ion-item>
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            class="form-control form-control-lg"
            v-model="user.password"
            required
          />
        </ion-item>
      </ion-list>

      <cta-button-signin>CREAR</cta-button-signin>
    </form>
    <p class="forgot-password">
      ¿Ya tienes cuenta?
      <router-link :to="{ name: 'login' }">Entrar</router-link>
    </p>
  </div>
</template>


<script>
import CtaButtonSignin from "../ui/CtaButtonSignin.vue";

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  toastController,
  IonTitle,
} from "@ionic/vue";

export default {
  data() {
    return {
      user: {
        name: "",
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
    IonTitle,
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
    async userRegistration() {
      const payload = {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
      };
      try {
        await this.$store.dispatch("signup", payload);
      } catch (error) {
        this.openToast(error.message);
        console.log("Error", error);
        return;
      }
      //this.$router.push('/profile/')
      this.$router.push("/firststeps");
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 5rem;
}

.forgot-password {
  --padding-bottom: 20px;
  --padding-top: 20px;
  position: fixed;
  bottom: 35px;
  margin: 0;
  left: 16px;
  right: 16px;
  text-align: center;
}

p{
  font-size: 0.85rem;
}

a{
  text-decoration: none;
}

ion-title {
  font-size: 1.5rem;
  padding: 0px;
}
</style>