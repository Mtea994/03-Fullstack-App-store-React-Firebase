/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

// initialize the admin
admin.initializeApp();

//initialize the db instance
const db = admin.firestore();

// function to validate the user JWT token

exports.validateUserJWTToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const token = authorizationHeader.split("Bearer ")[1];

    try {
      let userData;
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();
        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid);
          userData = decodedToken;
          userData.role = "member";
          await userRef.set(decodedToken);
          return res
            .status(200)
            .json({ message: "token is valid", user: userData });
        } else {
          return res
            .status(200)
            .json({ message: "token is valid", user: doc.data() });
        }
      }
    } catch (error) {
      console.error("Error Validating Token:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  });
});

// function to save data on the cloud in firebase

exports.createNewApp = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body;
      const docRef = db.collection("apps").doc(req.body._id);
      await docRef.set(data);
      // retrieve the data from the cloud
      const appDetail = await docRef.get();
      res.status(200).json({ _id: docRef.id, data: appDetail.data() });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  });
});
