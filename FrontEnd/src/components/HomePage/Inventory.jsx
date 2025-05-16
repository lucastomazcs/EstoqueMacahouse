import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

function Inventory() {
  const navigate = useNavigate();

  const backButton = () => {
    navigate('/home');
  };

  return (
    <div className="inventory-wrapper">
      <div className="inventory-content">
        <button className="back-button" onClick={backButton}>
          Voltar
        </button>

        <h3 className="inventory-title">Gerenciar Estoque</h3>
        <p className="inventory-description">
          Aqui você pode adicionar ou remover itens do estoque.
        </p>

        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {/* Nenhum item ainda */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rodapé fixo com as funções */}
      <div className="inventory-footer">
        <div className="action-box">✏️ Editar</div>
        <div className="action-box">➕ Adicionar</div>
        <div className="action-box">🗑️ Remover</div>
      </div>
    </div>
  );
}

export default Inventory;
