import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import SignUpForm from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Catalog from './pages/catalog/Catalog';
import MoviePage from './pages/movie/MoviePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; // Importa o PrivateRoute
import PublicRoute from './components/PublicRoute/PublicRoute'; // Importa o PublicRoute
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Rotas públicas com PublicRoute */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signup" element={<PublicRoute />}>
          <Route index element={<SignUpForm />} />
        </Route>
        <Route path="/signin" element={<PublicRoute />}>
          <Route index element={<SignIn />} />
        </Route>

        {/* Rotas protegidas */}
        <Route path="/catalog" element={<PrivateRoute />}>
          <Route index element={<Catalog />} />
        </Route>
        <Route path="/movie/:movieId" element={<PrivateRoute />}>
          <Route index element={<MoviePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
