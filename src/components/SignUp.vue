<template>
  <div>
    <form class="ion-padding" @submit.prevent="userRegistration">
      <h3>Sign Up</h3>

      <ion-list>
        <!-- Name Item -->
        <ion-item class="form-group">
          <ion-label>Name</ion-label>
          <ion-input
            type="text"
            class="form-control form-control-lg"
            v-model="user.name"
            required
          />
          <!-- Email Item -->
        </ion-item>
        <ion-item class="form-group">
          <ion-label>Email</ion-label>
          <ion-input
            type="email"
            class="form-control form-control-lg"
            v-model="user.email"
            required
          />
        </ion-item>
        <!-- Password Item -->
        <ion-item class="form-group">
          <ion-label>Password</ion-label>
          <ion-input
            type="password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            class="form-control form-control-lg"
            v-model="user.password"
            required
          />
        </ion-item>
      </ion-list>

      <ion-button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign Up
      </ion-button>

      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'login' }">sign in</router-link>
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
  IonButton,
  toastController,
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
        return;
      }
      this.$router.push({ name: "first-steps" });
    },
  },
};
</script>