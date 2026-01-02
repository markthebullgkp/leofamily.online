import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: String,
  tob: String,
  place: String,
  whatsapp: String
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);
