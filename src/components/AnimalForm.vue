<template>
  <form action="" class="ion-padding" @submit.prevent="addAnimal">
    <ion-list>
      <!-- Name item -->
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input v-model="name" type="text" required></ion-input>
      </ion-item>
      <!-- Age item -->
      <ion-item>
        <ion-label position="floating">Edad</ion-label>
        <ion-input v-model="age" type="text" required></ion-input>
      </ion-item>
      <!-- Sex item -->
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select
          v-model="sex"
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <ion-select-option value="f">Femenino</ion-select-option>
          <ion-select-option value="m">Masculino</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Species Item -->
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select
          v-model="species"
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <ion-select-option value="0">Gato</ion-select-option>
          <ion-select-option value="1">Perro</ion-select-option>
          <ion-select-option value="2">Tortuga</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Location Item -->
      <ion-item>
        <ion-label>Localización</ion-label>
        <ion-select
          v-model="location"
          interface="action-sheet"
          cancelText="Cancelar"
        >
          <ion-select-option value="alava">Álava</ion-select-option>
          <ion-select-option value="albacete">Albacete</ion-select-option>
          <ion-select-option value="alicante"
            >Alicante/Alacant</ion-select-option
          >
          <ion-select-option value="almeria">Almería</ion-select-option>
          <ion-select-option value="asturias">Asturias</ion-select-option>
          <ion-select-option value="avila">Ávila</ion-select-option>
          <ion-select-option value="badajoz">Badajoz</ion-select-option>
          <ion-select-option value="barcelona">Barcelona</ion-select-option>
          <ion-select-option value="burgos">Burgos</ion-select-option>
          <ion-select-option value="caceres">Cáceres</ion-select-option>
          <ion-select-option value="cadiz">Cádiz</ion-select-option>
          <ion-select-option value="cantabria">Cantabria</ion-select-option>
          <ion-select-option value="castellon"
            >Castellón/Castelló</ion-select-option
          >
          <ion-select-option value="ceuta">Ceuta</ion-select-option>
          <ion-select-option value="ciudadreal">Ciudad Real</ion-select-option>
          <ion-select-option value="cordoba">Córdoba</ion-select-option>
          <ion-select-option value="cuenca">Cuenca</ion-select-option>
          <ion-select-option value="girona">Girona</ion-select-option>
          <ion-select-option value="laspalmas">Las Palmas</ion-select-option>
          <ion-select-option value="granada">Granada</ion-select-option>
          <ion-select-option value="guadalajara">Guadalajara</ion-select-option>
          <ion-select-option value="guipuzcoa">Guipúzcoa</ion-select-option>
          <ion-select-option value="huelva">Huelva</ion-select-option>
          <ion-select-option value="huesca">Huesca</ion-select-option>
          <ion-select-option value="illesbalears"
            >Illes Balears</ion-select-option
          >
          <ion-select-option value="jaen">Jaén</ion-select-option>
          <ion-select-option value="acoruña">A Coruña</ion-select-option>
          <ion-select-option value="larioja">La Rioja</ion-select-option>
          <ion-select-option value="leon">León</ion-select-option>
          <ion-select-option value="lleida">Lleida</ion-select-option>
          <ion-select-option value="lugo">Lugo</ion-select-option>
          <ion-select-option value="madrid">Madrid</ion-select-option>
          <ion-select-option value="malaga">Málaga</ion-select-option>
          <ion-select-option value="melilla">Melilla</ion-select-option>
          <ion-select-option value="murcia">Murcia</ion-select-option>
          <ion-select-option value="navarra">Navarra</ion-select-option>
          <ion-select-option value="ourense">Ourense</ion-select-option>
          <ion-select-option value="palencia">Palencia</ion-select-option>
          <ion-select-option value="pontevedra">Pontevedra</ion-select-option>
          <ion-select-option value="salamanca">Salamanca</ion-select-option>
          <ion-select-option value="segovia">Segovia</ion-select-option>
          <ion-select-option value="sevilla">Sevilla</ion-select-option>
          <ion-select-option value="soria">Soria</ion-select-option>
          <ion-select-option value="tarragona">Tarragona</ion-select-option>
          <ion-select-option value="santacruztenerife"
            >Santa Cruz de Tenerife</ion-select-option
          >
          <ion-select-option value="teruel">Teruel</ion-select-option>
          <ion-select-option value="toledo">Toledo</ion-select-option>
          <ion-select-option value="valencia"
            >Valencia/Valéncia</ion-select-option
          >
          <ion-select-option value="valladolid">Valladolid</ion-select-option>
          <ion-select-option value="vizcaya">Vizcaya</ion-select-option>
          <ion-select-option value="zamora">Zamora</ion-select-option>
          <ion-select-option value="zaragoza">Zaragoza</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Image item -->
      <ion-item>
        <ion-label position="floating">Subir Imagen</ion-label>
        <ion-input v-model="image" type="url"></ion-input>
      </ion-item>
      <!-- Description Item -->
      <ion-item>
        <ion-label position="floating">Descripción</ion-label>
        <ion-textarea v-model="description" rows="1" auto-grow></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block" fill="solid">Guardar</ion-button>
    <!-- <ion-fab vertical="bottom" slot="fixed">
      <ion-fab-button class="cta-button">
        Guardar
      </ion-fab-button>
    </ion-fab> -->
  </form>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  // IonFab,
  // IonFabButton,
  IonSelect,
  IonSelectOption,
  toastController,
} from "@ionic/vue";
export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    // IonFab,
    // IonFabButton,
  },
  data() {
    return {
      name: undefined,
      age: undefined,
      sex: undefined,
      species: undefined,
      location: undefined,
      image: undefined,
      description: undefined,
    };
  },
  methods: {
    addAnimal() {
      let url =
        "https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app/animalsList.json";
      const newAnimal = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        species: this.species,
        location: this.location,
        image: this.image,
        description: this.description,
      };

      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
      };

      fetch(url, postOptions)
        .then((response) => {
          if (response.ok) {
            this.openToast("El animal se ha añadido correctamente", response);
          }
        })
        .catch((response) => {
          if (!response.ok) {
            this.openToast("Ha ocurrido un error", response);
          }
        });
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
ion-label{
  font-weight: 700;
}


</style>