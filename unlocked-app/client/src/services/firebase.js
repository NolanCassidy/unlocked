//The firebase api credentials
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
var config = {
      apiKey: "XXXXXXXXXXXXXXXXXXXXXXXX",
      authDomain: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      projectId: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      appId: "XXXXXXXXXXXXXXXXXXXXXXXX",,
      measurementId: "XXXXXXXXXXXXXXXXXXXXXXXX",
  };

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
