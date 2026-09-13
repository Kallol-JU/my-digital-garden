import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Timeline from './pages/Timeline';
import Writings from './pages/Writings';
import WritingDetail from './pages/WritingDetail';
import List100 from './pages/List100';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="writings" element={<Writings />} />
        <Route path="writings/:slug" element={<WritingDetail />} />
        <Route path="/list100" element={<List100 />} />
        <Route path="/kallol-admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;