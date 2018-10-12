import Firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-Z14V1ptYoHoQUVsbn1aFxgXa7V5Dvlg",
  authDomain: "uploader-5bdaa.firebaseapp.com",
  databaseURL: "https://uploader-5bdaa.firebaseio.com",
  projectId: "uploader-5bdaa",
  storageBucket: "uploader-5bdaa.appspot.com",
  messagingSenderId: "904770783084",

  clientId: "904770783084-v981atj467q71cur4ggtp672b5o5e4o6.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile"
  ]
};

const firebaseApp = Firebase.initializeApp(config);
export const provider = new Firebase.auth.GoogleAuthProvider();
