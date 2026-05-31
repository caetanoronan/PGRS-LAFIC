import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';

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

// Routes (to be implemented)
// app.use('/api/waste', wasteRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/biosecurity', biosecurityRoutes);
// app.use('/api/emergencies', emergencyRoutes);
// app.use('/api/alerts', alertRoutes);

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
