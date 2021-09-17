import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBIRgEmJJEFntRtV43C7sG4Ga_TUG6YaUw",
    authDomain: "musicfy-eebb0.firebaseapp.com",
    projectId: "musicfy-eebb0",
    storageBucket: "musicfy-eebb0.appspot.com",
    messagingSenderId: "523124712939",
    appId: "1:523124712939:web:e3b8034b9c742812b825ae"
  };

  export default  firebase.initializeApp(firebaseConfig);