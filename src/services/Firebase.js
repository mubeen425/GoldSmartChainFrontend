import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBWEbqh25-x5QE43KKUKcwcM988D85M1Hk",
  authDomain: "registeruser-6dfa3.firebaseapp.com",
  projectId: "registeruser-6dfa3",
  storageBucket: "registeruser-6dfa3.appspot.com",
  messagingSenderId: "156470623780",
  appId: "1:156470623780:web:fc53b20ef7a82dbd4362b1",
  measurementId: "G-WP5LSKTK71",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
