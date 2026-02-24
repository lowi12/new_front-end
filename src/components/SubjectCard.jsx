import { Link } from 'react-router-dom';
import './SubjectCard.css';

function SubjectCard({ subject }) {
  const offeredLabel =
    subject.offeredIn === 'both'
      ? 'Semester & Term'
      : subject.offeredIn === 'semester'
        ? 'Per Semester'
        : subject.offeredIn === 'term'
          ? 'Per Term'
          : 'N/A';

  return (
    <Link to={`/subjects/${subject.id}`} className="subject-card">
      <div className="subject-card-header">
        <span className="subject-code">{subject.code}</span>
        <span className={`offered-badge offered-${subject.offeredIn || 'semester'}`}>{offeredLabel}</span>
      </div>
      <h3 className="subject-title">{subject.title}</h3>
      <div className="subject-meta">
        <span>{subject.units} units</span>
        <span>•</span>
        <span>{subject.semester || subject.term || 'N/A'}</span>
        <span>•</span>
        <span>{subject.programCode || '—'}</span>
      </div>
      {subject.prerequisites?.length > 0 && (
        <span className="prereq-indicator">Has pre-requisites</span>
      )}
      {subject.description && (
        <p className="subject-desc">{subject.description}</p>
      )}
    </Link>
  );
}

export default SubjectCard;
