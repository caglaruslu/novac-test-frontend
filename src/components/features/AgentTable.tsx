import { ChatBubbleLeftEllipsisIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgents } from '../../hooks/useAgents';

interface AgentTableProps {
  search?: string;
}

export default function AgentTable({ search = '' }: AgentTableProps) {
  const { agents, loading, error, remove } = useAgents();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await remove(id);
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete agent');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex overflow-hidden rounded-xl border border-[#2f3a6a] bg-[#101323] w-full">
      <table className="flex-1 w-full">
        <thead>
          <tr className="bg-[#181d35]">
            <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Name</th>
            <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Type</th>
            <th className="px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">Status</th>
            <th className="px-4 py-3 text-left text-white w-[80px] text-sm font-medium leading-normal">Chat</th>
            <th className="px-4 py-3 text-left text-white w-[80px] text-sm font-medium leading-normal">Show Details</th>
            <th className="px-4 py-3 text-left text-white w-[80px] text-sm font-medium leading-normal">Update</th>
            <th className="px-4 py-3 text-left text-white w-[80px] text-sm font-medium leading-normal">Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} className="text-center text-white py-8">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan={7} className="text-center text-red-400 py-8">{error}</td></tr>
          ) : filteredAgents.length === 0 ? (
            <tr><td colSpan={7} className="text-center text-white py-8">No agents found.</td></tr>
          ) : (
            filteredAgents.map((agent) => (
              <tr key={agent.id} className="border-t border-t-[#2f3a6a]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">{agent.name}</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#8e9acc] text-sm font-normal leading-normal">{agent.type}</td>
                <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#21294a] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">{agent.status}</span>
                  </button>
                </td>
                <td className="h-[72px] px-4 py-2 w-[80px]">
                  <button
                    className="flex items-center justify-center w-full"
                    aria-label="Chat"
                    onClick={() => navigate(`/agents/${agent.id}/chat`)}
                  >
                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-[#8e9acc] hover:text-[#4264fa]" />
                    <span className="sr-only">Chat</span>
                  </button>
                </td>
                <td className="h-[72px] px-4 py-2 w-[80px]">
                  <button
                    className="flex items-center justify-center w-full"
                    aria-label="Show Details"
                    onClick={() => navigate(`/agents/${agent.id}`)}
                  >
                    <EyeIcon className="h-6 w-6 text-[#8e9acc] hover:text-[#4264fa]" />
                    <span className="sr-only">Show Details</span>
                  </button>
                </td>
                <td className="h-[72px] px-4 py-2 w-[80px]">
                  <button
                    className="flex items-center justify-center w-full"
                    aria-label="Update"
                    onClick={() => navigate(`/agents/${agent.id}`, { state: { edit: true } })}
                  >
                    <PencilSquareIcon className="h-6 w-6 text-[#8e9acc] hover:text-[#4264fa]" />
                    <span className="sr-only">Update</span>
                  </button>
                </td>
                <td className="h-[72px] px-4 py-2 w-[80px]">
                  <button
                    className="flex items-center justify-center w-full disabled:opacity-50"
                    aria-label="Delete"
                    onClick={() => handleDelete(agent.id)}
                    disabled={deletingId === agent.id}
                  >
                    <TrashIcon className="h-12 w-12 text-[#8e9acc] hover:text-[#4264fa]" />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))
          )}
          {deleteError && (
            <tr><td colSpan={7} className="text-center text-red-400 py-2">{deleteError}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 