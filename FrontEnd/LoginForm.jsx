import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Resetar mensagem

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      setMessage(`Bem-vindo, ${data.user.name}!`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="E-mail" 
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Senha" 
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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