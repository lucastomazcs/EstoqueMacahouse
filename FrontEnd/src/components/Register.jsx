import React, { useEffect, useState } from 'react';
import RegisterForm from './Forms/RegisterForm';
import api from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/jonas');
      setUsers(response.data.users);  // Store full user data
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async (userData) => {
    try {
      await api.post('/jonas', userData);  // Send full user data
      fetchUsers();  // Refresh user list
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.login} - {user.email} - {user.password}</li>
        ))}
      </ul>
      <RegisterForm addUser={addUser} />
    </div>
  );
};

export default UserList;
