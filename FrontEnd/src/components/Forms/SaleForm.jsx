import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    items: [ 
      { name: 'Shorts', quantity: 0 },
      { name: 'Mug', quantity: 0 },
      { name: 'Skirt', quantity: 0 },
    ],
  });

  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  const backButton = () => {
    navigate('/home')
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle item quantity changes
  const handleItemChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity = parseInt(value || 0, 10);
    setFormData({ ...formData, items: updatedItems });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Details:', formData); // Replace with API call to backend
    alert('Pedido registrado com sucesso!');
    navigate('/home'); // Return to homepage after submission
  };

  return (
    <div className="sale-form-container">
      
      <button className='leave-button' onClick={handleLeave}>
        Sair
      </button>

      <button className="back-button" onClick={backButton}>
        Voltar
      </button>

      <h3>Realizar Venda</h3>
      <form onSubmit={handleSubmit}>
        {/* Client Name Input */}
        <input
          type="text"
          name="clientName"
          placeholder="Nome do Cliente"
          className="custom-input"
          value={formData.clientName}
          onChange={handleChange}
        />

        {/* Item Selection */}
        <h4>Itens</h4>
        {formData.items.map((item, index) => (
          <div key={item.name} className="item-input">
            <label>{item.name}</label>
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="custom-input"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" className="custom-button">
          Registrar Pedido
        </button>
      </form>
    </div>
  );
}

export default SaleForm;