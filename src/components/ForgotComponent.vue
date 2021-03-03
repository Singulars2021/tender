<template>
    <div >
        <form class="ion-padding" @submit.prevent="recoverPassword">
            <h3>Forgot Password?</h3>
            <p class="paragraph">Give us your mail and we will send you a link to recover your password!</p>
            <ion-list>
              <!-- Email Item -->
              <ion-item class="form-group">
                  <ion-label>Email address</ion-label>
                  <ion-input type="email" class="form-control form-control-lg" v-model="user.email" required/>
              </ion-item>
              <!-- Submit Button -->
              <ion-button type="submit" class="btn btn-dark btn-lg btn-block">Recover password</ion-button>
            </ion-list>
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
        email: ''
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
    async openToast(msg, response) {
      const toast = await toastController.create({
        message: msg,
        duration: 3000,
        //For the time, only danger color has been considered, if more messages need to appear with dif colors, modify next line
        color: response? 'success' : 'danger',
      });
      return toast.present();
    },
    async recoverPassword() {
      const payload = {
        email: this.user.email,
      }
      try{
        await this.$store.dispatch("restorePassword", payload)
        this.openToast("An email has been sent to the introduced email account", true)
        //Show toast message, email sent to email account
      }catch(error){
        //Sergi:Use Toast here if error
        this.openToast(error.message, false)
        console.log("Error", error)
        return 
      }
      this.$router.replace("/signin")
      }
  }
}
</script>

<style scoped>
h3 {
    text-align: center;
}

.paragraph {
    text-align: center;
}
</style>