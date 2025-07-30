type Props = {
  form: { name: string; type: string; status: string; description: string };
  setForm: (form: any) => void;
  formError: string;
  saving: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  editMode: boolean;
};

export default function AgentDetailsForm({
  form,
  setForm,
  formError,
  saving,
  handleSave,
  handleCancel,
  editMode,
}: Props) {
  if (!editMode) return null;
  return (
    <>
      {/* Name */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Name</p>
        <input
          name="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="form-input rounded-xl bg-[#21294a] text-white px-3 py-1 text-sm w-full"
          disabled={saving}
        />
      </div>
      {/* Type */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Type</p>
        <select
          name="type"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="form-input rounded-xl bg-[#21294a] text-white px-3 py-1 text-sm w-full"
          disabled={saving}
        >
          <option value="">Select type</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
      {/* Status */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Status</p>
        <select
          name="status"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          className="form-input rounded-xl bg-[#21294a] text-white px-3 py-1 text-sm w-full"
          disabled={saving}
        >
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* Description */}
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#394060] py-5">
        <p className="text-[#99a0c2] text-sm font-normal leading-normal">Description</p>
        <textarea
          name="description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="form-input rounded-xl bg-[#21294a] text-white px-3 py-1 text-sm w-full min-h-20"
          disabled={saving}
        />
      </div>
      {/* Error and Buttons */}
      <div className="col-span-2 flex gap-3 pt-4">
        {formError && <span className="text-red-400 text-sm flex-1">{formError}</span>}
        <button
          className="flex min-w-[48px] max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full px-2 bg-[#21294a] text-white text-sm font-medium leading-normal"
          style={{ height: '24px' }}
          type="button"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          className="flex min-w-[48px] max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full px-2 bg-[#4264fa] text-white text-sm font-medium leading-normal"
          style={{ height: '24px' }}
          type="button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </>
  );
} 