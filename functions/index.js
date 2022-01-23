const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()

// usersの数を数えたい

// usersのドキュメントが1増えるたびにusersData/docのusersCountが1増える
exports.incrementUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
      const FieldValue = admin.firestore.FieldValue;
      db.doc("usersData/doc").update({usersCount: FieldValue.increment(1)});
      return;
});

// 毎日1回usersの数をカウントする
exports.scheduledCountUser = functions.pubsub.schedule('every day').onRun((context) => {
  db.collection("users").get().then(snap => {
      db.doc("usersData/doc").update({usersCount: snap.size })
  });
  return;
});
