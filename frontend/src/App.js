
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Students from './pages/students/students';
import Teachers from './pages/teachers/teachers';
import Classrooms  from './pages/classrooms/classrooms';
import Subjects from './pages/subjects/Subjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </Router>
    
  );
}

export default App;
