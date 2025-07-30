import { useState, useCallback, useEffect } from 'react';
import type { Agent } from '../types/agent';
import { fetchAgents, addAgent, updateAgent, deleteAgent } from '../api/agents';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAgents();
      setAgents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (agent: Omit<Agent, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newAgent = await addAgent(agent);
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (err: any) {
      setError(err.message || 'Failed to add agent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (agent: Agent) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAgent(agent);
      setAgents(prev => prev.map(a => (a.id === updated.id ? updated : a)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update agent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAgent(id);
      setAgents(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete agent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { agents, loading, error, refresh, add, update, remove };
}
