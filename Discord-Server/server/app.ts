// server.ts
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { LoginPageServer } from './LoginPageServer';
import { mainPageServer } from './MainPageServer';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1/:3000',
    methods: ['GET', 'POST'],
  }
});

app.use(cors());
app.use(express.json());
app.use('/login', LoginPageServer);
app.use('/main', mainPageServer);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chat-app')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Message schema
const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Message routes
app.post('/messages', async (req, res) => {
  const { sender, receiver, text } = req.body;
  if (!sender || !receiver || !text) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const message = new Message({ sender, receiver, text });
  await message.save();
  io.emit('newMessage', message); // Can be optimized to emit only to participants
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

// WebRTC signaling map
const users = new Map<string, string>(); // username -> socket.id

io.on('connection', (socket: Socket) => {
  console.log('🔌 New socket connected:', socket.id);

  // Register user
  socket.on('join-call', (username: string) => {
    users.set(username, socket.id);
    console.log(`✅ User joined: ${username} (${socket.id})`);
  });

  // Offer
  socket.on('offer', ({ to, from, offer }) => {
    const targetSocketId = users.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('offer', { from, offer });
    } else {
      console.warn(`⚠️ No socket found for recipient: ${to}`);
    }
  });

  // Answer
  socket.on('answer', ({ to, from, answer }) => {
    const targetSocketId = users.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('answer', { from, answer });
    } else {
      console.warn(`⚠️ No socket found for recipient: ${to}`);
    }
  });

  // ICE candidate
  socket.on('ice-candidate', ({ to, from, candidate }) => {
    const targetSocketId = users.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('ice-candidate', { from, candidate });
    } else {
      console.warn(`⚠️ No socket found for ICE recipient: ${to}`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    for (const [username, id] of users.entries()) {
      if (id === socket.id) {
        users.delete(username);
        console.log(`❌ User disconnected: ${username}`);
        break;
      }
    }
  });
});

// Start the server
const PORT = 3200;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
