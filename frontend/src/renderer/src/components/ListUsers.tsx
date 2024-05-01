import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';
import Dropdown from './dropdown';

export default function ListUsers(): JSX.Element {
  const [users, setUsers] = useState<any[]>([]); // Estado para armazenar os usuários

  useEffect(() => {
    // Função para buscar os usuários da API
    const fetchUsers = async () => {
      try {
        // Faz a requisição GET para a rota /users da sua API
        const response = await axios.get('http://localhost:3333/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        // Para cada usuário, faz uma requisição para a API do CEP
        const usersWithCepInfo = await Promise.all(response.data.map(async (user) => {
          const cepResponse = await axios.get(`https://viacep.com.br/ws/${user.cep}/json/`);
          return { ...user, cepInfo: cepResponse.data };
        }));

        // Define os usuários com as informações do CEP no estado de usuários
        setUsers(usersWithCepInfo);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    // Chama a função para buscar os usuários ao montar o componente
    fetchUsers();
  }, []);


  return (
<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-6 shadow-xl  " >      
<ul role="list" className="divide-y divide-slate-600">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <BiUser className="h-12 w-12 flex-none rounded-full bg-transparent" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-black-50">{user.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-stone-50">{user.email}</p>
                <p className="text-sm leading-6 text-stone-50">{user.cepInfo.logradouro}, {user.cepInfo.bairro}, {user.cepInfo.localidade} - {user.cepInfo.uf}</p>
              </div>
            </div>
            <Dropdown></Dropdown> 
          </li>
        ))}
      </ul>
    </div>

  );
}
