import type { Agent } from '../../types/agent';

type Props = { agent: Agent };

export default function AgentInfoDisplay({ agent }: Props) {
  return (
    <>
      {/* Name */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Name</p>
        <p className="text-white text-sm font-normal leading-normal">{agent.name}</p>
      </div>
      {/* Type */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Type</p>
        <p className="text-white text-sm font-normal leading-normal">{agent.type}</p>
      </div>
      {/* Status */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Status</p>
        <p className="text-white text-sm font-normal leading-normal">{agent.status}</p>
      </div>
      {/* Description */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Description</p>
        <p className="text-white text-sm font-normal leading-normal">{agent.description || '-'}</p>
      </div>
    </>
  );
} 