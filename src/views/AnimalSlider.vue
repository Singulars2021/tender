<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides :options="animalSliderOptions">
        <ion-slide :key="animal.id" v-for="animal in animals">
          <ion-card>
            <ion-slides :options="animalPicturesSliderOptions" pager="true">
              <ion-slide v-for="picture in animal.pictures" :key="picture">
                <img :src="picture" />
              </ion-slide>
            </ion-slides>
            <ion-card-header>
              <ion-chip outline color="primary">
                <ion-icon :icon="maleFemaleOutline"></ion-icon>
                <ion-label>{{ animal.sex }}</ion-label>
              </ion-chip>
              <ion-chip outline color="primary">
                <ion-icon :icon="pawOutline"></ion-icon>
                <ion-label>{{ animal.species }}</ion-label>
              </ion-chip>
              <ion-card-title> {{ animal.name }} </ion-card-title>
              <ion-card-subtitle color="tertiary">
                <ion-icon :icon="locationOutline"></ion-icon>
                {{ animal.location }}
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis est sed minima vero voluptates enim tempore, libero
              illo molestias repellat facere. In odit qui sint vitae esse amet
              quos iure...
            </ion-card-content>
            <ion-chip outline color="secondary" id="footer-chip">
              <ion-icon :icon="hourglassOutline"></ion-icon>
              <ion-label>{{ animal.adoptionType }}</ion-label>
            </ion-chip>
          </ion-card>
        </ion-slide>
      </ion-slides>

      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonSlides,
  IonSlide,
  IonPage,
  IonContent,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonChip,
  IonLabel,
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import {
  heartOutline,
  removeOutline,
  maleFemaleOutline,
  pawOutline,
  locationOutline,
  hourglassOutline,
} from "ionicons/icons";
export default {
  name: "animal-slider",
  components: {
    IonSlides,
    IonSlide,
    IonContent,
    IonPage,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonChip,
    IonLabel,
    IonFab,
    IonFabButton,
  },
  data() {
    return {
      animalSliderOptions: {
        loop: true,
        initialSlide: 1,
        pager: false,
      },
      animalPicturesSliderOptions: {
        loop: true,
      },
      heartOutline,
      removeOutline,
      maleFemaleOutline,
      pawOutline,
      locationOutline,
      hourglassOutline,
      animals: [
        {
          id: "0",
          species: "Perro",
          name: "Marcos",
          sex: "Macho",
          age: "Joven",
          pictures: [
            "https://images.unsplash.com/photo-1601758003839-512c0f4159e5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
            "https://images.unsplash.com/photo-1588022274210-7aab7c55c631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
            "https://images.unsplash.com/photo-1611498491685-abb3e359cf69?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
            "https://images.unsplash.com/photo-1608604560300-18ce17489c4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
          location: "Mataró",
          adoptionType: "Temporal",
        },
        {
          id: "1",
          species: "Perro",
          name: "Roberta",
          sex: "Hembra",
          age: "Adulta",
          pictures: [
            "https://images.unsplash.com/photo-1536910467852-a6fded0c5c47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
            "https://images.unsplash.com/photo-1490042706304-06c664f6fd9a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=751&q=80",
            "https://images.unsplash.com/photo-1612123183684-89c6437ebf45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          ],
          location: "El Garraf",
          adoptionType: "Permanente",
        },
        {
          id: "2",
          species: "Gato",
          name: "Simba",
          sex: "Macho",
          age: "Joven",
          pictures: [
            "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
            "https://images.unsplash.com/photo-1492370284958-c20b15c692d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=663&q=80",
          ],
          location: "Vilassar de Mar",
          adoptionType: "Permanente",
        },
        {
          id: "3",
          species: "Tortuga",
          name: "Margarita",
          sex: "Hembra",
          age: "Senior",
          pictures: [
            "https://images.unsplash.com/photo-1579833098880-e52055f43cad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=800",
            "https://images.unsplash.com/photo-1597162216923-ba6d99390c10?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
          ],
          location: "L'Hospitalet de Llobregat",
          adoptionType: "Temporal",
        },
      ],
    };
  },
};
</script>

<style scoped>
ion-card-content {
  text-align: justify;
}

ion-fab {
  margin: 1rem 3rem;
}
#footer-chip {
  margin-bottom: 1rem;
}

img {
  max-height: 40vh;
}
</style>