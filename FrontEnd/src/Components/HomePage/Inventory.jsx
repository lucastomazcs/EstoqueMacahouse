import React from 'react';
import { useNavigate } from 'react-router-dom';

function Inventory() {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };
  const backButton = () => {
    navigate('/home')
  }

  return (
    <div className="navigation-text">
      <button className="leave-button" onClick={handleLeave}>
        Sair
      </button>
      
      <button className="back-button" onClick={backButton}>
        Voltar
      </button>
      
      <h3 class>Gerenciar Estoque</h3>
      <p>Aqui você pode adicionar ou remover itens do estoque.</p>
    </div>
  );
}

export default Inventory;