import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='login-form'>
      <h3>Cadastrar</h3>
      <form>
        <input 
          type="text" 
          placeholder="Nome" 
          className="custom-input"
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

        <div>
          <Button variant="link" onClick={() => navigate("/")}> 
            Voltar ao Login
          </Button> {/*Mudar para hyperlink posteriormente*/}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;