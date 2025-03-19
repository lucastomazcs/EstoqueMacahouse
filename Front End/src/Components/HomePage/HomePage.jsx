import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="homepage-container">

      <button className="leave-button" onClick={handleLeave}>
        Sair
      </button>

      <h3>Bem-vindo ao Sistema de Controle de Estoque</h3>

      {/* Option to Set Up a Sale */}
      <button
        className="action-button sale-button"
        onClick={() => navigate('/sale')}
      >
        Realizar Venda
      </button>

      {/* Option to Manage Inventory */}
      <button
        className="action-button manage-button"
        onClick={() => navigate('/manage')}
      >
        Gerenciar Estoque
      </button>
    </div>
  );
}

export default HomePage;