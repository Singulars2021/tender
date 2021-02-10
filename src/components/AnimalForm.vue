<template>
  <form action="" class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input type="text" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Edad</ion-label>
        <ion-input type="text" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Sexo</ion-label>
        <ion-select
          placeholder="Eliga uno"
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <ion-select-option value="f">Femenino</ion-select-option>
          <ion-select-option value="m">Masculino</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Especie</ion-label>
        <ion-select
          placeholder="Eliga una"
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <ion-select-option value="0">Gato</ion-select-option>
          <ion-select-option value="1">Perro</ion-select-option>
          <ion-select-option value="2">Tortuga</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Localización</ion-label>
        <ion-select
          :interface-options="customActionSheetOptions"
          interface="action-sheet"
          placeholder="Eliga una"
          cancelText="Cancelar"
        >
          <ion-select-option value="Barcelona">Barcelona</ion-select-option>
          <ion-select-option value="Tarragona">Tarragona</ion-select-option>
          <ion-select-option value="Girona">Girona</ion-select-option>
          <ion-select-option value="Lleida">Lleida</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Subir Imagen</ion-label>
        <ion-input type="url" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Descripción</ion-label>
        <ion-textarea rows="5"></ion-textarea>
      </ion-item>
    </ion-list>
  </form>
  <ion-button expand="block" fill="solid">Guardar</ion-button>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
  },
};
</script>