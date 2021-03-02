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
        id: doc.id,
        ...doc.data(),
    }));

    return images;
}

async function updateName(newName) {
    const user = getCurrentUser()
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

async function getDataById(id, collection) {
    const docRef = db
        .collection(collection).doc(id);

    const doc = await docRef.get()

    return doc.data()
}

async function addNewDocument(data, collection) {
    const ref = await db.collection(collection)
        .add({
            ...data
        })
    console.log("firebase: addNewDocument")
    return ref.id
}

async function updateDocument(id, data, collection) {
    
    const ref = db.collection(collection).doc(id);

    return ref.update({
        name : data.name,
        age : data.age,
        description : data.description,
        adoptionType : data.adoptionType,
        location : data.location,
        sex : data.sex,
        size : data.size,
        species : data.species
    })

}

async function deleteDocument(id){
    const ref = db.collection('animals').doc(id);

    console.log('animal deleted')

    return ref.update({
        disable : true,
        disableDate : new Date
    })
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
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
}

function getCurrentUser() {
    const user = firebase.auth().currentUser
    return user
}

async function deleteDocumentFromAnimalPhoto(idPhoto, idAnimal){
console.log("delete"+idAnimal,idPhoto)
    db.collection('animals')
        .doc(idAnimal)
        .collection('images')
        .doc(idPhoto).delete().then(() => {
            console.log("Image deleted");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}


export {
    getData,
    addNewDocument,
    updateDocument,
    getCollectionFromCollection,
    addFavorite,
    createNewUser,
    updateName,
    logInUser,
    getCurrentUser,
    setPictureToAnimal,
    getDataById,
    deleteDocument,
    deleteDocumentFromAnimalPhoto
}

//Create function recieves user and password and create such user in the database. If everythuing goes well it should updateProfile