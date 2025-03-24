import React, { useEffect, useState } from 'react';
import RegisterForm from './Forms/RegisterForm';
import api from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/jonas');
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUsername = async (username) => {
    try {
      await api.post('/jonas', { name: username });
      fetchUsers();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((username, index) => (
          <li key={index}>{username.name}</li>
        ))}
      </ul>
      <RegisterForm addUsername={addUsername} />
    </div>
  );
};

export default UserList;