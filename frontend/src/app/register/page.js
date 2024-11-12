'use client'

import React, { useRef } from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import axios from 'axios';
import useNavigate from '../hooks/useNavigate';

const page = () => {

  const navigate = useNavigate()

  const username = useRef('')
  const password = useRef('')
  const confirm_password = useRef('')

  const handleRegisterUser = (e) => {
    e.preventDefault()
    const data = {
      'username': username.current.value,
      'password': password.current.value,
      'confirm_password': confirm_password.current.value
    }
    axios.post(`http://127.0.0.1:8000/api/register/`, data, {
      withCredentials: true,
    })
    .then(response => navigate("/"))
  }

  return (
      <Main>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Crie sua conta</h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleRegisterUser}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nome de usuário</label>
                <div className="mt-2">
                  <input ref={username} id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                </div>
                <div className="mt-2">
                  <input ref={password} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">Confirme sua senha</label>
                </div>
                <div className="mt-2">
                  <input ref={confirm_password} id="confirm_password" name="confirm_password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Já tem uma conta?
              <span onClick={() => navigate('login')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Faça login aqui!</span>
            </p>
          </div>
        </div>
      </Main>
  )
}

export default page