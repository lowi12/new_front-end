import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { mockPrograms, mockSubjects } from '../data/mockData';
import './Dashboard.css';

function Dashboard() {
  const stats = useMemo(() => {
    const activePrograms = mockPrograms.filter((p) => p.status === 'active').length;
    const inactivePrograms = mockPrograms.filter((p) => p.status !== 'active').length;
    const subjectsWithPrereqs = mockSubjects.filter((s) => s.prerequisites?.length > 0).length;

    const subjectsBySemester = {};
    mockSubjects.forEach((s) => {
      const key = s.semester || s.term || 'N/A';
      subjectsBySemester[key] = (subjectsBySemester[key] || 0) + 1;
    });

    const semesterData = Object.entries(subjectsBySemester).map(([name, count]) => ({
      name,
      count,
      fullMark: Math.max(...Object.values(subjectsBySemester)) + 2,
    }));

    const programStatusData = [
      { name: 'Active', value: activePrograms, color: '#22c55e' },
      { name: 'Inactive/Other', value: inactivePrograms, color: '#ef4444' },
    ];

    const recentlyAdded = [
      ...mockPrograms.map((p) => ({ ...p, type: 'program', displayName: p.name })),
      ...mockSubjects.map((s) => ({ ...s, type: 'subject', displayName: s.title })),
    ]
      .filter((i) => i.addedDate)
      .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
      .slice(0, 5);

    return {
      totalPrograms: mockPrograms.length,
      totalSubjects: mockSubjects.length,
      activePrograms,
      inactivePrograms,
      subjectsPerSemester: semesterData,
      subjectsWithPrereqs,
      programStatusData,
      recentlyAdded,
    };
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of programs and subject offerings</p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.totalPrograms}</span>
          <span className="stat-label">Total Programs</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalSubjects}</span>
          <span className="stat-label">Total Subjects</span>
        </div>
        <div className="stat-card stat-active">
          <span className="stat-value">{stats.activePrograms}</span>
          <span className="stat-label">Active Programs</span>
        </div>
        <div className="stat-card stat-inactive">
          <span className="stat-value">{stats.inactivePrograms}</span>
          <span className="stat-label">Inactive/Other Programs</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.subjectsWithPrereqs}</span>
          <span className="stat-label">Subjects with Pre-requisites</span>
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-card">
          <h3>Subjects per Semester/Term</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.subjectsPerSemester}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Active vs Inactive Programs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.programStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {stats.programStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="recent-section">
        <h3>Recently Added Programs & Subjects</h3>
        <div className="recent-list">
          {stats.recentlyAdded.map((item) => (
            <div key={`${item.type}-${item.id}`} className="recent-item">
              <span className={`recent-badge ${item.type}`}>{item.type}</span>
              <span className="recent-name">{item.code}</span>
              <span className="recent-detail">{item.displayName || item.name || item.title}</span>
              <span className="recent-date">{item.addedDate}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
