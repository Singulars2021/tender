// import { ref, onMounted, watch } from 'vue';
import {
  Plugins,
  CameraResultType,
  CameraSource
} from "@capacitor/core";

const {Camera} = Plugins;

// CameraPhoto, 
// Capacitor, FilesystemDirectory



// export function usePhotoGallery() {
//   const {Camera} = Plugins;
//   let photos = {}
//   const takePhoto = async () => {
//     const cameraPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 100
//     });
//     const fileName = new Date().getTime() + '.jpeg';
//     photos = {
//       filepath: fileName,
//       webviewPath: cameraPhoto.webPath
//     };
//   };

//   return {
//     photos,
//     takePhoto
//   };
// }