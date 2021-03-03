import firebase from 'firebase/app'
require('firebase/auth')
import 'firebase/firestore'
import 'firebase/storage'


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
const storage = firebase.storage();


async function getCollectionFromCollection(from_collection, collection, doc_id) {
    const collectionRef = db
        .collection(from_collection)
        .doc(doc_id)
        .collection(collection);

    const snapshot = await collectionRef.get();

    const images = snapshot.docs.map((doc) => ({
        ...doc.data(),
    }));

    return images;

    // console.log("firebase: getCollectionFromCollection " + collection + " from " + from_collection, images);
}

async function updateName(newName) {
    const user = await getCurrentUser()
    await user.updateProfile({
        displayName: newName
    })
}

async function getData(collection) {
    const collectionRef = db
        .collection(collection);

    const snapshot = await collectionRef.get()

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        pictures: [],
    }));

    console.log("firebase: getData from " + collection, data)
    return data
}


async function addNewDocument(data, collection) {
    const ref = await db.collection(collection)
        .add({
            ...data
        })
    console.log("firebase: addNewDocument")
    return ref.id
}

async function addNewDocumentWithId(data, collection, id){
    await db.collection(collection).doc(id)
        .set({
            ...data
        })
}

async function updateDocument(id, data, collection) {
    const ref = db.collection(collection).doc(id);

    await ref.update({
        ...data
    })

    return ref
}

async function addFavorite(id, id_user) {
    const ref = db.collection("animals").doc(id);

    return ref.update({
        favorite: firebase.firestore.FieldValue.arrayUnion(id_user)
    })

}

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

async function setPictureToAnimal(id_animal, picture) {
    const guid = uuidv4();
    const filePath = `${id_animal}/images/${guid}.${picture.format}`;
    const storageRef = storage.ref();
    await storageRef
        .child(filePath)
        .putString(picture.base64String, "base64");
    const url = await storageRef.child(filePath).getDownloadURL();
    const id = await db.collection("animals").doc(id_animal).collection("images").add({
        image: url,
    })
    return id
}

async function createNewUser(email, password) {
    const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

    return newUser
}

async function logInUser(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);    
}

async function logOutUser(){
    console.log("Logging out User")
    firebase.auth().signOut();
}

async function getCurrentUser() {
    const user = await firebase.auth().currentUser
    return user  
}

async function recoverPassword(emailAddress){
    await firebase.auth().sendPasswordResetEmail(emailAddress);
    
}


export { getData, addNewDocument, updateDocument, getCollectionFromCollection, addFavorite, createNewUser, updateName, logInUser, logOutUser, getCurrentUser, setPictureToAnimal, recoverPassword, addNewDocumentWithId }

//Create function recieves user and password and create such user in the database. If everythuing goes well it should updateProfile
