const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extraction du token de l'en-tête "Authorization"
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Token invalide.' });
    } else {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
};

module.exports = authMiddleware;
