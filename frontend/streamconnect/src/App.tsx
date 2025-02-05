import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import SignUpForm from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Catalog from './pages/catalog/Catalog';
import './App.css';
import MoviePage from './pages/movie/MoviePage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/movie" element={<MoviePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;