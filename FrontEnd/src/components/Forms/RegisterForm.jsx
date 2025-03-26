import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterForm = ({addUsername}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) {
      addUsername(username);
      setUsername(''); 
    }
  };

  return (
    <div className='login-form'>
      <h3>Cadastrar</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          className="custom-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="text" 
          placeholder="Login" 
          className="custom-input"
        />

        <input 
          type="text" 
          placeholder="Email" 
          className="custom-input"
        />
        
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Senha" 
            className="custom-input"
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
            Voltar ao Login
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
sas