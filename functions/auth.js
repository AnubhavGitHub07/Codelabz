const admin = require("firebase-admin");

const databaseURL = process.env.VITE_APP_DATABASE_URL || `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`;

if (process.env.FUNCTIONS_EMULATOR === "true" || process.env.FIREBASE_CONFIG) {
  admin.initializeApp({
    databaseURL: databaseURL
  });
} else {
  const serviceAccount = require("./private/cl-dev-pk.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
  });
}

const db = admin.firestore();
const rtdb = admin.database();

module.exports = {
  db,
  rtdb,
  admin
};
