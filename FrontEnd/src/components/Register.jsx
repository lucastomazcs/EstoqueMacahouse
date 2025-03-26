import React, { useEffect, useState } from "react";
import RegisterForm from "./Forms/RegisterForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: Expected an array");
      }

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
      setError(error.message);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      fetchUsers();
    } catch (error) {
      console.error("Error adding user", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <RegisterForm addUser={addUser} />
    </div>
  );
};

export default UserList;
