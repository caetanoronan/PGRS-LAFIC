import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import wasteRoutes from './routes/waste.js';
import biosecurityRoutes from './routes/biosecurity.js';
import alertRoutes from './routes/alerts.js';
import maintenanceRoutes from './routes/maintenance.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:8000',
  'https://pgrs-lafic.vercel.app',
  'https://pgrs-lafic-backend.onrender.com',
  ...(process.env.ALLOWED_ORIGINS?.split(',') || [])
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/waste', wasteRoutes);
app.use('/api/biosecurity', biosecurityRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ PGRS LAFIC Backend rodando em http://localhost:${PORT}`);
  console.log(`📌 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌳 Decision Tree: Inteligência de Classificação ATIVA\n`);
});
