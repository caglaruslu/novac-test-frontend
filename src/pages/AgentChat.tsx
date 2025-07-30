import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAgentById } from '../api/agents';
import { useQABot } from '../hooks/useQABot';

export default function AgentChat() {
  const { id } = useParams<{ id: string }>();
  const [agentName, setAgentName] = useState('');
  const [agentAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDx-ZxM26DdctNwDDn-4bUNBQ8RvnAQtv-FBL8-vjJpaEfzfOhJeqLXGAoi5jXSPqw2z6mEOWijcSXdEGCmq3EKpA3R851kFQXp_Mdej7zIbpW2yITxsq7E5HE9r4S6b-vTPaVCkrPXZ4WgUduVKfN3l8qqJKuTc1mbq12CQsyUMBwX31JzAk1w3qMx_hYWpTdxhOcO7ZbRIsioujmGnua6vGBEDRd_zrNJQDnj6pPbGm1cZerDX3eEeF_l-ndjzoWD8NSabXW-tO63');
  const [input, setInput] = useState('');
  const [agentLoading, setAgentLoading] = useState(true);
  const { messages, loading, error, sendQuestion } = useQABot(id || '');

  useEffect(() => {
    if (!id) return;
    setAgentLoading(true);
    fetchAgentById(id)
      .then(agent => setAgentName(agent.name))
      .catch(() => setAgentName('Agent'))
      .finally(() => setAgentLoading(false));
  }, [id]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !id) return;
    await sendQuestion(input);
    setInput('');
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#101323] overflow-x-hidden" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
      <div className="flex h-full grow flex-col">
        <div style={{ height: 86}} />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4 mt-4">
              <Link className="text-[#99a0c2] text-base font-medium leading-normal" to="/">Agents</Link>
              <span className="text-[#99a0c2] text-base font-medium leading-normal">/</span>
              <span className="text-white text-base font-medium leading-normal">Agent Chat</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Agent: {agentLoading ? '...' : agentName}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                      style={{ backgroundImage: `url('${agentAvatar}')` }}
                    ></div>
                  )}
                  <div className={`flex flex-col gap-1 items-start ${msg.sender === 'user' ? 'items-end' : ''}`}>
                    <p className={`text-[#8e9acc] text-[13px] font-normal leading-normal max-w-[360px] ${msg.sender === 'user' ? 'hidden' : ''}`}>{agentName}</p>
                    <p className={`text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 ${msg.sender === 'user' ? 'bg-[#4264fa] text-white' : 'bg-[#21294a] text-white'}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {error && <div className="text-red-400 text-sm pt-2">{error}</div>}
            </div>
            <form className="flex items-center px-4 py-3 gap-3" onSubmit={handleSend}>
              <label className="flex flex-col min-w-40 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    placeholder="Type a message..."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={loading}
                  />
                  <div className="flex border-none bg-[#21294a] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2 h-14">
                    <div className="flex items-center gap-4 justify-end h-full">
                      <button
                        className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-4 bg-[#4264fa] text-white text-sm font-medium leading-normal"
                        type="submit"
                        disabled={loading || !input.trim()}
                      >
                        <span className="truncate">{loading ? 'Sending...' : 'Send'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 