// src/routes/jobs.routes.js
import { Router } from "express";
import uploadResume from "../middlewares/uploadResume.js";
import { applyForJob } from "../controllers/jobs.controller.js";

const router = Router();

// Public endpoint
router.post("/jobs/apply", uploadResume.single("resume"), applyForJob);

export default router;
