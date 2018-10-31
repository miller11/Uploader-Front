const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
  // Check if user meets role criteria.
  if (user.email &&
    user.email.indexOf('ross.h.miller@gmail.com') !== -1) {
    const customClaims = {
      admin: true,
      photoOwner: true
    };

    // Set custom user claims on this newly created user.
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = admin.database().ref("metadata/" + user.uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({refreshTime: new Date().getTime()});
      })
      .catch(error => {
        console.log(error);
      });
  }
});

// Action for new photos
exports.newPhoto = functions.database.ref('/photos/{albumid}/{photoid}').onCreate((snap, context) => {

  console.log(snap.key);

  snap.ref.parent.once('value').then(function (snapshot) {
    // set the count of photos
    const count = snapshot.numChildren();
    return admin.database().ref('/albums/').child(context.params.albumid).update({photoCount: count});
  }).catch(error => {
    console.log(error);
  });

  // check to see if there is a cover photo yet or not
  admin.database().ref('/albums/').child(context.params.albumid).once('value').then(function (snapshot) {
    // set a cover photo if none are set
    if(snapshot.val().coverPhoto === undefined || snapshot.val().coverPhoto === null) {
      let value = snap.val();
      value['.key'] = snap.key;


      admin.database().ref('/albums/').child(context.params.albumid).update({coverPhoto: value});
    }

    return snapshot.val();
  }).catch(error => {
    console.log(error);
  });


  return null;
});

exports.deletePhoto = functions.database.ref('/photos/{albumid}/{photoid}').onDelete((snap, context) => {
  snap.ref.parent.once('value').then(function (snapshot) {
    // set the count of photos
    const count = snapshot.numChildren();
    return admin.database().ref('/albums/').child(context.params.albumid).update({photoCount: count});
  }).catch(error => {
    console.log(error);
  });

  // todo check to see if photo being deleted is the cover photo
  // admin.database().ref('/albums/').child(context.params.albumid).once('value').then(function (snapshot) {
  //   // set a cover photo if none are set
  //   if(snapshot.val().coverPhoto.name === snap.val().name) {
  //     admin.database().ref('/albums/').child(context.params.albumid).update({coverPhoto: snap.val()});
  //   }
  //
  //   return snapshot.val();
  // }).catch(error => {
  //   console.log(error);
  // });


  return null;
});
