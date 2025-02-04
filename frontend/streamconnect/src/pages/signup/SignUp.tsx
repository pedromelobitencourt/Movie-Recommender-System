import React, { useState } from 'react';
import { Form, Button, FormCheck } from 'react-bootstrap';
import { personOutline, mailOutline, lockClosedOutline, globeOutline, locationOutline, maleFemaleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import Select, { MultiValue } from 'react-select';
import './SignUp.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  preferredLanguage?: string;
  preferredGenres?: string[];
  location?: string;
  gender?: string;
  acceptsRecommendations?: boolean;
}

const genreOptions = [
  { value: 'Ação', label: 'Ação' },
  { value: 'Aventura', label: 'Aventura' },
  { value: 'Animação', label: 'Animação' },
  { value: 'Comédia', label: 'Comédia' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Documentário', label: 'Documentário' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Família', label: 'Família' },
  { value: 'Fantasia', label: 'Fantasia' },
  { value: 'História', label: 'História' },
  { value: 'Terror', label: 'Terror' },
  { value: 'Música', label: 'Música' },
  { value: 'Mistério', label: 'Mistério' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Ficção científica', label: 'Ficção científica' },
  { value: 'Cinema TV', label: 'Cinema TV' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Guerra', label: 'Guerra' },
  { value: 'Faroeste', label: 'Faroeste' },
];

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    preferredLanguage: '',
    preferredGenres: [],
    location: '',
    gender: '',
    acceptsRecommendations: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenreChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setFormData({
      ...formData,
      preferredGenres: selectedOptions.map((option: { value: string; label: string }) => option.value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
  };

  return (
    <div className="wrapper">
      <div className="form-box register">
        <h2>Registration</h2>
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
              className='form-text-field'
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
              className='form-text-field'
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="input-box">
            <IonIcon icon={globeOutline} />
            <Form.Control
              as="select"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
            >
              <option value="">Selecione um idioma</option>
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">Inglês (EUA)</option>
              <option value="es-ES">Espanhol (Espanha)</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="input-box">
            <label>Gêneros preferidos</label>
            <Select
              isMulti
              name="preferredGenres"
              options={genreOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(newValue) => handleGenreChange(newValue as MultiValue<{ value: string; label: string }>)}
            />
          </Form.Group>

          <Form.Group className="input-box">
            <IonIcon icon={locationOutline} />
            <Form.Control
              className='form-text-field'
              type="text"
              name="location"
              placeholder="Localização"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="input-box">
            <IonIcon icon={maleFemaleOutline} />
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecione o gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="remember-forgot">
            <FormCheck
              type="checkbox"
              label="Aceito receber recomendações"
              name="acceptsRecommendations"
              checked={formData.acceptsRecommendations}
              onChange={handleChange}
            />
          </Form.Group>

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