import React from 'react';
import type { AgentType, AgentStatus } from '../../types/agent';

type Props = {
  name: string;
  setName: (name: string) => void;
  type: AgentType | '';
  setType: (type: AgentType | '') => void;
  status: AgentStatus | '';
  setStatus: (status: AgentStatus | '') => void;
  description: string;
  setDescription: (desc: string) => void;
  errors: { [key: string]: string };
  loading: boolean;
  apiError: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function AddAgentForm({
  name,
  setName,
  type,
  setType,
  status,
  setStatus,
  description,
  setDescription,
  errors,
  loading,
  apiError,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <form className="flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1" onSubmit={onSubmit}>
      <div className="flex flex-wrap gap-2 p-4 mt-4">
        <span className="text-[#99a0c2] text-base font-medium leading-normal">/</span>
        <span className="text-white text-base font-medium leading-normal">Add Agent</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Add New AI Agent</p>
      </div>
      {apiError && <div className="text-red-400 text-sm px-4 pb-2">{apiError}</div>}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">Agent Name</p>
          <input
            placeholder="Enter agent name"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />
          {errors.name && <span className="text-red-400 text-xs pt-1">{errors.name}</span>}
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">Agent Type</p>
          <select
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
            value={type}
            onChange={e => setType(e.target.value as AgentType)}
            disabled={loading}
          >
            <option value="">Select agent type</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.type && <span className="text-red-400 text-xs pt-1">{errors.type}</span>}
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">Status</p>
          <select
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
            value={status}
            onChange={e => setStatus(e.target.value as AgentStatus)}
            disabled={loading}
          >
            <option value="">Select agent status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <span className="text-red-400 text-xs pt-1">{errors.status}</span>}
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">Description</p>
          <textarea
            placeholder="Enter agent description"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none min-h-36 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
          ></textarea>
        </label>
      </div>
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#21294a] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            <span className="truncate">Cancel</span>
          </button>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#4264fa] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            type="submit"
            disabled={loading}
          >
            <span className="truncate">{loading ? 'Adding...' : 'Add Agent'}</span>
          </button>
        </div>
      </div>
    </form>
  );
} 