import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
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
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="input-box">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <IonIcon icon={mailOutline} className="input-icon" />
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="input-box">
            <label htmlFor="password">Senha</label>
              <div className="input-with-icon">
                <IonIcon icon={lockClosedOutline} className="input-icon" />
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
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