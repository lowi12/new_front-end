import { useParams, Link } from 'react-router-dom';
import { mockSubjects } from '../data/mockData';
import './SubjectDetails.css';

function SubjectDetails() {
  const { id } = useParams();
  const subject = mockSubjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <div className="subject-details-page">
        <p>Subject not found.</p>
        <Link to="/subjects">← Back to Subjects</Link>
      </div>
    );
  }

  const offeredLabel =
    subject.offeredIn === 'both'
      ? 'Per Semester & Per Term'
      : subject.offeredIn === 'semester'
        ? 'Per Semester'
        : subject.offeredIn === 'term'
          ? 'Per Term'
          : 'N/A';

  const prereqs = subject.prerequisites?.length > 0 ? subject.prerequisites.join(', ') : 'None';
  const coreqs = subject.corequisites?.length > 0 ? subject.corequisites.join(', ') : 'None';

  return (
    <div className="subject-details-page">
      <Link to="/subjects" className="back-link">
        ← Back to Subjects
      </Link>

      <header className="details-header">
        <span className={`offered-badge-lg offered-${subject.offeredIn || 'semester'}`}>{offeredLabel}</span>
        <h1>{subject.code} — {subject.title}</h1>
        <p className="subject-meta-detail">
          {subject.units} units • {subject.semester || subject.term || 'N/A'} • {subject.programCode || '—'}
        </p>
      </header>

      <section className="details-section">
        <h3>Description</h3>
        <p>{subject.description || 'No description available.'}</p>
      </section>

      <section className="details-section details-grid">
        <div>
          <h3>Pre-requisites</h3>
          <p>{prereqs}</p>
        </div>
        <div>
          <h3>Co-requisites</h3>
          <p>{coreqs}</p>
        </div>
      </section>

      <section className="details-section">
        <h3>Program Assignment</h3>
        <p>{subject.programCode || 'None'}</p>
      </section>
    </div>
  );
}

export default SubjectDetails;
