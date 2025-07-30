import { useState } from 'react';
import AgentTable from '../components/features/AgentTable';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#101323]">
      <div style={{ height: 86}} />
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-[960px] mx-auto flex flex-col flex-1">
          <div className="flex flex-wrap justify-between items-center gap-3 pb-2 px-2">
            <h1 className="text-white text-[32px] font-bold leading-tight min-w-72">AI Agents</h1>
            <button
              className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#4264fa] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => navigate('/add-agent')}
            >
              <span className="truncate">Add New Agent</span>
            </button>
          </div>
          <div className="w-full px-2 pb-4">
            <div className="flex w-full items-center h-[48px] bg-[#1d2b57] rounded-xl border border-[#1a223f] overflow-hidden px-3">
              <div className="text-[#8e9acc] flex items-center justify-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
                </svg>
              </div>
              <input
                placeholder="Search agents by name"
                className="form-input w-full text-white bg-transparent border-none focus:outline-none focus:ring-0 h-full text-base placeholder:text-[#8e9acc]"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full px-2 pb-8">
            <AgentTable search={search} />
          </div>
        </div>
      </main>
    </div>
  );
}
