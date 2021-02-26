import { createStore } from 'vuex'
import { addNewDocument, getCollectionFromCollection, getData, setPictureToAnimal, updateDocument, createNewUser, updateName, logInUser, getCurrentUser, addFavorite, addRemoved } from '../firebaseConfig.js'

const store = createStore({
  state: {
    loggedUser: {
      id: 'G37irGDCunZ4W5BdgVGhqU1Bxln1',
      email: 'testbueno@test.com',
      description: 'Loving Canela',
      location: 1,
      phoneNumber: '+3466677788',
      favoriteAnimalsId: [],
      removedAnimalsId: []
    },
    animals: [],
    animalSearchFilters: []
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
    getFavoriteAnimalsId(state) {
      return state.loggedUser.favoriteAnimalsId
    },
    getRemovedAnimalsId(state) {
      return state.loggedUser.removedAnimalsId
    },
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
    addFavoriteAnimal(state, payload) {
      state.loggedUser.favoriteAnimalsId.push(payload)
    },
    addRemovedAnimal(state, payload) {
      state.loggedUser.removedAnimalsId.push(payload)
    },
    updateAnimals(state, payload) {
      state.animals.splice(payload, 1)
      console.log(state.animals);
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
    async addFavoriteAnimal(context, payload) {
      const animalId = payload
      const userId = context.getters.getUserId
      await addFavorite(animalId, userId)
      context.commit('addFavoriteAnimal', animalId)
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
      console.log(context.getters.getAllAnimals)
    },
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
    async updateAnimal() {


    },
    // Action to remove the animal from the firebase database. Caution! Usually, we do not remove data from databases. It is better to set a new field such as "removalDate"; so if it has a value, we know that this animal should not be retrieved from firebase anymore (we'll have to change the getters to take this info into account)
    async removeAnimal() {

    },
    // Retrieves all the animals from database, no filters
    async getAnimals(context) {
      // Get all the data from the collection named 'animals'
      const animals = await getData('animals');
      // Get only the data that the user wants to see
      const removedAnimalsId = context.getters.getRemovedAnimalsId;
      console.log(removedAnimalsId)

      removedAnimalsId.forEach(animalId => {
        const index = animals.findIndex(animal => animal.id == animalId);
        animals.splice(index, 1)

      });

      for (const animal in animals) {
        const photos = await getCollectionFromCollection("animals", "images", animals[animal].id);

        for (const photo in photos)
          animals[animal]["pictures"].push(photos[photo].image);
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
