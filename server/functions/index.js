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
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();
        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid);
          await userRef.set(decodedToken);
        }
        return res
          .status(200)
          .json({ message: "token is valid", user: decodedToken });
      }
    } catch (error) {
      console.error("Error Validating Token:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  });
});
