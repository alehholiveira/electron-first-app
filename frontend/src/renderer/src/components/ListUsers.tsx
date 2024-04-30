import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';

export default function ListUsers(): JSX.Element { const [users, setUsers] = useState<any[]>([]); // Estado para armazenar os usuários

useEffect(() => {
  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      // Faz a requisição GET para a rota /users da sua API
      const response = await axios.get('http://localhost:3333/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      // Define os usuários recebidos na resposta no estado de usuários
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Chama a função para buscar os usuários ao montar o componente
  fetchUsers();
}, []);

return (
  <div>
    <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
      {/* Restante do seu formulário aqui */}
      
      {/* Renderiza a lista de usuários */}
      <div>
        <h2>Usuários:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <BiUser className="inline-block mr-2" />
              {user.name} - {user.email} {/* Supondo que as informações do usuário são acessíveis */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}