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
  snap.ref.parent.once('value').then(function (snapshot) {
    const count = snapshot.numChildren();

    snap.ref.parent.set({photoCount: count});

    if(snapshot.val().coverPhoto === undefined || snapshot.val().coverPhoto === null) {
      snap.ref.parent.set({coverPhoto: snap.val()});
    }

    return snapshot;
  }).catch(error => {
    console.log(error);
  });

  return null;
});

// exports.deletePhoto = functions.database.ref('/photos/{albumid}/{photoid}').onDelete(async (snap) => {
//   const counterRef = snap.ref;
//   const collectionRef = counterRef.parent.child('likes');
//
//   // Return the promise from counterRef.set() so our function
//   // waits for this async event to complete before it exits.
//   const messagesData = await collectionRef.once('value');
//   return await counterRef.set(messagesData.numChildren());
// });
