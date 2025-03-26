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
      <LogoutButton />
      
      <button className="back-button" onClick={backButton}>
        Voltar
      </button>
      
      <h3>Gerenciar Estoque</h3>
      <p>Aqui você pode adicionar ou remover itens do estoque.</p>
    </div>
  );
}

export default Inventory;