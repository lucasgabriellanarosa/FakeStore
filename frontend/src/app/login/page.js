'use client'

import React, { useRef } from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const page = () => {

  const router = useRouter();
  const handleNavigate = (url) => {
      router.push(`${url}`);
  };

  const username = useRef('')
  const password = useRef('')

  const handleLoginUser = (e) => {
    e.preventDefault()
    const data = {
      'username': username.current.value,
      'password': password.current.value,
    }
    axios.post(`http://127.0.0.1:8000/api/login/`, data, {
      withCredentials: true,
    })
    .then(response => console.log(response.data))
  }

  return (
    <div>
      <Header />
      <Main>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Faça Login em sua conta</h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLoginUser} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nome de usuário</label>
                <div className="mt-2">
                  <input ref={username} id="username" name="username" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                </div>
                <div className="mt-2">
                  <input ref={password} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" onClick={() => handleNavigate('/')} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?
              <span onClick={() => handleNavigate('/register')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Registre-se aqui!</span>
            </p>
          </div>
        </div>
      </Main>
    </div>
  )
}

export default page