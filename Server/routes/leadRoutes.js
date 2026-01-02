import express from "express";
import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json({
    success: true,
    message: '🔮 Birth chart request received!',
    lead
  });
};

export const getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

const router = express.Router();

// PUBLIC – Form submit
router.post("/", async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json({
    success: true,
    message: "🔮 Birth chart request received!"
  });
});

export default router;

