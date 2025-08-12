'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  query,
  limitToLast,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCUYEBK79RlMZQf-VNYfCP6x1aATY5bjd8",
  authDomain: "porgichatroom.firebaseapp.com",
  databaseURL: "https://porgichatroom-default-rtdb.firebaseio.com/",
  projectId: "porgichatroom",
  storageBucket: "porgichatroom.firebasestorage.app",
  messagingSenderId: "472911808034",
  appId: "1:472911808034:web:9a6ab56f350708f3d8ac7b",
  measurementId: "G-NM8F5PJZQW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

type Message = {
  id: string;
  user: string;
  text: string;
  timestamp: number;
};

type Result = {
  player: string;
  score: number;
};

export default function LiveChatTournament() {
  const router = useRouter(); // router use хийх
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [results] = useState<Result[]>([
    { player: 'Khuslee', score: 0 },
    { player: 'Muunuu', score: 0 },
    { player: 'Hurdee', score: 0 },
    { player: 'Osor', score: 0 },
    { player: 'P', score: 0 },
    { player: 'Tsoomoo', score: 0 },
    { player: 'Esika', score: 0 },
  ]);

  useEffect(() => {
    const messagesRef = query(ref(db, 'messages'), limitToLast(100));
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([key, val]: any) => ({
          id: key,
          user: val.user,
          text: val.text,
          timestamp: val.timestamp,
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(loadedMessages);
        scrollToBottom();
      }
    });
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !username.trim()) return alert('Please enter your name and message.');
    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
      user: username.trim(),
      text: input.trim(),
      timestamp: Date.now(),
    });
    setInput('');
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col max-w-4xl mx-auto rounded-lg shadow-lg">
      {/* Буцах товч */}
      <button
        onClick={() => router.push('/')}  // Үндсэн page руу шилжүүлэх
        className="mb-4 self-start bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded font-semibold"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Live Chat & Tournament Results</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chat Section */}
        <section className="flex flex-col bg-neutral-800 rounded-lg p-4 h-[500px]">
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 mb-2 rounded bg-neutral-900 border border-neutral-700 text-white"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex-grow overflow-y-auto mb-4 space-y-2 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-neutral-700">
            {messages.length === 0 && (
              <p className="text-neutral-400 text-center mt-20">No messages yet. Start the chat!</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="p-2 bg-neutral-700 rounded">
                <span className="font-semibold text-emerald-300">{msg.user}: </span>
                <span>{msg.text}</span>
                <div className="text-xs text-neutral-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow p-2 rounded bg-neutral-900 border border-neutral-700 text-white"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 rounded font-semibold"
            >
              Send
            </button>
          </div>
        </section>

        {/* Tournament Results Section */}
        <section className="bg-neutral-800 rounded-lg p-4 h-[500px] overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Tournament Results</h2>
          <table className="w-full text-left text-neutral-300">
            <thead>
              <tr>
                <th className="border-b border-neutral-600 pb-2">Player</th>
                <th className="border-b border-neutral-600 pb-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="odd:bg-neutral-700">
                  <td className="py-2">{r.player}</td>
                  <td className="py-2">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
