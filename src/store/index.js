import { createStore } from 'vuex'
import { getData, createNewUser, updateName, logInUser, getCurrentUser } from '../firebaseConfig.js'

const store = createStore({
  state: {
      loggedUser: {
          id: 'G37irGDes6 mCunZ4W5BdgVGhqU1Bxln1',
          email: 'didac@test.com',
          description: 'Loving Canela',
          location: 'Barcelona',
          phoneNumber: '+3466677788'
      },
      animals : []
  },
  getters: {
     // Knowking that the state of our app is always updated (or it should be); we may write all the getters that we need here to retrieve any sort of info, such all the animals, filter animals by some criteria, retrieve information about the logged user, etc
     getAllAnimals(state) {
         return state.animals
    },

  },
  // Mutations must update the app's state. Every time we retrieve data from the database, these data must be loaded somewhere in our app state management. Because we are using Vuex of our app, we must use a mutation to alter the state, never alter it directly in an action of inside a component.
  mutations: {
    setAnimals(state, payload) {
        state.animals = payload
    },
    signinMutation(state, payload) {
    state.loggedUser = payload
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
      //Sergi:Same thinks that did before but now with Vuex
      async signup(_, payload) {
        // write the necessar commits to mutations tu create a new user
        const newUser = await createNewUser(payload.email, payload.password)
        console.log(newUser)
        console.log(updateName)
        // await updateName(newUser, payload.name)


      },
      // Will update the animal to mark it as favorite by the logged user. First idea is to have an array of users who have favorited this animal. It may have some security implications, tough. For example, an expermineted user could be able to retrieve all the ids of the users that have favorited an animal

      // favoritedByUsers: ['userId1', 'userId2', ...]
      async setAnimalAsFavorite() {

      },
      // Will insert a new animal in the firebase app and then the app state must be updated. I think we may use most of the data structure that AnimalForm is already building. We'll have to take a look about how to relate the photos to the animal
      async insertNewAnimal() {

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
        const animals = await getData('animals') 
        // updates the data in the app
        context.commit('setAnimals', animals)
      }
  }
})

export default store