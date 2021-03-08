import { createStore } from 'vuex'
import {
  addNewDocument,
  addFavorite,
  addRemoved,
  // getFavoriteAnimalsId,
  // getRemovedAnimalsId,
  getCollectionFromCollection,
  // getData,
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
  getSyncData,
  triggerAnimalUpdateDB
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
    getFilteredAnimals(state, getters) {
      let allAnimals = getters.getAllAnimals;
      const filters = state.animalSearchFilters;

      const favoriteAnimals = getters.getFavoriteAnimalsId
      console.log("Favorite animals id", favoriteAnimals)
      allAnimals = allAnimals.filter(animal => {
        return favoriteAnimals.indexOf(animal.id) == -1
      })
      // TODO:WE NEED TO map all animals ID

      const dislakedAnimals = getters.getLoggedUserDislakedAnimalsId
      allAnimals = allAnimals.filter(animal => {
        return dislakedAnimals.indexOf(animal.id) == -1
      })

      console.log("My DISLAKED ANIMALS are: ", dislakedAnimals)


      // Must remove my own animals
      const myAnimalsId = getters.getMyAnimalsId
      allAnimals = allAnimals.filter(animal => {
        return myAnimalsId.indexOf(animal.id) == -1
      })
      console.log("My animals are: ", myAnimalsId)

      if (!filters) {
        return allAnimals
      }



      let result = allAnimals.filter(animal => {
        return (filters.species == undefined || filters.species == animal.species) &&
          (filters.sex == undefined || filters.sex == animal.sex) &&
          (filters.adoptionType == undefined || filters.adoptionType == animal.adoptionType) &&
          (filters.location == undefined || filters.location == animal.location) &&
          (filters.age == undefined || filters.age == animal.age)
      })

      // TODO: remove disliked animals
      // result = result.filter(animal => {
      // })

      // TODO: Remove favorited animals

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
    },
    getMyAnimalsId(state, getters) {
      const getMyAnimals = getters.getMyAnimals
      return getMyAnimals.map(animal => {
        return animal.id
      })
    },
    getFilters(state) {
      return state.animalSearchFilters
    },
    //Getter of users
    getLoggedUser(state) {
      return state.loggedUser
    },
    // by logged user
    getFavoriteAnimals(state, getters) {
      const user = getters.getUserById(state.loggedUser.id)
      console.log("User of favorite animals", user)
      if (!user || !user.favoriteAnimals) {
        return []
      }


      return state.animals.filter(animal => {
        return user.favoriteAnimals.indexOf(animal.id) != -1
      })
    },
    getFavoriteAnimalsId(state, getters) {
      const favoriteAnimals = getters.getFavoriteAnimals
      return favoriteAnimals.map(animal => {
        return animal.id
      })
    },
    getLoggedUserDislakedAnimals(state, getters) {
      const user = getters.getUserById(state.loggedUser.id)
      if (!user || !user.removedAnimalsId) {
        return []
      }
      return state.animals.filter(animal => {
        return user.removedAnimalsId.indexOf(animal.id) != -1
      })
    },
    getLoggedUserDislakedAnimalsId(state, getters) {
      const dislakedAnimals = getters.getLoggedUserDislakedAnimals
      return dislakedAnimals.map(animal => {
        return animal.id
      })
    },
    getAnimalBy(state) {
      return state.animal
    },
    getAnimalById: (state) => (id) => {
      return state.animals.find(animal => animal.id === id)
    },
    getReports(state) {
      return state.reports
    },
    getUserById: (state) => (id) => {
      console.log("Get users by id", state.users)
      console.log("Id user", id)

      return state.users.find(user => user.id === id)
    },
    getLoggedUserInfo(state) {

      const user = state.users.find(user => {
        return state.loggedUser.id == user.id
      })
      return user
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
    addAnimal(state, payload) {
      state.animals.push(payload)
    },
    updateStateAnimal(state, payload) {
      let index = state.animals.findIndex(animal => animal.id == payload.id)
      console.log("found index:", index)
      // Sustituye el animal por el nuevo aninal con los datos actualizados de la BBDD
      state.animals.splice(index, 1, payload)
    },
    signinMutation(state, payload) {
      state.loggedUser = payload
    },
    setLoggedUser(state, payload) {
      // const user = state.users.filter((user) => user.id == payload);
      // state.loggedUser = user[0];
      console.log("Set logged user:", payload)
      state.loggedUser = payload
      //recuperar todos los datos del usuario con el id payload.id
      // db.collection(collection).doc(id)
    },
    setUsers(state, payload) {
      state.users = payload
      console.dir(state.loggedUser)
    },
    addUser(state, payload) {
      state.users.push(payload)
    },
    updateUserState(state, payload) {
      let index = state.users.findIndex(user => user.id == payload.id)
      console.log("found index:", index)
      state.users.splice(index, 1, payload)
    },
    addFavoriteAnimal(state, payload) {
      const currentUserId = state.loggedUser.id
      let user = state.users.findIndex(user => user.id == currentUserId)

      if (!user.favoriteAnimals) {
        user = {
          ...user,
          favoriteAnimals: []
        }
      }
      user.favoriteAnimals.push(payload.id)
    },
    addRemovedAnimalId(state, payload) {
      const currentUserId = state.loggedUser.id
      let user = state.users.findIndex(user => user.id == currentUserId)
      if (!user.removedAnimalsId) {
        user = {
          ...user,
          removedAnimalsId: []
        }
      }

      user.removedAnimalsId.push(payload.id)
    },


    setAnimalById(state, payload) {
      state.animal = payload
    },
    updateAnAnimal(state, payload) {
      for (var i = 0; i < state.length; i++) {
        if (state.animals[i].id == payload.id) {
          state.animals[i] = payload
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
      let data
      getSyncData('users', async (user, changeType) => {
        data = {
          id: user.id,
          name: user.name,
          description: user.description,
          email: user.email,
          location: user.location,
          phoneNumber: user.phoneNumber,
          favoriteAnimals: user.favoriteAnimalsId,
          removedAnimalsId: user.removedAnimalsId,
        }

        if (changeType == "added") {
          console.log("Added user :", data)
          context.commit('addUser', data)
        }

        else {
          console.log("User modified:", data)
          context.commit('updateUserState', data)
        }
      });
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
        id: user.uid,
        name: user.displayName,
        email: user.email
      }
      await addNewDocumentWithId(payloadMutation, "users", user.uid)
      context.commit("signinMutation", payloadMutation)


    },
    async addFavoriteAnimal(context, payload) {
     // const animal = payload
      const animalId = payload.id
      const userId = context.getters.getUserId

      await addFavorite(animalId, userId)

     // context.commit('addFavoriteAnimal', animal)
    },
    async addRemovedAnimal(context, payload) {
      const animalId = payload
      const userId = context.getters.getUserId
      await addRemoved(animalId, userId)
      //context.commit('addRemovedAnimalId', animalId)
    },
    updateAnimals(context, payload) {
      const animalId = payload
      const allAnimals = context.getters.getAllAnimals
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
      const animalFields = {
        userId: context.getters.getUserId,
        ...payload.animalFields
      };
      const animalPhotos = payload.animalPhotos;

      const id = await addNewDocument(animalFields, 'animals')

      for (let i = 0; i < animalPhotos.length; i++) {
        await setPictureToAnimal(id, animalPhotos[i]);
      }

      animalFields.id = id;
      //context.commit('insertAnimal', animalFields)
    },
    // Action to update an animal by its id (change description, name, etc.)
    async updateAnimal(context, payload) {

      const animalPhotos = payload.animalPhotos;
      const oldImgId = payload.oldImgId

      const id = payload.animalId
      const animalPhotosId = []

      payload.animalFields.pictures = payload.animalPhotos

      await updateAnimalDocument(id, payload.animalFields, 'animals')

      for (let i = 0; i < animalPhotos.length; i++) {
        animalPhotosId.push(animalPhotos[i].id)
        if (!oldImgId.includes(animalPhotos[i].id)) {
          await setPictureToAnimal(id, animalPhotos[i]);
        }
      }


      for (let i = 0; i < oldImgId.length; i++) {
        if (!animalPhotosId.includes(oldImgId[i])) {
          await deleteDocumentFromAnimalPhoto(oldImgId[i], id)
        }
      }


      context.commit('updateAnAnimal', payload.animalFields)
    },
    // Action to remove the animal from the firebase database. Caution! Usually, we do not remove data from databases. It is better to set a new field such as "removalDate"; so if it has a value, we know that this animal should not be retrieved from firebase anymore (we'll have to change the getters to take this info into account)
    async removeAnimal(context, payload) {
      await deleteDocument(payload)

      context.commit('deleteDocument', payload)

    },

    async triggerAnimalUpdate(context, payload) {
      await triggerAnimalUpdateDB(payload)

    },

    async getAnimal(context, payload) {
      const animal = await getDataById(payload, 'animals')

      context.commit('setAnimalById', animal)
    },
    // Retrieves all the animals from database, no filters
    async getAnimals(context) {
      // Get all the data from the collection named 'animals'
      // const animals = await getData('animals');
      getSyncData('animals', async (animal, changeType) => {

        if (animal.disable) {
          return
        }

        const photos = await getCollectionFromCollection("animals", "images", animal.id);

        for (const photo in photos)
          animal["pictures"].push({
            id: photos[photo].id,
            image: photos[photo].image
          })


        if (changeType == "added") {
          console.log("animal added:", animal)
          context.commit('addAnimal', animal)
        }

        else {
          console.log("animal changed:", animal)
          context.commit('updateStateAnimal', animal)

        }
      })
      // updates the data in the app
    },
    updateFilters(context, payload) {
      const Filters = payload.filterFields


      context.commit('setFilters', Filters)
    },
    async setLoggedUser(context, payload) {
      //const id = payload.id
      context.commit("setLoggedUser", payload)
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
      await updateDocument(id, updatedInfo, 'users')

      context.commit('updateUserInfo', payload)
    },
    async getUserId() {
      const user = await getCurrentUser()
      const id = user.uid
      return id
    },
    async updateReports(context, payload) {
      const reportFields = {
        userId: context.getters.getUserId,
        ...payload.reportFields
      }
      const id = await addNewDocument(reportFields, 'reports')
      reportFields.id = id

      context.commit('setReports', reportFields)
    }
  }
})

export default store


