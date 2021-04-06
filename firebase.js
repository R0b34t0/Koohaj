//ostavlja se javno kljuc, trenutno je zabranjeno pisanje na bazu

import firebase from 'firebase'
// const firebase = require("firebase");

import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyD8JAsVVAuXGGA3CAkgEFY7BnggYsqjMBg",
    authDomain: "mealfind-testdb.firebaseapp.com",
    projectId: "mealfind-testdb",
    storageBucket: "mealfind-testdb.appspot.com",
    messagingSenderId: "710487185799",
    appId: "1:710487185799:web:32942a1e9435370be31b22"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const jela = db.collection('jela')

// export utils/refs
export {
  db,
  auth,
  jela,
}