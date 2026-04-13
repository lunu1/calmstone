import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/mongodb-connection.config.js';

import authRoutes from './routes/authRoutes.js';
import slideRoutes from './routes/slideRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js'
import overviewRoutes from './routes/overviewRoutes.js';
import sectorsRoutes from './routes/sectorsRoutes.js';
import logoRoutes from './routes/logoRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import servicePageRoutes from './routes/servicePageRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import jobsRoutes from "./routes/jobs.routes.js";

// ;

const app = express();

// DB
await connectDB();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  })
);

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File too large. Max 5MB." });
    }
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Server error", detail: err.message });
});

// Health
app.get('/', (_, res) => res.send('API OK'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/sectors', sectorsRoutes);
app.use('/api/logos', logoRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/service-pages', servicePageRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/news', newsRoutes);
app.use("/api", jobsRoutes);

// Start
const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server running on', port));
