import '../../css/Display.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { BiSolidPhoneCall, BiSolidInbox } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { TiPin } from "react-icons/ti";
import { IoHelpCircle } from "react-icons/io5";
import { Button, ScrollArea, Flex, Box, TextInput, Modal } from '@mantine/core';

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

function Display({ currentUser, friend }: DisplayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [inbox, setInbox] = useState(false);
  const [incomingCallFrom, setIncomingCallFrom] = useState<string | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const ICE_SERVERS = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:3200', { transports: ['websocket'] });
    const socket = socketRef.current;

    const handleNewMessage = (message: Message) => {
      const isBetweenUsers =
        (message.sender === currentUser && message.receiver === friend.userName) ||
        (message.sender === friend.userName && message.receiver === currentUser);
      if (isBetweenUsers) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleIncomingCall = (data: { from: string }) => {
      setIncomingCallFrom(data.from);
    };

    const handleCallAccepted = () => {
      setCallAccepted(true);
    };

    const handleOffer = async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      if (data.from !== friend.userName) return;
      await startMedia();
      const peerConnection = createPeerConnection(data.from);
      peerConnectionRef.current = peerConnection;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', { to: data.from, from: currentUser, answer });
    };

    const handleAnswer = async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      if (data.from !== friend.userName) return;
      const peerConnection = peerConnectionRef.current;
      if (!peerConnection) return;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    };

    const handleICE = async (data: { from: string; candidate: RTCIceCandidateInit }) => {
      if (data.from !== friend.userName) return;
      try {
        await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error('Error adding received ICE candidate', err);
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('incomingCall', handleIncomingCall);
    socket.on('callAccepted', handleCallAccepted);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleICE);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('incomingCall', handleIncomingCall);
      socket.off('callAccepted', handleCallAccepted);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleICE);
      socket.disconnect();
    };
  }, [currentUser, friend.userName]);

  useEffect(() => {
    const socket = socketRef.current;
    if (socket && currentUser) {
      socket.emit('join-call', currentUser);
    }
  }, [currentUser]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const startMedia = async () => {
    if (localStreamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  const createPeerConnection = (remoteUserName: string) => {
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);
    localStreamRef.current?.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStreamRef.current!);
    });
    peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
    };
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          to: remoteUserName,
          from: currentUser,
          candidate: event.candidate
        });
      }
    };
    return peerConnection;
  };

  const handleCall = async () => {
    if (!socketRef.current) return;
    await startMedia();
    const peerConnection = createPeerConnection(friend.userName);
    peerConnectionRef.current = peerConnection;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socketRef.current.emit('offer', {
      to: friend.userName,
      from: currentUser,
      offer
    });
    setCallAccepted(true);
  };

  const acceptCall = () => {
    if (!socketRef.current || !incomingCallFrom) return;
    socketRef.current.emit('acceptCall', {
      from: currentUser,
      to: incomingCallFrom
    });
    setCallAccepted(true);
    setIncomingCallFrom(null);
  };

  const rejectCall = () => {
    setIncomingCallFrom(null);
  };

  const endCall = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setCallAccepted(false);
  };

  const toggleInbox = () => {
    setInbox(prev => !prev);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <Flex className="titleButtons" style={{ width: "100%", marginBottom: '10px' }}>
        <ScrollArea w={"100%"} type="never">
          <Box style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Button variant="subtle" color="white" style={{ fontSize: "20px" }} onClick={handleCall}>
              <BiSolidPhoneCall />
            </Button>
            <Button variant="subtle" color="white" style={{ fontSize: "20px" }} onClick={handleCall}>
              <BsFillCameraVideoFill />
            </Button>
            <Button variant="subtle" color="white" style={{ fontSize: "20px" }}>
              <TiPin />
            </Button>
            <TextInput
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              styles={{
                input: {
                  backgroundColor: '#202225',
                  color: 'white',
                  width: '160px',
                  fontSize: '15px'
                }
              }}
            />
            <Button style={{ backgroundColor: 'transparent', fontSize: "20px" }} onClick={toggleInbox}>
              <BiSolidInbox />
            </Button>
            <Button style={{ backgroundColor: 'transparent', fontSize: "20px" }}>
              <IoHelpCircle />
            </Button>
          </Box>
        </ScrollArea>
      </Flex>

      <h3 style={{ color: 'white' }}>Chat with {friend.userName}</h3>

      {/* Messages */}
      <div className="chat-messages">
  {messages
    .filter(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((msg, i) => (
      <div
        key={i}
        className={`chat-bubble ${msg.sender === currentUser ? 'own' : 'friend'}`}
      >
        <strong>{msg.sender}:</strong> {msg.text}
      </div>
    ))}
  <div ref={messagesEndRef} />
</div>


      {/* Input */}
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="chat-send-button">Send</button>
      </div>

      {/* Inbox */}
      {inbox && (
        <div className="model-content2">
          <p>Inbox content placeholder</p>
          <button onClick={toggleInbox}>Close Inbox</button>
        </div>
      )}

      {/* Incoming Call Modal */}
      <Modal
        opened={!!incomingCallFrom}
        onClose={rejectCall}
        title="Incoming Call"
        centered
      >
        <p>{incomingCallFrom} is calling you</p>
        <Flex justify="space-between" mt="md">
          <Button color="green" onClick={acceptCall}>Accept</Button>
          <Button color="red" onClick={rejectCall}>Reject</Button>
        </Flex>
      </Modal>

      {/* Video Call View */}
      {callAccepted && (
        <div className="video-call-container">
          <video ref={localVideoRef} autoPlay muted className="video-local" />
          <video ref={remoteVideoRef} autoPlay className="video-remote" />
          <Button color="red" onClick={endCall} style={{ marginTop: 10 }}>
            End Call
          </Button>
        </div>
      )}
    </div>
  );
}

export default Display;
