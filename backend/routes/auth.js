import express from 'express';
import { login, logout, register, updateFavorites } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.put("/favorites", updateFavorites);

export default router;