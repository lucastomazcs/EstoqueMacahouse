import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    login: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    RegisterForm(formData.username, formData.login, formData.password);
  };
  
  return (
    <div className='login-form'>
      <h3>Cadastrar</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          className="custom-input"
          name="username"
          onChange={handleChange}
        />

        <input 
          type="text" 
          placeholder="Login" 
          className="custom-input"
          name="login"
          onChange={handleChange}
        />

        <input 
          type="text" 
          placeholder="Email" 
          className="custom-input"
          name="email"
          onChange={handleChange}
        />
        
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Senha" 
            className="custom-input"
            name="password"
            onChange={handleChange}
          />
          <i 
            className={`eye-icon ${showPassword ? 'open' : ''}`} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </i>
        </div>

        <Button variant="primary" type="submit" className="custom-button">
          CADASTRAR
        </Button>

        <div className="navigation-text">
          <p>
            Voltar ao <Link to="/">Login</Link>
          </p>
        </div>
      </form>

      <main>
      </main>

    </div>
  );
}

export default RegisterForm;