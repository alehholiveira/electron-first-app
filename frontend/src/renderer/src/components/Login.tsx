import { Link, useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { AiOutlineLock } from 'react-icons/ai'
import { useState } from 'react';
import axios from 'axios';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        password,
      });

      localStorage.setItem('jwt', response.data.token);
      console.log(response.data);
      navigate('/users');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="Email"
              value={email}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
            >
              Email
            </label>
            <BiUser className=" absolute top-0 right-4" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
            >
              Senha
            </label>
            <AiOutlineLock className=" absolute top-0 right-4" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <label htmlFor="Se-Lembrar">Lembrar</label>
            </div>
            {/* <Link to="" className="text-blue-500">Esqueceu a senha</Link > */}
          </div>
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300 "
            type="submit"
          >
            Login
          </button>
          <div>
            <span className="m-4">
              Não tem Conta?{' '}
              <Link className="text-blue-500" to="/register">
                Criar Conta
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
