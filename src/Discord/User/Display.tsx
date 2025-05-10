import '../../css/Display.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface DisplayProps {
  currentUser: string;
  friend: {
    id: string;
    userName: string;
    img?: string;
  };
}

interface Message {
  sender: string;
  receiver: string;
  text: string;
  timestamp: string;
}

// Use socket in a safe way
const socket: Socket = io('http://localhost:3200', { transports: ['websocket'] });

function Display({ currentUser, friend }: DisplayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/messages/${currentUser}/${friend.userName}`);
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentUser, friend.userName]);

  // Socket.IO real-time listener
  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      const isBetweenUsers =
        (message.sender === currentUser && message.receiver === friend.userName) ||
        (message.sender === friend.userName && message.receiver === currentUser);

      if (isBetweenUsers) {
        setMessages(prev => [...prev, message]);
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [currentUser, friend.userName]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await axios.post('http://localhost:3200/messages', {
        sender: currentUser,
        receiver: friend.userName,
        text: input
      });
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h3 style={{ color: 'white' }}>Chat with {friend.userName}</h3>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender === currentUser ? 'own' : ''}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="chat-send-button">Send</button>
      </div>
    </div>
  );
}

export default Display;
