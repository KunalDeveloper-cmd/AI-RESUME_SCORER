import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login';
import Dashboard from './component/Dashboard/Dashboard';
import History from './component/History/History';
import Admin from './component/Admin/Admin';
import SideBar from './component/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
