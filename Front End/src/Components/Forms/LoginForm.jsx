import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='login-form'>
      <h3>Login</h3>
      <form>
        <input 
          type="text" 
          placeholder="Login" 
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

        <Button variant="primary" type="submit" className="custom-button" onClick={() => navigate('/home')}>
          ENTRAR
        </Button> 

        <button className="secondary-button" onClick={() => navigate('/register')}>
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

export default LoginForm;