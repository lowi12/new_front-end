import './FilterBar.css';

function FilterBar({
  search = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  statusFilter = '',
  onStatusFilterChange,
  typeFilter = '',
  onTypeFilterChange,
  statusOptions = [],
  typeOptions = [],
  semesterFilter = '',
  onSemesterFilterChange,
  semesterOptions = [],
  unitsFilter = '',
  onUnitsFilterChange,
  unitsOptions = [],
  prereqFilter = '',
  onPrereqFilterChange,
  prereqOptions = [],
  programFilter = '',
  onProgramFilterChange,
  programOptions = [],
}) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="search-input"
        />
      </div>
      <div className="filter-selects">
        {statusOptions.length > 0 && (
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        {typeOptions.length > 0 && (
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        {semesterOptions.length > 0 && (
          <select
            value={semesterFilter}
            onChange={(e) => onSemesterFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">All Semesters</option>
            {semesterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        {unitsOptions.length > 0 && (
          <select
            value={unitsFilter}
            onChange={(e) => onUnitsFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">All Units</option>
            {unitsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        {prereqOptions.length > 0 && (
          <select
            value={prereqFilter}
            onChange={(e) => onPrereqFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">Pre-requisites</option>
            {prereqOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        {programOptions.length > 0 && (
          <select
            value={programFilter}
            onChange={(e) => onProgramFilterChange?.(e.target.value)}
            className="filter-select"
          >
            <option value="">All Programs</option>
            {programOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
