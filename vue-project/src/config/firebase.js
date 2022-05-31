import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
//import "firebase/auth";
//import "firebase/firestore";
//import "firebase/performance";
//import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDBIDA0Hp5o5AjNNETyfiwqcxzA-Qt_crk",
    authDomain: "test-9bb94.firebaseapp.com",
    projectId: "test-9bb94",
    storageBucket: "test-9bb94.appspot.com",
    messagingSenderId: "723939288167",
    appId: "1:723939288167:web:932eb415465cd3068aa0c2",
    measurementId: "G-3F3DP3XBNN"
};
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//const storageRef = firebase.storage().ref();

const docRef = db.collection("Admin");
var name = "messaging"
//store
function store(id) {
    //console.log(id);
    console.log("I am going to authenticate:  adding to Firestore database.");
    docRef.add(id)
        .then(function (docRef) {
            alert('okk');
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

export default {
    names: name,
    docRef: docRef,
    db: db,
    fb: fb,
    //storageRef: storageRef,
    fairebase_store: store,
    //fairebase_show:show
};