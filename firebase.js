//ostavlja se javno kljuc, trenutno je zabranjeno pisanje na bazu

import firebase from 'firebase'
// const firebase = require("firebase");

import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  // API PODACI

}
firebase.initializeApp(firebaseConfig)

// inicijalizacija baze, autentifikacije i storage
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const jela = db.collection('jela')

// export utils/refs
export {
  db,
  auth,
  jela,
  storage,
}