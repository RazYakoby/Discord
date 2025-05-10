// server.ts
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import { LoginPageServer } from './LoginPageServer';
import { mainPageServer } from './MainPageServer';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React client origin
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/login', LoginPageServer);
app.use('/main', mainPageServer);

// Mongoose setup
mongoose.connect('mongodb://127.0.0.1:27017/chat-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Message schema
const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/messages', async (req, res) => {
  const { sender, receiver, text } = req.body;
  if (!sender || !receiver || !text) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const message = new Message({ sender, receiver, text });
  await message.save();
  io.emit('newMessage', message); // broadcast
  res.sendStatus(200);
});

app.get('/messages/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('🟢 Client connected');
  socket.on('disconnect', () => console.log('🔴 Client disconnected'));
});

// Start server
const PORT = 3200;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
