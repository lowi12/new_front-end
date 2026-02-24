import { useParams, Link } from 'react-router-dom';
import { mockPrograms } from '../data/mockData';
import './ProgramDetails.css';

function ProgramDetails() {
  const { id } = useParams();
  const program = mockPrograms.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="program-details-page">
        <p>Program not found.</p>
        <Link to="/programs">← Back to Programs</Link>
      </div>
    );
  }

  const yearLevelOrder = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
  const sortedYearLevels = Object.keys(program.yearLevels || {}).sort(
    (a, b) => yearLevelOrder.indexOf(a) - yearLevelOrder.indexOf(b)
  );

  return (
    <div className="program-details-page">
      <Link to="/programs" className="back-link">
        ← Back to Programs
      </Link>

      <header className="details-header">
        <div className="details-title-row">
          <span className="program-code-badge">{program.code}</span>
          <span className={`status-badge status-${program.status?.replace(/\s+/g, '-').toLowerCase()}`}>
            {program.status}
          </span>
        </div>
        <h1>{program.name}</h1>
        <p className="program-meta-detail">
          {program.type} • {program.duration} • {program.totalUnits} units
        </p>
      </header>

      {program.description && (
        <section className="details-section">
          <h3>Description</h3>
          <p>{program.description}</p>
        </section>
      )}

      <section className="details-section">
        <h3>Curriculum by Year Level</h3>
        <div className="year-levels">
          {sortedYearLevels.map((year) => (
            <div key={year} className="year-level-card">
              <h4>{year}</h4>
              <ul className="subject-list">
                {(program.yearLevels[year] || []).map((subjectCode) => (
                  <li key={subjectCode}>{subjectCode}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProgramDetails;
