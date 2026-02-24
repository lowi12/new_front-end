import { Link } from 'react-router-dom';
import './ProgramCard.css';

function ProgramCard({ program }) {
  const statusClass = program.status?.replace(/\s+/g, '-').toLowerCase() || '';

  return (
    <Link to={`/programs/${program.id}`} className="program-card">
      <div className="program-card-header">
        <span className="program-code">{program.code}</span>
        <span className={`program-status status-${statusClass}`}>{program.status}</span>
      </div>
      <h3 className="program-name">{program.name}</h3>
      <div className="program-meta">
        <span className="program-type">{program.type}</span>
        <span className="program-duration">{program.duration}</span>
        <span className="program-units">{program.totalUnits} units</span>
      </div>
    </Link>
  );
}

export default ProgramCard;
