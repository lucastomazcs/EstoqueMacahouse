import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: login, password }),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        throw new Error("Login inválido");
      }

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          className="custom-input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
            className={`eye-icon ${showPassword ? "open" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </i>
        </div>

        {error && <p className="error-text">{error}</p>}

        <Button variant="primary" type="submit" className="custom-button">
          ENTRAR
        </Button>

        <button className="secondary-button" onClick={() => navigate("/register")}>
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
