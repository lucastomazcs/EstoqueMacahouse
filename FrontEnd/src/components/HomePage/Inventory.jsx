import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Inventory.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({ nome: "", quantidade: 0 });
  const [selectedId, setSelectedId] = useState(null);

  // Buscar dados ao montar componente
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await axios.get('http://localhost:8000/estoque/');
      setItems(response.data);
    } catch (err) {
      console.error('Erro ao carregar estoque:', err);
    }
  }

  function handleEditChange(field, value) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, [field]: value } : item
      )
    );
  }

  function handleSelect(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleEdit() {
    if (selectedId !== null) {
      setEditingId(selectedId);
    } else {
      alert("Selecione um item para editar");
    }
  }

  async function handleSave() {
    const item = items.find((i) => i.id === editingId);
    try {
      await axios.put(`http://localhost:8000/estoque/${item.id}`, {
        item: item.nome,
        quantidade: item.quantidade,
      });
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar item:', err);
    }
  }

  async function handleRemove() {
    if (selectedId !== null) {
      try {
        await axios.delete(`http://localhost:8000/estoque/${selectedId}`);
        setItems((prev) => prev.filter((item) => item.id !== selectedId));
        setSelectedId(null);
        if (editingId === selectedId) setEditingId(null);
      } catch (err) {
        console.error('Erro ao remover item:', err);
      }
    } else {
      alert("Selecione um item para remover");
    }
  }

  function handleNewItemChange(field, value) {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAdd() {
    if (!newItem.nome.trim()) {
      alert("Nome do item não pode ser vazio");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/estoque/', {
        item: newItem.nome,
        quantidade: Number(newItem.quantidade),
        idAdmin: 1, // <- ajustar com ID real do admin
      });
      setItems([...items, response.data]);
      setNewItem({ nome: "", quantidade: 0 });
    } catch (err) {
      console.error('Erro ao adicionar item:', err);
    }
  }

  return (
    <div className="inventory-wrapper">
      <div className="inventory-content">
        <button className="back-button" onClick={() => window.history.back()}>
          Voltar
        </button>

        <h3 className="inventory-title">Gerenciar Estoque</h3>

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
              {items.map(({ id, nome, quantidade }) => (
                <tr
                  key={id}
                  onClick={() => handleSelect(id)}
                  style={{
                    backgroundColor: id === selectedId ? "#1db95466" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td>{id}</td>
                  <td>
                    {editingId === id ? (
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => handleEditChange("nome", e.target.value)}
                      />
                    ) : (
                      nome
                    )}
                  </td>
                  <td>
                    {editingId === id ? (
                      <input
                        type="number"
                        min="0"
                        value={quantidade}
                        onChange={(e) => handleEditChange("quantidade", e.target.value)}
                      />
                    ) : (
                      quantidade
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>+</td>
                <td>
                  <input
                    type="text"
                    placeholder="Novo item"
                    value={newItem.nome}
                    onChange={(e) => handleNewItemChange("nome", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={newItem.quantidade}
                    onChange={(e) => handleNewItemChange("quantidade", e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="inventory-footer">
        {editingId !== null ? (
          <button className="action-box" onClick={handleSave}>
            💾 Salvar
          </button>
        ) : (
          <>
            <button className="action-box" onClick={handleEdit}>
              ✏️ Editar
            </button>
            <button className="action-box" onClick={handleRemove}>
              🗑️ Remover
            </button>
            <button className="action-box" onClick={handleAdd}>
              ➕ Adicionar
            </button>
          </>
        )}
      </div>
    </div>
  );
}