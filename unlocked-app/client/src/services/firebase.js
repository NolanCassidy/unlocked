//The firebase api credentials
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
var config = {
      apiKey: "AIzaSyDWFPUFmgidadIt_oFs3o6n5LlV2gznraM",
      authDomain: "auth-a8c9d.firebaseapp.com",
      databaseURL: "https://auth-a8c9d.firebaseio.com",
      projectId: "auth-a8c9d",
      storageBucket: "auth-a8c9d.appspot.com",
      messagingSenderId: "63954932926",
      appId: "1:63954932926:web:04cb682ccab08578ffbaef",
      measurementId: "G-NQF4P2ZRZB"
  };

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
