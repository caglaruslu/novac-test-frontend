import { useState } from 'react';
import { addAgent } from '../api/agents';
import { useNavigate } from 'react-router-dom';
import type { AgentType, AgentStatus } from '../types/agent';
import AddAgentForm from '../components/features/AddAgentForm';

export default function AddAgent() {
  const [name, setName] = useState('');
  const [type, setType] = useState<AgentType | ''>('');
  const [status, setStatus] = useState<AgentStatus | ''>('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Agent name is required.';
    if (!type) newErrors.type = 'Agent type is required.';
    if (!status) newErrors.status = 'Status is required.';
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      await addAgent({ name, type: type as AgentType, status: status as AgentStatus, description });
      navigate('/');
    } catch (err: any) {
      setApiError(err.message || 'Failed to add agent');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#101323] overflow-x-hidden" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
      <div className="flex h-full grow flex-col">
        <div style={{ height: 86}} />
        <div className="px-40 flex flex-1 justify-center py-5">
          <AddAgentForm
            name={name}
            setName={setName}
            type={type}
            setType={setType}
            status={status}
            setStatus={setStatus}
            description={description}
            setDescription={setDescription}
            errors={errors}
            loading={loading}
            apiError={apiError}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
} 