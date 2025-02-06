import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './SignIn.css';
import { useAuth } from '../../Hooks/UseAuth';
import { login as loginService } from '../../infra/usersDB';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  payload: {
    username: string;
    sub: number;
  };
  iat: number;
  exp: number;
}

const SignIn: React.FC = () => {
  const { login } = useAuth();
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
    setErrorMessage("");

    try {
      const response = await loginService(formData);
      const { access_token } = response;

      const decoded = jwtDecode<TokenPayload>(access_token);
      const userId = decoded.payload.sub;
      const username = decoded.payload.username;

      console.log("USEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER");
      console.log(username);

      login(access_token, userId, username);
      navigate('/catalog');
    } catch (error: any) {
      console.error("Login Error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Sign In</h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <IonIcon icon={mailOutline} className="input-icon" />
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <Form.Group className="input-box">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <div className="remember-forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <Button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="login-register">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="register-link">
                Register Now
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
