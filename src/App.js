import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// PAGES
import StartScreen from './pages/StartScreen/StartScreen.jsx';
import SignUpScreen from './pages/SignUpScreen/SignUpScreen.jsx';
import LoginScreen from './pages/LoginScreen/LoginScreen.jsx';
import MainScreen from './pages/MainScreen/MainScreen.jsx';

import { AdminProvider } from './contexts/AdminContext.jsx';


function App() {
  return (
    <div className="App">
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/main" element={<MainScreen />} />
          </Routes>
        </Router>
      </AdminProvider>
    </div>
  );
}

export default App;
