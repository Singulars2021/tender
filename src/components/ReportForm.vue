<template>
  <form action="" class="ion-padding" @submit.prevent="updateReports">
    <ion-list>
      <ion-item>
        <ion-label>Motivo de la denuncia</ion-label>
        <ion-select
          v-model="reportOptions"
          name="reportOptions"
          okText="Aceptar"
          cancelText="Cancelar"
          interface="action-sheet"
          :interface-options="options"

        >
          <ion-select-option
            v-for="report in reportLabels"
            :key="report.value"
            :value="report.value"
            >{{ report.label }}
            
            </ion-select-option
          >
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="fixed">Comentarios</ion-label>
        <ion-textarea
          v-model="comments"
          rows="1"
          auto-grow
          name="comments"
        ></ion-textarea>
      </ion-item>

      <ion-item className="hidden">
        <ion-input
          type="hidden"
          name="animalId"
          v-bind:value="animalId"
        ></ion-input>
      </ion-item>

      <ion-item className="hidden">
        <ion-input
          type="hidden"
          name="userId"
          v-bind:value="$store.getters.getUserId"
        ></ion-input>
      </ion-item>
    </ion-list>

    <cta-button>DENUNCIAR</cta-button>
  </form>
</template>

<script>
import { reportOptions } from "../utils/labels";
import emailjs from "emailjs-com";
import CtaButton from "../ui/CtaButton.vue";
import {
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonTextarea,
  IonInput,
  toastController,
} from "@ionic/vue";

export default {
  props: ["animalId"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
    CtaButton,
  },
  data() {
    return {
      error: null,
      userId: undefined,
      reportOptions: undefined,
      reportLabels: reportOptions,
      comments: undefined,
      service_id: "service_hk94amm",
      template_id: "template_rzxg3ol",
      user_id: "user_xX3E3lq1v9QGmRalwlBpi",
      name: "Tender",
      email: "singutender@gmail.com",
      options: {
        cssClass: "my-custom-interface",
      },
    };
  },
  methods: {
    updateReports(e) {
      const report = {
        animalId: this.animalId,
        reportOptions: this.reportOptions,
        comments: this.comments,
      };

      this.$store.dispatch("updateReports", {
        reportFields: report,
      });

      this.$router.push("/animals/slider");

      console.log(this.$store.getters.getReports);

      //---------------------------------
      //Steps: https://www.freecodecamp.org/news/send-emails-from-your-vue-application/
      try {
        emailjs.sendForm(
          this.service_id,
          this.template_id,
          e.target,
          this.user_id,

          {
            name: this.name,
            email: this.email,
            userId: this.userId,
            animalId: this.animalId,
            reportOptions: this.reportOptions,
            comments: this.comments,
          }
        );
      } catch (error) {
        console.log({ error });
      }
    },
    async openToast(msg, response) {
      const toast = await toastController.create({
        message: msg,
        response: response,
        duration: 3000,
        color: response.ok ? "success" : "danger",
      });
      return toast.present();
    },
  },
};
</script>

<style scoped>
ion-item.hidden {
  display: none;
}

ion-label {
  font-weight: 700;
}

ion-list{
  margin-top: 4rem;
}

.alert-radio-label.sc-ion-alert-md {
  white-space: pre-line !important;
}

.alert-radio-label.sc-ion-alert-ios {
  white-space: pre-line !important;
}


/* Icon form change */
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
  width: 50%;
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

/* End icon form change */
</style>