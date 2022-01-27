const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()
const increment = admin.firestore.FieldValue.increment(1)

// usersの数を数えたい

// usersのドキュメントが1増えるたびにusersData/docのusersCountが1増える
exports.incrementUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
      db.doc("usersData/doc").update({usersCount: increment});
      return null;
});

// 毎日1回usersの数をカウントする
exports.scheduledCountUser = functions.pubsub.schedule('every 24 hours').onRun((context) => {
  db.collection("users").get().then(snap => {
      db.doc("usersData/doc").update({usersCount: snap.size })
      functions.logger.log("number of users: " ,snap.size);
  });
  return null;
});
