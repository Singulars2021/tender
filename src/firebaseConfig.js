import firebase from 'firebase/app'
require('firebase/auth')
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYJhYEmSUXj9J5Tnr7DUExS3hKge6YdN8",
    authDomain: "animalslist-19bbf.firebaseapp.com",
    databaseURL: "https://animalslist-19bbf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "animalslist-19bbf",
    storageBucket: "animalslist-19bbf.appspot.com",
    messagingSenderId: "711463254165",
    appId: "1:711463254165:web:2f6a32583db2a7b8fd039c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function getData(collection) {
    const collectionRef = db
        .collection(collection);

    const snapshot = await collectionRef.get()

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log("firebase: getData from " + collection, data )
    return data
}

async function updateName(user, newName){
    user.then((res) => res.user.updateProfile({displayName: newName}))
}

async function createNewUser(email, password){
    // firebase
    // .auth()
    // .createUserWithEmailAndPassword(email, password)
    // .then((res) => {
    //   console.log(res)
    //   res.user
    //     .updateProfile({
    //       displayName: name
    //     })
    // })
    const newUser = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    
    return newUser
}

async function logInUser(email, password){
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
}

function getCurrentUser(){
    const user = firebase.auth().currentUser
    return user
}


export {getData, createNewUser, updateName, logInUser, getCurrentUser}

//Create function recieves user and password and create such user in the database. If everythuing goes well it should updateProfile