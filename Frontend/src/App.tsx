import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/signin'
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/user/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Profile" element={<Profile />}/>
    </Routes>
  );
}

export default App;
