<template>
  <content-container>
    <form>
      <p>Aquí va el formulario. Besis.</p>
      <img :src="previewImageUrl" />
      <section>
        <form @submit.prevent="takePhoto">
          <button type="submit">Upload</button>
        </form>
      </section>
    </form>
    <a @click="loadPicture">Pula para descargar imagen</a>
  </content-container>
</template>

<script>
// import { usePhotoGallery} from "@/composables/usePhotoGallery";
import {Plugins, CameraResultType, CameraSource} from "@capacitor/core";
import firebase from 'firebase'
// import {ref} from 'vue';

const {Camera} = Plugins;

var firebaseConfig = {
    storageBucket: 'https://console.firebase.google.com/project/animalslist-19bbf/storage/animalslist-19bbf.appspot.com/files'
  };
  firebase.initializeApp(firebaseConfig);

var FBStorage = firebase.storage()
export default {
  data(){
    return {
      previewImageUrl: null,
      photo: {}
    }
  },
  methods:{
    async takePhoto(){
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 60
      });

      fetch('https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app/photoTest.json',{method: 'PUT', headers: {"Content-Type":"application/json"}, body: JSON.stringify(photo.webPath)})
      this.photo = photo
      // this.previewImageUrl = photo.webPath
      // console.log(this.previewImageUrl)
      // console.log(photo)
    },

    loadPicture(){
      FBStorage.child(this.previewImageUrl).getDownloadURL()
  .then((url) => {
    this.previewImageUrl = url
  })
  .catch((error) => {
    console.log(error)
  });
    }
  }
};
</script>