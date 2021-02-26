<template>
  <form action="" class="ion-padding" @submit.prevent="updateReports">    
    <ion-list>
      <ion-item>
        <ion-label>Motivo del reporte</ion-label>
        <ion-select
          v-model="reportOptions"
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
        ></ion-textarea>
      </ion-item>
    </ion-list>

    <ion-button type="submit" expand="block" fill="solid">Reportar</ion-button>
  </form>
</template>

<script>
import { reportOptions } from "../utils/labels";
import {
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonButton,
  IonItem,
  IonTextarea,
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
    IonTextarea,
  },
  data() {
    return {
      error: null,
      userId: undefined,
      reportOptions: undefined,
      reportLabels: reportOptions,
      comments: undefined
    };
  },
  methods: {
    updateReports() {
      const report = {
        animalId: this.animalId,
        reportOptions: this.reportOptions,
        comments: this.comments,
      };
 
      this.$store.dispatch("updateReports", {
        reportFields: report,
      });

      this.$router.push("/animals/slider")
      
      console.log(this.$store.getters.getReports)
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

</style>