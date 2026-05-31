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
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173'
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
  console.log(`📌 API Health: http://localhost:${PORT}/api/health\n`);
});
