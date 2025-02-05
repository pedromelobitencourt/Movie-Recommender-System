/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './SignIn.css';
import { useAuth } from '../../Hooks/UseAuth';
import { login } from '../../infra/usersDB';


const SignIn: React.FC = () => {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [userLogin, setUserLogin] = useState(false);
  const [userLoginError, setUserLoginError] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
    setUserLogin(true);
    const token = await login(formData);
    await loginAuth(token.access_token);
    navigate('/catalog');
    setUserLogin(false);
    } catch (error: unknown) {
      setCustomError((error as Error).message);
      setUserLoginError(true);
    } finally {
      setUserLogin(false);
    }
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

            <Button type="submit" className="btn" disabled={userLogin}>
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