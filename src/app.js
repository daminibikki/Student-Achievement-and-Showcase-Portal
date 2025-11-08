const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const { notFoundHandler, errorHandler } = require('./middleware/error');

const authRoutes = require('./routes/auth.routes');
const achievementRoutes = require('./routes/achievement.routes');
const categoryRoutes = require('./routes/category.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const exportRoutes = require('./routes/export.routes');
const gamificationRoutes = require('./routes/gamification.routes');
const halloffameRoutes = require('./routes/halloffame.routes');

const app = express();

// ✅ Security & middleware setup
app.use(helmet());

// ✅ Allow requests only from your frontend (Vercel) or localhost during development
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ✅ Static serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ✅ Health check route (used by Render)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/hall-of-fame', halloffameRoutes);

// ✅ Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
