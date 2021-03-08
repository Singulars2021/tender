<template>
    <div>
        <form class="ion-padding" @submit.prevent="recoverPassword">
            <ion-title>Recuperar contraseña</ion-title>
            <p class="paragraph">Si has olvidado tu contraseña introduce el email con el que te has registrado. Te mandaremos un enlace para restablecer tu cuenta.</p>
            <ion-list>
              <!-- Email Item -->
              <ion-item class="form-group">
                  <ion-label position="floating">Email</ion-label>
                  <ion-input type="email" class="form-control form-control-lg" v-model="user.email" required/>
              </ion-item>
            </ion-list>
             <!-- Submit Button -->
            <cta-button>RECUPERAR CONTRASEÑA</cta-button>
        </form>
    </div>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  toastController,
  IonTitle
} from "@ionic/vue";

import CtaButton from "../ui/CtaButton.vue";

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
    CtaButton,
    IonTitle
    
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
ion-title {
  font-size: 1.5rem;
  padding: 0px;
}

form {
  margin-top: 5rem;
}

.paragraph {
line-height: 1.5rem;
}

</style>