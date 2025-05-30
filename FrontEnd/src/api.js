import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
  baseURL: "http://localhost:8000" // Sua URL base do backend
});

// Adiciona um interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('accessToken');
    
    // Se o token existir, adiciona ao cabeçalho Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Faz algo com o erro da requisição
    return Promise.reject(error);
  }
);

// Opcional: Adicionar um interceptor de resposta para lidar com refresh token
// Isso é mais avançado e pode ser adicionado depois se necessário.
// Basicamente, se uma requisição falhar com 401 (Unauthorized),
// você tentaria usar o refreshToken para obter um novo accessToken
// e então tentaria a requisição original novamente.

export default api;