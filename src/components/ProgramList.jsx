import { useState, useMemo } from 'react';
import ProgramCard from './ProgramCard';
import FilterBar from './FilterBar';
import { mockPrograms } from '../data/mockData';
import './ProgramList.css';

function ProgramList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter((p) => {
      const matchesSearch =
        !search ||
        p.code?.toLowerCase().includes(search.toLowerCase()) ||
        p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || p.status === statusFilter;
      const matchesType = !typeFilter || p.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  const uniqueStatuses = [...new Set(mockPrograms.map((p) => p.status))].filter(Boolean);
  const uniqueTypes = [...new Set(mockPrograms.map((p) => p.type))].filter(Boolean);

  return (
    <div className="program-list-page">
      <header className="page-header">
        <div>
          <h1>Program Offerings</h1>
          <p>Browse and manage academic programs</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          Add Program
        </button>
      </header>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by program code or name..."
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusOptions={uniqueStatuses}
        typeOptions={uniqueTypes}
      />

      {filteredPrograms.length === 0 ? (
        <div className="empty-state">
          <p>No programs match your filters.</p>
        </div>
      ) : (
        <div className="program-grid">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Program</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-placeholder">Modal form (design only — no backend)</p>
              <div className="form-placeholder">
                <label>Program Code</label>
                <input type="text" placeholder="e.g. BSIT" disabled />
                <label>Program Name</label>
                <input type="text" placeholder="Full program name" disabled />
                <label>Program Type</label>
                <select disabled>
                  <option>Bachelor&apos;s</option>
                  <option>Diploma</option>
                </select>
                <label>Duration</label>
                <input type="text" placeholder="e.g. 4 years" disabled />
                <label>Total Units</label>
                <input type="number" placeholder="180" disabled />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgramList;
