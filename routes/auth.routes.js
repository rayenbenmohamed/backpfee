const express = require('express');
const { register, login, getModuleInfo } = require('../controllers/Authentification.controller');
const authMiddleware = require('../Middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/moduleinf', authMiddleware, getModuleInfo);

module.exports = router;
