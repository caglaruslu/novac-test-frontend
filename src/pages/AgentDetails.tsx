import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAgentById, updateAgent } from '../api/agents';
import type { Agent, AgentType, AgentStatus } from '../types/agent';
import AgentDetailsForm from '../components/features/AgentDetailsForm';
import AgentInfoDisplay from '../components/features/AgentInfoDisplay';

export default function AgentDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(() => !!(location.state && (location.state as any).edit));
  const [form, setForm] = useState({ name: '', type: '', status: '', description: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchAgentById(id)
      .then(agent => {
        setAgent(agent);
        setForm({
          name: agent.name,
          type: agent.type,
          status: agent.status,
          description: agent.description || '',
        });
      })
      .catch((err) => setError(err.message || 'Failed to fetch agent'))
      .finally(() => setLoading(false));
  }, [id]);

  function handleEdit() {
    if (!agent) return;
    setForm({
      name: agent.name,
      type: agent.type,
      status: agent.status,
      description: agent.description || '',
    });
    setFormError('');
    setEditMode(true);
  }

  function handleCancel() {
    if (!agent) return;
    setForm({
      name: agent.name,
      type: agent.type,
      status: agent.status,
      description: agent.description || '',
    });
    setFormError('');
    setEditMode(false);
  }

  async function handleSave() {
    setFormError('');
    if (!form.name.trim() || !form.type || !form.status) {
      setFormError('Name, Type, and Status are required.');
      return;
    }
    if (!agent) return;
    setSaving(true);
    try {
      const updated = await updateAgent({
        ...agent,
        name: form.name,
        type: form.type as AgentType,
        status: form.status as AgentStatus,
        description: form.description,
      });
      setAgent(updated);
      setEditMode(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to update agent');
    } finally {
      setSaving(false);
    }
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
              <span className="text-white text-base font-medium leading-normal">Agent Details</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Agent Details</p>
              {editMode ? (
                <></>
              ) : (
                <button
                  className="flex min-w-[48px] max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full px-2 bg-[#282d43] text-white text-sm font-medium leading-normal"
                  style={{ height: '36px' }}
                  onClick={handleEdit}
                  disabled={loading || !agent}
                >
                  <span className="truncate">Edit</span>
                </button>
              )}
            </div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Agent Information</h3>
            {loading ? (
              <div className="text-white px-4 py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-400 px-4 py-8">{error}</div>
            ) : agent ? (
              <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                {!editMode && <AgentInfoDisplay agent={agent} />}
                {editMode && (
                  <AgentDetailsForm
                    form={form}
                    setForm={setForm}
                    formError={formError}
                    saving={saving}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    editMode={editMode}
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
} 