import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { createUser } from '../../infra/usersDB';
import './SignUp.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await createUser(formData);
      navigate('/signin');
    } catch (error) {
      console.error('Registration Error:', error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box register">
        <h2>Create Account</h2>
        
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <IonIcon icon={personOutline} className="input-icon" />
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <Form.Group className="input-box">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <IonIcon icon={mailOutline} className="input-icon" />
              <Form.Control
                type="email"
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
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <div className="password-rules">
            <p>Password must contain:</p>
            <ul>
              <li>Minimum 6 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (@, #, $, etc.)</li>
            </ul>
          </div>

          <Button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Creating Account...
              </div>
            ) : "Sign Up"}
          </Button>

          <div className="login-register">
            <p>
              Already have an account?{' '}
              <a href="/signin" className="register-link">
                Sign In
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;