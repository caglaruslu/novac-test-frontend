import type { Agent } from '../types/agent';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getErrorMessage(res: Response, fallback: string) {
  return res.json().then((data) => data?.message || fallback).catch(() => fallback);
}

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_URL}/agents`);
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Failed to fetch agents'));
  return res.json();
}

export async function fetchAgentById(id: string): Promise<Agent> {
  const res = await fetch(`${API_URL}/agents/${id}`);
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Agent not found'));
  return res.json();
}

export async function addAgent(agent: Omit<Agent, 'id'>): Promise<Agent> {
  const res = await fetch(`${API_URL}/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Failed to add agent'));
  return res.json();
}

export async function updateAgent(agent: Agent): Promise<Agent> {
  const res = await fetch(`${API_URL}/agents/${agent.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Failed to update agent'));
  return res.json();
}

export async function deleteAgent(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/agents/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Failed to delete agent'));
}

export async function askHotelQABot(agentId: string, question: string): Promise<string> {
  const res = await fetch(`${API_URL}/agents/${agentId}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(await getErrorMessage(res, 'Failed to get answer'));
  const data = await res.json();
  return data.answer;
} 