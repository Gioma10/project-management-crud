const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");

// Inizializzazione di Firebase Admin
const serviceAccount = require("./config/codechallenge-drivedrop-firebase-adminsdk-fbsvc-5846502277.json"); // Sostituisci con il percorso del file .json delle credenziali

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Collega Firestore

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// Endpoint per ottenere i progetti da Firestore
app.get('/api/projects', async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get(); // Ottieni i documenti dalla raccolta 'projects'
    const projects = snapshot.docs.map(doc => doc.data()); // Ottieni i dati dei progetti
    res.json({ projects });
  } catch (error) {
    console.error("Error fetching projects: ", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
