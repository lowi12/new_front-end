import { useState, useMemo } from 'react';
import SubjectCard from './SubjectCard';
import FilterBar from './FilterBar';
import { mockSubjects } from '../data/mockData';
import './SubjectList.css';

function SubjectList() {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [unitsFilter, setUnitsFilter] = useState('');
  const [prereqFilter, setPrereqFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');

  const filteredSubjects = useMemo(() => {
    return mockSubjects.filter((s) => {
      const matchesSearch =
        !search ||
        s.code?.toLowerCase().includes(search.toLowerCase()) ||
        s.title?.toLowerCase().includes(search.toLowerCase());
      const matchesSemester =
        !semesterFilter || s.semester === semesterFilter || s.term === semesterFilter;
      const matchesUnits = !unitsFilter || String(s.units) === unitsFilter;
      const matchesPrereq =
        !prereqFilter ||
        (prereqFilter === 'with' && s.prerequisites?.length > 0) ||
        (prereqFilter === 'without' && (!s.prerequisites || s.prerequisites.length === 0));
      const matchesProgram = !programFilter || s.programCode === programFilter;
      return matchesSearch && matchesSemester && matchesUnits && matchesPrereq && matchesProgram;
    });
  }, [search, semesterFilter, unitsFilter, prereqFilter, programFilter]);

  const semesterOptions = [...new Set(mockSubjects.flatMap((s) => [s.semester, s.term].filter(Boolean)))];
  const unitsOptions = [...new Set(mockSubjects.map((s) => s.units))].sort((a, b) => a - b).map(String);
  const programOptions = [...new Set(mockSubjects.map((s) => s.programCode).filter(Boolean))];
  const prereqOptions = [
    { value: 'with', label: 'With pre-requisites' },
    { value: 'without', label: 'Without pre-requisites' },
  ];

  return (
    <div className="subject-list-page">
      <header className="page-header">
        <div>
          <h1>Subject Offerings</h1>
          <p>Browse all subjects and their details</p>
        </div>
      </header>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by subject code or title..."
        semesterFilter={semesterFilter}
        onSemesterFilterChange={setSemesterFilter}
        semesterOptions={semesterOptions}
        unitsFilter={unitsFilter}
        onUnitsFilterChange={setUnitsFilter}
        unitsOptions={unitsOptions}
        prereqFilter={prereqFilter}
        onPrereqFilterChange={setPrereqFilter}
        prereqOptions={prereqOptions}
        programFilter={programFilter}
        onProgramFilterChange={setProgramFilter}
        programOptions={programOptions}
      />

      {filteredSubjects.length === 0 ? (
        <div className="empty-state">
          <p>No subjects match your filters.</p>
        </div>
      ) : (
        <div className="subject-grid">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectList;
