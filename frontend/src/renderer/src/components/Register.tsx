import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { AiOutlineLock } from 'react-icons/ai'

export default function Register(): JSX.Element {
  return (
    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Cadastrar</h1>
        <form action="">
          <div className="relative my-4">
            <input
              type="Email"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
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
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
            >
              Senha
            </label>
            <AiOutlineLock className=" absolute top-0 right-4" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
            >
              Confirme a Senha
            </label>
            <AiOutlineLock className=" absolute top-0 right-4" />
          </div>

          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300 "
            type="submit"
          >
            Cadastrar
          </button>
          <div>
            <span className="m-4">
              Já tem conta?{' '}
              <Link className="text-blue-500" to="/">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
