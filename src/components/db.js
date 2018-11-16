import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyAAFAlBf2yD_rI0xg8sxneNMXJ_e2qBcNo",
    authDomain: "freelancerchat.firebaseapp.com",
    databaseURL: "https://freelancerchat.firebaseio.com",
    projectId: "freelancerchat",
    storageBucket: "freelancerchat.appspot.com",
    messagingSenderId: "1010243361637"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();