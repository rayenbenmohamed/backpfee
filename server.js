const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Configuration de l'environnement
require('dotenv').config();

// Connexion à la base de données
connectDB();

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globaux
app.use(helmet()); // Sécurise vos en-têtes HTTP
app.use(express.json()); // Pour analyser les corps de requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les corps de requêtes URL-encoded
app.use(cors({ origin: 'http://localhost:4200' })); // Configuration des CORS
app.use(morgan('dev')); // Logger pour les requêtes HTTP

// Importation et utilisation des routes
const EtudiantRoutes = require('./routes/Etudiant.route');
const EnseignantRoutes = require('./routes/Enseignant.route');
const EmploiRouter = require('./routes/Emploi.route');
const CategorieRoute = require('./routes/Categorie.route');
const FormationRoute = require('./routes/Formations.route');
const ModuleRoute = require('./routes/Module.route');
const AuthController = require('./routes/auth.routes');
const AbsenceController=require('./routes/Absence.route')
const noteRoutes = require('./routes/Note.route');
const compteRoutes = require('./routes/Compte.route'); 
const FormationPopulaire= require('./routes/FormationPopulaire.route');
const demandeins= require('./routes/Demandeins.route')
 
//const PresenceRoute =require('./routes/Presence.routes');


// Utilisation des routes
app.use('/api/', EtudiantRoutes);
app.use('/api/', EnseignantRoutes);
app.use('/api/', EmploiRouter);
app.use('/api/', CategorieRoute);
app.use('/api/', FormationRoute);
app.use('/api/', ModuleRoute);
app.use('/api/', AbsenceController);
app.use('/api', noteRoutes);
app.use('/api', compteRoutes); 

app.use('/api', FormationPopulaire);  
app.use('/api', demandeins); 
// Prefixing with '/api'

//app.use('/api/', PresenceRoute);



// Middleware pour la gestion des erreurs (exemple basique)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});
app.use('/api/', AuthController);
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

