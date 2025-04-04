import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    // Check for empty fields
    if (!formData.name || !formData.login || !formData.email || !formData.password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Falha ao cadastrar usuário");
      }
  
      navigate("/"); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="login-form">
      <h3>Cadastrar</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          className="custom-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Login"
          className="custom-input"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="custom-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="custom-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i
            className={`eye-icon ${showPassword ? "open" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </i>
        </div>

        {error && <p className="error-text">{error}</p>}

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
