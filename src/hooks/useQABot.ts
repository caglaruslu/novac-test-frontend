import { useState } from 'react';
import { askHotelQABot } from '../api/agents';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export function useQABot(agentId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = async (question: string) => {
    setMessages(msgs => [...msgs, { sender: 'user', text: question }]);
    setLoading(true);
    setError(null);
    try {
      const answer = await askHotelQABot(agentId, question);
      setMessages(msgs => [...msgs, { sender: 'bot', text: answer }]);
    } catch (err: any) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Error: Could not get answer.' }]);
      setError(err.message || 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setMessages([]);

  return { messages, loading, error, sendQuestion, clear };
}
