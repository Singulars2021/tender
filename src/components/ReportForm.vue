<template>
  <form action="" class="ion-padding" @submit.prevent="updateReports">
    <ion-list>
      <ion-item>
        <ion-label>Motivo del reporte</ion-label>
        <ion-select
          v-model="reportOptions"
          name="reportOptions"
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <ion-select-option
            v-for="report in reportLabels"
            :key="report.value"
            :value="report.value"
            >{{ report.label }}</ion-select-option
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

    <ion-button type="submit" expand="block" fill="solid">Reportar</ion-button>
  </form>
</template>

<script>
import { reportOptions } from "../utils/labels";
import emailjs from "emailjs-com";
import {
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonButton,
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
    IonButton,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
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

      this.$router.push({ name: "slider" });


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
</style>