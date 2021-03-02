import { createStore } from 'vuex'
import { addNewDocument, getCollectionFromCollection, getData, setPictureToAnimal, updateDocument, createNewUser, updateName, logInUser, getCurrentUser, getDataById, deleteDocument, deleteDocumentFromAnimalPhoto } from '../firebaseConfig.js'

const store = createStore({
  state: {
    loggedUser: {
      id: 'ZVPKk6gTsBUsLMFRKLzoMPmbUC82',
      email: 'testbueno@test.com',
      description: 'Loving Canela',
      location: 1,
      phoneNumber: '+3466677788'
    },
    animals: [],
    animalSearchFilters: [],
    animal: {

    }
  },
  getters: {
    getUserId(state) {
      return state.loggedUser.id;
    },
    // Knowking that the state of our app is always updated (or it should be); we may write all the getters that we need here to retrieve any sort of info, such all the animals, filter animals by some criteria, retrieve information about the logged user, etc
    getAllAnimals(state) {
      return state.animals
    },
    getFilters(state) {
      return state.animalSearchFilters
    },
    //Getter of users
    getLoggedUser(state) {
      return state.loggedUser
    },
    getAnimalBy(state) {
      return state.animal
    },
    getAnimalById: (state) => (id) => {
      return state.animals.find(animal => animal.id === id)
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
      console.dir(state.loggedUser)
    },
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
    deleteDocument(state, payload) {
      for (var i = 0; i < state.length; i++) {
        if (state[i].id == payload) {
          state[i].disable = true
          state[i].disableDate = new Date()
        }
      }
    }
  },
  actions: {
    async signin(context, payload) {

      await logInUser(payload.email, payload.password, payload.cb)
      const user = getCurrentUser()
      const payloadMutation = {
        id: user.uid,
        name: user.displayName,
        email: user.email
      }
      context.commit("signinMutation", payloadMutation)
    },
    async signup(context, payload) {
      // write the necessar commits to mutations tu create a new user
      await createNewUser(payload.email, payload.password)
      await updateName(payload.name)
      const user = getCurrentUser()
      const payloadMutation = {
        id: user.uid,
        name: user.displayName,
        email: user.email
      }
      context.commit("signinMutation", payloadMutation)


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
      context.commit('insertAnimal', animalFields)
    },
    // Action to update an animal by its id (change description, name, etc.)
    async updateAnimal(context, payload) {

      const animalPhotos = payload.animalPhotos;
      const oldImgId = payload.oldImgId

      const id = payload.animalFields.id
      const animalPhotosId = []

      await updateDocument(id, payload.animalFields, 'animals')

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
      const animals = await getData('animals');

      for (const animal in animals) {
        const photos = await getCollectionFromCollection("animals", "images", animals[animal].id);

        for (const photo in photos) {
          animals[animal]["pictures"].push(photos[photo]);
        }

      }

      // updates the data in the app
      context.commit('setAnimals', animals)
    },
    updateFilters(context, payload) {
      const Filters = payload.filterFields

      console.log(Filters)

      context.commit('setFilters', Filters)
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
    }
  }
})

export default store
