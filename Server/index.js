import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import Lead from "./models/leadModel.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

// MONGO CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API TO SAVE LEAD
app.post("/api/kundli", async (req, res) => {
  try {
    const data = await Lead.create(req.body);
    res.json({
      success: true,
      message: "Birth chart request received! You will get your personal horoscope soon on WhatsApp.",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ROUTE (Fetch all leads)
app.get("/api/admin/leads", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// SERVE FRONTEND STATIC
app.use(express.static(path.join(__dirname, "../")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/test', (req, res) => {
  res.send('Backend OK');
});

