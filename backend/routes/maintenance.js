import express from 'express';
import { getMaintenanceStatus } from '../services/notionService.js';

const router = express.Router();

// GET: EPC maintenance status
router.get('/epc', async (req, res) => {
  try {
    const maintenance = await getMaintenanceStatus();
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar status de manutenção', details: error.message });
  }
});

export default router;
