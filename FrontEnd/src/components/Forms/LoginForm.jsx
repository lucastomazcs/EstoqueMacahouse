import React, { useState } from "react";
import Button from "react-bootstrap/Button"; //
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [login, setLogin] = useState(""); //
  const [password, setPassword] = useState(""); //
  const [showPassword, setShowPassword] = useState(false); //
  const [error, setError] = useState(""); //
  const navigate = useNavigate(); //

  const handleLogin = async (event) => {
    event.preventDefault(); //
    setError(""); //

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST", //
        headers: { "Content-Type": "application/x-www-form-urlencoded" }, //
        body: new URLSearchParams({ username: login, password }), //
        // credentials: "include", // Não é mais estritamente necessário para *receber* o token no corpo,
                                  // mas não prejudica se outras partes da API usarem cookies.
      });

      if (!response.ok) { //
        // Tenta pegar uma mensagem de erro do backend se houver
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Login inválido");
      }

      // *** NOVO: Pegar os tokens da resposta ***
      const data = await response.json();

      // *** NOVO: Armazenar os tokens no localStorage ***
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }

      navigate("/home"); //
    } catch (err) {
      setError(err.message); //
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email" // Alterado de "" para "email" para melhor semântica
          placeholder="Email"
          className="custom-input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`eye-icon ${showPassword ? "open" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </i>
        </div>

        {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" type="submit" className="custom-button">
          ENTRAR
        </Button>

        <button type="button" className="secondary-button" onClick={() => navigate("/register")}>
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

export default LoginForm;