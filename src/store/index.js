import { createStore } from 'vuex'
import {
  addNewDocument,
  addFavorite,
  addRemoved,
  getFavoriteAnimalsId,
  getRemovedAnimalsId,
  getCollectionFromCollection,
  getData,
  setPictureToAnimal,
  updateDocument,
  createNewUser,
  updateName,
  logInUser,
  logOutUser,
  getCurrentUser,
  recoverPassword,
  addNewDocumentWithId,
  getDataById,
  deleteDocument,
  deleteDocumentFromAnimalPhoto,
  updateAnimalDocument,
  getSyncData
} from '../firebaseConfig.js'

const store = createStore({
  state: {
    // loggedUser: {
    //   id: 'ZVPKk6gTsBUsLMFRKLzoMPmbUC82',
    //   email: 'testbueno@test.com',
    //   description: 'Loving Canela',
    //   location: 1,
    //   phoneNumber: '+3466677788'
    // },
    loggedUser: undefined,
    users: [],
    animals: [],
    animalSearchFilters: {},
    animal: {

    },
    reports: [],
  },
  getters: {
    getUserId(state) {
      return state.loggedUser.id;
    },
    // Knowking that the state of our app is always updated (or it should be); we may write all the getters that we need here to retrieve any sort of info, such all the animals, filter animals by some criteria, retrieve information about the logged user, etc
    getAllAnimals(state) {
      return state.animals
    },
    getFilteredAnimals(state, getters){
      const allAnimals = getters.getAllAnimals;
      const filters = state.animalSearchFilters;

      console.log('getFiltered getter', allAnimals);
      console.log('Filters:', filters)

      if(!filters){
        console.log('Empty Filter')
        return allAnimals
      }



     const result =  allAnimals.filter(animal => {
        return (filters.species == undefined || filters.species == animal.species) && 
               (filters.sex == undefined || filters.sex == animal.sex) && 
               (filters.adoptionType == undefined || filters.adoptionType == animal.adoptionType) && 
               (filters.location == undefined || filters.location == animal.location) && 
               (filters.age == undefined || filters.age == animal.age)
      })

      return result

      // }else {
      //   return allAnimals.filter(animal => {
      //     if(filters.species == animal.species){
      //       return animal
      //     } else if(filters.sex == animal.sex){
      //       return animal
      //     } else if(filters.adoptionType == animal.adoptionType){
      //       return animal
      //     } else if(filters.location == animal.location){
      //       return animal
      //     }  else if(filters.age == animal.age){
      //       return animal
      //     }
      // })}
      
    },
    getMyAnimals(state, getters) {
      return state.animals.filter(animal => animal.userId === getters.getUserId)
    }
    ,
    getFilters(state) {
      return state.animalSearchFilters
    },
    //Getter of users
    getLoggedUser(state) {
      return state.loggedUser
    },
    getFavoriteAnimals(state) {
      return state.loggedUser.favoriteAnimals
    },
    getAnimalBy(state) {
      return state.animal
    },
    getAnimalById: (state) => (id) => {
      return state.animals.find(animal => animal.id === id)
    },
    getReports(state) {
      return state.reports
    }
  },
  // Mutations must update the app's state. Every time we retrieve data from the database, these data must be loaded somewhere in our app state management. Because we are using Vuex of our app, we must use a mutation to alter the state, never alter it directly in an action of inside a component.
  mutations: {
    setFavorite(state, payload, payload2) {
      state.animals.array.forEach(element => {
        if (element.id == payload) {
          element.favorite.push(payload2)
        }
      });
    },
    insertAnimal(state, payload) {
      state.animals.push(payload)
    },
    setFilters(state, payload) {
      state.animalSearchFilters = payload
    },
    updateUserInfo(state, payload) {
      state.loggedUser.name = payload.name
      state.loggedUser.phoneNumber = payload.phoneNumber
      state.loggedUser.description = payload.description
      state.loggedUser.location = payload.location
    },
    setAnimals(state, payload) {
      state.animals = payload
    },
    signinMutation(state, payload) {
      state.loggedUser = payload
    },
    setLoggedUser(state, payload) {
      console.log('State.users: ', state.users)
      const user = state.users.filter((user) => user.id == payload);
      console.log('SetLoggedUser: ', user[0])
      state.loggedUser = user[0];
      //recuperar todos los datos del usuario con el id payload.id
      // db.collection(collection).doc(id)
    },
    setUsers(state, payload) {
      state.users = payload
      console.dir(state.loggedUser)
    },
    // addFavoriteAnimal(state, payload) {
    //   // state.loggedUser.favoriteAnimals.push(payload)
    // },

    setAnimalById(state, payload) {
      state.animal = payload
      console.log(state.animal)
    },
    updateAnAnimal(state, payload) {
      for (var i = 0; i < state.length; i++) {
        if (state[i].id == payload.id) {
          state[i] = payload
        }
      }
    },
    updateAnimals(state, payload) {
      state.animals.splice(payload, 1)
    },
    // setFavoriteAnimals(state, payload) {
    //   state.loggedUser.favoriteAnimals.push(payload);
    // },
    setRemovedAnimalsId(state, payload) {
      state.loggedUser.removedAnimalsId = payload;
    },

    deleteDocument(state, payload) {
      for (var i = 0; i < state.length; i++) {
        if (state[i].id == payload) {
          state[i].disable = true
          state[i].disableDate = new Date()
        }
      }
    },
    insertReport(state, payload) {
      state.reports.push(payload)
    },
    setReports(state, payload) {
      state.reports = payload
    }

  },
  actions: {
    // getUser(){
    //   return new Promise((resolve, reject) => {
    //     getCurrentUser().then(user => {
    //       console.log('action getUser: ',user)
    //       resolve(user)
    //     }, error => {
    //       reject(error)
    //     })
    //   })
    // },
    async loadUsers(context) {
      //Se va a encargar de inicializar el state de nuestra aplicación
      const users = await getData('users');
      const result = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          description: user.description,
          email: user.email,
          location: user.location,
          phoneNumber: user.phoneNumber
        }
      });
      console.log(result)
      context.commit('setUsers', result)
    },
    async signin(context, payload) {

      await logInUser(payload.email, payload.password)
      const user = await getCurrentUser()
      const payloadMutation = {
        // id: user.uid,
        email: user.email
      }
      context.commit("signinMutation", payloadMutation)
    },
    async signup(context, payload) {
      // write the necessar commits to mutations tu create a new user
      await createNewUser(payload.email, payload.password)
      await updateName(payload.name)
      const user = await getCurrentUser()
      const payloadMutation = {
        // id: user.uid,
        name: user.displayName,
        email: user.email
      }
      await addNewDocumentWithId(payloadMutation, "users", user.uid)
      context.commit("signinMutation", payloadMutation)


    },
    async addFavoriteAnimal(context, payload) {
      const animal = payload
      const animalId = payload.id
      const userId = context.getters.getUserId
      await addFavorite(animalId, userId)
      context.commit('addFavoriteAnimal', animal)
    },
    async addRemovedAnimal(context, payload) {
      const animalId = payload
      const userId = context.getters.getUserId
      await addRemoved(animalId, userId)
      context.commit('addRemovedAnimal', animalId)
    },
    updateAnimals(context, payload) {
      const animalId = payload
      const allAnimals = context.getters.getAllAnimals
      console.log(allAnimals)
      const indexToDelete = allAnimals.findIndex((animal) => animal.id == animalId)
      context.commit('updateAnimals', indexToDelete)
    },

    async logOutUser() {
      logOutUser()
    },
    async restorePassword(_, payload) {
      await recoverPassword(payload.email)
    },
    // Will update the animal to mark it as favorite by the logged user. First idea is to have an array of users who have favorited this animal. It may have some security implications, tough. For example, an expermineted user could be able to retrieve all the ids of the users that have favorited an animal

    // favoritedByUsers: ['userId1', 'userId2', ...]
    // async setAnimalAsFavorite(context, payload) {
    //   const id_user = 1 // must be changed
    //   await addFavorite(payload, id_user)

    // //   context.commit('setFavorite', payload)
    // },
    // Will insert a new animal in the firebase app and then the app state must be updated. I think we may use most of the data structure that AnimalForm is already building. We'll have to take a look about how to relate the photos to the animal
    async insertNewAnimal(context, payload) {
      console.log('Calling insertNewAninal action with payload:', payload)
      const animalFields = {
        userId: context.getters.getUserId,
        ...payload.animalFields
      };
      const animalPhotos = payload.animalPhotos;

      const id = await addNewDocument(animalFields, 'animals')

      console.log('isnertnewAnimal:photos:', animalPhotos)
      for (let i = 0; i < animalPhotos.length; i++) {
        await setPictureToAnimal(id, animalPhotos[i]);
      }

      animalFields.id = id;
      console.log('isnertnewAnimal:animalFields:', animalFields)
      context.commit('insertAnimal', animalFields)
    },
    // Action to update an animal by its id (change description, name, etc.)
    async updateAnimal(context, payload) {

      const animalPhotos = payload.animalPhotos;
      const oldImgId = payload.oldImgId

      const id = payload.animalId
      const animalPhotosId = []

      await updateAnimalDocument(id, payload.animalFields, 'animals')

      for (let i = 0; i < animalPhotos.length; i++) {
        animalPhotosId.push(animalPhotos[i].id)
        if (oldImgId.includes(animalPhotos[i].id)) {
          console.log('la imagen ya esta')
        } else {
          await setPictureToAnimal(id, animalPhotos[i]);
        }
      }

      for (let i = 0; i < oldImgId.length; i++) {
        if (!animalPhotosId.includes(oldImgId[i])) {
          await deleteDocumentFromAnimalPhoto(oldImgId[i], id)
        }
      }

      context.commit('updateAnAnimal', payload)
    },
    // Action to remove the animal from the firebase database. Caution! Usually, we do not remove data from databases. It is better to set a new field such as "removalDate"; so if it has a value, we know that this animal should not be retrieved from firebase anymore (we'll have to change the getters to take this info into account)
    async removeAnimal(context, payload) {

      await deleteDocument(payload)

      context.commit('deleteDocument', payload)

    },

    async getAnimal(context, payload) {
      const animal = await getDataById(payload, 'animals')

      context.commit('setAnimalById', animal)
    },
    // Retrieves all the animals from database, no filters
    async getAnimals(context) {
      // Get all the data from the collection named 'animals'
      // const animals = await getData('animals');
      getSyncData('animals', async (animals) => {

        const userId = context.getters.getUserId;

        const removedAnimalsId = await getRemovedAnimalsId(userId);
        const favoriteAnimalsId = await getFavoriteAnimalsId(userId);

        if (removedAnimalsId) {
          context.commit('setRemovedAnimalsId', removedAnimalsId);
          removedAnimalsId.forEach(animalId => {
            const index = animals.findIndex(animal => animal.id == animalId);
            animals.splice(index, 1)

          });
        }
        for (const animal in animals) {
          const photos = await getCollectionFromCollection("animals", "images", animals[animal].id);

          for (const photo in photos)
            animals[animal]["pictures"].push({
              id: animals[animal].id,
              image: photos[photo].image

            })
        }
        if (favoriteAnimalsId) {
          favoriteAnimalsId.forEach(animalId => {
            const index = animals.findIndex(animal => animal.id == animalId);
            context.commit('setFavoriteAnimals', animals[index]);
            animals.splice(index, 1)
          });
        }

        context.commit('setAnimals', animals)

      })
      // updates the data in the app
    },
    updateFilters(context, payload) {
      const Filters = payload.filterFields

      console.log(Filters)

      context.commit('setFilters', Filters)
    },
    async setLoggedUser(context, payload) {
      const id = payload.id
      context.commit("setLoggedUser", id)
    },
    //Update user
    async updateUser(context, payload) {
      const id = context.getters.getLoggedUser.id
      //Actualizar la colecion users, con nuevos datos (payload)
      const updatedInfo = {
        name: payload.name,
        description: payload.description,
        phoneNumber: payload.phoneNumber,
        location: payload.location
      }
      console.log(updatedInfo)
      await updateDocument(id, updatedInfo, 'users')

      context.commit('updateUserInfo', payload)
    },
    async getUserId() {
      const user = await getCurrentUser()
      const id = user.uid
      console.log("User inside getUserId action", user)
      console.log("Id inside getUserId action", id)
      return id
    },
    async updateReports(context, payload) {
      const reportFields = {
        userId: context.getters.getUserId,
        ...payload.reportFields
      }

      const id = await addNewDocument(reportFields, 'reports')

      console.log(reportFields)

      reportFields.id = id

      context.commit('setReports', reportFields)
    }
  }
})

export default store


