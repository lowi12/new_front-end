import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">Academic Portal</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/programs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Programs
          </NavLink>
          <NavLink to="/subjects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Subjects
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
