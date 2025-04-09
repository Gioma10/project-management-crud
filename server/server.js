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

// Endpoint per ottenere i progetti 
app.get('/api/projects', async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get();
    
    // Aggiungi l'id al progetto
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,  // Qui è dove ottieni l'ID del documento
      ...doc.data(), // Aggiungi i dati del progetto
    }));

    res.json({ projects });
    // console.log(res);
    
  } catch (error) {
    console.error("Error fetching projects: ", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});


// Endpoint per ottenere i dettagli di un singolo progetto
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;  // Ottieni l'ID dal parametro della URL

  try {
    const projectDoc = await db.collection("projects").doc(id).get();  // Recupera il documento con quell'ID
    if (!projectDoc.exists) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      id: projectDoc.id,
      ...projectDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching project: ", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});


// Endpoint per eliminare un progetto
app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;  // Ottieni l'ID del progetto dalla URL

  try {
    const projectDoc = db.collection("projects").doc(id);
    const doc = await projectDoc.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    await projectDoc.delete();  // Elimina il documento
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project: ", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});



app.listen(8080, () => {
  console.log("Server started on port 8080");
});
