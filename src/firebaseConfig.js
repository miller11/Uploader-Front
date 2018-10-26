import Firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-Z14V1ptYoHoQUVsbn1aFxgXa7V5Dvlg",
  authDomain: "uploader-5bdaa.firebaseapp.com",
  databaseURL: "https://uploader-5bdaa.firebaseio.com",
  projectId: "uploader-5bdaa",
  storageBucket: "uploader-5bdaa.appspot.com",
  messagingSenderId: "904770783084",
};

const firebaseApp = Firebase.initializeApp(config);
export const provider = new Firebase.auth.GoogleAuthProvider();

const db = firebaseApp.database();
export const dbAlbumsRef = db.ref('albums');

const storage = Firebase.storage();

export const stAlbumsRef = storage.ref().child('albums');




export function dbAlbumPhotosRef(albumKey) {
  return dbAlbumsRef.child(albumKey).child('photos');
}


export function stAlbumPhotosRef(albumKey) {
  return stAlbumsRef.child(albumKey);
}
