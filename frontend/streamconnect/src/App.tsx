import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import SignUpForm from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>

        {/* Counter Example (opcional) */}
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        {/* Footer Text (opcional) */}
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;