import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser(formData); 
    setFormData({ name: '', login: '', email: '', password: '' });
  };

  return (
    <div className='login-form'>
      <h3>Cadastrar</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          className="custom-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input 
          type="text" 
          placeholder="Login" 
          className="custom-input"
          name="login"
          value={formData.login}
          onChange={handleChange}
        />

        <input 
          type="text" 
          placeholder="Email" 
          className="custom-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Senha" 
            className="custom-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <i 
            className={`eye-icon ${showPassword ? 'open' : ''}`} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </i>
        </div>

        <button type="submit" className="custom-button">
          CADASTRAR
        </button>
      </form>
      
      <div className="navigation-text">
        <p>
          Voltar ao <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};


export default RegisterForm;

