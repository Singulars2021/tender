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
        //Sergi:Use Toast here if error
        this.openToast(error.message)
        console.log("Error", error)
        return 
      }
      this.$router.replace("/profile")
      }
  }
}
</script>