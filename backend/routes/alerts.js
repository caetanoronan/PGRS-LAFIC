import express from 'express';
import { getActiveAlerts } from '../services/notionService.js';

const router = express.Router();

// GET: List all active alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await getActiveAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alertas', details: error.message });
  }
});

export default router;
