import express from 'express';
import {
  getWasteInventory,
  createWaste,
  getWasteById,
  updateWasteStatus
} from '../services/notionService.js';

const router = express.Router();

// GET: List all waste with optional filters
router.get('/', async (req, res) => {
  try {
    const { tipo, status, ambiente } = req.query;
    const filters = {};

    if (tipo) filters.tipo = tipo;
    if (status) filters.status = status;
    if (ambiente) filters.ambiente = ambiente;

    const wastes = await getWasteInventory(filters);
    res.json(wastes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar resíduos', details: error.message });
  }
});

// GET: Get specific waste by ID
router.get('/:id', async (req, res) => {
  try {
    const waste = await getWasteById(req.params.id);
    if (!waste) {
      return res.status(404).json({ error: 'Resíduo não encontrado' });
    }
    res.json(waste);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resíduo', details: error.message });
  }
});

// POST: Create new waste entry
router.post('/', async (req, res) => {
  try {
    const waste = await createWaste(req.body);
    res.status(201).json(waste);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar resíduo', details: error.message });
  }
});

// PUT: Update waste status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório' });
    }

    const waste = await updateWasteStatus(req.params.id, status);
    res.json(waste);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status', details: error.message });
  }
});

export default router;
