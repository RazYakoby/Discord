import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);
