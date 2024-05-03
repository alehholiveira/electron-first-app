import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'
import { BiUser } from 'react-icons/bi';
import { IoHomeOutline } from 'react-icons/io5';
import { useState, useRef } from 'react';
import axios from 'axios';

export default function Dropdown({ user, refreshUsers }): JSX.Element {
    const [name, setName] = useState('');
    const email = user.email
    const password = user.password
    const [cep, setCep] = useState('');
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3333/edit/users/${user.id}`,
                { name, email, password, cep },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                }
            );
            console.log(response.data);
            refreshUsers();
            if (closeRef.current) {
                closeRef.current.click();
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    };

    return (
        <>
            <Dialog.Trigger className=" rounded-md text-left flex flex-col bg-slate-700 p-5 gap-3 overflow-hidden relative  outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-300">

                </span>
                <p className=" text-sm  leading-6 text-slate-600">

                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className=' inset-0 fixed bg-black/50' />
                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-50% to-indigo-500 to-100%" max-w-[640px] w-full h-[60vh] rounded-md flex flex-col outline-none'>
                    <Dialog.Close ref={closeRef} className='absolute right-0 top-0 bg-indigo-500 p-1.5 text-slate-100 rounded-md'>
                        <X className='size-5' />
                    </Dialog.Close>

                    <div className='flex flex-1 flex-col gap-3 p-5 justify-center items-center'>
                        <h1 className="text-4xl text-white font-bold text-center mb-6">Atualizar informações</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="relative my-4">
                                <input
                                    type="Nome"
                                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                    placeholder=""
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label
                                    htmlFor=""
                                    className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                                >
                                    Nome
                                </label>
                                <BiUser className=" absolute top-0 right-4" />
                            </div>
                            <div className="relative my-4">
                                <input
                                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <label
                                    htmlFor=""
                                    className="absolute text-sm text-white duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                                >
                                    CEP
                                </label>
                                <IoHomeOutline className=" absolute top-0 right-4" />
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-white py-4 text-center rounded-full text-md text-slate-300 outline-none font-medium group mb-1 '
                            >
                                <span className=' text-sky-500 group-hover:underline'>Atualizar</span>
                            </button>
                        </form>
                    </div>

                </Dialog.Content>
            </Dialog.Portal></>
    )
}
