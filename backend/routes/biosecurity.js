import express from 'express';
import {
  getInactivationProtocols,
  getBiosecurityRequirements
} from '../services/notionService.js';

const router = express.Router();

// GET: Biosecurity requirements
router.get('/requirements', async (req, res) => {
  try {
    const requirements = await getBiosecurityRequirements();
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar requisitos de biossegurança', details: error.message });
  }
});

// GET: Inactivation protocols
router.get('/inactivation', async (req, res) => {
  try {
    const protocols = await getInactivationProtocols();
    res.json(protocols);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar protocolos de inativação', details: error.message });
  }
});

export default router;
