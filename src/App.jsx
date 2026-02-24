import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProgramList from './components/ProgramList';
import ProgramDetails from './components/ProgramDetails';
import SubjectList from './components/SubjectList';
import SubjectDetails from './components/SubjectDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="programs" element={<ProgramList />} />
          <Route path="programs/:id" element={<ProgramDetails />} />
          <Route path="subjects" element={<SubjectList />} />
          <Route path="subjects/:id" element={<SubjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
