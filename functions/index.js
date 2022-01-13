const functions = require("firebase-functions");
// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore()

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// exports.incrementUser = functions.firestore
//     .document('users/{userId}')
//     .onCreate((snap, context) => {
//       const FieldValue = admin.firestore.FieldValue;
//       db.doc("usersData/doc").update({usersCount: FieldValue.increment(1)});
// });

// exports.scheduledCountUser = functions.pubsub.schedule('every day').onRun((context) => {
//   db.collection("users").get().then(snap => {
//       db.doc("usersData/doc").update({usersCount: snap.size })
//   });
//   return null;
// });
