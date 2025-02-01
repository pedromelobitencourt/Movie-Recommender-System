import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import Header from '../../components/Header';
import './SignIn.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    // Exemplo: autenticação e redirecionamento para a página de dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="input-box">
              <IonIcon icon={mailOutline} />
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="input-box">
              <IonIcon icon={lockClosedOutline} />
              <Form.Control
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="remember-forgot">
              <Form.Check
                type="checkbox"
                label="Lembrar de mim"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <a href="#">Esqueceu a senha?</a>
            </Form.Group>

            <Button type="submit" className="btn">
              Login
            </Button>

            <div className="login-register">
              <p>
                Não tem uma conta? <a href="/signup" className="register-link">Registre-se</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;