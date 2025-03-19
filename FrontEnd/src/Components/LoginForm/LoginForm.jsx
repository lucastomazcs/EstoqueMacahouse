import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='login-form'>
      <h3>Login</h3>
      <form>
        <input 
          type="text" 
          placeholder="Username" 
          className="custom-input"
        />
        
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="custom-input"
          />
          <i 
            className={`eye-icon ${showPassword ? 'open' : ''}`} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility' : 'visibility_off'}
          </i>
        </div>

        <Button variant="primary" type="submit" className="custom-button">
          ENTRAR
        </Button> 

        <button className="secondary-button">
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

export default LoginForm;