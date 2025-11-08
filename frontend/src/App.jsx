import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import PrescriptionList from "./pages/PrescriptionList";
import Report from "./pages/Report";

function Header() {
  const loc = useLocation();
  return (
    <header className="app-header">
      <div className="container page-container">
        <div className="brand">Prescription Manager</div>
        <div className="nav-actions">
          <Link to="/" className={`pill ${loc.pathname === '/' ? 'active' : ''}`}>Prescriptions</Link>
          <Link to="/report" className={`pill ${loc.pathname === '/report' ? 'active' : ''}`}>Report</Link>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PrescriptionList />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}