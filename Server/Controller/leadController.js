import Lead from '../models/Lead.js';

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
