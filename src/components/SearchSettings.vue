<template>
  <form>
    <ion-title class="sub-title">AJUSTES DE BÚSQUEDA</ion-title>
    <ion-list>
      <ion-item>
        <ion-label>Localización</ion-label>
        <ion-select
          value="any"
          v-model="location"
          interface="action-sheet"
          cancelText="Cancelar"
        >
          <ion-select-option value="any">Cualquiera</ion-select-option>
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
    </ion-list>
    <ion-item>
      <ion-label position="floating">Distáncia máxima</ion-label>
      <ion-range min="1" max="100" pin color="secondary">
        <ion-label slot="start">1km</ion-label>
        <ion-label slot="end">100km</ion-label>
        <ion-icon slot="start" size="small" name="contrast"></ion-icon>
        <ion-icon slot="end" name="contrast"></ion-icon>
      </ion-range>
    </ion-item>
    <ion-title class="sub-title">AJUSTES DE PERFIL</ion-title>
    <ion-list>
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select value="any"
          interface="action-sheet"
          cancelText="Cancelar">
          <ion-select-option value="any">Cualquiera</ion-select-option>
            <ion-select-option>Gato</ion-select-option>
            <ion-select-option>Perro</ion-select-option>
            <ion-select-option>Huron</ion-select-option>
            <ion-select-option>Tortuga</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select value="any"
          interface="action-sheet"
          cancelText="Cancelar">
          <ion-select-option value="any">Cualquiera</ion-select-option>
            <ion-select-option>Hembra</ion-select-option>
            <ion-select-option>Macho</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Edad</ion-label>
        <ion-select value="any"
          interface="action-sheet"
          cancelText="Cancelar">
          <ion-select-option value="any">Cualquiera</ion-select-option>
            <ion-select-option>Joven</ion-select-option>
            <ion-select-option>Adulto</ion-select-option>
            <ion-select-option>Senior</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item>
        <ion-label>Tipo de adopcion</ion-label>
        <ion-select value="any"
          interface="action-sheet"
          cancelText="Cancelar">
          <ion-select-option value="any">Cualquiera</ion-select-option>
            <ion-select-option>Temporal</ion-select-option>
            <ion-select-option>Permanente</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block" fill="solid">Buscar</ion-button>
  </form>
</template>

<script>
import {
  IonTextarea,
  IonTitle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonText,
  IonButton,
  IonItem,
  IonIcon,
  IonRange,
} from "@ionic/vue";

export default {
  IonTextarea,
  IonTitle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonText,
  IonButton,
  IonItem,
  IonIcon,
  IonRange,
};
</script>

<style scoped>
.sub-title {
  font-size: small;
}
</style>