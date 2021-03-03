// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;

// async function getStoragePassword() {
//     const ret = await Storage.get({ key: 'user' });
//     const user = JSON.parse(ret.value);
    
//     return user;
//   }

// async function setStoragePassword(data) {
//     await Storage.set({
//       key: 'user',
//       value: JSON.stringify({
//         email: data.email,
//         password: data.password
//       })
//     });
//   }

//   async function clearStorage(){
//     localStorage.clear()
//   }
  
// export {getStoragePassword, setStoragePassword, clearStorage}