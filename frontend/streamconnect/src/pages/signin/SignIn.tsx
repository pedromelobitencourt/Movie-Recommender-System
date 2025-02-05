/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './SignIn.css';
import { useAuth } from '../../Hooks/UseAuth';
import { login } from '../../infra/usersDB';

const SignIn: React.FC = () => {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Resetando erro ao enviar formulário

    try {
      const token = await login(formData);
      await loginAuth(token.access_token);
      navigate('/catalog');
    } catch (error) {
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Login</h2>
        
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <IonIcon icon={mailOutline} className="input-icon" />
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
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

          <div className="remember-forgot">
            <a href="/forgot-password">Esqueceu a senha?</a>
          </div>

          <Button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Entrar"}
          </Button>

          <div className="login-register">
            <p>
              Não tem uma conta? <a href="/signup" className="register-link">Cadastre-se</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
