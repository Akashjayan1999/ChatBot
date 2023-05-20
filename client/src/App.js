import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Login from "./Pages/Login"
import Pagenotfound from './Pages/Pagenotfound';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<Pagenotfound />} />
</Routes>
    </>
  );
}

export default App;
