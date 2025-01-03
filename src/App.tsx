
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Pilot } from './pages/Pilot';
import { Cameraman } from './pages/Cameraman';
import CameramanUser from './pages/CameramanUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/cameraman" element={<Cameraman />} />
        <Route path='/cameraman/:id' element={<CameramanUser />} />
      </Routes>
    </Router>
  );
}

export default App;