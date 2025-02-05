import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await createUser(formData) as { data: unknown };
      console.log('Usuário criado:', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box register">
        <h2>Registro</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <IonIcon icon={personOutline} />
            <Form.Control
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="input-box">
            <IonIcon icon={mailOutline} />
            <Form.Control
              className="form-text-field"
              type="email"
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
              className="form-text-field"
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Regras da senha */}
          <div className="password-rules">
            <p>A senha deve conter:</p>
            <ul>
              <li>Mínimo de 6 caracteres</li>
              <li>Pelo menos uma letra maiúscula</li>
              <li>Pelo menos um número</li>
              <li>Pelo menos um caractere especial (@, #, $, etc.)</li>
            </ul>
          </div>

          <Button type="submit" className="btn">
            Registrar
          </Button>

          <div className="login-register">
            <p>
              Já tem uma conta? <a href="/signin" className="login-link">Login</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
